// Builds worker/corpus.generated.js from the JSON release of Open English
// WordNet 2025. The generated artifact is committed; the ~70 MB source dump
// is intentionally not. Download instructions live in README.md.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.resolve(process.argv[2] || path.join(ROOT, ".tmp", "oewn"));
const OUTPUT = path.join(ROOT, "worker", "corpus.generated.js");
const HAND_CORPUS = path.join(ROOT, "worker", "corpus.js");

const LENGTH_QUOTAS = new Map([
  [3, 400], [4, 500], [5, 500], [6, 650], [7, 450], [8, 400], [9, 350],
  [10, 325], [11, 275], [12, 225], [13, 175], [14, 150], [15, 125],
]);
const CATEGORIES = [
  "geography", "history", "science", "nature", "animals", "space",
  "literature", "language", "philosophy", "mythology", "art & design", "music",
  "movies & tv", "pop culture", "technology", "business & economics",
  "politics & society", "food & drink", "travel", "sports", "games", "kids",
  "people", "general knowledge",
];
const CATEGORY_MINIMUM = 90;

const BLOCKED_FRAGMENTS = [
  "slur", "obscene", "offensive term", "vulgar", "racial epithet", "ethnic slur",
  "sex act", "sexual", "genital", "penis", "vagina",
  "semen", "testicle", "erection", "masturbat", "pornograph", "prostitute",
  "nazi", "suicide",
];
const OBSCURITY_MARKERS = [
  "archaic", "obsolete", "rare", "dialect", "british slang", "informal term",
  "taxonomic", "genus of", "family of", "subfamily", "tribe of", "order of",
];

const CATEGORY_RULES = [
  ["space", /\b(astronom|asteroid|celestial|comet|cosmic|galaxy|interstellar|lunar|moon|orbit|planet|rocket|satellite|solar|spacecraft|star|universe)\b/i],
  ["movies & tv", /\b(actor|actress|cinema|cinematic|director|documentary|film|movie|screenplay|sitcom|television|video production)\b/i],
  ["music", /\b(album|choir|composer|concert|instrument|jazz|melody|musical|musician|opera|orchestra|rhythm|singer|song|symphony|vocal)\b/i],
  ["literature", /\b(author|book|drama|fiction|literary|literature|novel|novelist|poem|poet|poetry|prose|story|theater|theatre|writer)\b/i],
  ["mythology", /\b(deity|demon|dragon|fairy|folklore|goddess|legendary|magic|monster|myth|mythical|supernatural)\b/i],
  ["animals", /\b(amphibian|animal|bird|breed|canine|cat|dog|feline|fish|insect|mammal|reptile|species of|zoolog)\b/i],
  ["food & drink", /\b(bake|beverage|bread|chef|cook|cuisine|dessert|dish|drink|edible|flavor|food|fruit|ingredient|meal|meat|recipe|restaurant|spice|vegetable|wine)\b/i],
  ["sports", /\b(athlete|athletic|baseball|basketball|championship|coach|football|golf|hockey|olympic|race|racing|soccer|sport|stadium|tennis|tournament)\b/i],
  ["games", /\b(board game|card game|chess|dice|game|gaming|puzzle|toy|video game)\b/i],
  ["technology", /\b(algorithm|computer|digital|electronic|engineering|hardware|internet|machine|network|programming|robot|software|technology|telecommunication|website)\b/i],
  ["business & economics", /\b(accounting|bank|business|commerce|company|corporate|currency|economic|finance|financial|investment|market|money|profit|stock exchange|trade)\b/i],
  ["politics & society", /\b(civic|congress|court of law|diplomat|election|government|legal system|legislature|military|political|politician|public office|social institution)\b/i],
  ["art & design", /\b(architect|art|artistic|color|decorative|design|painting|photograph|sculpture|visual)\b/i],
  ["language", /\b(alphabet|dictionary|grammar|language|linguistic|phrase|pronunciation|speech|syllable|translation|word|writing system)\b/i],
  ["philosophy", /\b(belief|consciousness|ethical|ethics|existence|knowledge|logic|metaphysic|moral|philosoph|reasoning|truth)\b/i],
  ["travel", /\b(aircraft|airport|hotel|journey|passenger|railway|road|ship|tourism|tourist|train|transport|travel|vehicle|voyage)\b/i],
  ["kids", /\b(baby|child|childhood|classroom|fairy tale|playground|school|student|young person)\b/i],
  ["geography", /\b(border|capital city|city|continent|country|geographic|island|lake|mountain|ocean|province|region|river|territory)\b/i],
  ["history", /\b(ancient|archaeolog|century|empire|historic|history|medieval|past|prehistor|revolution|war)\b/i],
  ["nature", /\b(climate|ecolog|environment|flower|forest|geolog|natural|plant|tree|weather|wild)\b/i],
  ["science", /\b(anatom|biology|chemical|chemistry|disease|experiment|medical|medicine|organism|physics|research|scientific)\b/i],
  ["pop culture", /\b(celebrity|comic book|comic strip|entertainment|fan club|fandom|fashion|magazine|mass media|newspaper|popular|radio show|show business|social media|trend)\b/i],
  ["people", /\b(a person|person who|professional|specialist|worker)\b/i],
];

const LEXNAME_CATEGORY = new Map([
  ["noun.animal", "animals"], ["noun.food", "food & drink"],
  ["noun.location", "geography"], ["noun.plant", "nature"],
  ["noun.phenomenon", "nature"], ["noun.object", "space"],
  ["noun.substance", "science"], ["noun.process", "science"],
  ["noun.body", "science"], ["noun.time", "history"],
  ["noun.possession", "business & economics"], ["noun.person", "people"],
  ["noun.cognition", "philosophy"], ["noun.communication", "language"],
]);

function normalizeWord(member) {
  return member.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z]/g, "").toUpperCase();
}

function sentenceCase(text) {
  const clean = text.replace(/\s+/g, " ").replace(/[.;:]$/, "").trim();
  return clean ? clean[0].toUpperCase() + clean.slice(1) : clean;
}

function inferCategory(lexname, member, definition) {
  for (const [category, pattern] of CATEGORY_RULES) if (pattern.test(definition)) return category;
  return LEXNAME_CATEGORY.get(lexname) || "general knowledge";
}

function candidateQuality(candidate, senseCount) {
  const markerPenalty = OBSCURITY_MARKERS.some((marker) => candidate.definition.toLowerCase().includes(marker)) ? 45 : 0;
  const phrasePenalty = /[_ -]/.test(candidate.member) ? 7 : 0;
  const definitionPenalty = Math.max(0, candidate.definition.length - 80) / 5;
  return senseCount * 18 + (candidate.memberRank === 0 ? 12 : 0) - phrasePenalty - definitionPenalty - markerPenalty;
}

function existingWords() {
  const source = fs.readFileSync(HAND_CORPUS, "utf8");
  return new Set([...source.matchAll(/\{\s*w:\s*"([A-Z]+)"/g)].map((match) => match[1]));
}

function loadCandidates() {
  if (!fs.existsSync(SOURCE_DIR)) throw new Error(`Open English WordNet JSON directory not found: ${SOURCE_DIR}`);
  const files = fs.readdirSync(SOURCE_DIR).filter((name) => /^(noun|verb|adj|adv)\..+\.json$/.test(name)).sort();
  const occurrences = new Map();
  for (const file of files) {
    const lexname = file.replace(/\.json$/, "");
    const synsets = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, file), "utf8"));
    for (const synset of Object.values(synsets)) {
      const definition = synset.definition?.[0];
      if (!definition || definition.length < 8 || definition.length > 150) continue;
      const lowerDefinition = definition.toLowerCase();
      if (BLOCKED_FRAGMENTS.some((fragment) => lowerDefinition.includes(fragment))) continue;
      for (let memberRank = 0; memberRank < (synset.members || []).length; memberRank++) {
        const member = synset.members[memberRank];
        const lowerMember = member.toLowerCase();
        if (BLOCKED_FRAGMENTS.some((fragment) => lowerMember.includes(fragment))) continue;
        const word = normalizeWord(member);
        if (word.length < 3 || word.length > 15 || !/^[A-Z]+$/.test(word)) continue;
        const memberWords = member.toLowerCase().replaceAll("_", " ").split(/[^a-z]+/).filter((part) => part.length >= 3);
        if (memberWords.some((part) => new RegExp(`\\b${part}\\b`, "i").test(definition))) continue;
        const list = occurrences.get(word) || [];
        list.push({ word, member, memberRank, definition, lexname });
        occurrences.set(word, list);
      }
    }
  }

  const existing = existingWords();
  const candidates = [];
  for (const [word, senses] of occurrences) {
    if (existing.has(word)) continue;
    const senseCount = senses.length;
    for (const sense of senses) sense.quality = candidateQuality(sense, senseCount);
    senses.sort((a, b) => b.quality - a.quality || a.definition.length - b.definition.length || a.member.localeCompare(b.member));
    const best = senses[0];
    const category = inferCategory(best.lexname, best.member, best.definition);
    candidates.push({
      w: word,
      c: sentenceCase(best.definition),
      cat: category,
      diff: 2,
      length: word.length,
      quality: best.quality,
      senseCount,
    });
  }
  return candidates;
}

function selectCorpus(candidates) {
  const selected = [];
  const selectedWords = new Set();
  const remainingByLength = new Map(LENGTH_QUOTAS);
  const sorted = candidates.sort((a, b) => b.quality - a.quality || b.senseCount - a.senseCount || a.w.localeCompare(b.w));

  const take = (candidate) => {
    const remaining = remainingByLength.get(candidate.length) || 0;
    if (!remaining || selectedWords.has(candidate.w)) return false;
    selected.push(candidate);
    selectedWords.add(candidate.w);
    remainingByLength.set(candidate.length, remaining - 1);
    return true;
  };

  // Give every Discover category a substantial native pool before filling
  // the remaining length quotas by lexical quality.
  for (const category of CATEGORIES) {
    let count = 0;
    for (const candidate of sorted) {
      if (candidate.cat === category && take(candidate) && ++count >= CATEGORY_MINIMUM) break;
    }
  }

  // Improve initial-letter diversity so highly crossed slots do not all
  // compete for the same handful of common prefixes.
  for (const [length] of LENGTH_QUOTAS) {
    if (length > 8) continue;
    for (const initial of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
      let count = 0;
      for (const candidate of sorted) {
        if (candidate.length === length && candidate.w[0] === initial && candidate.quality >= 12 && take(candidate) && ++count >= 2) break;
      }
    }
  }

  for (const candidate of sorted) take(candidate);
  const missing = [...remainingByLength].filter(([, count]) => count > 0);
  if (missing.length) throw new Error(`Unable to satisfy length quotas: ${JSON.stringify(missing)}`);

  // Difficulty is assigned by quality percentile within each word length.
  // That keeps every grid size supplied across all three native clue tiers
  // instead of letting raw WordNet sense counts collapse almost everything
  // into the easy bucket.
  for (const [length] of LENGTH_QUOTAS) {
    const group = selected.filter((entry) => entry.length === length).sort((a, b) => b.quality - a.quality || a.w.localeCompare(b.w));
    const easyCut = Math.round(group.length * 0.35);
    const hardCut = Math.round(group.length * 0.75);
    group.forEach((entry, index) => {
      const familiarEnough = entry.senseCount >= 3 && entry.length <= 10;
      entry.diff = index >= hardCut ? 3 : index < easyCut && familiarEnough ? 1 : 2;
    });
  }
  return selected.sort((a, b) => a.length - b.length || a.cat.localeCompare(b.cat) || a.w.localeCompare(b.w));
}

function render(entries) {
  const lines = entries.map(({ w, c, cat, diff }) => `  ${JSON.stringify({ w, c, cat, diff })},`);
  return `// AUTO-GENERATED — do not edit directly.\n// Source: Open English WordNet 2025 (CC BY 4.0), filtered and categorized\n// for Across. See THIRD_PARTY_NOTICES.md and scripts/build-corpus.js.\n\nexport const EXPANDED_WORD_BANK = [\n${lines.join("\n")}\n];\n`;
}

const candidates = loadCandidates();
const selected = selectCorpus(candidates);
fs.writeFileSync(OUTPUT, render(selected), "utf8");

const byLength = Object.fromEntries([...LENGTH_QUOTAS].map(([length]) => [length, selected.filter((entry) => entry.length === length).length]));
const byCategory = Object.fromEntries(CATEGORIES.map((category) => [category, selected.filter((entry) => entry.cat === category).length]));
const byDifficulty = Object.fromEntries([1, 2, 3].map((difficulty) => [difficulty, selected.filter((entry) => entry.diff === difficulty).length]));
console.log(JSON.stringify({ source: SOURCE_DIR, candidates: candidates.length, selected: selected.length, byLength, byCategory, byDifficulty }, null, 2));
