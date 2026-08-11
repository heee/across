// Curated whisky vocabulary. The category intentionally covers the global
// whisk(e)y family, production, maturation, regions, and tasting — not cocktails.

function parseWhiskyCorpus(source) {
  return source.trim().split("\n").map((line, index) => {
    const [w, c, rawDiff] = line.split("|");
    const diff = Number(rawDiff);
    if (!/^[A-Z]{3,15}$/.test(w) || !c || ![1, 2, 3].includes(diff)) {
      throw new Error(`Invalid whisky corpus row ${index + 1}: ${line}`);
    }
    return { w, c, cat: "whisky", diff };
  });
}

export const WHISKY_WORD_BANK = parseWhiskyCorpus(`
RYE|Grain that gives many whiskies a peppery profile|1
OAK|Wood universally associated with whisky maturation|1
MALT|Germinated grain used to make many whiskies|1
PEAT|Partially decayed vegetation used to smoke some malt|1
DRAM|Informal name for a small serving of whisky|1
STILL|Vessel in which alcoholic spirit is distilled|1
CASK|Wooden vessel used to mature whisky|1
GRAIN|Barley corn wheat or rye destined for the mash|1
BARLEY|Cereal at the heart of single malt Scotch|1
CORN|Required majority grain in a bourbon mash bill|1
WHEAT|Soft-flavored grain used in wheated bourbon|1
SCOTCH|Whisky made in Scotland under protected rules|1
IRISH|Describing whiskey made on the island of Ireland|1
BOURBON|American whiskey made from at least 51 percent corn|1
TENNESSEE|Whiskey style associated with charcoal mellowing|1
CANADIAN|Describing whisky produced and matured in Canada|1
JAPANESE|Describing whisky made in Japan|1
SINGLEMALT|Whisky from one distillery made only with malted barley|1
SINGLEGRAIN|Grain whisky produced at one distillery|2
BLENDED|Made by combining whiskies from multiple casks or types|1
BLENDEDMALT|Blend of single malt whiskies from multiple distilleries|2
BLENDEDGRAIN|Blend of single grain whiskies from multiple distilleries|3
STRAIGHT|U.S. whiskey aged at least two years with no added color or flavor|2
MALTWHISKY|Whisky distilled from a mash of malted barley|1
GRAINWHISKY|Whisky commonly made in a continuous column still|2
RYEWHISKEY|American whiskey made from a majority-rye mash|1
WHEATEDBOURBON|Bourbon using wheat rather than rye as flavoring grain|2
CORNWHISKEY|U.S. whiskey made from a mash of at least 80 percent corn|2
NEWMAKE|Clear spirit collected before it enters a cask|2
UISGE|Gaelic word for water in the root phrase behind whisky|3
WHISKY|Spirit distilled from fermented grain and matured in wood|1
WHISKEY|Spelling commonly used in Ireland and the United States|1
DISTILLERY|Site where wash is distilled into spirit|1
DISTILLER|Person or company that produces distilled spirit|1
MALTSTER|Specialist who prepares barley for brewing and distilling|3
MALTING|Controlled germination that makes barley enzymes available|2
GERMINATION|Growth stage encouraged before malt is dried|2
KILN|Heated chamber used to dry malted barley|2
KILNING|Drying malt to stop germination and develop flavor|2
FLOORMALTING|Traditional method of turning damp barley by hand|3
MALTBARN|Building where barley is germinated on a floor|3
GRIST|Coarsely ground malt prepared for mashing|2
MILL|Machine that crushes malt into grist|1
MASH|Mixture of grain and hot water used to release sugars|1
MASHTUN|Vessel where grist and hot water are combined|2
MASHBILL|Recipe specifying the grains used in a whiskey|1
WORT|Sugary liquid drained from a mash tun|2
WASH|Fermented liquid ready for whisky distillation|1
WASHBACK|Large vessel in which whisky wash ferments|3
YEAST|Microorganism that converts grain sugars into alcohol|1
FERMENT|Allow yeast to turn sugars into alcohol|1
FERMENTATION|Stage that creates alcohol and fruity flavor compounds|1
SACCHARIFY|Convert grain starch into fermentable sugar|3
ENZYME|Protein in malt that helps convert starch to sugar|2
LACTIC|Describing acidity sometimes developed in long fermentation|3
ESTER|Aromatic compound often perceived as fruity|2
COPPER|Traditional metal used for Scotch pot stills|1
POTSTILL|Batch still whose shape influences the spirit character|1
COLUMNSTILL|Continuous distillation apparatus used for grain whisky|2
COFFEYSTILL|Early patented form of continuous column still|3
ALEMBIC|Traditional name for a pot-shaped distilling vessel|3
LYNEARM|Pipe carrying vapor from a pot still head|3
CONDENSER|Equipment that cools vapor back into liquid spirit|2
WORMTUB|Coiled copper condenser immersed in cooling water|3
SHELLANDTUBE|Modern condenser with many small copper tubes|3
NECK|Narrow upper section of a whisky pot still|2
SWANNECK|Curved upper pipe on a traditional pot still|2
REFLUX|Vapor condensing and returning within a still|3
CHARGER|Receiver that holds low wines before redistillation|3
SPIRITSAFE|Locked cabinet used to monitor the distillation run|2
STILLHOUSE|Building containing a distillery's stills|1
DISTILLATION|Separation process that concentrates alcohol and flavor|1
DOUBLESTILL|Distillation performed through two pot still stages|2
TRIPLEDISTILLED|Made using three successive distillation stages|2
LOWWINES|First-distillation spirit destined for another run|3
FORESHOTS|Early volatile portion of a pot-still spirit run|3
HEADS|Early portion of a distillation run|2
HEART|Middle cut selected for maturation as whisky|1
CUT|Chosen division between parts of a spirit run|2
TAILS|Late portion of a distillation run|2
FEINTS|Late-run spirit recycled into a later distillation|3
SPIRITRUN|Final pot-still distillation producing new make|2
PROOF|Scale expressing the alcoholic strength of a spirit|1
ABV|Standard abbreviation for alcohol by volume|1
STRENGTH|Concentration of alcohol in a whisky|1
REDUCTION|Lowering spirit strength by adding water|2
WATER|Liquid sometimes added before bottling or tasting|1
WAREHOUSE|Building where filled whisky casks mature|1
DUNNAGE|Low earthen-floored warehouse traditional in Scotland|3
RICKHOUSE|American warehouse built to age whiskey barrels|2
RACKHOUSE|Another name for a whiskey aging warehouse|2
MATURATION|Time in wood during which whisky develops character|1
AGEING|British spelling for the process of maturing spirit|1
AGING|American spelling for maturation in a barrel|1
AGESTATEMENT|Youngest-whisky age declared on a bottle|1
NAS|Initials used for whisky carrying no age statement|2
ANGELSSHARE|Spirit lost through evaporation during maturation|1
BARREL|American oak container central to bourbon maturation|1
HOGSHEAD|Large cask commonly used to mature Scotch whisky|2
BUTT|Large cask size often associated with sherry seasoning|2
PUNCHEON|Large squat cask used for maturing spirits|3
QUARTERCASK|Small cask offering relatively high wood contact|2
OCTAVE|Very small cask sometimes used for finishing whisky|3
BARRELHEAD|Circular wooden end of a whisky barrel|1
STAVE|Shaped strip of wood forming a cask wall|1
HOOP|Metal band holding barrel staves together|1
BUNG|Stopper sealing the opening in a whisky cask|1
BUNGHOLE|Opening through which a cask is filled or sampled|2
COOPER|Craftsperson who makes and repairs wooden casks|1
COOPERAGE|Workshop where barrels are made or repaired|2
TOASTING|Heating cask wood gently to develop flavor|2
CHAR|Carbonized layer inside a newly burned barrel|1
CHARRING|Burning the inside of a barrel before filling|1
ALLIGATORCHAR|Deep barrel char resembling reptile scales|3
AMERICANOAK|Oak species group widely used for bourbon barrels|1
EUROPEANOAK|Oak often associated with tannin and dried-fruit notes|2
MIZUNARA|Japanese oak prized for distinctive incense-like aromas|3
VIRGINOAK|Wooden cask that has not held another liquid|2
REFILLCASK|Cask used for whisky maturation more than once|2
FIRSTFILL|First Scotch maturation after a cask's prior seasoning|2
EXBOURBON|Cask previously used to mature American bourbon|1
SHERRYCASK|Cask seasoned with sherry before holding whisky|1
WINECASK|Former wine vessel repurposed for whisky maturation|1
PORTCASK|Former fortified-wine cask used in whisky finishing|2
FINISH|Extra maturation period in a different cask|1
FINISHING|Moving whisky to another cask for final maturation|1
RERACKING|Transferring maturing whisky into another cask|3
MARRIAGE|Resting combined whiskies so their flavors integrate|2
VATTING|Combining multiple casks into a larger vessel|2
BATCH|Group of casks combined for one bottling run|1
SINGLECASK|Whisky bottled from one individual cask|1
SMALLBATCH|Whiskey made by combining a limited group of barrels|1
CASKSTRENGTH|Whisky bottled near the proof at which it left the cask|1
BARRELPROOF|American term for whiskey bottled without much dilution|1
NATURALCOLOR|Label claim indicating no coloring was added|2
CARAMELCOLOR|Permitted coloring used in some whisky markets|2
CHILLFILTRATION|Cold process used to remove haze-forming compounds|2
CHILLFILTERED|Filtered at low temperature for visual clarity|2
BOTTLING|Packaging mature whisky in glass for sale|1
BOTTLER|Company that fills and markets bottles of whisky|1
INDEPENDENT|Describing a bottler separate from the distillery|2
LABEL|Printed bottle panel giving brand and whisky details|1
CORK|Traditional stopper for a whisky bottle|1
CAPSULE|Cover fitted over a whisky bottle closure|2
DECANTER|Decorative vessel into which whisky may be poured|1
TUMBLER|Short wide drinking glass sometimes used for whisky|1
COPITA|Small stemmed nosing glass used by whisky tasters|2
NEAT|Served without ice mixers or added water|1
NOSE|A whisky's aroma or the act of smelling it|1
PALATE|Flavor and texture experienced in the mouth|1
AFTERTASTE|Flavor remaining after a whisky is swallowed|1
AROMA|Scent perceived while nosing a whisky|1
BOUQUET|Complex collection of aromas in a mature spirit|2
FLAVOR|Combined taste and aromatic impression|1
MOUTHFEEL|Texture and weight of whisky on the palate|2
BODY|Perceived weight and richness of a whisky|1
BALANCE|Harmony among a whisky's aromas and flavors|1
COMPLEXITY|Number and development of distinct flavor impressions|2
LENGTH|How long flavors persist after swallowing|2
TASTINGNOTE|Written description of a whisky's sensory profile|1
NOSING|Smelling a whisky carefully before tasting|1
SIP|Take a small taste of whisky|1
DROPPER|Tool for adding a controlled amount of water|2
LEGS|Streaks that descend inside a glass after swirling|2
PEATY|Showing aromas or flavors derived from peat smoke|1
SMOKY|Suggesting smoke from peat or toasted wood|1
MEDICINAL|Tasting descriptor suggesting antiseptic or iodine|2
MARITIME|Tasting descriptor suggesting sea air or brine|2
BRINY|Suggesting salt water on the palate|2
IODINE|Coastal medicinal aroma associated with some peated malts|2
HEATHER|Floral aroma associated with Scottish moorland|2
HONEYED|Having a sweet aroma reminiscent of honey|1
FLORAL|Showing aromas reminiscent of flowers|1
FRUITY|Showing clear fruit-like aromas or flavors|1
ORCHARD|Fruit-note family including apple pear and peach|1
CITRUS|Flavor family including lemon orange and grapefruit|1
TROPICAL|Flavor family suggesting mango pineapple or banana|1
RAISIN|Dried-fruit note often associated with sherry casks|1
SULTANA|Golden-raisin note found in some sherried whiskies|2
FIG|Dark dried-fruit note in some mature whiskies|1
DATE|Rich dried-fruit note in some sherry-cask whiskies|1
APPLE|Common fresh-fruit aroma in lighter whiskies|1
PEAR|Fresh-fruit aroma often found in new make spirit|1
BANANA|Ripe-fruit aroma sometimes found in grain spirit|1
VANILLA|Sweet aroma commonly contributed by American oak|1
CARAMEL|Cooked-sugar note found in many mature whiskies|1
TOFFEE|Buttery caramel note common in bourbon and Scotch|1
BUTTERSCOTCH|Rich sweet note suggesting butter and brown sugar|1
CHOCOLATE|Cocoa-like flavor found in some oak-matured whiskies|1
COFFEE|Roasted tasting note found in deeply matured whisky|1
NUTTY|Suggesting almonds walnuts or other nuts|1
ALMOND|Nut aroma sometimes found in mature whisky|1
HAZELNUT|Toasted-nut note in some sherry-matured whiskies|2
LEATHER|Mature aroma descriptor suggesting cured hide|2
TOBACCO|Earthy mature aroma found in some older whiskies|2
CEDAR|Dry aromatic wood note sometimes derived from oak|2
SPICY|Showing pepper cinnamon clove or ginger notes|1
PEPPER|Prickly spice note particularly associated with rye|1
CINNAMON|Sweet baking-spice note common in bourbon|1
CLOVE|Warm spice note that can come from oak or rye|1
NUTMEG|Baking-spice note sometimes found in mature whisky|1
GINGER|Bright warming spice note on the palate|1
OILY|Having a coating viscous texture|2
CREAMY|Having a smooth rich texture on the palate|1
DRY|Finishing with little perceived sweetness|1
SWEET|Showing clear sugar-like flavor impressions|1
TANNIC|Drying sensation caused by compounds from oak|2
ASTRINGENT|Creating a dry puckering sensation in the mouth|2
SULPHURY|Showing struck-match or meaty sulfur notes|3
FEINTY|Showing leathery or earthy late-run spirit character|3
WAXY|Texture or aroma famously associated with some malts|3
ESTERY|Showing prominent fruity fermentation aromas|3
SPEYSIDE|Scotch region centered on the River Spey|1
HIGHLANDS|Largest Scotch whisky region by area|1
LOWLANDS|Southern Scotch region known for generally lighter styles|1
ISLAY|Hebridean island renowned for peated single malts|1
CAMPBELTOWN|Small Scotch region on the Kintyre peninsula|2
ORKNEY|Northern islands home to distinctive Scotch distilleries|2
SKYE|Inner Hebridean island with a long distilling history|1
JURA|Hebridean island neighboring Islay|1
ARRAN|Island in the Firth of Clyde producing single malt|2
MULL|Hebridean island home to Tobermory distillery|2
KINTYRE|Scottish peninsula containing Campbeltown|3
DUFFTOWN|Speyside town noted for its concentration of distilleries|2
ROTHES|Speyside town with several historic distilleries|3
ELGIN|Moray town central to the Speyside whisky trade|2
TAIN|Highland town associated with a historic distillery|3
SCOTLAND|Country that gives Scotch whisky its protected origin|1
IRELAND|Island with a long tradition of whiskey distilling|1
KENTUCKY|American state most closely associated with bourbon|1
LOUISVILLE|Kentucky city central to the bourbon industry|1
BARDSTOWN|Kentucky town with a longstanding bourbon industry|1
FRANKFORT|Kentucky capital with a major bourbon heritage|2
LEXINGTON|Kentucky city in the heart of bourbon country|1
CANADA|Country with a major blended and rye whisky tradition|1
QUEBEC|Canadian province with whisky distilling history|2
ONTARIO|Province home to major Canadian whisky production|1
MANITOBA|Prairie province where Canadian whisky is produced|2
JAPAN|Country renowned for precise malt and blended whisky|1
HOKKAIDO|Northern Japanese island with cool-climate maturation|2
HONSHU|Main Japanese island and home to many distilleries|2
TAIWAN|Island whose warm climate accelerates whisky maturation|2
INDIA|Major whisky-producing country with a warm climate|1
AUSTRALIA|Country with a growing craft single-malt industry|1
TASMANIA|Australian island celebrated for craft whisky|2
SWEDEN|Nordic country producing cool-climate single malt|2
FRANCE|Country with expanding grain and single-malt production|1
GERMANY|European country with numerous small whisky distilleries|1
WALES|Country with a revived single-malt tradition|1
ENGLAND|Country with a modern wave of whisky distilleries|1
WORLDWHISKY|Broad term for whisky made beyond traditional regions|1
TERROIR|Idea that local grain climate and place shape flavor|3
MICROCLIMATE|Highly local climate affecting warehouse maturation|2
PROVENANCE|Documented origin of grain spirit or cask|2
REGION|Geographic area used to classify some whiskies|1
APPELLATION|Legally protected geographic product designation|3
GRAINTOTGLASS|Production philosophy controlling every stage onsite|2
SOURMASH|Method using acidic stillage from a previous batch|1
BACKSET|Spent stillage returned to a new sour mash|2
SWEETMASH|Whiskey mash begun without acidic backset|2
CHARCOAL|Material used to mellow Tennessee whiskey|1
MELLOWING|Softening spirit character before barrel entry|1
BOTTLEDINBOND|U.S. whiskey designation governed by an 1897 law|2
BONDED|Informal term for bottled-in-bond whiskey|2
ENTRYPROOF|Alcohol strength of spirit when a barrel is filled|2
WHITEOAK|American oak species required for many whiskey barrels|1
SEASONEDWOOD|Staves air-dried before a barrel is assembled|2
TOASTEDBARREL|Barrel heat-treated gently before or instead of charring|2
HONEYBARREL|Informal name for an exceptionally good whiskey barrel|2
BARRELPICK|Privately selected single barrel of whiskey|1
PRIVATEBARREL|Single barrel selected for a retailer or group|1
VINTAGE|Year associated with distillation or cask filling|2
OUTTURN|Number of bottles yielded by a cask or batch|3
ALCOHOL|Ethanol component responsible for a whisky's strength|1
ETHANOL|Primary type of alcohol present in whisky|2
CONGENER|Flavor-active compound produced during fermentation or aging|3
PHENOL|Compound contributing smoky medicinal peat character|3
PPM|Initials used for a malt's phenol measurement|3
CHROMATOGRAPHY|Laboratory method for separating spirit compounds|3
HYDROMETER|Instrument used to measure liquid density|2
THERMOMETER|Instrument used to monitor production temperature|1
PROOFINGWATER|Water selected to reduce whisky before bottling|1
SPRINGWATER|Water source often highlighted in distillery stories|1
WATERSOURCE|Supply used for mashing cooling or reduction|1
PAGODA|Distinctive ventilated roof on a traditional malt kiln|2
WAREHOUSING|Storage and care of filled casks during maturation|2
SAMPLING|Drawing spirit from a cask to assess its progress|1
VALINCH|Tube used to draw a whisky sample from a cask|3
MASTERBLENDER|Expert responsible for composing consistent whiskies|1
BLENDER|Specialist who combines casks or whisky types|1
MALTMAN|Worker traditionally responsible for floor maltings|3
STILLMAN|Operator responsible for running pot stills|2
COOPERING|Work of making and maintaining wooden casks|2
DISTILLING|Producing spirit by vaporization and condensation|1
CRAFTWHISKY|Small-scale whisky emphasizing local production|1
HERITAGEGRAIN|Older grain variety revived for distilling|2
LOCALBARLEY|Barley grown near the distillery that uses it|1
PEATBOG|Wetland from which peat may be cut for malt drying|2
PEATSMOKE|Smoke used to dry malt and impart phenolic flavor|1
PEATLEVEL|Relative intensity of phenols in malt or spirit|2
UNPEATED|Made without drying malt over peat smoke|1
HEAVILYPEATED|Made with malt carrying a high phenol level|2
LIGHTLYPEATED|Made with restrained peat-smoke influence|1
SOLERA|Vat system keeping a portion of earlier whisky in each batch|3
PERPETUALVAT|Vessel never fully emptied between whisky batches|3
RECIPE|Specified combination of grains and production choices|1
YIELD|Amount of alcohol obtained from a quantity of grain|2
SPIRITCUT|Heart portion chosen during final distillation|2
CASKSAMPLE|Small measure drawn to assess maturing whisky|1
RERACK|Transfer whisky from one cask into another|2
RELEASE|Particular whisky bottling offered for sale|1
CORERANGE|Regular set of bottlings offered by a producer|1
LIMITEDRELEASE|Whisky bottling made in restricted quantities|1
ANNUALRELEASE|Whisky issued once each year|1
ENTHUSIAST|Person with a strong interest in whisky|1
CONNOISSEUR|Knowledgeable judge of whisky quality and character|2
TASTER|Person evaluating whisky by smell taste and finish|1
VERTICAL|Tasting of several ages or vintages from one producer|2
FLIGHT|Several whiskies served together for comparison|1
BLINDTASTING|Evaluation without seeing bottle or label|1
SENSORYPANEL|Group trained to evaluate aroma flavor and texture|2
PALATECLEANSER|Neutral food or water used between whisky samples|2
FLAVORWHEEL|Circular guide organizing whisky aroma descriptors|1
NOSINGGLASS|Glass shaped to concentrate whisky aromas|1
OPENINGUP|Development of aromas after whisky rests in a glass|2
OXIDATION|Reaction with air that can change an opened whisky|2
HEADSPACE|Air volume above whisky in a partly empty bottle|2
MINIATURE|Small-format bottle used for sampling whisky|1
SAMPLEBOTTLE|Small container holding a whisky tasting portion|1
ARCHIVE|Collection of retained bottles or distillery samples|2
FOUNDINGYEAR|Year in which a distillery began operations|1
MOTHBALLED|Temporarily closed but not permanently dismantled|3
REOPENED|Returned to production after a period of closure|1
DEMOLISHED|Describing a distillery that has been torn down|2
GHOSTDISTILLERY|Closed distillery whose remaining stock is still sold|2
LOSTDISTILLERY|Producer no longer making spirit|1
REVIVAL|Return of a dormant whisky name or distilling site|1
EXCISE|Tax levied on distilled alcohol|2
GAUGER|Historic official who measured spirit for excise duty|3
BONDEDWAREHOUSE|Secure duty-suspended storage for maturing spirits|2
CUSTOMS|Authority overseeing duties on distilled spirits|2
SMUGGLER|Historic illicit transporter of untaxed whisky|1
ILLICITSTILL|Unlicensed apparatus used to make spirit|1
LICENSE|Legal authorization to distill whisky|1
REGULATION|Official rule governing whisky identity or production|1
SCOTCHWHISKY|Protected spirit category governed by Scottish rules|1
IRISHWHISKEY|Protected whiskey category made on the island of Ireland|1
AMERICANWHISKEY|Family including bourbon rye wheat and corn whiskey|1
CANADIANWHISKY|Protected whisky category produced in Canada|1
JAPANESEWHISKY|Whisky meeting Japan's production and labeling standard|1
`);
