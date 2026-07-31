// AUTO-GENERATED — do not edit directly.
// Source: worker/corpus.js + worker/generator.js + worker/index.js
// Regenerate with: node scripts/bundle-worker.cjs

// Across — starter word/clue bank.
//
// Hand-authored for this project rather than scraped from a published
// crossword corpus, to sidestep the copyright/licensing questions around
// redistributing someone else's clue text. It's intentionally modest in
// size (a few hundred entries) — enough to generate real small-to-medium
// puzzles across the categories the Search screen advertises, but you'll
// want to grow this over time (or swap in a larger licensed corpus) as
// players notice repeats. Difficulty: 1 = easy, 2 = medium, 3 = hard.
//
// `cat` values match the Search screen's category chips (lowercase):
// geography, movies, history, sports, science, food, kids, general.

const WORD_BANK = [
  // ---- geography ----
  { w: "PARIS", c: "City of Light", cat: "geography", diff: 1 },
  { w: "PRAGUE", c: "Czech capital on the Vltava", cat: "geography", diff: 2 },
  { w: "BERLIN", c: "German capital", cat: "geography", diff: 1 },
  { w: "TOKYO", c: "World's most populous metro area", cat: "geography", diff: 1 },
  { w: "CAIRO", c: "Egyptian capital near the pyramids", cat: "geography", diff: 2 },
  { w: "ROME", c: "The Eternal City", cat: "geography", diff: 1 },
  { w: "MADRID", c: "Spanish capital", cat: "geography", diff: 2 },
  { w: "LONDON", c: "City on the Thames", cat: "geography", diff: 1 },
  { w: "OSLO", c: "Norwegian capital", cat: "geography", diff: 2 },
  { w: "LIMA", c: "Peruvian capital", cat: "geography", diff: 2 },
  { w: "SEOUL", c: "South Korean capital", cat: "geography", diff: 2 },
  { w: "DELHI", c: "Indian capital region", cat: "geography", diff: 2 },
  { w: "NILE", c: "Longest river in Africa", cat: "geography", diff: 1 },
  { w: "AMAZON", c: "River that carries the most water on Earth", cat: "geography", diff: 2 },
  { w: "ANDES", c: "Longest mountain range in the world", cat: "geography", diff: 2 },
  { w: "ALPS", c: "Mountain range crossing France, Switzerland, and Italy", cat: "geography", diff: 1 },
  { w: "SAHARA", c: "Largest hot desert", cat: "geography", diff: 2 },
  { w: "GOBI", c: "Desert spanning China and Mongolia", cat: "geography", diff: 3 },
  { w: "EVEREST", c: "Tallest mountain above sea level", cat: "geography", diff: 1 },
  { w: "PACIFIC", c: "Largest ocean", cat: "geography", diff: 1 },
  { w: "ATLANTIC", c: "Ocean between the Americas and Europe/Africa", cat: "geography", diff: 1 },
  { w: "ARCTIC", c: "Northernmost ocean", cat: "geography", diff: 2 },
  { w: "ITALY", c: "Boot-shaped country", cat: "geography", diff: 1 },
  { w: "JAPAN", c: "Land of the Rising Sun", cat: "geography", diff: 1 },
  { w: "CANADA", c: "Country with the most lakes", cat: "geography", diff: 1 },
  { w: "BRAZIL", c: "Largest country in South America", cat: "geography", diff: 1 },
  { w: "EGYPT", c: "Home of the Great Pyramids", cat: "geography", diff: 1 },
  { w: "KENYA", c: "East African country known for safaris", cat: "geography", diff: 2 },
  { w: "ICELAND", c: "Land of fire and ice", cat: "geography", diff: 2 },
  { w: "GREECE", c: "Birthplace of the Olympics", cat: "geography", diff: 1 },
  { w: "PERU", c: "Home of Machu Picchu", cat: "geography", diff: 2 },
  { w: "CHILE", c: "Long, thin South American country", cat: "geography", diff: 2 },
  { w: "VIENNA", c: "Austrian capital", cat: "geography", diff: 2 },
  { w: "DUBLIN", c: "Irish capital", cat: "geography", diff: 2 },
  { w: "ATHENS", c: "Greek capital", cat: "geography", diff: 2 },
  { w: "MOSCOW", c: "Russian capital", cat: "geography", diff: 1 },
  { w: "ISLAND", c: "Landmass surrounded by water", cat: "geography", diff: 1 },
  { w: "GLACIER", c: "Slow-moving river of ice", cat: "geography", diff: 2 },
  { w: "VOLCANO", c: "Mountain that can erupt", cat: "geography", diff: 1 },
  { w: "PENINSULA", c: "Land almost surrounded by water", cat: "geography", diff: 3 },
  { w: "EQUATOR", c: "Line at zero degrees latitude", cat: "geography", diff: 2 },

  // ---- movies ----
  { w: "JAWS", c: "1975 shark thriller", cat: "movies", diff: 1 },
  { w: "TITANIC", c: "1997 blockbuster with a doomed ship", cat: "movies", diff: 1 },
  { w: "AVATAR", c: "Highest-grossing film for years, set on Pandora", cat: "movies", diff: 1 },
  { w: "FROZEN", c: "Animated film with the song \"Let It Go\"", cat: "movies", diff: 1 },
  { w: "SHREK", c: "Animated ogre with layers, like an onion", cat: "movies", diff: 1 },
  { w: "ROCKY", c: "Underdog boxer film series", cat: "movies", diff: 2 },
  { w: "GREASE", c: "1978 musical set at Rydell High", cat: "movies", diff: 2 },
  { w: "MATRIX", c: "\"There is no spoon\" sci-fi film", cat: "movies", diff: 2 },
  { w: "INCEPTION", c: "Dream-within-a-dream heist film", cat: "movies", diff: 2 },
  { w: "GLADIATOR", c: "\"Are you not entertained?\" film", cat: "movies", diff: 2 },
  { w: "CASABLANCA", c: "\"Here's looking at you, kid\" classic", cat: "movies", diff: 3 },
  { w: "PSYCHO", c: "Hitchcock shower-scene thriller", cat: "movies", diff: 2 },
  { w: "ALIEN", c: "\"In space no one can hear you scream\"", cat: "movies", diff: 1 },
  { w: "ELF", c: "Will Ferrell holiday comedy", cat: "movies", diff: 1 },
  { w: "UP", c: "Pixar film that opens with balloons and a house", cat: "movies", diff: 1 },
  { w: "COCO", c: "Pixar film set on Día de los Muertos", cat: "movies", diff: 1 },
  { w: "MOANA", c: "Disney film about a wayfinder", cat: "movies", diff: 1 },
  { w: "MULAN", c: "Disney film about a warrior who takes her father's place", cat: "movies", diff: 2 },
  { w: "TANGLED", c: "Disney film featuring Rapunzel", cat: "movies", diff: 2 },
  { w: "BRAVE", c: "Pixar film with a Scottish archer princess", cat: "movies", diff: 2 },
  { w: "JOKER", c: "2019 Batman villain origin story", cat: "movies", diff: 2 },
  { w: "DUNE", c: "Sci-fi epic set on the desert planet Arrakis", cat: "movies", diff: 2 },
  { w: "GRAVITY", c: "2013 space survival thriller", cat: "movies", diff: 2 },
  { w: "GOODFELLAS", c: "Scorsese mob classic", cat: "movies", diff: 3 },
  { w: "AMADEUS", c: "Best Picture about Mozart's rival", cat: "movies", diff: 3 },
  { w: "ARGO", c: "Affleck-directed hostage-rescue film", cat: "movies", diff: 3 },
  { w: "OSCAR", c: "Golden statuette award", cat: "movies", diff: 1 },
  { w: "SEQUEL", c: "Follow-up film", cat: "movies", diff: 1 },
  { w: "DIRECTOR", c: "Person who calls \"action\"", cat: "movies", diff: 1 },
  { w: "CAMEO", c: "Brief celebrity appearance in a film", cat: "movies", diff: 2 },
  { w: "TRAILER", c: "Preview shown before a movie", cat: "movies", diff: 1 },
  { w: "SCRIPT", c: "A movie's written dialogue and directions", cat: "movies", diff: 1 },
  { w: "STUNT", c: "Dangerous on-screen feat", cat: "movies", diff: 1 },
  { w: "STUDIO", c: "Where a movie is produced", cat: "movies", diff: 1 },
  { w: "VILLAIN", c: "The bad guy of the story", cat: "movies", diff: 1 },

  // ---- history ----
  { w: "LINCOLN", c: "16th U.S. president", cat: "history", diff: 1 },
  { w: "WASHINGTON", c: "First U.S. president", cat: "history", diff: 1 },
  { w: "NAPOLEON", c: "French emperor exiled to Elba", cat: "history", diff: 2 },
  { w: "CLEOPATRA", c: "Last active pharaoh of Egypt", cat: "history", diff: 2 },
  { w: "CAESAR", c: "Roman dictator stabbed on the Ides of March", cat: "history", diff: 2 },
  { w: "GANDHI", c: "Leader of India's independence movement", cat: "history", diff: 2 },
  { w: "CHURCHILL", c: "WWII British prime minister", cat: "history", diff: 2 },
  { w: "COLUMBUS", c: "Explorer who sailed in 1492", cat: "history", diff: 1 },
  { w: "REVOLUTION", c: "Sudden, sweeping political change", cat: "history", diff: 2 },
  { w: "EMPIRE", c: "A far-reaching political dominion", cat: "history", diff: 1 },
  { w: "TREATY", c: "Formal agreement between nations", cat: "history", diff: 2 },
  { w: "COLONY", c: "Territory under another country's control", cat: "history", diff: 2 },
  { w: "PHARAOH", c: "Ancient Egyptian ruler", cat: "history", diff: 2 },
  { w: "KNIGHT", c: "Medieval mounted warrior", cat: "history", diff: 1 },
  { w: "CASTLE", c: "Fortified medieval residence", cat: "history", diff: 1 },
  { w: "VIKING", c: "Norse seafaring raider", cat: "history", diff: 1 },
  { w: "PYRAMID", c: "Ancient Egyptian tomb structure", cat: "history", diff: 1 },
  { w: "RENAISSANCE", c: "European cultural rebirth after the Middle Ages", cat: "history", diff: 3 },
  { w: "ARMISTICE", c: "Agreement to stop fighting", cat: "history", diff: 3 },
  { w: "DYNASTY", c: "Line of rulers from one family", cat: "history", diff: 2 },
  { w: "ARTIFACT", c: "Object of historical interest", cat: "history", diff: 2 },
  { w: "MONARCH", c: "A king or queen", cat: "history", diff: 2 },
  { w: "SIEGE", c: "Prolonged military blockade of a place", cat: "history", diff: 2 },

  // ---- sports ----
  { w: "SOCCER", c: "Sport called \"football\" almost everywhere else", cat: "sports", diff: 1 },
  { w: "TENNIS", c: "Sport played with a racket and net", cat: "sports", diff: 1 },
  { w: "HOCKEY", c: "Sport played on ice with a puck", cat: "sports", diff: 1 },
  { w: "GOLF", c: "Sport played with clubs and a small ball", cat: "sports", diff: 1 },
  { w: "RUGBY", c: "Sport with an oval ball and no forward passes", cat: "sports", diff: 2 },
  { w: "CRICKET", c: "Bat-and-ball sport big in England and India", cat: "sports", diff: 2 },
  { w: "BOXING", c: "Sport fought in a ring with gloves", cat: "sports", diff: 1 },
  { w: "SWIMMING", c: "Pool sport measured in laps", cat: "sports", diff: 1 },
  { w: "MARATHON", c: "26.2-mile race", cat: "sports", diff: 2 },
  { w: "OLYMPICS", c: "Global games held every four years", cat: "sports", diff: 1 },
  { w: "REFEREE", c: "Official who enforces the rules of a game", cat: "sports", diff: 2 },
  { w: "STADIUM", c: "Large venue for sporting events", cat: "sports", diff: 1 },
  { w: "TROPHY", c: "Prize for winning a competition", cat: "sports", diff: 1 },
  { w: "COACH", c: "Person who trains a team", cat: "sports", diff: 1 },
  { w: "GOALIE", c: "Player who guards the net", cat: "sports", diff: 1 },
  { w: "SERVE", c: "Opening shot in tennis or volleyball", cat: "sports", diff: 1 },
  { w: "DRIBBLE", c: "Bounce a ball while moving, in basketball", cat: "sports", diff: 1 },
  { w: "OFFSIDE", c: "Soccer rule about being too far forward", cat: "sports", diff: 3 },
  { w: "SPRINT", c: "Short, fast race", cat: "sports", diff: 1 },
  { w: "TACKLE", c: "Bring down an opponent with the ball", cat: "sports", diff: 1 },
  { w: "PUCK", c: "Disc used in ice hockey", cat: "sports", diff: 1 },
  { w: "PEDAL", c: "What a cyclist pushes to go", cat: "sports", diff: 1 },
  { w: "RACKET", c: "Tennis or badminton equipment", cat: "sports", diff: 1 },
  { w: "MEDAL", c: "What Olympic winners take home", cat: "sports", diff: 1 },
  { w: "ARENA", c: "Enclosed venue for sports or events", cat: "sports", diff: 1 },

  // ---- science ----
  { w: "GRAVITY", c: "Force that keeps you on the ground", cat: "science", diff: 1 },
  { w: "ATOM", c: "Smallest unit of an element", cat: "science", diff: 1 },
  { w: "OXYGEN", c: "Element you breathe in to live", cat: "science", diff: 1 },
  { w: "PLANET", c: "Earth, for instance", cat: "science", diff: 1 },
  { w: "GALAXY", c: "Massive collection of stars, like the Milky Way", cat: "science", diff: 1 },
  { w: "COMET", c: "Icy body that grows a tail near the sun", cat: "science", diff: 2 },
  { w: "NEURON", c: "Brain cell that transmits signals", cat: "science", diff: 2 },
  { w: "GENOME", c: "Complete set of an organism's DNA", cat: "science", diff: 3 },
  { w: "ENZYME", c: "Protein that speeds up a reaction", cat: "science", diff: 3 },
  { w: "VACCINE", c: "Shot that trains your immune system", cat: "science", diff: 2 },
  { w: "ECLIPSE", c: "Event where one body blocks another's light", cat: "science", diff: 2 },
  { w: "ORBIT", c: "Path a planet takes around the sun", cat: "science", diff: 1 },
  { w: "MOLECULE", c: "Two or more atoms bonded together", cat: "science", diff: 2 },
  { w: "GRAVITON", c: "Hypothetical particle carrying gravity", cat: "science", diff: 3 },
  { w: "PHOTON", c: "Particle of light", cat: "science", diff: 2 },
  { w: "MAGNET", c: "Object that attracts iron", cat: "science", diff: 1 },
  { w: "VOLTAGE", c: "Electrical potential difference", cat: "science", diff: 2 },
  { w: "BACTERIA", c: "Single-celled microorganisms", cat: "science", diff: 2 },
  { w: "FOSSIL", c: "Preserved remains of an ancient organism", cat: "science", diff: 1 },
  { w: "HABITAT", c: "An animal's natural home environment", cat: "science", diff: 1 },
  { w: "MAMMAL", c: "Warm-blooded animal that nurses its young", cat: "science", diff: 1 },
  { w: "REPTILE", c: "Cold-blooded, scaly animal like a lizard", cat: "science", diff: 1 },
  { w: "OTTER", c: "Playful river mammal", cat: "science", diff: 1 },
  { w: "SONAR", c: "Sound-based system, like a submarine's \"ears\"", cat: "science", diff: 2 },
  { w: "TELESCOPE", c: "Instrument for viewing distant stars", cat: "science", diff: 2 },
  { w: "MICROSCOPE", c: "Instrument for viewing tiny things", cat: "science", diff: 2 },

  // ---- food ----
  { w: "PIZZA", c: "Dish topped with cheese and sauce on dough", cat: "food", diff: 1 },
  { w: "SUSHI", c: "Japanese dish often featuring raw fish", cat: "food", diff: 1 },
  { w: "TACO", c: "Folded tortilla dish", cat: "food", diff: 1 },
  { w: "PASTA", c: "Italian noodle dish", cat: "food", diff: 1 },
  { w: "BURGER", c: "Sandwich with a beef patty", cat: "food", diff: 1 },
  { w: "WAFFLE", c: "Griddled breakfast dish with a grid pattern", cat: "food", diff: 1 },
  { w: "PANCAKE", c: "Flat, griddled breakfast dish", cat: "food", diff: 1 },
  { w: "OMELET", c: "Folded egg dish", cat: "food", diff: 2 },
  { w: "RISOTTO", c: "Creamy Italian rice dish", cat: "food", diff: 3 },
  { w: "CURRY", c: "Spiced dish common in South Asian cuisine", cat: "food", diff: 1 },
  { w: "RAMEN", c: "Japanese noodle soup", cat: "food", diff: 1 },
  { w: "DUMPLING", c: "Dough wrapped around a filling", cat: "food", diff: 2 },
  { w: "PRETZEL", c: "Twisted, salted snack", cat: "food", diff: 2 },
  { w: "BAGEL", c: "Boiled-then-baked ring-shaped bread", cat: "food", diff: 1 },
  { w: "CROISSANT", c: "Flaky, crescent-shaped French pastry", cat: "food", diff: 3 },
  { w: "AVOCADO", c: "Green fruit used in guacamole", cat: "food", diff: 1 },
  { w: "MANGO", c: "Sweet tropical stone fruit", cat: "food", diff: 1 },
  { w: "COCONUT", c: "Tropical fruit with a hard shell and milk inside", cat: "food", diff: 1 },
  { w: "GINGER", c: "Spicy root used in cooking and tea", cat: "food", diff: 2 },
  { w: "CINNAMON", c: "Warm spice from tree bark", cat: "food", diff: 2 },
  { w: "VANILLA", c: "Most common ice cream flavor", cat: "food", diff: 1 },
  { w: "CARAMEL", c: "Cooked-sugar candy or sauce", cat: "food", diff: 2 },
  { w: "PRETZELS", c: "Salty, twisted snacks eaten by the bag", cat: "food", diff: 2 },
  { w: "OMELETTE", c: "British spelling of a folded egg dish", cat: "food", diff: 2 },
  { w: "SPATULA", c: "Kitchen tool for flipping food", cat: "food", diff: 2 },
  { w: "SKILLET", c: "Frying pan", cat: "food", diff: 1 },
  { w: "RECIPE", c: "Instructions for cooking a dish", cat: "food", diff: 1 },
  { w: "SIMMER", c: "Cook gently just below boiling", cat: "food", diff: 2 },

  // ---- kids ----
  { w: "PUPPY", c: "Baby dog", cat: "kids", diff: 1 },
  { w: "KITTEN", c: "Baby cat", cat: "kids", diff: 1 },
  { w: "RAINBOW", c: "Colorful arc after rain", cat: "kids", diff: 1 },
  { w: "CRAYON", c: "Waxy coloring stick", cat: "kids", diff: 1 },
  { w: "BALLOON", c: "Inflatable party decoration", cat: "kids", diff: 1 },
  { w: "TEDDY", c: "Stuffed bear, for short", cat: "kids", diff: 1 },
  { w: "SWING", c: "Playground seat that goes back and forth", cat: "kids", diff: 1 },
  { w: "SLIDE", c: "Playground chute you go down", cat: "kids", diff: 1 },
  { w: "BUBBLE", c: "Soapy sphere that pops", cat: "kids", diff: 1 },
  { w: "COOKIE", c: "Sweet baked treat, often with chips in it", cat: "kids", diff: 1 },
  { w: "UNICORN", c: "Mythical horse with a horn", cat: "kids", diff: 1 },
  { w: "DRAGON", c: "Fire-breathing mythical creature", cat: "kids", diff: 1 },
  { w: "PIRATE", c: "Sea robber who says \"arr\"", cat: "kids", diff: 1 },
  { w: "ROBOT", c: "Mechanical, programmable helper", cat: "kids", diff: 1 },
  { w: "CASTLE", c: "Where a fairy-tale king or queen lives", cat: "kids", diff: 1 },
  { w: "WIZARD", c: "Spellcasting magic-user", cat: "kids", diff: 1 },
  { w: "SNOWMAN", c: "Figure built from three snowballs", cat: "kids", diff: 1 },
  { w: "TROPHY", c: "What you win first place with", cat: "kids", diff: 1 },
  { w: "SUPERHERO", c: "Caped crime-fighter", cat: "kids", diff: 2 },
  { w: "MERMAID", c: "Half-human, half-fish sea creature", cat: "kids", diff: 1 },
  { w: "GIGGLE", c: "Small, happy laugh", cat: "kids", diff: 1 },
  { w: "SPARKLE", c: "Small flash of light, like glitter", cat: "kids", diff: 1 },
  { w: "PUZZLE", c: "Game you piece together, like this one", cat: "kids", diff: 1 },
  { w: "SANDBOX", c: "Playground pit filled for digging", cat: "kids", diff: 1 },

  // ---- general (short connector words, help intersections across all sizes) ----
  { w: "ERASE", c: "Undo, as pencil marks", cat: "general", diff: 1 },
  { w: "OCEAN", c: "Vast body of salt water", cat: "general", diff: 1 },
  { w: "RIVER", c: "Flowing body of fresh water", cat: "general", diff: 1 },
  { w: "CLOUD", c: "Fluffy shape in the sky", cat: "general", diff: 1 },
  { w: "STORM", c: "Weather event with wind and rain", cat: "general", diff: 1 },
  { w: "LIGHT", c: "Opposite of dark", cat: "general", diff: 1 },
  { w: "MUSIC", c: "Organized sound, art form", cat: "general", diff: 1 },
  { w: "DANCE", c: "Rhythmic movement to music", cat: "general", diff: 1 },
  { w: "SMILE", c: "Happy facial expression", cat: "general", diff: 1 },
  { w: "DREAM", c: "What you experience while asleep", cat: "general", diff: 1 },
  { w: "TRAIN", c: "Vehicle that runs on rails", cat: "general", diff: 1 },
  { w: "PLANE", c: "Vehicle that flies", cat: "general", diff: 1 },
  { w: "BOAT", c: "Small watercraft", cat: "general", diff: 1 },
  { w: "ROAD", c: "Paved path for vehicles", cat: "general", diff: 1 },
  { w: "STAR", c: "Twinkling point of light at night", cat: "general", diff: 1 },
  { w: "MOON", c: "Earth's only natural satellite", cat: "general", diff: 1 },
  { w: "TREE", c: "Tall plant with a trunk", cat: "general", diff: 1 },
  { w: "LEAF", c: "Part of a tree that falls in autumn", cat: "general", diff: 1 },
  { w: "STONE", c: "Small rock", cat: "general", diff: 1 },
  { w: "GLASS", c: "Transparent material, or a drinking vessel", cat: "general", diff: 1 },
  { w: "PAPER", c: "What books and letters are printed on", cat: "general", diff: 1 },
  { w: "CHAIR", c: "Piece of furniture you sit on", cat: "general", diff: 1 },
  { w: "TABLE", c: "Flat furniture surface", cat: "general", diff: 1 },
  { w: "CLOCK", c: "Device that tells time", cat: "general", diff: 1 },
  { w: "MIRROR", c: "Reflective glass surface", cat: "general", diff: 1 },
  { w: "WINDOW", c: "Glass opening in a wall", cat: "general", diff: 1 },
  { w: "GARDEN", c: "Plot for growing plants", cat: "general", diff: 1 },
  { w: "FOREST", c: "Large area covered in trees", cat: "general", diff: 1 },
  { w: "DESERT", c: "Dry, sandy region", cat: "general", diff: 1 },
  { w: "ISLAND", c: "Body of land surrounded by water", cat: "general", diff: 1 },
  { w: "BRIDGE", c: "Structure crossing a river or gap", cat: "general", diff: 1 },
  { w: "TUNNEL", c: "Underground passage", cat: "general", diff: 1 },
  { w: "ENGINE", c: "Machine that converts fuel to motion", cat: "general", diff: 1 },
  { w: "ROCKET", c: "Vehicle that launches into space", cat: "general", diff: 1 },
  { w: "CAMERA", c: "Device that captures photos", cat: "general", diff: 1 },
  { w: "LETTER", c: "Written message, or a character like A", cat: "general", diff: 1 },
  { w: "NUMBER", c: "Mathematical value like 7", cat: "general", diff: 1 },
  { w: "COLOR", c: "Red, blue, or green, e.g.", cat: "general", diff: 1 },
  { w: "SHAPE", c: "Circle or square, e.g.", cat: "general", diff: 1 },
  { w: "ANSWER", c: "Response to a question", cat: "general", diff: 1 },
  { w: "SECRET", c: "Something kept hidden", cat: "general", diff: 1 },
  { w: "FRIEND", c: "Person you're close with", cat: "general", diff: 1 },
  { w: "FAMILY", c: "Parents, siblings, and relatives", cat: "general", diff: 1 },
  { w: "TRAVEL", c: "Go on a trip", cat: "general", diff: 1 },
  { w: "JOURNEY", c: "Long trip", cat: "general", diff: 1 },
  { w: "WINTER", c: "Coldest season", cat: "general", diff: 1 },
  { w: "SUMMER", c: "Warmest season", cat: "general", diff: 1 },
  { w: "AUTUMN", c: "Season also called fall", cat: "general", diff: 1 },
  { w: "SPRING", c: "Season of blooming flowers", cat: "general", diff: 1 },
  { w: "MORNING", c: "Start of the day", cat: "general", diff: 1 },
  { w: "EVENING", c: "End of the day", cat: "general", diff: 1 },
  { w: "SILENCE", c: "Complete quiet", cat: "general", diff: 2 },
  { w: "WHISPER", c: "Very quiet speech", cat: "general", diff: 1 },
  { w: "THUNDER", c: "Loud sound after lightning", cat: "general", diff: 1 },
  { w: "LIGHTNING", c: "Electric flash during a storm", cat: "general", diff: 1 },

  // ---- short fill words (3-4 letters, help intersections across all categories) ----
  { w: "SUN", c: "Star at the center of our solar system", cat: "general", diff: 1 },
  { w: "SEA", c: "Body of salt water, smaller than an ocean", cat: "general", diff: 1 },
  { w: "SKY", c: "What clouds float in", cat: "general", diff: 1 },
  { w: "ICE", c: "Frozen water", cat: "general", diff: 1 },
  { w: "AIR", c: "What we breathe", cat: "general", diff: 1 },
  { w: "MAP", c: "Guide for finding your way", cat: "general", diff: 1 },
  { w: "KEY", c: "Opens a lock", cat: "general", diff: 1 },
  { w: "BOX", c: "Square container", cat: "general", diff: 1 },
  { w: "CUP", c: "Small drinking vessel", cat: "general", diff: 1 },
  { w: "PEN", c: "Writing tool with ink", cat: "general", diff: 1 },
  { w: "HAT", c: "Head covering", cat: "general", diff: 1 },
  { w: "BAT", c: "Flying mammal, or baseball equipment", cat: "general", diff: 1 },
  { w: "OWL", c: "Nocturnal bird known for wisdom", cat: "general", diff: 1 },
  { w: "FOX", c: "Sly, red-furred animal", cat: "general", diff: 1 },
  { w: "BEE", c: "Buzzing pollinator", cat: "general", diff: 1 },
  { w: "ANT", c: "Tiny colony-building insect", cat: "general", diff: 1 },
  { w: "COW", c: "Farm animal that moos", cat: "general", diff: 1 },
  { w: "PIG", c: "Farm animal that oinks", cat: "general", diff: 1 },
  { w: "HEN", c: "Female chicken", cat: "general", diff: 1 },
  { w: "EGG", c: "What a hen lays", cat: "general", diff: 1 },
  { w: "ICE", c: "What forms on a pond in winter", cat: "general", diff: 1 },
  { w: "GEM", c: "Precious stone", cat: "general", diff: 1 },
  { w: "MAP", c: "Chart used for navigation", cat: "general", diff: 1 },
  { w: "LAKE", c: "Inland body of water", cat: "general", diff: 1 },
  { w: "PEAK", c: "Mountain's highest point", cat: "general", diff: 1 },
  { w: "COVE", c: "Small, sheltered bay", cat: "general", diff: 2 },
  { w: "REEF", c: "Coral-built underwater ridge", cat: "general", diff: 2 },
  { w: "DUNE", c: "Sand hill shaped by wind", cat: "general", diff: 2 },
  { w: "CAVE", c: "Underground hollow", cat: "general", diff: 1 },
  { w: "MIST", c: "Light fog", cat: "general", diff: 1 },
  { w: "GLOW", c: "Soft, steady light", cat: "general", diff: 1 },
  { w: "WAVE", c: "Ocean swell, or a hand gesture hello", cat: "general", diff: 1 },
  { w: "TIDE", c: "Rise and fall of the sea", cat: "general", diff: 2 },
  { w: "SAND", c: "What beaches are made of", cat: "general", diff: 1 },
  { w: "SNOW", c: "Frozen precipitation", cat: "general", diff: 1 },
  { w: "RAIN", c: "Falling water from clouds", cat: "general", diff: 1 },
  { w: "WIND", c: "Moving air", cat: "general", diff: 1 },
  { w: "LEAP", c: "Big jump", cat: "general", diff: 1 },
  { w: "RACE", c: "Speed competition", cat: "general", diff: 1 },
  { w: "GOAL", c: "Objective, or a score in soccer", cat: "general", diff: 1 },
  { w: "TEAM", c: "Group working together", cat: "general", diff: 1 },
  { w: "GAME", c: "Activity played for fun or competition", cat: "general", diff: 1 },
  { w: "PLAY", c: "What you do with a game or a toy", cat: "general", diff: 1 },
  { w: "WORK", c: "Job or effort", cat: "general", diff: 1 },
  { w: "REST", c: "Take a break", cat: "general", diff: 1 },
  { w: "WISH", c: "What you make on a birthday candle", cat: "general", diff: 1 },
  { w: "HOPE", c: "Optimistic feeling", cat: "general", diff: 1 },
  { w: "LOVE", c: "Deep affection", cat: "general", diff: 1 },
  { w: "JOKE", c: "Something told to get a laugh", cat: "general", diff: 1 },
  { w: "SONG", c: "Musical piece with lyrics", cat: "general", diff: 1 },
  { w: "TUNE", c: "Melody", cat: "general", diff: 1 },
  { w: "BEAT", c: "Rhythmic pulse in music", cat: "general", diff: 1 },
  { w: "NOTE", c: "Single musical sound, or a short written message", cat: "general", diff: 1 },

  // ---- geography (batch 2) ----
  { w: "AMSTERDAM", c: "Dutch capital known for its canals", cat: "geography", diff: 2 },
  { w: "LISBON", c: "Portuguese capital", cat: "geography", diff: 2 },
  { w: "HELSINKI", c: "Finnish capital", cat: "geography", diff: 3 },
  { w: "BANGKOK", c: "Thai capital", cat: "geography", diff: 2 },
  { w: "NAIROBI", c: "Kenyan capital", cat: "geography", diff: 3 },
  { w: "TORONTO", c: "Canada's most populous city", cat: "geography", diff: 2 },
  { w: "SYDNEY", c: "Australian harbor city with a famous opera house", cat: "geography", diff: 1 },
  { w: "VENICE", c: "Italian city built on canals", cat: "geography", diff: 1 },
  { w: "GENEVA", c: "Swiss city on a lake of the same name", cat: "geography", diff: 2 },
  { w: "ZURICH", c: "Switzerland's largest city", cat: "geography", diff: 3 },
  { w: "MEKONG", c: "River flowing through Southeast Asia", cat: "geography", diff: 3 },
  { w: "DANUBE", c: "River flowing through Vienna and Budapest", cat: "geography", diff: 3 },
  { w: "THAMES", c: "River flowing through London", cat: "geography", diff: 2 },
  { w: "URAL", c: "Mountain range dividing Europe and Asia", cat: "geography", diff: 3 },
  { w: "ATLAS", c: "Mountain range in northwest Africa", cat: "geography", diff: 3 },
  { w: "TUNDRA", c: "Cold, treeless biome near the poles", cat: "geography", diff: 2 },
  { w: "SAVANNA", c: "Grassy plain dotted with scattered trees", cat: "geography", diff: 2 },
  { w: "RAINFOREST", c: "Dense, wet, biodiverse forest biome", cat: "geography", diff: 2 },
  { w: "FJORD", c: "Narrow inlet carved by a glacier", cat: "geography", diff: 3 },
  { w: "ARCHIPELAGO", c: "A cluster of islands", cat: "geography", diff: 3 },
  { w: "CONTINENT", c: "Landmass like Africa or Asia", cat: "geography", diff: 1 },
  { w: "HEMISPHERE", c: "Half of the globe, north or south", cat: "geography", diff: 2 },
  { w: "LATITUDE", c: "Distance north or south of the equator", cat: "geography", diff: 3 },
  { w: "LONGITUDE", c: "Distance east or west of the prime meridian", cat: "geography", diff: 3 },
  { w: "BORDER", c: "Line dividing two countries", cat: "geography", diff: 1 },
  { w: "CAPITAL", c: "A country's seat of government", cat: "geography", diff: 1 },
  { w: "HARBOR", c: "Sheltered body of water for ships", cat: "geography", diff: 1 },
  { w: "PLATEAU", c: "Elevated, mostly flat area of land", cat: "geography", diff: 2 },
  { w: "CANYON", c: "Deep gorge carved by a river", cat: "geography", diff: 1 },
  { w: "DELTA", c: "Fan-shaped land where a river meets the sea", cat: "geography", diff: 2 },
  { w: "STRAIT", c: "Narrow waterway connecting two seas", cat: "geography", diff: 3 },
  { w: "GLOBE", c: "Spherical model of the Earth", cat: "geography", diff: 1 },
  { w: "COMPASS", c: "Tool that always points north", cat: "geography", diff: 1 },

  // ---- movies (batch 2) ----
  { w: "PIXAR", c: "Animation studio behind Toy Story", cat: "movies", diff: 1 },
  { w: "MARVEL", c: "Studio behind the Avengers franchise", cat: "movies", diff: 1 },
  { w: "SEQUELS", c: "Second, third, and later installments", cat: "movies", diff: 1 },
  { w: "REMAKE", c: "New version of an older film", cat: "movies", diff: 2 },
  { w: "PREMIERE", c: "A film's first public showing", cat: "movies", diff: 2 },
  { w: "BLOCKBUSTER", c: "A hugely successful hit film", cat: "movies", diff: 2 },
  { w: "SOUNDTRACK", c: "A film's musical accompaniment album", cat: "movies", diff: 2 },
  { w: "SUBTITLE", c: "On-screen translation of dialogue", cat: "movies", diff: 2 },
  { w: "SCREENPLAY", c: "The written blueprint for a film", cat: "movies", diff: 2 },
  { w: "PRODUCER", c: "Person who finances and oversees a film", cat: "movies", diff: 2 },
  { w: "ANIMATOR", c: "Artist who brings drawn characters to life", cat: "movies", diff: 2 },
  { w: "CASTING", c: "Choosing actors for roles", cat: "movies", diff: 2 },
  { w: "REHEARSAL", c: "Practice run before filming or a live show", cat: "movies", diff: 2 },
  { w: "CLIMAX", c: "The most intense point of a story", cat: "movies", diff: 2 },
  { w: "PLOT", c: "The storyline of a film", cat: "movies", diff: 1 },
  { w: "GENRE", c: "Category like horror, comedy, or drama", cat: "movies", diff: 1 },
  { w: "COMEDY", c: "Genre meant to make you laugh", cat: "movies", diff: 1 },
  { w: "THRILLER", c: "Genre built on suspense", cat: "movies", diff: 1 },
  { w: "WESTERN", c: "Genre set in the American frontier", cat: "movies", diff: 2 },
  { w: "MUSICAL", c: "Genre where characters break into song", cat: "movies", diff: 1 },
  { w: "DOCUMENTARY", c: "Non-fiction film genre", cat: "movies", diff: 2 },
  { w: "ANIMATION", c: "Genre built frame by frame rather than filmed live", cat: "movies", diff: 1 },
  { w: "POPCORN", c: "Classic movie-theater snack", cat: "movies", diff: 1 },
  { w: "MATINEE", c: "An afternoon showing of a film", cat: "movies", diff: 3 },
  { w: "MARQUEE", c: "The sign out front announcing what's playing", cat: "movies", diff: 3 },

  // ---- history (batch 2) ----
  { w: "ARMOR", c: "Protective gear worn by knights", cat: "history", diff: 1 },
  { w: "SWORD", c: "Bladed weapon carried by knights", cat: "history", diff: 1 },
  { w: "SHIELD", c: "Defensive gear held in one hand", cat: "history", diff: 1 },
  { w: "THRONE", c: "The seat a monarch rules from", cat: "history", diff: 1 },
  { w: "CROWN", c: "Headpiece worn by a king or queen", cat: "history", diff: 1 },
  { w: "PALACE", c: "Grand residence of a royal family", cat: "history", diff: 1 },
  { w: "FORTRESS", c: "A heavily defended stronghold", cat: "history", diff: 2 },
  { w: "RUINS", c: "What's left of an ancient structure", cat: "history", diff: 1 },
  { w: "SCROLL", c: "Rolled-up ancient document", cat: "history", diff: 2 },
  { w: "TABLET", c: "Ancient inscribed stone or clay slab", cat: "history", diff: 2 },
  { w: "EXPEDITION", c: "A long journey undertaken for exploration", cat: "history", diff: 2 },
  { w: "SETTLER", c: "Someone who establishes a new colony", cat: "history", diff: 2 },
  { w: "PIONEER", c: "One of the first to explore or settle a region", cat: "history", diff: 1 },
  { w: "MERCHANT", c: "Trader who buys and sells goods", cat: "history", diff: 2 },
  { w: "CARAVAN", c: "A group of traders traveling together", cat: "history", diff: 2 },
  { w: "COMPASS", c: "Navigation tool that changed exploration", cat: "history", diff: 1 },
  { w: "GALLEON", c: "Large sailing ship used for trade and war", cat: "history", diff: 3 },
  { w: "MUSKET", c: "Early long-barreled firearm", cat: "history", diff: 3 },
  { w: "REBELLION", c: "An organized uprising against authority", cat: "history", diff: 2 },
  { w: "INDEPENDENCE", c: "Freedom from outside control", cat: "history", diff: 2 },
  { w: "CONSTITUTION", c: "A nation's foundational set of laws", cat: "history", diff: 2 },
  { w: "SENATE", c: "A governing legislative body", cat: "history", diff: 2 },
  { w: "DECREE", c: "An official order with the force of law", cat: "history", diff: 3 },

  // ---- sports (batch 2) ----
  { w: "VOLLEYBALL", c: "Sport played over a net without a bounce", cat: "sports", diff: 1 },
  { w: "BADMINTON", c: "Racket sport played with a shuttlecock", cat: "sports", diff: 2 },
  { w: "LACROSSE", c: "Sport played with a netted stick", cat: "sports", diff: 3 },
  { w: "WRESTLING", c: "Sport of grappling to pin an opponent", cat: "sports", diff: 1 },
  { w: "FENCING", c: "Sport of sword dueling for points", cat: "sports", diff: 2 },
  { w: "ARCHERY", c: "Sport of shooting a bow at a target", cat: "sports", diff: 1 },
  { w: "ROWING", c: "Sport of racing boats with oars", cat: "sports", diff: 2 },
  { w: "SURFING", c: "Sport of riding ocean waves on a board", cat: "sports", diff: 1 },
  { w: "SKIING", c: "Winter sport of gliding down snow on two boards", cat: "sports", diff: 1 },
  { w: "SKATING", c: "Sport of gliding on blades or wheels", cat: "sports", diff: 1 },
  { w: "GYMNASTICS", c: "Sport of tumbling, beams, and rings", cat: "sports", diff: 1 },
  { w: "DIVING", c: "Sport of leaping from a platform into water", cat: "sports", diff: 1 },
  { w: "CYCLING", c: "Sport of racing on two wheels", cat: "sports", diff: 1 },
  { w: "TRIATHLON", c: "Race combining swimming, cycling, and running", cat: "sports", diff: 2 },
  { w: "DECATHLON", c: "Ten-event track and field competition", cat: "sports", diff: 3 },
  { w: "UMPIRE", c: "Official who makes the calls in baseball", cat: "sports", diff: 2 },
  { w: "CAPTAIN", c: "The player leading a sports team", cat: "sports", diff: 1 },
  { w: "ROSTER", c: "The full list of players on a team", cat: "sports", diff: 2 },
  { w: "TIMEOUT", c: "A brief pause called during play", cat: "sports", diff: 1 },
  { w: "OVERTIME", c: "Extra playing time after a tie", cat: "sports", diff: 1 },
  { w: "PENALTY", c: "A punishment for breaking the rules of play", cat: "sports", diff: 1 },
  { w: "FOUL", c: "A rule violation during play", cat: "sports", diff: 1 },
  { w: "SCOREBOARD", c: "Display showing the current score", cat: "sports", diff: 1 },
  { w: "JERSEY", c: "A team's uniform shirt", cat: "sports", diff: 1 },
  { w: "HELMET", c: "Protective headgear worn in contact sports", cat: "sports", diff: 1 },
  { w: "WHISTLE", c: "What a referee blows to stop play", cat: "sports", diff: 1 },

  // ---- science (batch 2) ----
  { w: "GRAVITY", c: "Force pulling objects toward each other", cat: "science", diff: 1 },
  { w: "FRICTION", c: "Force that resists sliding motion", cat: "science", diff: 2 },
  { w: "VELOCITY", c: "Speed in a given direction", cat: "science", diff: 2 },
  { w: "MOMENTUM", c: "Mass in motion", cat: "science", diff: 2 },
  { w: "DENSITY", c: "Mass packed into a given volume", cat: "science", diff: 2 },
  { w: "PRESSURE", c: "Force applied over an area", cat: "science", diff: 2 },
  { w: "ELEMENT", c: "A substance made of only one type of atom", cat: "science", diff: 1 },
  { w: "ISOTOPE", c: "A variant of an element with a different neutron count", cat: "science", diff: 3 },
  { w: "CATALYST", c: "A substance that speeds a reaction without being used up", cat: "science", diff: 3 },
  { w: "SOLUTION", c: "A mixture where one substance dissolves in another", cat: "science", diff: 2 },
  { w: "COMPOUND", c: "A substance formed from two or more elements", cat: "science", diff: 2 },
  { w: "NUCLEUS", c: "The dense center of an atom or a cell", cat: "science", diff: 2 },
  { w: "CHROMOSOME", c: "A structure carrying an organism's genes", cat: "science", diff: 3 },
  { w: "PHOTOSYNTHESIS", c: "Process plants use to turn sunlight into energy", cat: "science", diff: 2 },
  { w: "EVOLUTION", c: "Gradual change in species over generations", cat: "science", diff: 2 },
  { w: "ECOSYSTEM", c: "A community of organisms and their environment", cat: "science", diff: 2 },
  { w: "PREDATOR", c: "An animal that hunts others for food", cat: "science", diff: 1 },
  { w: "CAMOUFLAGE", c: "Coloring that helps an animal blend in", cat: "science", diff: 1 },
  { w: "HIBERNATE", c: "Spend winter in a dormant, low-energy state", cat: "science", diff: 2 },
  { w: "METAMORPHOSIS", c: "Dramatic change in form, like caterpillar to butterfly", cat: "science", diff: 2 },
  { w: "ASTEROID", c: "A rocky body orbiting the sun, smaller than a planet", cat: "science", diff: 1 },
  { w: "METEOR", c: "A \"shooting star\" burning up in the atmosphere", cat: "science", diff: 1 },
  { w: "NEBULA", c: "A cloud of gas and dust in space", cat: "science", diff: 2 },
  { w: "SATELLITE", c: "An object orbiting a planet or star", cat: "science", diff: 1 },
  { w: "GRAVITYWELL", c: "The dip a massive object creates in spacetime", cat: "science", diff: 3 },
  { w: "THERMOMETER", c: "Instrument for measuring temperature", cat: "science", diff: 1 },
  { w: "BAROMETER", c: "Instrument for measuring air pressure", cat: "science", diff: 3 },

  // ---- food (batch 2) ----
  { w: "LASAGNA", c: "Layered baked pasta dish", cat: "food", diff: 2 },
  { w: "BURRITO", c: "Rolled tortilla stuffed with fillings", cat: "food", diff: 1 },
  { w: "QUESADILLA", c: "Grilled, folded tortilla with melted cheese", cat: "food", diff: 2 },
  { w: "FALAFEL", c: "Fried chickpea patty popular in the Middle East", cat: "food", diff: 3 },
  { w: "HUMMUS", c: "Chickpea and tahini dip", cat: "food", diff: 2 },
  { w: "GUACAMOLE", c: "Mashed avocado dip", cat: "food", diff: 1 },
  { w: "SALSA", c: "Chunky tomato-based dip or sauce", cat: "food", diff: 1 },
  { w: "PESTO", c: "Sauce made from basil, pine nuts, and oil", cat: "food", diff: 2 },
  { w: "MARINARA", c: "Simple tomato-based pasta sauce", cat: "food", diff: 2 },
  { w: "ALFREDO", c: "Creamy white pasta sauce", cat: "food", diff: 2 },
  { w: "TERIYAKI", c: "Sweet soy-based Japanese glaze", cat: "food", diff: 2 },
  { w: "WASABI", c: "Sharp green Japanese condiment", cat: "food", diff: 2 },
  { w: "TOFU", c: "Soybean curd used as a meat substitute", cat: "food", diff: 1 },
  { w: "QUINOA", c: "Protein-rich grain-like seed", cat: "food", diff: 2 },
  { w: "OATMEAL", c: "Warm breakfast porridge made from oats", cat: "food", diff: 1 },
  { w: "GRANOLA", c: "Crunchy oat-and-honey breakfast mix", cat: "food", diff: 1 },
  { w: "SMOOTHIE", c: "Blended fruit drink", cat: "food", diff: 1 },
  { w: "MILKSHAKE", c: "Blended ice cream drink", cat: "food", diff: 1 },
  { w: "LEMONADE", c: "Classic sweet-and-tart summer drink", cat: "food", diff: 1 },
  { w: "ESPRESSO", c: "Strong, concentrated shot of coffee", cat: "food", diff: 2 },
  { w: "LATTE", c: "Espresso with steamed milk", cat: "food", diff: 1 },
  { w: "BISCUIT", c: "Soft, flaky quick bread", cat: "food", diff: 1 },
  { w: "MUFFIN", c: "Single-serving quick bread, often with fruit", cat: "food", diff: 1 },
  { w: "DONUT", c: "Fried, ring-shaped sweet treat", cat: "food", diff: 1 },
  { w: "BROWNIE", c: "Dense, fudgy chocolate baked square", cat: "food", diff: 1 },
  { w: "SORBET", c: "Frozen fruit dessert without dairy", cat: "food", diff: 2 },
  { w: "MERINGUE", c: "Crisp dessert made from whipped egg whites and sugar", cat: "food", diff: 3 },
  { w: "TRUFFLE", c: "Rich chocolate confection, or a prized underground fungus", cat: "food", diff: 3 },

  // ---- kids (batch 2) ----
  { w: "BALLOON", c: "Inflatable float at a birthday party", cat: "kids", diff: 1 },
  { w: "CONFETTI", c: "Small paper bits tossed to celebrate", cat: "kids", diff: 1 },
  { w: "PRESENT", c: "A wrapped birthday or holiday gift", cat: "kids", diff: 1 },
  { w: "CANDLE", c: "What you blow out on a birthday cake", cat: "kids", diff: 1 },
  { w: "LULLABY", c: "A soft song sung to help a baby sleep", cat: "kids", diff: 2 },
  { w: "BLANKET", c: "Cozy cover for bedtime", cat: "kids", diff: 1 },
  { w: "PILLOW", c: "Soft cushion for your head", cat: "kids", diff: 1 },
  { w: "CRAYONS", c: "A box of waxy coloring sticks", cat: "kids", diff: 1 },
  { w: "STICKER", c: "A small adhesive picture", cat: "kids", diff: 1 },
  { w: "SEESAW", c: "Playground plank that tips up and down", cat: "kids", diff: 1 },
  { w: "TRAMPOLINE", c: "Bouncy mesh you jump on", cat: "kids", diff: 1 },
  { w: "SANDCASTLE", c: "A beach structure built with a bucket and shovel", cat: "kids", diff: 1 },
  { w: "KITE", c: "A flying toy on a string", cat: "kids", diff: 1 },
  { w: "MARBLES", c: "Small glass balls used in a classic game", cat: "kids", diff: 1 },
  { w: "PUPPET", c: "A hand-operated toy character", cat: "kids", diff: 1 },
  { w: "TRICYCLE", c: "A three-wheeled ride for a small child", cat: "kids", diff: 1 },
  { w: "SCOOTER", c: "A two-wheeled ride you push with one foot", cat: "kids", diff: 1 },
  { w: "TREEHOUSE", c: "A play structure built up in the branches", cat: "kids", diff: 1 },
  { w: "FAIRY", c: "A tiny, magical winged creature", cat: "kids", diff: 1 },
  { w: "GOBLIN", c: "A mischievous fairy-tale creature", cat: "kids", diff: 1 },
  { w: "GIANT", c: "An enormous fairy-tale creature", cat: "kids", diff: 1 },
  { w: "TREASURE", c: "What a pirate buries and digs up", cat: "kids", diff: 1 },
  { w: "COMPASS", c: "What a pirate uses to find treasure", cat: "kids", diff: 1 },
  { w: "CASTLE", c: "Where a knight might live", cat: "kids", diff: 1 },
  { w: "CAPE", c: "What a superhero wears while flying", cat: "kids", diff: 1 },
  { w: "MASK", c: "What a superhero wears to hide their identity", cat: "kids", diff: 1 },

  // ---- general (batch 2, extra short/medium fill words for tighter grids) ----
  { w: "ARROW", c: "Pointed shaft shot from a bow", cat: "general", diff: 1 },
  { w: "SHIELD", c: "Protective barrier held up in defense", cat: "general", diff: 1 },
  { w: "MIRAGE", c: "An illusion caused by heat and light", cat: "general", diff: 2 },
  { w: "ECHO", c: "Repeated sound bouncing off a surface", cat: "general", diff: 1 },
  { w: "SHADOW", c: "Dark shape cast by blocked light", cat: "general", diff: 1 },
  { w: "RIPPLE", c: "A small wave spreading outward", cat: "general", diff: 1 },
  { w: "BREEZE", c: "A gentle wind", cat: "general", diff: 1 },
  { w: "FLAME", c: "The visible part of a fire", cat: "general", diff: 1 },
  { w: "EMBER", c: "A glowing piece of coal or wood", cat: "general", diff: 2 },
  { w: "SPARK", c: "A tiny flash of fire or electricity", cat: "general", diff: 1 },
  { w: "FROST", c: "A thin layer of ice crystals", cat: "general", diff: 1 },
  { w: "PUDDLE", c: "A small pool of water after rain", cat: "general", diff: 1 },
  { w: "MEADOW", c: "An open grassy field", cat: "general", diff: 1 },
  { w: "ORCHARD", c: "A cultivated area of fruit trees", cat: "general", diff: 2 },
  { w: "HARVEST", c: "The gathering of ripe crops", cat: "general", diff: 1 },
  { w: "COMPASS", c: "A tool used to find direction", cat: "general", diff: 1 },
  { w: "LANTERN", c: "A portable light in a case", cat: "general", diff: 1 },
  { w: "CANDLE", c: "A wax stick with a burning wick", cat: "general", diff: 1 },
  { w: "MELODY", c: "A pleasing sequence of musical notes", cat: "general", diff: 1 },
  { w: "RHYTHM", c: "A repeated pattern of beats", cat: "general", diff: 1 },
  { w: "WHISTLE", c: "A high-pitched sound made by blowing air", cat: "general", diff: 1 },
  { w: "PUZZLE", c: "A problem designed to test cleverness", cat: "general", diff: 1 },
  { w: "RIDDLE", c: "A clever question with a tricky answer", cat: "general", diff: 1 },
  { w: "MYSTERY", c: "Something unexplained or puzzling", cat: "general", diff: 1 },
  { w: "ADVENTURE", c: "An exciting or daring journey", cat: "general", diff: 1 },
  { w: "COURAGE", c: "The strength to face fear", cat: "general", diff: 1 },
  { w: "PATIENCE", c: "The ability to wait calmly", cat: "general", diff: 2 },
  { w: "HONESTY", c: "The quality of telling the truth", cat: "general", diff: 2 },
  { w: "KINDNESS", c: "The quality of being gentle and caring", cat: "general", diff: 1 },
  { w: "AGO", c: "In the past", cat: "general", diff: 1 },
  { w: "END", c: "The final part of something", cat: "general", diff: 1 },
  { w: "TOP", c: "The highest point", cat: "general", diff: 1 },
  { w: "OLD", c: "Not young or new", cat: "general", diff: 1 },
  { w: "NEW", c: "Recently made or begun", cat: "general", diff: 1 },
  { w: "BIG", c: "Large in size", cat: "general", diff: 1 },
  { w: "RUN", c: "Move quickly on foot", cat: "general", diff: 1 },
  { w: "JOG", c: "Run at a steady, gentle pace", cat: "general", diff: 1 },
  { w: "HOP", c: "Jump on one or both feet", cat: "general", diff: 1 },
  { w: "SIT", c: "Rest on a chair or the ground", cat: "general", diff: 1 },
  { w: "NAP", c: "A short daytime sleep", cat: "general", diff: 1 },
  { w: "FAN", c: "A device that moves air, or an enthusiastic supporter", cat: "general", diff: 1 },
  { w: "JAR", c: "A glass container with a lid", cat: "general", diff: 1 },
  { w: "LID", c: "A cover for a container", cat: "general", diff: 1 },
  { w: "TIN", c: "A small metal container", cat: "general", diff: 1 },
  { w: "WEB", c: "What a spider spins", cat: "general", diff: 1 },
  { w: "NET", c: "Woven mesh used to catch things", cat: "general", diff: 1 },
  { w: "ROPE", c: "Thick, twisted cord", cat: "general", diff: 1 },
  { w: "KNOT", c: "A fastening made by looping rope or string", cat: "general", diff: 1 },
  { w: "NAIL", c: "A thin metal spike hammered into wood", cat: "general", diff: 1 },
  { w: "SAW", c: "Tool used to cut wood", cat: "general", diff: 1 },
  { w: "AXE", c: "Tool with a blade for chopping wood", cat: "general", diff: 1 },

  // ---- batch 3: short words (3-5 letters), weighted toward filling out
  // Mini puzzles, which can only draw from words <= 5 letters long ----

  // geography (short)
  { w: "PERU", c: "Andes nation with Machu Picchu", cat: "geography", diff: 2 },
  { w: "CHAD", c: "Landlocked African country", cat: "geography", diff: 3 },
  { w: "MALI", c: "West African country, once home to Timbuktu", cat: "geography", diff: 3 },
  { w: "CUBA", c: "Island nation south of Florida", cat: "geography", diff: 1 },
  { w: "OMAN", c: "Gulf nation on the Arabian Peninsula", cat: "geography", diff: 3 },
  { w: "LAOS", c: "Southeast Asian country bordering Thailand", cat: "geography", diff: 3 },
  { w: "FIJI", c: "South Pacific island nation", cat: "geography", diff: 2 },
  { w: "ALPS", c: "Mountains spanning several European countries", cat: "geography", diff: 1 },
  { w: "ANDES", c: "The world's longest mountain range", cat: "geography", diff: 2 },
  { w: "COAST", c: "Land bordering the sea", cat: "geography", diff: 1 },
  { w: "SHORE", c: "The edge of a body of water", cat: "geography", diff: 1 },
  { w: "CLIFF", c: "A steep rock face", cat: "geography", diff: 1 },
  { w: "VALLEY", c: "Low land between hills", cat: "geography", diff: 1 },
  { w: "HILL", c: "A small, rounded elevation of land", cat: "geography", diff: 1 },
  { w: "CREEK", c: "A small stream", cat: "geography", diff: 1 },
  { w: "POND", c: "A small body of still water", cat: "geography", diff: 1 },
  { w: "BAY", c: "A body of water partly enclosed by land", cat: "geography", diff: 1 },
  { w: "CAPE", c: "A pointed piece of land jutting into the sea", cat: "geography", diff: 2 },
  { w: "TOWN", c: "Smaller than a city", cat: "geography", diff: 1 },
  { w: "STATE", c: "A political division within a country", cat: "geography", diff: 1 },
  { w: "ATLAS", c: "A book of maps", cat: "geography", diff: 1 },

  // movies (short)
  { w: "UP", c: "Pixar film that opens with a wordless love story", cat: "movies", diff: 1 },
  { w: "CARS", c: "Pixar film set in Radiator Springs", cat: "movies", diff: 1 },
  { w: "RIO", c: "Animated film about a rare blue macaw", cat: "movies", diff: 1 },
  { w: "HERO", c: "The protagonist of a story", cat: "movies", diff: 1 },
  { w: "STAR", c: "A famous, celebrated actor", cat: "movies", diff: 1 },
  { w: "ROLE", c: "A part played by an actor", cat: "movies", diff: 1 },
  { w: "LINE", c: "A piece of scripted dialogue", cat: "movies", diff: 1 },
  { w: "TAKE", c: "One filmed attempt at a scene", cat: "movies", diff: 2 },
  { w: "SCENE", c: "A single continuous piece of a film's action", cat: "movies", diff: 1 },
  { w: "SCORE", c: "The orchestral music behind a film", cat: "movies", diff: 2 },
  { w: "PROP", c: "An object used by actors on set", cat: "movies", diff: 2 },
  { w: "EXTRA", c: "A background actor with no lines", cat: "movies", diff: 2 },
  { w: "AWARD", c: "A prize like an Oscar", cat: "movies", diff: 1 },
  { w: "REVIEW", c: "A critic's write-up of a film", cat: "movies", diff: 1 },
  { w: "TICKET", c: "What you buy to see a movie", cat: "movies", diff: 1 },
  { w: "SCREEN", c: "What a film is projected onto", cat: "movies", diff: 1 },
  { w: "REEL", c: "A spool of film footage", cat: "movies", diff: 2 },
  { w: "CREDITS", c: "The scrolling names at a film's end", cat: "movies", diff: 1 },

  // history (short)
  { w: "ERA", c: "A distinct period of time in history", cat: "history", diff: 1 },
  { w: "AGE", c: "A historical era, like the Bronze one", cat: "history", diff: 1 },
  { w: "WAR", c: "Armed conflict between nations", cat: "history", diff: 1 },
  { w: "FORT", c: "A fortified military post", cat: "history", diff: 1 },
  { w: "KING", c: "A male monarch", cat: "history", diff: 1 },
  { w: "QUEEN", c: "A female monarch", cat: "history", diff: 1 },
  { w: "DUKE", c: "A high-ranking noble title", cat: "history", diff: 2 },
  { w: "REIGN", c: "A monarch's period of rule", cat: "history", diff: 2 },
  { w: "REALM", c: "A kingdom or domain", cat: "history", diff: 2 },
  { w: "TRIBE", c: "A group united by ancestry or culture", cat: "history", diff: 1 },
  { w: "CLAN", c: "A close-knit group of families", cat: "history", diff: 2 },
  { w: "TOMB", c: "A burial chamber", cat: "history", diff: 1 },
  { w: "URN", c: "A vessel for ashes or ancient storage", cat: "history", diff: 2 },
  { w: "COIN", c: "Ancient (or modern) metal currency", cat: "history", diff: 1 },
  { w: "MAP", c: "What early explorers drew as they traveled", cat: "history", diff: 1 },
  { w: "SHIP", c: "Vessel used by early explorers", cat: "history", diff: 1 },
  { w: "FLAG", c: "A symbol claimed by explorers and nations alike", cat: "history", diff: 1 },
  { w: "TREATY", c: "A signed agreement ending a conflict", cat: "history", diff: 2 },

  // sports (short)
  { w: "GOAL", c: "A score in soccer or hockey", cat: "sports", diff: 1 },
  { w: "TEAM", c: "A group competing together in sports", cat: "sports", diff: 1 },
  { w: "BALL", c: "Round object used in most sports", cat: "sports", diff: 1 },
  { w: "BAT", c: "What a batter swings in baseball", cat: "sports", diff: 1 },
  { w: "NET", c: "What a ball goes into to score", cat: "sports", diff: 1 },
  { w: "GYM", c: "Where indoor sports are played", cat: "sports", diff: 1 },
  { w: "LAP", c: "One trip around a track", cat: "sports", diff: 1 },
  { w: "RACE", c: "A competition of speed", cat: "sports", diff: 1 },
  { w: "WIN", c: "To come out on top", cat: "sports", diff: 1 },
  { w: "TIE", c: "A game with no winner", cat: "sports", diff: 1 },
  { w: "PAR", c: "The expected score on a golf hole", cat: "sports", diff: 2 },
  { w: "PUTT", c: "A gentle golf stroke on the green", cat: "sports", diff: 2 },
  { w: "SPIKE", c: "A hard downward hit in volleyball", cat: "sports", diff: 2 },
  { w: "SERVE", c: "The shot that starts a point in tennis", cat: "sports", diff: 1 },
  { w: "COURT", c: "Where basketball or tennis is played", cat: "sports", diff: 1 },
  { w: "FIELD", c: "Where soccer or football is played", cat: "sports", diff: 1 },
  { w: "TRACK", c: "Where runners race", cat: "sports", diff: 1 },
  { w: "RINK", c: "Where hockey is played", cat: "sports", diff: 1 },
  { w: "POOL", c: "Where swimming races happen", cat: "sports", diff: 1 },
  { w: "RELAY", c: "A race run in team stages", cat: "sports", diff: 2 },

  // science (short)
  { w: "GAS", c: "A state of matter with no fixed shape", cat: "science", diff: 1 },
  { w: "ION", c: "A charged atom or molecule", cat: "science", diff: 3 },
  { w: "CELL", c: "The basic unit of life", cat: "science", diff: 1 },
  { w: "GENE", c: "A unit of heredity", cat: "science", diff: 2 },
  { w: "DNA", c: "The molecule that carries genetic code", cat: "science", diff: 1 },
  { w: "LAB", c: "Where experiments are conducted", cat: "science", diff: 1 },
  { w: "MASS", c: "The amount of matter in an object", cat: "science", diff: 2 },
  { w: "FORCE", c: "A push or pull on an object", cat: "science", diff: 1 },
  { w: "HEAT", c: "Thermal energy transferred between objects", cat: "science", diff: 1 },
  { w: "ACID", c: "A substance with a low pH", cat: "science", diff: 2 },
  { w: "BASE", c: "A substance with a high pH", cat: "science", diff: 2 },
  { w: "SOLID", c: "A state of matter with a fixed shape", cat: "science", diff: 1 },
  { w: "LIQUID", c: "A state of matter that takes the shape of its container", cat: "science", diff: 1 },
  { w: "VAPOR", c: "A gas formed from an evaporated liquid", cat: "science", diff: 2 },
  { w: "ORBIT", c: "The curved path of a planet or satellite", cat: "science", diff: 1 },
  { w: "STAR", c: "A massive glowing ball of plasma", cat: "science", diff: 1 },
  { w: "MOON", c: "A natural satellite", cat: "science", diff: 1 },
  { w: "SPECIES", c: "A distinct kind of organism", cat: "science", diff: 2 },
  { w: "VENOM", c: "Toxin injected by a bite or sting", cat: "science", diff: 2 },
  { w: "PROBE", c: "An unmanned spacecraft sent to explore", cat: "science", diff: 2 },

  // food (short)
  { w: "PIE", c: "Baked dessert with a crust", cat: "food", diff: 1 },
  { w: "JAM", c: "Fruit spread for toast", cat: "food", diff: 1 },
  { w: "HAM", c: "Cured pork, common on sandwiches", cat: "food", diff: 1 },
  { w: "RIB", c: "A cut of meat eaten off the bone", cat: "food", diff: 2 },
  { w: "SOUP", c: "A warm liquid meal", cat: "food", diff: 1 },
  { w: "STEW", c: "A thick, slow-cooked meal", cat: "food", diff: 1 },
  { w: "RICE", c: "A staple grain served worldwide", cat: "food", diff: 1 },
  { w: "BEAN", c: "A small, protein-rich legume", cat: "food", diff: 1 },
  { w: "CORN", c: "A golden kernel-covered vegetable", cat: "food", diff: 1 },
  { w: "PEAR", c: "A sweet, teardrop-shaped fruit", cat: "food", diff: 1 },
  { w: "PLUM", c: "A small purple stone fruit", cat: "food", diff: 1 },
  { w: "LIME", c: "A small green citrus fruit", cat: "food", diff: 1 },
  { w: "MELON", c: "A large, sweet summer fruit", cat: "food", diff: 1 },
  { w: "OLIVE", c: "A small fruit pressed for oil", cat: "food", diff: 1 },
  { w: "SALT", c: "The most common seasoning", cat: "food", diff: 1 },
  { w: "SUGAR", c: "The most common sweetener", cat: "food", diff: 1 },
  { w: "HONEY", c: "A sweetener made by bees", cat: "food", diff: 1 },
  { w: "SYRUP", c: "A sweet, sticky liquid poured on pancakes", cat: "food", diff: 1 },
  { w: "TOAST", c: "Browned, crisped bread", cat: "food", diff: 1 },
  { w: "STEAK", c: "A thick cut of beef", cat: "food", diff: 1 },
  { w: "GRAVY", c: "A savory sauce made from meat drippings", cat: "food", diff: 2 },
  { w: "CRUST", c: "The outer layer of bread or pie", cat: "food", diff: 1 },
  { w: "DOUGH", c: "Unbaked bread mixture", cat: "food", diff: 1 },
  { w: "YEAST", c: "What makes bread rise", cat: "food", diff: 2 },

  // kids (short)
  { w: "TOY", c: "Something a child plays with", cat: "kids", diff: 1 },
  { w: "DOLL", c: "A toy shaped like a person", cat: "kids", diff: 1 },
  { w: "BALL", c: "A round toy that bounces or rolls", cat: "kids", diff: 1 },
  { w: "SLED", c: "What you ride down a snowy hill on", cat: "kids", diff: 1 },
  { w: "SWAN", c: "A graceful white bird in fairy tales", cat: "kids", diff: 2 },
  { w: "FROG", c: "A hopping amphibian that might turn into a prince", cat: "kids", diff: 1 },
  { w: "TOAD", c: "A bumpy-skinned cousin of the frog", cat: "kids", diff: 2 },
  { w: "BEAR", c: "A cuddly stuffed animal, or a wild one", cat: "kids", diff: 1 },
  { w: "LION", c: "The king of the jungle in cartoons", cat: "kids", diff: 1 },
  { w: "TIGER", c: "A big striped cat", cat: "kids", diff: 1 },
  { w: "ZEBRA", c: "A striped African animal", cat: "kids", diff: 1 },
  { w: "PANDA", c: "A black-and-white bear that eats bamboo", cat: "kids", diff: 1 },
  { w: "KOALA", c: "A sleepy Australian tree-dweller", cat: "kids", diff: 1 },
  { w: "MONKEY", c: "A playful, tree-climbing primate", cat: "kids", diff: 1 },
  { w: "ELF", c: "A pointy-eared holiday helper", cat: "kids", diff: 1 },
  { w: "ELVES", c: "Santa's little helpers, plural", cat: "kids", diff: 1 },
  { w: "SANTA", c: "Who delivers presents on Christmas Eve", cat: "kids", diff: 1 },
  { w: "SLEIGH", c: "Santa's flying ride", cat: "kids", diff: 1 },

  // general (short, more fill words for tight intersections)
  { w: "OWE", c: "Be in debt for", cat: "general", diff: 1 },
  { w: "ODD", c: "Strange, or not evenly divisible by two", cat: "general", diff: 1 },
  { w: "EVEN", c: "Divisible by two, or level", cat: "general", diff: 1 },
  { w: "TRUE", c: "Correct, or not false", cat: "general", diff: 1 },
  { w: "REAL", c: "Actually existing, not fake", cat: "general", diff: 1 },
  { w: "FAKE", c: "Not genuine", cat: "general", diff: 1 },
  { w: "PURE", c: "Not mixed with anything else", cat: "general", diff: 1 },
  { w: "RARE", c: "Not commonly found", cat: "general", diff: 1 },
  { w: "VAST", c: "Extremely large in area", cat: "general", diff: 2 },
  { w: "DEEP", c: "Extending far down", cat: "general", diff: 1 },
  { w: "TALL", c: "Great in height", cat: "general", diff: 1 },
  { w: "WIDE", c: "Great in width", cat: "general", diff: 1 },
  { w: "THIN", c: "Not thick", cat: "general", diff: 1 },
  { w: "SOFT", c: "Not hard to the touch", cat: "general", diff: 1 },
  { w: "HARD", c: "Not soft, or difficult", cat: "general", diff: 1 },
  { w: "WARM", c: "Comfortably hot", cat: "general", diff: 1 },
  { w: "COOL", c: "Mildly cold, or impressively stylish", cat: "general", diff: 1 },
  { w: "DRY", c: "Not wet", cat: "general", diff: 1 },
  { w: "WET", c: "Not dry", cat: "general", diff: 1 },
  { w: "LOUD", c: "Not quiet", cat: "general", diff: 1 },
  { w: "QUIET", c: "Not loud", cat: "general", diff: 1 },
  { w: "FAST", c: "Quick in speed", cat: "general", diff: 1 },
  { w: "SLOW", c: "Not fast", cat: "general", diff: 1 },
  { w: "EASY", c: "Not difficult", cat: "general", diff: 1 },
  { w: "SAFE", c: "Free from danger", cat: "general", diff: 1 },
  { w: "BOLD", c: "Confident and daring", cat: "general", diff: 2 },
  { w: "CALM", c: "Free from disturbance", cat: "general", diff: 1 },
  { w: "WILD", c: "Not tame", cat: "general", diff: 1 },
  { w: "FREE", c: "Not costing anything, or not confined", cat: "general", diff: 1 },
  { w: "OPEN", c: "Not closed", cat: "general", diff: 1 },
  { w: "SHUT", c: "Closed firmly", cat: "general", diff: 1 },
  { w: "FULL", c: "Holding as much as possible", cat: "general", diff: 1 },
  { w: "EMPTY", c: "Containing nothing", cat: "general", diff: 1 },
  { w: "CLEAN", c: "Free from dirt", cat: "general", diff: 1 },
  { w: "DIRTY", c: "Covered in grime", cat: "general", diff: 1 },
  { w: "SHARP", c: "Having a fine cutting edge", cat: "general", diff: 1 },
  { w: "DULL", c: "Not sharp, or not interesting", cat: "general", diff: 1 },
  { w: "BRIGHT", c: "Full of light, or very clever", cat: "general", diff: 1 },
  { w: "DARK", c: "Lacking light", cat: "general", diff: 1 },
  { w: "PLAIN", c: "Simple, without decoration", cat: "general", diff: 1 },
  { w: "FANCY", c: "Elaborate or elegant", cat: "general", diff: 1 },
  { w: "GRAND", c: "Impressively large or important", cat: "general", diff: 2 },
  { w: "PROUD", c: "Feeling deep satisfaction in an achievement", cat: "general", diff: 1 },
  { w: "EAGER", c: "Keenly wanting to do something", cat: "general", diff: 2 },
  { w: "SHY", c: "Nervous around others", cat: "general", diff: 1 },
  { w: "BRAVE", c: "Ready to face danger", cat: "general", diff: 1 },
  { w: "WISE", c: "Having good judgment", cat: "general", diff: 1 },
  { w: "KEEN", c: "Sharp, eager, or perceptive", cat: "general", diff: 2 },
  { w: "NEAT", c: "Tidy and orderly", cat: "general", diff: 1 },
  { w: "TIDY", c: "Arranged neatly", cat: "general", diff: 1 },

  // ===========================================================================
  // Batch 4 — doubling the corpus. Same rules as before: hand-authored,
  // original clues, no published-crossword content.
  // ===========================================================================

  // ---- geography (batch 4) ----
  { w: "PORTUGAL", c: "Iberian country on the Atlantic", cat: "geography", diff: 2 },
  { w: "MOROCCO", c: "North African country famous for Marrakech", cat: "geography", diff: 2 },
  { w: "ARGENTINA", c: "South American country known for tango", cat: "geography", diff: 2 },
  { w: "COLOMBIA", c: "South American country known for coffee", cat: "geography", diff: 2 },
  { w: "VENEZUELA", c: "South American country on the Caribbean coast", cat: "geography", diff: 3 },
  { w: "ECUADOR", c: "Country named for the line it straddles", cat: "geography", diff: 2 },
  { w: "PARAGUAY", c: "Landlocked South American country", cat: "geography", diff: 3 },
  { w: "URUGUAY", c: "Small South American country between Brazil and Argentina", cat: "geography", diff: 3 },
  { w: "INDONESIA", c: "Southeast Asian archipelago nation", cat: "geography", diff: 2 },
  { w: "MALAYSIA", c: "Southeast Asian country split by the South China Sea", cat: "geography", diff: 2 },
  { w: "VIETNAM", c: "Southeast Asian country shaped like an S", cat: "geography", diff: 2 },
  { w: "CAMBODIA", c: "Home of the temple complex Angkor Wat", cat: "geography", diff: 2 },
  { w: "MONGOLIA", c: "Vast, sparsely populated country between Russia and China", cat: "geography", diff: 3 },
  { w: "PAKISTAN", c: "South Asian country bordering India", cat: "geography", diff: 2 },
  { w: "BANGLADESH", c: "Densely populated South Asian delta nation", cat: "geography", diff: 3 },
  { w: "AFGHANISTAN", c: "Mountainous, landlocked Central Asian country", cat: "geography", diff: 3 },
  { w: "TURKEY", c: "Country spanning Europe and Asia", cat: "geography", diff: 1 },
  { w: "ISRAEL", c: "Country on the eastern Mediterranean coast", cat: "geography", diff: 2 },
  { w: "JORDAN", c: "Middle Eastern country home to Petra", cat: "geography", diff: 2 },
  { w: "LEBANON", c: "Small Mediterranean country north of Israel", cat: "geography", diff: 3 },
  { w: "NIGERIA", c: "Africa's most populous country", cat: "geography", diff: 2 },
  { w: "ETHIOPIA", c: "East African country never colonized", cat: "geography", diff: 3 },
  { w: "GHANA", c: "West African country, formerly the Gold Coast", cat: "geography", diff: 3 },
  { w: "ZIMBABWE", c: "Southern African country with Victoria Falls", cat: "geography", diff: 3 },
  { w: "TANZANIA", c: "East African country home to Kilimanjaro", cat: "geography", diff: 2 },
  { w: "UGANDA", c: "East African country known as the \"Pearl of Africa\"", cat: "geography", diff: 3 },
  { w: "SENEGAL", c: "Westernmost country in mainland Africa", cat: "geography", diff: 3 },
  { w: "ALGERIA", c: "Largest country in Africa by area", cat: "geography", diff: 3 },
  { w: "LIBYA", c: "North African country between Egypt and Tunisia", cat: "geography", diff: 3 },
  { w: "TUNISIA", c: "Small North African country, birthplace of the Arab Spring", cat: "geography", diff: 3 },
  { w: "POLAND", c: "Central European country between Germany and Belarus", cat: "geography", diff: 1 },
  { w: "HUNGARY", c: "Central European country whose capital is Budapest", cat: "geography", diff: 2 },
  { w: "ROMANIA", c: "Eastern European country home to Transylvania", cat: "geography", diff: 2 },
  { w: "BULGARIA", c: "Balkan country on the Black Sea", cat: "geography", diff: 3 },
  { w: "CROATIA", c: "Balkan country famous for its Adriatic coastline", cat: "geography", diff: 2 },
  { w: "SERBIA", c: "Balkan country whose capital is Belgrade", cat: "geography", diff: 3 },
  { w: "SLOVAKIA", c: "Central European country that split from the Czechs", cat: "geography", diff: 3 },
  { w: "UKRAINE", c: "Eastern European country on the Black Sea", cat: "geography", diff: 1 },
  { w: "BELARUS", c: "Eastern European country bordering Poland and Russia", cat: "geography", diff: 3 },
  { w: "LATVIA", c: "Baltic country between Estonia and Lithuania", cat: "geography", diff: 3 },
  { w: "LITHUANIA", c: "Southernmost of the Baltic states", cat: "geography", diff: 3 },
  { w: "ESTONIA", c: "Northernmost of the Baltic states", cat: "geography", diff: 3 },
  { w: "SWEDEN", c: "Scandinavian country known for flat-pack furniture", cat: "geography", diff: 1 },
  { w: "NORWAY", c: "Scandinavian country famous for its fjords", cat: "geography", diff: 1 },
  { w: "DENMARK", c: "Scandinavian country connected to Sweden by a bridge", cat: "geography", diff: 2 },
  { w: "BELGIUM", c: "Small country famous for waffles and chocolate", cat: "geography", diff: 2 },
  { w: "AUSTRIA", c: "Alpine country whose capital is Vienna", cat: "geography", diff: 2 },
  { w: "SWITZERLAND", c: "Alpine country famous for neutrality and watches", cat: "geography", diff: 2 },
  { w: "IRELAND", c: "Emerald Isle west of Great Britain", cat: "geography", diff: 1 },
  { w: "SCOTLAND", c: "Northern part of Great Britain, famous for kilts", cat: "geography", diff: 1 },
  { w: "WALES", c: "Country west of England, famous for dragons on its flag", cat: "geography", diff: 2 },
  { w: "NEWZEALAND", c: "Pacific island nation known for kiwis", cat: "geography", diff: 2 },
  { w: "PHILIPPINES", c: "Southeast Asian archipelago of over 7,000 islands", cat: "geography", diff: 2 },
  { w: "TAIWAN", c: "Island nation off the coast of mainland China", cat: "geography", diff: 2 },
  { w: "SINGAPORE", c: "Tiny but wealthy island city-state in Southeast Asia", cat: "geography", diff: 2 },
  { w: "QATAR", c: "Wealthy peninsula nation on the Persian Gulf", cat: "geography", diff: 3 },
  { w: "YEMEN", c: "Country at the southern tip of the Arabian Peninsula", cat: "geography", diff: 3 },
  { w: "SYRIA", c: "Middle Eastern country bordering Turkey and Iraq", cat: "geography", diff: 2 },
  { w: "IRAQ", c: "Middle Eastern country between the Tigris and Euphrates", cat: "geography", diff: 2 },
  { w: "IRAN", c: "Middle Eastern country formerly known as Persia", cat: "geography", diff: 2 },
  { w: "CONGO", c: "River and country in central Africa", cat: "geography", diff: 2 },
  { w: "ZAMBIA", c: "Southern African country home to Victoria Falls' other side", cat: "geography", diff: 3 },
  { w: "NAMIBIA", c: "Southern African country with the Namib Desert", cat: "geography", diff: 3 },
  { w: "BOTSWANA", c: "Southern African country known for the Okavango Delta", cat: "geography", diff: 3 },
  { w: "MADAGASCAR", c: "Large island nation off Africa's east coast", cat: "geography", diff: 2 },
  { w: "CYPRUS", c: "Mediterranean island nation south of Turkey", cat: "geography", diff: 3 },
  { w: "MALTA", c: "Tiny Mediterranean island nation south of Sicily", cat: "geography", diff: 3 },
  { w: "MOUNTAIN", c: "A large natural elevation of the Earth's surface", cat: "geography", diff: 1 },
  { w: "SUMMIT", c: "The highest point of a mountain", cat: "geography", diff: 2 },
  { w: "RIDGE", c: "A long, narrow elevated landform", cat: "geography", diff: 2 },
  { w: "BASIN", c: "A low-lying area drained by a river system", cat: "geography", diff: 2 },
  { w: "ESTUARY", c: "Where a river meets the tidal sea", cat: "geography", diff: 3 },
  { w: "LAGOON", c: "A shallow body of water separated from the sea", cat: "geography", diff: 2 },
  { w: "ISTHMUS", c: "A narrow strip of land connecting two larger areas", cat: "geography", diff: 3 },
  { w: "TERRITORY", c: "An area under a particular government's control", cat: "geography", diff: 2 },
  { w: "PROVINCE", c: "An administrative division of a country", cat: "geography", diff: 2 },
  { w: "MERIDIAN", c: "A line of longitude", cat: "geography", diff: 3 },
  { w: "TROPIC", c: "A latitude line marking the sun's extreme position", cat: "geography", diff: 2 },
  { w: "OASIS", c: "A fertile spot in a desert with a water source", cat: "geography", diff: 1 },
  { w: "DUNE", c: "A wind-formed hill of sand", cat: "geography", diff: 1 },
  { w: "PRAIRIE", c: "A large area of flat grassland", cat: "geography", diff: 2 },
  { w: "STEPPE", c: "A vast, dry, grass-covered plain", cat: "geography", diff: 3 },
  { w: "WETLAND", c: "Land saturated with water, like a marsh", cat: "geography", diff: 2 },
  { w: "GLACIER", c: "A slow-moving mass of ice", cat: "geography", diff: 1 },
  { w: "ICEBERG", c: "A large floating chunk of freshwater ice", cat: "geography", diff: 1 },
  { w: "TUNDRA", c: "A cold, treeless plain near the Arctic", cat: "geography", diff: 2 },
  { w: "OUTBACK", c: "The vast, remote interior of Australia", cat: "geography", diff: 2 },
  { w: "SAHARA", c: "The world's largest hot desert", cat: "geography", diff: 1 },
  { w: "KALAHARI", c: "A large semi-arid desert in southern Africa", cat: "geography", diff: 3 },
  { w: "AMAZON", c: "The world's largest rainforest", cat: "geography", diff: 1 },
  { w: "CARIBBEAN", c: "Sea dotted with tropical island nations", cat: "geography", diff: 1 },
  { w: "MEDITERRANEAN", c: "Sea bordered by Europe, Africa, and Asia", cat: "geography", diff: 2 },

  // ---- movies (batch 4) ----
  { w: "SPIELBERG", c: "Director behind Jaws and E.T.", cat: "movies", diff: 2 },
  { w: "TARANTINO", c: "Director known for nonlinear, dialogue-heavy films", cat: "movies", diff: 2 },
  { w: "HITCHCOCK", c: "Director known as the \"Master of Suspense\"", cat: "movies", diff: 2 },
  { w: "KUBRICK", c: "Director behind 2001: A Space Odyssey", cat: "movies", diff: 3 },
  { w: "SCORSESE", c: "Director behind many classic mob films", cat: "movies", diff: 3 },
  { w: "NOLAN", c: "Director known for mind-bending, nonlinear plots", cat: "movies", diff: 2 },
  { w: "BURTON", c: "Director known for gothic, quirky visuals", cat: "movies", diff: 2 },
  { w: "CAMERON", c: "Director behind Titanic and Avatar", cat: "movies", diff: 2 },
  { w: "LUCAS", c: "Director and creator of Star Wars", cat: "movies", diff: 2 },
  { w: "ANIME", c: "Japanese animation style", cat: "movies", diff: 1 },
  { w: "STUDIOGHIBLI", c: "Japanese animation house behind Spirited Away", cat: "movies", diff: 3 },
  { w: "SPIRITEDAWAY", c: "Miyazaki film about a girl trapped in a spirit world", cat: "movies", diff: 3 },
  { w: "TOYSTORY", c: "Pixar's first feature film, about living toys", cat: "movies", diff: 1 },
  { w: "FINDINGNEMO", c: "Pixar film about a lost clownfish", cat: "movies", diff: 1 },
  { w: "WALLE", c: "Pixar film about a trash-compacting robot", cat: "movies", diff: 2 },
  { w: "RATATOUILLE", c: "Pixar film about a rat who wants to cook", cat: "movies", diff: 2 },
  { w: "INSIDEOUT", c: "Pixar film set inside a girl's mind", cat: "movies", diff: 2 },
  { w: "ZOOTOPIA", c: "Disney film set in a city of anthropomorphic animals", cat: "movies", diff: 2 },
  { w: "ENCANTO", c: "Disney film about a magical Colombian family", cat: "movies", diff: 2 },
  { w: "ALADDIN", c: "Disney film featuring a genie in a lamp", cat: "movies", diff: 1 },
  { w: "CINDERELLA", c: "Disney tale of a glass slipper", cat: "movies", diff: 1 },
  { w: "PINOCCHIO", c: "Tale of a wooden puppet who wants to be real", cat: "movies", diff: 1 },
  { w: "DUMBO", c: "Disney film about a flying elephant", cat: "movies", diff: 1 },
  { w: "BAMBI", c: "Disney film about a young deer", cat: "movies", diff: 1 },
  { w: "MULAN", c: "Disney film about a warrior who disguises herself", cat: "movies", diff: 1 },
  { w: "HERCULES", c: "Disney film based on Greek mythology", cat: "movies", diff: 2 },
  { w: "TARZAN", c: "Disney film about a man raised by apes", cat: "movies", diff: 1 },
  { w: "POCAHONTAS", c: "Disney film set in early colonial Virginia", cat: "movies", diff: 2 },
  { w: "LIONKING", c: "Disney film about Simba the lion cub", cat: "movies", diff: 1 },
  { w: "JURASSICPARK", c: "Film about cloned dinosaurs running amok", cat: "movies", diff: 1 },
  { w: "BACKTOTHEFUTURE", c: "Film about a teen sent back in time in a DeLorean", cat: "movies", diff: 2 },
  { w: "GHOSTBUSTERS", c: "Comedy about a team who catches spirits", cat: "movies", diff: 1 },
  { w: "INDIANAJONES", c: "Adventurer archaeologist who cracks a whip", cat: "movies", diff: 2 },
  { w: "JAMESBOND", c: "British spy with a license to kill", cat: "movies", diff: 1 },
  { w: "BATMAN", c: "Caped crusader of Gotham City", cat: "movies", diff: 1 },
  { w: "SUPERMAN", c: "Hero from Krypton with a red cape", cat: "movies", diff: 1 },
  { w: "SPIDERMAN", c: "Hero bitten by a radioactive arachnid", cat: "movies", diff: 1 },
  { w: "IRONMAN", c: "Billionaire hero in a powered suit of armor", cat: "movies", diff: 1 },
  { w: "AVENGERS", c: "Marvel's team of assembled heroes", cat: "movies", diff: 1 },
  { w: "STARWARS", c: "Space saga featuring Jedi and the Force", cat: "movies", diff: 1 },
  { w: "HARRYPOTTER", c: "Boy wizard series set at Hogwarts", cat: "movies", diff: 1 },
  { w: "LORDOFTHERINGS", c: "Epic fantasy trilogy about a ring quest", cat: "movies", diff: 1 },
  { w: "TITANIC", c: "Film about a doomed ocean liner and a love story", cat: "movies", diff: 1 },
  { w: "SCRIPTWRITER", c: "Person who writes a film's dialogue and structure", cat: "movies", diff: 2 },
  { w: "EDITOR", c: "Person who assembles a film's final cut", cat: "movies", diff: 1 },
  { w: "COSTUME", c: "Clothing designed for a film's characters", cat: "movies", diff: 1 },
  { w: "MAKEUP", c: "Applied artistry used to transform an actor's look", cat: "movies", diff: 1 },
  { w: "LIGHTING", c: "Illumination setup used to shoot a scene", cat: "movies", diff: 1 },
  { w: "STORYBOARD", c: "A sequence of drawings planning a film's shots", cat: "movies", diff: 2 },
  { w: "MONTAGE", c: "A quick sequence of shots showing passing time", cat: "movies", diff: 2 },
  { w: "FLASHBACK", c: "A scene depicting an earlier point in the story", cat: "movies", diff: 1 },
  { w: "NARRATOR", c: "A voice that tells the story off-screen", cat: "movies", diff: 1 },
  { w: "PROTAGONIST", c: "The main character of a story", cat: "movies", diff: 2 },
  { w: "ANTAGONIST", c: "The character who opposes the hero", cat: "movies", diff: 2 },
  { w: "SIDEKICK", c: "A hero's loyal companion", cat: "movies", diff: 1 },
  { w: "TRILOGY", c: "A set of three related films", cat: "movies", diff: 1 },
  { w: "FRANCHISE", c: "A series of related films sharing characters", cat: "movies", diff: 2 },
  { w: "SPINOFF", c: "A new film built around a side character", cat: "movies", diff: 2 },
  { w: "PILOT", c: "The first episode of a TV series", cat: "movies", diff: 2 },
  { w: "EPISODE", c: "A single installment of a TV series", cat: "movies", diff: 1 },
  { w: "SEASON", c: "A yearly batch of episodes in a TV series", cat: "movies", diff: 1 },
  { w: "BINGE", c: "To watch many episodes in one sitting", cat: "movies", diff: 1 },
  { w: "STREAMING", c: "Watching video delivered live over the internet", cat: "movies", diff: 1 },

  // ---- history (batch 4) ----
  { w: "AUGUSTUS", c: "First emperor of Rome", cat: "history", diff: 3 },
  { w: "ALEXANDER", c: "Macedonian king who conquered a vast empire", cat: "history", diff: 2 },
  { w: "GENGHISKHAN", c: "Founder of the Mongol Empire", cat: "history", diff: 3 },
  { w: "JOANOFARC", c: "French heroine who led troops as a teenager", cat: "history", diff: 3 },
  { w: "MARCOPOLO", c: "Venetian explorer who traveled the Silk Road", cat: "history", diff: 2 },
  { w: "MAGELLAN", c: "Explorer whose expedition first circled the globe", cat: "history", diff: 3 },
  { w: "DARWIN", c: "Naturalist who proposed the theory of evolution", cat: "history", diff: 2 },
  { w: "NEWTON", c: "Scientist who formulated the laws of motion", cat: "history", diff: 1 },
  { w: "EINSTEIN", c: "Physicist behind the theory of relativity", cat: "history", diff: 1 },
  { w: "GALILEO", c: "Astronomer persecuted for supporting a sun-centered universe", cat: "history", diff: 2 },
  { w: "COPERNICUS", c: "Astronomer who proposed the sun-centered model", cat: "history", diff: 3 },
  { w: "DAVINCI", c: "Renaissance artist and inventor behind the Mona Lisa", cat: "history", diff: 1 },
  { w: "MICHELANGELO", c: "Renaissance artist who painted the Sistine Chapel", cat: "history", diff: 2 },
  { w: "SHAKESPEARE", c: "Playwright behind Hamlet and Macbeth", cat: "history", diff: 1 },
  { w: "MOZART", c: "Prolific classical composer who died young", cat: "history", diff: 1 },
  { w: "BEETHOVEN", c: "Composer who kept writing music after losing his hearing", cat: "history", diff: 1 },
  { w: "LUTHER", c: "Monk whose theses sparked the Protestant Reformation", cat: "history", diff: 3 },
  { w: "CONSTANTINE", c: "Roman emperor who legalized Christianity", cat: "history", diff: 3 },
  { w: "ATTILA", c: "Fearsome leader of the Huns", cat: "history", diff: 3 },
  { w: "SPARTACUS", c: "Gladiator who led a slave rebellion against Rome", cat: "history", diff: 2 },
  { w: "HANNIBAL", c: "Carthaginian general who crossed the Alps with elephants", cat: "history", diff: 3 },
  { w: "TUTANKHAMUN", c: "Young pharaoh whose tomb was found nearly intact", cat: "history", diff: 3 },
  { w: "NEFERTITI", c: "Ancient Egyptian queen famed for her bust", cat: "history", diff: 3 },
  { w: "HAMMURABI", c: "Babylonian king known for an early code of laws", cat: "history", diff: 3 },
  { w: "SOCRATES", c: "Ancient Greek philosopher who taught by questioning", cat: "history", diff: 2 },
  { w: "ARISTOTLE", c: "Ancient Greek philosopher who tutored Alexander", cat: "history", diff: 2 },
  { w: "PLATO", c: "Ancient Greek philosopher who founded the Academy", cat: "history", diff: 2 },
  { w: "HOMER", c: "Ancient Greek poet credited with the Iliad", cat: "history", diff: 2 },
  { w: "CONFUCIUS", c: "Chinese philosopher known for his teachings on ethics", cat: "history", diff: 2 },
  { w: "MANDELA", c: "South African leader who fought apartheid", cat: "history", diff: 1 },
  { w: "MLK", c: "Civil rights leader known for a famous 1963 speech", cat: "history", diff: 2 },
  { w: "ROOSEVELT", c: "U.S. president who led through the Great Depression and WWII", cat: "history", diff: 2 },
  { w: "KENNEDY", c: "U.S. president assassinated in Dallas", cat: "history", diff: 2 },
  { w: "JEFFERSON", c: "Primary author of the Declaration of Independence", cat: "history", diff: 2 },
  { w: "FRANKLIN", c: "Founding father known for flying a kite in a storm", cat: "history", diff: 2 },
  { w: "SAMURAI", c: "Traditional Japanese warrior class", cat: "history", diff: 2 },
  { w: "SHOGUN", c: "Historic Japanese military dictator", cat: "history", diff: 3 },
  { w: "CRUSADE", c: "A medieval religious military campaign", cat: "history", diff: 2 },
  { w: "INQUISITION", c: "A historic institution that persecuted heresy", cat: "history", diff: 3 },
  { w: "PLAGUE", c: "A devastating medieval pandemic, \"the Black Death\"", cat: "history", diff: 1 },
  { w: "FAMINE", c: "A widespread scarcity of food", cat: "history", diff: 2 },
  { w: "MIGRATION", c: "Mass movement of people from one place to another", cat: "history", diff: 1 },
  { w: "CONQUEST", c: "The act of taking control by force", cat: "history", diff: 2 },
  { w: "INVASION", c: "An armed incursion into another territory", cat: "history", diff: 1 },
  { w: "OCCUPATION", c: "Control of a territory by a foreign power", cat: "history", diff: 2 },
  { w: "PROPAGANDA", c: "Biased information used to sway public opinion", cat: "history", diff: 2 },
  { w: "ALLIANCE", c: "A formal agreement between nations", cat: "history", diff: 1 },
  { w: "NEUTRALITY", c: "A stance of not taking sides in a conflict", cat: "history", diff: 2 },
  { w: "CEASEFIRE", c: "A temporary halt to fighting", cat: "history", diff: 2 },
  { w: "SURRENDER", c: "To give up in the face of defeat", cat: "history", diff: 1 },
  { w: "LIBERATION", c: "The act of setting free from oppression", cat: "history", diff: 2 },
  { w: "MONUMENT", c: "A structure built to commemorate a person or event", cat: "history", diff: 1 },
  { w: "STATUE", c: "A carved or cast figure honoring someone", cat: "history", diff: 1 },
  { w: "OBELISK", c: "A tall, tapering four-sided ancient monument", cat: "history", diff: 3 },
  { w: "COLOSSEUM", c: "Ancient Roman amphitheater for gladiator battles", cat: "history", diff: 2 },
  { w: "AQUEDUCT", c: "Ancient Roman structure for transporting water", cat: "history", diff: 3 },
  { w: "PARCHMENT", c: "Ancient writing material made from animal skin", cat: "history", diff: 3 },
  { w: "HIEROGLYPH", c: "Ancient Egyptian picture-writing symbol", cat: "history", diff: 3 },
  { w: "MUMMY", c: "A preserved ancient Egyptian body", cat: "history", diff: 1 },
  { w: "SPHINX", c: "Ancient Egyptian statue with a lion's body", cat: "history", diff: 2 },

  // ---- sports (batch 4) ----
  { w: "BASEBALL", c: "Bat-and-ball sport played over nine innings", cat: "sports", diff: 1 },
  { w: "BASKETBALL", c: "Sport played by shooting a ball through a hoop", cat: "sports", diff: 1 },
  { w: "FOOTBALL", c: "American gridiron sport played with an oval ball", cat: "sports", diff: 1 },
  { w: "HANDBALL", c: "Sport where players throw a ball into a goal", cat: "sports", diff: 2 },
  { w: "SOFTBALL", c: "A variant of baseball played with a larger ball", cat: "sports", diff: 1 },
  { w: "CURLING", c: "Winter sport of sliding stones on ice toward a target", cat: "sports", diff: 2 },
  { w: "BOBSLED", c: "Winter sport of racing a sled down an icy track", cat: "sports", diff: 2 },
  { w: "LUGE", c: "Winter sport of racing feet-first on a small sled", cat: "sports", diff: 3 },
  { w: "SNOWBOARD", c: "Winter sport equipment ridden down a slope", cat: "sports", diff: 1 },
  { w: "PARKOUR", c: "Sport of moving through obstacles with acrobatic efficiency", cat: "sports", diff: 2 },
  { w: "CLIMBING", c: "Sport of scaling rock walls or mountains", cat: "sports", diff: 1 },
  { w: "KAYAKING", c: "Sport of paddling a narrow, covered boat", cat: "sports", diff: 2 },
  { w: "CANOEING", c: "Sport of paddling an open boat", cat: "sports", diff: 2 },
  { w: "SAILING", c: "Sport of racing wind-powered boats", cat: "sports", diff: 1 },
  { w: "POLO", c: "Sport played on horseback with mallets", cat: "sports", diff: 2 },
  { w: "SQUASH", c: "Racket sport played in a four-walled court", cat: "sports", diff: 2 },
  { w: "DARTS", c: "Pub game of throwing pointed missiles at a board", cat: "sports", diff: 1 },
  { w: "BILLIARDS", c: "Cue-and-ball game played on a felted table", cat: "sports", diff: 2 },
  { w: "BOWLING", c: "Sport of rolling a ball to knock down pins", cat: "sports", diff: 1 },
  { w: "SHOOTING", c: "Olympic sport of firing at fixed targets", cat: "sports", diff: 2 },
  { w: "PENTATHLON", c: "Five-event Olympic combined competition", cat: "sports", diff: 3 },
  { w: "STEEPLECHASE", c: "A race with hurdles and a water jump", cat: "sports", diff: 3 },
  { w: "HURDLES", c: "A running race with barriers to leap over", cat: "sports", diff: 2 },
  { w: "JAVELIN", c: "Track and field event throwing a long spear", cat: "sports", diff: 2 },
  { w: "DISCUS", c: "Track and field event throwing a heavy disc", cat: "sports", diff: 2 },
  { w: "SHOTPUT", c: "Track and field event throwing a heavy ball", cat: "sports", diff: 2 },
  { w: "POLEVAULT", c: "Track and field event using a flexible pole to clear a bar", cat: "sports", diff: 2 },
  { w: "LONGJUMP", c: "Track and field event measuring horizontal distance jumped", cat: "sports", diff: 1 },
  { w: "HIGHJUMP", c: "Track and field event clearing a raised bar", cat: "sports", diff: 1 },
  { w: "STRIKER", c: "Soccer position focused on scoring goals", cat: "sports", diff: 1 },
  { w: "DEFENDER", c: "Soccer position that protects the goal", cat: "sports", diff: 1 },
  { w: "MIDFIELDER", c: "Soccer position that links defense and attack", cat: "sports", diff: 2 },
  { w: "QUARTERBACK", c: "American football position that throws the ball", cat: "sports", diff: 1 },
  { w: "PITCHER", c: "Baseball position that throws to the batter", cat: "sports", diff: 1 },
  { w: "CATCHER", c: "Baseball position crouched behind home plate", cat: "sports", diff: 1 },
  { w: "OUTFIELDER", c: "Baseball position stationed far from the infield", cat: "sports", diff: 2 },
  { w: "SPRINTER", c: "An athlete who specializes in short, fast races", cat: "sports", diff: 1 },
  { w: "GYMNAST", c: "An athlete who performs on beams, bars, and mats", cat: "sports", diff: 1 },
  { w: "SWIMMER", c: "An athlete who races through water", cat: "sports", diff: 1 },
  { w: "ATHLETE", c: "A person trained in physical sport", cat: "sports", diff: 1 },
  { w: "CHAMPION", c: "The winner of a competition", cat: "sports", diff: 1 },
  { w: "RUNNERUP", c: "The competitor who finishes second", cat: "sports", diff: 2 },
  { w: "UNDERDOG", c: "A competitor expected to lose", cat: "sports", diff: 2 },
  { w: "RIVALRY", c: "A long-standing competitive relationship between teams", cat: "sports", diff: 2 },
  { w: "DYNASTY", c: "A team that dominates its sport for years", cat: "sports", diff: 2 },
  { w: "PLAYOFFS", c: "The postseason rounds that decide a champion", cat: "sports", diff: 1 },
  { w: "FINALS", c: "The last round of a competition", cat: "sports", diff: 1 },
  { w: "SEMIFINAL", c: "The round before the finals", cat: "sports", diff: 2 },
  { w: "QUALIFIER", c: "A match that determines who advances", cat: "sports", diff: 2 },
  { w: "SCRIMMAGE", c: "A practice match between two sides of the same team", cat: "sports", diff: 3 },
  { w: "HUDDLE", c: "A close gathering of teammates to plan a play", cat: "sports", diff: 2 },
  { w: "TIMEKEEPER", c: "Official responsible for tracking the game clock", cat: "sports", diff: 2 },
  { w: "SCOUT", c: "Person who evaluates talent for a team", cat: "sports", diff: 1 },
  { w: "DRAFT", c: "The process teams use to select new players", cat: "sports", diff: 2 },
  { w: "CONTRACT", c: "A player's binding agreement with a team", cat: "sports", diff: 1 },
  { w: "ENDURANCE", c: "The ability to sustain prolonged physical effort", cat: "sports", diff: 2 },
  { w: "STAMINA", c: "Physical or mental strength to endure exertion", cat: "sports", diff: 2 },
  { w: "AGILITY", c: "The ability to move quickly and easily", cat: "sports", diff: 2 },
  { w: "FLEXIBILITY", c: "The ability to bend and stretch easily", cat: "sports", diff: 2 },
  { w: "WARMUP", c: "Light exercise done before real competition", cat: "sports", diff: 1 },
  { w: "COOLDOWN", c: "Light exercise done after intense activity", cat: "sports", diff: 2 },

  // ---- science (batch 4) ----
  { w: "ASTRONOMY", c: "The scientific study of celestial objects", cat: "science", diff: 1 },
  { w: "BIOLOGY", c: "The scientific study of living things", cat: "science", diff: 1 },
  { w: "CHEMISTRY", c: "The scientific study of matter and its reactions", cat: "science", diff: 1 },
  { w: "PHYSICS", c: "The scientific study of matter and energy", cat: "science", diff: 1 },
  { w: "GEOLOGY", c: "The scientific study of the Earth's rocks and structure", cat: "science", diff: 2 },
  { w: "ECOLOGY", c: "The study of organisms and their environments", cat: "science", diff: 2 },
  { w: "ZOOLOGY", c: "The scientific study of animals", cat: "science", diff: 2 },
  { w: "BOTANY", c: "The scientific study of plants", cat: "science", diff: 2 },
  { w: "GENETICS", c: "The study of heredity and genes", cat: "science", diff: 2 },
  { w: "ANATOMY", c: "The study of the structure of living organisms", cat: "science", diff: 2 },
  { w: "PHYSIOLOGY", c: "The study of how living organisms function", cat: "science", diff: 3 },
  { w: "PSYCHOLOGY", c: "The scientific study of the mind and behavior", cat: "science", diff: 1 },
  { w: "NEUROSCIENCE", c: "The scientific study of the nervous system", cat: "science", diff: 3 },
  { w: "METEOROLOGY", c: "The scientific study of weather", cat: "science", diff: 2 },
  { w: "SEISMOLOGY", c: "The scientific study of earthquakes", cat: "science", diff: 3 },
  { w: "OCEANOGRAPHY", c: "The scientific study of the oceans", cat: "science", diff: 3 },
  { w: "HYPOTHESIS", c: "A proposed explanation to be tested", cat: "science", diff: 1 },
  { w: "EXPERIMENT", c: "A test carried out to discover something", cat: "science", diff: 1 },
  { w: "OBSERVATION", c: "The act of carefully noting something", cat: "science", diff: 1 },
  { w: "VARIABLE", c: "A factor that can change in an experiment", cat: "science", diff: 2 },
  { w: "DATA", c: "Facts and figures collected for analysis", cat: "science", diff: 1 },
  { w: "THEORY", c: "A well-substantiated scientific explanation", cat: "science", diff: 1 },
  { w: "PROTON", c: "A positively charged particle in an atom's nucleus", cat: "science", diff: 2 },
  { w: "NEUTRON", c: "An uncharged particle in an atom's nucleus", cat: "science", diff: 2 },
  { w: "ELECTRON", c: "A negatively charged particle orbiting an atom's nucleus", cat: "science", diff: 2 },
  { w: "QUARK", c: "A fundamental particle that makes up protons and neutrons", cat: "science", diff: 3 },
  { w: "ENERGY", c: "The capacity to do work", cat: "science", diff: 1 },
  { w: "KINETIC", c: "Relating to motion, as in a type of energy", cat: "science", diff: 2 },
  { w: "POTENTIAL", c: "Stored energy waiting to be released", cat: "science", diff: 2 },
  { w: "MAGNETISM", c: "The force exerted by magnets", cat: "science", diff: 2 },
  { w: "ELECTRICITY", c: "The flow of electric charge", cat: "science", diff: 1 },
  { w: "CIRCUIT", c: "A closed loop through which current flows", cat: "science", diff: 1 },
  { w: "CONDUCTOR", c: "A material that allows electricity to flow easily", cat: "science", diff: 2 },
  { w: "INSULATOR", c: "A material that resists the flow of electricity", cat: "science", diff: 2 },
  { w: "WAVELENGTH", c: "The distance between two peaks of a wave", cat: "science", diff: 2 },
  { w: "FREQUENCY", c: "The number of wave cycles per second", cat: "science", diff: 2 },
  { w: "SPECTRUM", c: "The range of colors light can be split into", cat: "science", diff: 2 },
  { w: "REFRACTION", c: "The bending of light as it changes medium", cat: "science", diff: 3 },
  { w: "REFLECTION", c: "Light bouncing off a surface", cat: "science", diff: 1 },
  { w: "GRAVITY", c: "The force that pulls objects toward Earth", cat: "science", diff: 1 },
  { w: "INERTIA", c: "An object's resistance to a change in motion", cat: "science", diff: 3 },
  { w: "ACCELERATION", c: "The rate at which velocity changes", cat: "science", diff: 2 },
  { w: "VACUUM", c: "A space entirely devoid of matter", cat: "science", diff: 2 },
  { w: "OXYGEN", c: "The element you need to breathe", cat: "science", diff: 1 },
  { w: "HYDROGEN", c: "The lightest and most abundant element in the universe", cat: "science", diff: 1 },
  { w: "CARBON", c: "The element that forms the basis of organic life", cat: "science", diff: 1 },
  { w: "NITROGEN", c: "The most abundant gas in Earth's atmosphere", cat: "science", diff: 2 },
  { w: "HELIUM", c: "A light, inert gas used in balloons", cat: "science", diff: 1 },
  { w: "IRON", c: "A metallic element found in blood and steel", cat: "science", diff: 1 },
  { w: "GOLD", c: "A precious, non-reactive metallic element", cat: "science", diff: 1 },
  { w: "SILVER", c: "A shiny, precious metallic element", cat: "science", diff: 1 },
  { w: "COPPER", c: "A reddish, conductive metallic element", cat: "science", diff: 1 },
  { w: "ALUMINUM", c: "A lightweight, abundant metallic element", cat: "science", diff: 2 },
  { w: "SODIUM", c: "A reactive metal found in table salt", cat: "science", diff: 2 },
  { w: "CALCIUM", c: "An element essential for strong bones", cat: "science", diff: 1 },
  { w: "GALAXY", c: "A massive system of stars bound by gravity", cat: "science", diff: 1 },
  { w: "UNIVERSE", c: "All of space, time, and matter", cat: "science", diff: 1 },
  { w: "BLACKHOLE", c: "A region where gravity is so strong nothing escapes", cat: "science", diff: 1 },
  { w: "SUPERNOVA", c: "The explosive death of a massive star", cat: "science", diff: 2 },
  { w: "PULSAR", c: "A rapidly spinning neutron star that emits radiation", cat: "science", diff: 3 },
  { w: "CONSTELLATION", c: "A recognized pattern of stars", cat: "science", diff: 2 },
  { w: "EQUINOX", c: "The point when day and night are equal length", cat: "science", diff: 3 },
  { w: "SOLSTICE", c: "The longest or shortest day of the year", cat: "science", diff: 3 },
  { w: "MITOSIS", c: "The process of cell division", cat: "science", diff: 3 },
  { w: "ENZYME", c: "A protein that speeds up a biological reaction", cat: "science", diff: 3 },
  { w: "PROTEIN", c: "A molecule made of amino acids essential to life", cat: "science", diff: 1 },
  { w: "VIRUS", c: "A microscopic infectious agent", cat: "science", diff: 1 },
  { w: "ANTIBODY", c: "An immune protein that fights infection", cat: "science", diff: 2 },
  { w: "VACCINE", c: "A preparation that trains the immune system", cat: "science", diff: 1 },
  { w: "ANTIBIOTIC", c: "A medicine that fights bacterial infection", cat: "science", diff: 1 },
  { w: "ORGANISM", c: "Any living thing", cat: "science", diff: 1 },
  { w: "MICROBE", c: "A microscopic organism", cat: "science", diff: 2 },
  { w: "FUNGUS", c: "Kingdom of life including mushrooms and molds", cat: "science", diff: 1 },
  { w: "ALGAE", c: "Simple aquatic organisms that photosynthesize", cat: "science", diff: 2 },

  // ---- food (batch 4) ----
  { w: "SPAGHETTI", c: "Long, thin strands of pasta", cat: "food", diff: 1 },
  { w: "RAVIOLI", c: "Stuffed pasta pockets", cat: "food", diff: 2 },
  { w: "GNOCCHI", c: "Small, soft Italian potato dumplings", cat: "food", diff: 3 },
  { w: "CARBONARA", c: "Pasta dish made with egg, cheese, and pancetta", cat: "food", diff: 3 },
  { w: "BOLOGNESE", c: "Meat-based pasta sauce from Bologna", cat: "food", diff: 2 },
  { w: "CAPRESE", c: "Salad of tomato, mozzarella, and basil", cat: "food", diff: 3 },
  { w: "BRUSCHETTA", c: "Toasted bread topped with tomato and basil", cat: "food", diff: 3 },
  { w: "TIRAMISU", c: "Coffee-flavored Italian layered dessert", cat: "food", diff: 2 },
  { w: "GELATO", c: "Italian-style ice cream", cat: "food", diff: 1 },
  { w: "BAGUETTE", c: "Long, thin loaf of French bread", cat: "food", diff: 1 },
  { w: "CROISSANT", c: "Buttery, flaky crescent-shaped pastry", cat: "food", diff: 2 },
  { w: "QUICHE", c: "Savory French egg-and-cream tart", cat: "food", diff: 2 },
  { w: "RATATOUILLE", c: "French stewed vegetable dish", cat: "food", diff: 3 },
  { w: "CREPE", c: "Thin French pancake", cat: "food", diff: 1 },
  { w: "ECLAIR", c: "Long, filled French pastry topped with icing", cat: "food", diff: 2 },
  { w: "MACARON", c: "Colorful French almond meringue sandwich cookie", cat: "food", diff: 2 },
  { w: "PAELLA", c: "Spanish rice dish with saffron and seafood", cat: "food", diff: 2 },
  { w: "TAPAS", c: "Small Spanish appetizer plates", cat: "food", diff: 2 },
  { w: "GAZPACHO", c: "Cold Spanish tomato soup", cat: "food", diff: 3 },
  { w: "SCHNITZEL", c: "Breaded, pan-fried meat cutlet", cat: "food", diff: 2 },
  { w: "PRETZEL", c: "Twisted, salted German-style baked snack", cat: "food", diff: 1 },
  { w: "STRUDEL", c: "Layered pastry filled with fruit", cat: "food", diff: 2 },
  { w: "GOULASH", c: "Hungarian stew flavored with paprika", cat: "food", diff: 3 },
  { w: "BORSCHT", c: "Beet-based Eastern European soup", cat: "food", diff: 3 },
  { w: "PIEROGI", c: "Filled dumplings popular in Poland", cat: "food", diff: 3 },
  { w: "BAKLAVA", c: "Sweet, flaky Middle Eastern pastry with nuts", cat: "food", diff: 3 },
  { w: "KEBAB", c: "Skewered and grilled meat dish", cat: "food", diff: 1 },
  { w: "SHAWARMA", c: "Middle Eastern wrap of spit-roasted meat", cat: "food", diff: 2 },
  { w: "PITA", c: "Round, pocketed flatbread", cat: "food", diff: 1 },
  { w: "NAAN", c: "Soft, leavened Indian flatbread", cat: "food", diff: 1 },
  { w: "SAMOSA", c: "Fried pastry filled with spiced potatoes", cat: "food", diff: 2 },
  { w: "BIRYANI", c: "Spiced, layered South Asian rice dish", cat: "food", diff: 2 },
  { w: "TANDOORI", c: "Food cooked in a clay oven, Indian-style", cat: "food", diff: 3 },
  { w: "PADTHAI", c: "Stir-fried Thai noodle dish", cat: "food", diff: 1 },
  { w: "PHO", c: "Vietnamese noodle soup", cat: "food", diff: 1 },
  { w: "SPRINGROLL", c: "Thin wrapped roll of vegetables or meat", cat: "food", diff: 1 },
  { w: "DUMPLING", c: "A ball of dough wrapped around a filling", cat: "food", diff: 1 },
  { w: "TEMPURA", c: "Japanese battered and deep-fried dish", cat: "food", diff: 2 },
  { w: "SASHIMI", c: "Thinly sliced raw fish, served without rice", cat: "food", diff: 2 },
  { w: "MISO", c: "Fermented soybean paste used in Japanese cooking", cat: "food", diff: 2 },
  { w: "EDAMAME", c: "Steamed, salted young soybeans", cat: "food", diff: 2 },
  { w: "MOCHI", c: "Chewy Japanese rice cake", cat: "food", diff: 2 },
  { w: "KIMCHI", c: "Fermented, spicy Korean cabbage dish", cat: "food", diff: 2 },
  { w: "BULGOGI", c: "Marinated, grilled Korean beef dish", cat: "food", diff: 3 },
  { w: "DIMSUM", c: "Small Chinese dishes served in steamer baskets", cat: "food", diff: 2 },
  { w: "WONTON", c: "Chinese dumpling often served in soup", cat: "food", diff: 2 },
  { w: "CHOWMEIN", c: "Stir-fried Chinese noodle dish", cat: "food", diff: 1 },
  { w: "FRIEDRICE", c: "Stir-fried rice dish with vegetables and egg", cat: "food", diff: 1 },
  { w: "ENCHILADA", c: "Rolled Mexican tortilla dish topped with sauce", cat: "food", diff: 2 },
  { w: "TAMALE", c: "Mexican dish steamed in a corn husk", cat: "food", diff: 2 },
  { w: "CHURRO", c: "Fried, sugar-dusted Mexican pastry stick", cat: "food", diff: 2 },
  { w: "MOLE", c: "Rich, complex Mexican sauce often with chocolate", cat: "food", diff: 3 },
  { w: "CEVICHE", c: "Latin American dish of citrus-cured raw fish", cat: "food", diff: 3 },
  { w: "EMPANADA", c: "Stuffed, folded pastry popular in Latin America", cat: "food", diff: 2 },
  { w: "CHIMICHURRI", c: "Argentine herb-and-oil sauce for grilled meat", cat: "food", diff: 3 },
  { w: "JERK", c: "Spicy Jamaican seasoning style for grilling", cat: "food", diff: 2 },
  { w: "GUMBO", c: "Thick, stewed Louisiana dish", cat: "food", diff: 2 },
  { w: "JAMBALAYA", c: "Spiced Louisiana rice dish with meat and seafood", cat: "food", diff: 3 },
  { w: "COLESLAW", c: "Shredded cabbage salad with dressing", cat: "food", diff: 1 },
  { w: "CASSEROLE", c: "A baked dish combining several ingredients", cat: "food", diff: 1 },
  { w: "MEATLOAF", c: "Baked ground meat shaped into a loaf", cat: "food", diff: 1 },
  { w: "POTPIE", c: "Savory pie filled with meat and vegetables", cat: "food", diff: 1 },
  { w: "CHOWDER", c: "Thick, creamy seafood or vegetable soup", cat: "food", diff: 2 },
  { w: "BISQUE", c: "Smooth, creamy shellfish soup", cat: "food", diff: 3 },
  { w: "VINAIGRETTE", c: "Oil-and-vinegar salad dressing", cat: "food", diff: 3 },
  { w: "MARGARINE", c: "A butter substitute made from vegetable oil", cat: "food", diff: 2 },
  { w: "MAYONNAISE", c: "Creamy condiment made from egg and oil", cat: "food", diff: 2 },
  { w: "KETCHUP", c: "Sweet, tangy tomato-based condiment", cat: "food", diff: 1 },
  { w: "MUSTARD", c: "Tangy yellow condiment made from seeds", cat: "food", diff: 1 },
  { w: "PAPRIKA", c: "A red spice made from ground peppers", cat: "food", diff: 2 },
  { w: "CUMIN", c: "An earthy spice common in Mexican and Indian food", cat: "food", diff: 2 },
  { w: "TURMERIC", c: "A golden spice common in curries", cat: "food", diff: 2 },
  { w: "SAFFRON", c: "The world's most expensive spice, from a crocus", cat: "food", diff: 3 },
  { w: "NUTMEG", c: "A warm, sweet spice used in baking", cat: "food", diff: 2 },
  { w: "CLOVE", c: "A pungent, aromatic dried flower bud spice", cat: "food", diff: 2 },
  { w: "BASIL", c: "A fragrant herb key to Italian cooking", cat: "food", diff: 1 },
  { w: "OREGANO", c: "A pungent herb common in Italian and Greek food", cat: "food", diff: 2 },
  { w: "THYME", c: "A small-leafed, earthy savory herb", cat: "food", diff: 2 },
  { w: "ROSEMARY", c: "A pine-scented savory herb", cat: "food", diff: 2 },
  { w: "CILANTRO", c: "A polarizing, citrusy fresh herb", cat: "food", diff: 2 },
  { w: "PARSLEY", c: "A common fresh green garnish herb", cat: "food", diff: 1 },
  { w: "MINT", c: "A cool, refreshing herb", cat: "food", diff: 1 },
  { w: "DILL", c: "A feathery herb often paired with pickles", cat: "food", diff: 2 },

  // ---- kids (batch 4) ----
  { w: "CINDERELLA", c: "Fairy tale girl who loses a glass slipper", cat: "kids", diff: 1 },
  { w: "RAPUNZEL", c: "Fairy tale girl with very long hair", cat: "kids", diff: 1 },
  { w: "SNOWWHITE", c: "Fairy tale girl who ate a poisoned apple", cat: "kids", diff: 1 },
  { w: "GOLDILOCKS", c: "Girl who tries three bears' porridge", cat: "kids", diff: 1 },
  { w: "REDRIDINGHOOD", c: "Girl who visits Grandma through the woods", cat: "kids", diff: 2 },
  { w: "PINOCCHIO", c: "Wooden puppet whose nose grows when he lies", cat: "kids", diff: 1 },
  { w: "PETERPAN", c: "Boy who never grows up and can fly", cat: "kids", diff: 1 },
  { w: "TINKERBELL", c: "A tiny, sparkly fairy companion", cat: "kids", diff: 1 },
  { w: "ALICE", c: "Girl who falls down a rabbit hole", cat: "kids", diff: 1 },
  { w: "DOROTHY", c: "Girl swept to Oz by a tornado", cat: "kids", diff: 1 },
  { w: "SCARECROW", c: "Oz character who wants a brain", cat: "kids", diff: 1 },
  { w: "TINMAN", c: "Oz character who wants a heart", cat: "kids", diff: 1 },
  { w: "COWARDLYLION", c: "Oz character who wants courage", cat: "kids", diff: 1 },
  { w: "WIZARD", c: "Oz character behind the curtain", cat: "kids", diff: 1 },
  { w: "GENIE", c: "Magical wish-granting being from a lamp", cat: "kids", diff: 1 },
  { w: "MERMAID", c: "Half-human, half-fish sea dweller", cat: "kids", diff: 1 },
  { w: "CENTAUR", c: "Mythical creature, half human and half horse", cat: "kids", diff: 2 },
  { w: "PEGASUS", c: "Mythical winged horse", cat: "kids", diff: 2 },
  { w: "PHOENIX", c: "Mythical bird reborn from its own ashes", cat: "kids", diff: 2 },
  { w: "GRIFFIN", c: "Mythical creature, part lion and part eagle", cat: "kids", diff: 2 },
  { w: "GNOME", c: "Small, bearded fairy-tale creature that guards gardens", cat: "kids", diff: 1 },
  { w: "TROLL", c: "Grumpy fairy-tale creature that lives under bridges", cat: "kids", diff: 1 },
  { w: "WITCH", c: "Spellcasting fairy-tale character, often with a broom", cat: "kids", diff: 1 },
  { w: "SORCERER", c: "A powerful practitioner of magic", cat: "kids", diff: 2 },
  { w: "SPELL", c: "A magic charm or incantation", cat: "kids", diff: 1 },
  { w: "POTION", c: "A magical liquid brewed for an effect", cat: "kids", diff: 1 },
  { w: "WAND", c: "A magic-casting stick", cat: "kids", diff: 1 },
  { w: "CAULDRON", c: "A large pot used for brewing potions", cat: "kids", diff: 1 },
  { w: "BROOMSTICK", c: "What a witch flies on", cat: "kids", diff: 1 },
  { w: "CRYSTAL", c: "A clear, faceted magical-looking stone", cat: "kids", diff: 1 },
  { w: "JIGSAW", c: "A puzzle made of interlocking pieces", cat: "kids", diff: 1 },
  { w: "CROSSWORD", c: "A word puzzle filled with clues, like this one", cat: "kids", diff: 1 },
  { w: "MAZE", c: "A confusing network of paths to solve", cat: "kids", diff: 1 },
  { w: "HOPSCOTCH", c: "Playground game of hopping through chalked squares", cat: "kids", diff: 1 },
  { w: "TAG", c: "Playground game of chasing and touching", cat: "kids", diff: 1 },
  { w: "HIDEANDSEEK", c: "Game of counting, then finding hidden friends", cat: "kids", diff: 1 },
  { w: "DODGEBALL", c: "Gym game of throwing balls to get opponents out", cat: "kids", diff: 1 },
  { w: "JUMPROPE", c: "A skipping toy swung under your feet", cat: "kids", diff: 1 },
  { w: "HULAHOOP", c: "A ring spun around the waist", cat: "kids", diff: 1 },
  { w: "PINATA", c: "A candy-filled figure smashed at parties", cat: "kids", diff: 1 },
  { w: "BUBBLES", c: "Soapy spheres blown from a wand", cat: "kids", diff: 1 },
  { w: "PLAYDOUGH", c: "Squishy, colorful modeling clay for kids", cat: "kids", diff: 1 },
  { w: "LEGO", c: "Interlocking plastic building bricks", cat: "kids", diff: 1 },
  { w: "YOYO", c: "A spinning toy on a string", cat: "kids", diff: 1 },
  { w: "SLINKY", c: "A coiled spring toy that walks down stairs", cat: "kids", diff: 1 },
  { w: "PUZZLE", c: "A game of putting scattered pieces together", cat: "kids", diff: 1 },
  { w: "STORYBOOK", c: "A picture-filled book of tales", cat: "kids", diff: 1 },
  { w: "NURSERY", c: "A room decorated for a baby", cat: "kids", diff: 1 },
  { w: "RHYME", c: "Words that end in matching sounds", cat: "kids", diff: 1 },

  // ---- general (batch 4, additional short/medium fill words) ----
  { w: "IDEA", c: "A thought or plan", cat: "general", diff: 1 },
  { w: "PLAN", c: "A scheme for achieving a goal", cat: "general", diff: 1 },
  { w: "GOAL", c: "An aim or desired result", cat: "general", diff: 1 },
  { w: "TASK", c: "A piece of work to be done", cat: "general", diff: 1 },
  { w: "DUTY", c: "A moral or legal obligation", cat: "general", diff: 1 },
  { w: "RULE", c: "A guideline governing behavior", cat: "general", diff: 1 },
  { w: "LAW", c: "A binding rule enforced by authority", cat: "general", diff: 1 },
  { w: "ORDER", c: "A state of arrangement or an instruction", cat: "general", diff: 1 },
  { w: "CHAOS", c: "Complete disorder and confusion", cat: "general", diff: 1 },
  { w: "PEACE", c: "Freedom from conflict", cat: "general", diff: 1 },
  { w: "UNITY", c: "The state of being joined as one", cat: "general", diff: 2 },
  { w: "TEAMWORK", c: "Cooperative effort by a group", cat: "general", diff: 1 },
  { w: "EFFORT", c: "Energy exerted to achieve something", cat: "general", diff: 1 },
  { w: "SKILL", c: "Ability gained through practice", cat: "general", diff: 1 },
  { w: "TALENT", c: "A natural aptitude or skill", cat: "general", diff: 1 },
  { w: "GENIUS", c: "Exceptional intellectual ability", cat: "general", diff: 1 },
  { w: "WISDOM", c: "The quality of having good judgment", cat: "general", diff: 1 },
  { w: "LOGIC", c: "Reasoning conducted according to strict rules", cat: "general", diff: 1 },
  { w: "REASON", c: "The cause or explanation for something", cat: "general", diff: 1 },
  { w: "CHOICE", c: "An act of selecting between options", cat: "general", diff: 1 },
  { w: "OPTION", c: "One of several alternatives", cat: "general", diff: 1 },
  { w: "DECISION", c: "A conclusion reached after consideration", cat: "general", diff: 1 },
  { w: "OPINION", c: "A personal view or judgment", cat: "general", diff: 1 },
  { w: "BELIEF", c: "Something accepted as true", cat: "general", diff: 1 },
  { w: "VALUE", c: "A principle considered important", cat: "general", diff: 1 },
  { w: "PROMISE", c: "A firm commitment to do something", cat: "general", diff: 1 },
  { w: "TRUST", c: "Firm belief in someone's reliability", cat: "general", diff: 1 },
  { w: "LOYALTY", c: "Steadfast support for someone or something", cat: "general", diff: 1 },
  { w: "RESPECT", c: "Deep admiration for someone", cat: "general", diff: 1 },
  { w: "GRATITUDE", c: "The feeling of being thankful", cat: "general", diff: 2 },
  { w: "SYMPATHY", c: "Feeling sorrow for another's misfortune", cat: "general", diff: 2 },
  { w: "EMPATHY", c: "The ability to share another's feelings", cat: "general", diff: 2 },
  { w: "JOY", c: "A feeling of great happiness", cat: "general", diff: 1 },
  { w: "SORROW", c: "A feeling of deep sadness", cat: "general", diff: 2 },
  { w: "ANGER", c: "A strong feeling of displeasure", cat: "general", diff: 1 },
  { w: "FEAR", c: "An unpleasant emotion caused by threat", cat: "general", diff: 1 },
  { w: "SURPRISE", c: "An unexpected event or feeling", cat: "general", diff: 1 },
  { w: "CURIOSITY", c: "A strong desire to learn something", cat: "general", diff: 1 },
  { w: "BOREDOM", c: "The state of being uninterested", cat: "general", diff: 2 },
  { w: "EXCITEMENT", c: "A feeling of great enthusiasm", cat: "general", diff: 1 },
  { w: "RELIEF", c: "A feeling of reassurance after anxiety", cat: "general", diff: 2 },
  { w: "COMFORT", c: "A state of physical or mental ease", cat: "general", diff: 1 },
  { w: "ENERGY", c: "The capacity for vigorous activity", cat: "general", diff: 1 },
  { w: "STRENGTH", c: "The quality of being physically strong", cat: "general", diff: 1 },
  { w: "WEAKNESS", c: "A lack of strength", cat: "general", diff: 1 },
  { w: "BALANCE", c: "An even distribution of weight or attention", cat: "general", diff: 1 },
  { w: "RHYTHM", c: "A strong, regular repeated pattern", cat: "general", diff: 1 },
  { w: "HARMONY", c: "A pleasing combination of elements", cat: "general", diff: 2 },
  { w: "CONTRAST", c: "A striking difference between things", cat: "general", diff: 1 },
  { w: "PATTERN", c: "A repeated decorative design", cat: "general", diff: 1 },
  { w: "TEXTURE", c: "The feel or appearance of a surface", cat: "general", diff: 1 },
  { w: "COLUMN", c: "A vertical structural support, or a text section", cat: "general", diff: 1 },
  { w: "ARCH", c: "A curved architectural structure", cat: "general", diff: 1 },
  { w: "DOME", c: "A rounded architectural roof", cat: "general", diff: 1 },
  { w: "TOWER", c: "A tall, narrow structure", cat: "general", diff: 1 },
  { w: "SPIRE", c: "A tapering, pointed structure atop a building", cat: "general", diff: 2 },
  { w: "PILLAR", c: "A tall vertical structural support", cat: "general", diff: 1 },
  { w: "BEAM", c: "A long structural piece of wood or metal", cat: "general", diff: 1 },
  { w: "FOUNDATION", c: "The base a structure is built upon", cat: "general", diff: 1 },
  { w: "STRUCTURE", c: "Something built or constructed", cat: "general", diff: 1 },

  // ---- batch 5: closing the gap toward doubling the corpus ----

  // geography (batch 5)
  { w: "EGYPT", c: "Home to the Nile and the Great Sphinx", cat: "geography", diff: 1 },
  { w: "CHINA", c: "Most populous country in the world", cat: "geography", diff: 1 },
  { w: "INDIA", c: "South Asian country and home of the Taj Mahal", cat: "geography", diff: 1 },
  { w: "RUSSIA", c: "World's largest country by land area", cat: "geography", diff: 1 },
  { w: "MEXICO", c: "North American country south of the U.S.", cat: "geography", diff: 1 },
  { w: "FRANCE", c: "European country home to the Eiffel Tower", cat: "geography", diff: 1 },
  { w: "GERMANY", c: "European country known for Oktoberfest", cat: "geography", diff: 1 },
  { w: "SPAIN", c: "European country famous for flamenco and paella", cat: "geography", diff: 1 },
  { w: "PANAMA", c: "Central American country with a famous canal", cat: "geography", diff: 2 },
  { w: "BELIZE", c: "Central American country with English as an official language", cat: "geography", diff: 3 },
  { w: "HONDURAS", c: "Central American country known for Mayan ruins", cat: "geography", diff: 3 },
  { w: "NICARAGUA", c: "Central American country with the largest lake in the region", cat: "geography", diff: 3 },
  { w: "COSTARICA", c: "Central American country known for eco-tourism", cat: "geography", diff: 2 },
  { w: "GUATEMALA", c: "Central American country with many active volcanoes", cat: "geography", diff: 3 },
  { w: "BOLIVIA", c: "Landlocked South American country with a salt flat", cat: "geography", diff: 3 },
  { w: "PALACE", c: "Grand royal residence", cat: "geography", diff: 1 },
  { w: "VILLAGE", c: "A small rural settlement", cat: "geography", diff: 1 },
  { w: "SUBURB", c: "A residential area outside a city center", cat: "geography", diff: 2 },
  { w: "DOWNTOWN", c: "The central business district of a city", cat: "geography", diff: 1 },
  { w: "SKYLINE", c: "The outline of a city's tall buildings", cat: "geography", diff: 1 },
  { w: "LANDMARK", c: "A recognizable feature marking a location", cat: "geography", diff: 1 },
  { w: "MONSOON", c: "A seasonal wind bringing heavy rain", cat: "geography", diff: 2 },
  { w: "CLIMATE", c: "The typical weather of a region over time", cat: "geography", diff: 1 },
  { w: "HUMIDITY", c: "The amount of moisture in the air", cat: "geography", diff: 2 },
  { w: "ALTITUDE", c: "Height above sea level", cat: "geography", diff: 2 },
  { w: "ELEVATION", c: "The height of land above a reference point", cat: "geography", diff: 2 },
  { w: "TIMEZONE", c: "A region observing a uniform standard time", cat: "geography", diff: 2 },
  { w: "POPULATION", c: "The number of people living in an area", cat: "geography", diff: 1 },
  { w: "CENSUS", c: "An official count of a population", cat: "geography", diff: 2 },
  { w: "IMMIGRANT", c: "A person who moves to a new country to live", cat: "geography", diff: 2 },
  { w: "TOURIST", c: "A person traveling for pleasure", cat: "geography", diff: 1 },
  { w: "PASSPORT", c: "A document needed to cross international borders", cat: "geography", diff: 1 },
  { w: "VISA", c: "Official permission to enter a foreign country", cat: "geography", diff: 2 },
  { w: "CUSTOMS", c: "Border checkpoint for goods entering a country", cat: "geography", diff: 2 },
  { w: "EMBASSY", c: "A diplomatic mission representing a country abroad", cat: "geography", diff: 2 },

  // movies (batch 5)
  { w: "SHREK", c: "Green, grumpy ogre with a Scottish accent", cat: "movies", diff: 1 },
  { w: "MINIONS", c: "Small yellow henchmen from Despicable Me", cat: "movies", diff: 1 },
  { w: "GRINCH", c: "Green, Christmas-hating recluse", cat: "movies", diff: 1 },
  { w: "SCROOGE", c: "Miserly character visited by three ghosts", cat: "movies", diff: 2 },
  { w: "KUNGFUPANDA", c: "Animated film about a clumsy panda warrior", cat: "movies", diff: 2 },
  { w: "MADAGASCAR", c: "Animated film about zoo animals stranded on an island", cat: "movies", diff: 1 },
  { w: "ICEAGE", c: "Animated franchise starring a sloth, mammoth, and tiger", cat: "movies", diff: 1 },
  { w: "DESPICABLEME", c: "Animated film about a villain turned adoptive dad", cat: "movies", diff: 2 },
  { w: "HOWTOTRAINYOURDRAGON", c: "Animated film about a Viking boy and his dragon", cat: "movies", diff: 2 },
  { w: "WRECKITRALPH", c: "Animated film set inside video game worlds", cat: "movies", diff: 2 },
  { w: "BAYMAX", c: "Inflatable robot from Big Hero 6", cat: "movies", diff: 2 },
  { w: "SOUL", c: "Pixar film about a jazz musician's afterlife journey", cat: "movies", diff: 2 },
  { w: "LUCA", c: "Pixar film about sea monsters passing as boys", cat: "movies", diff: 2 },
  { w: "ONWARD", c: "Pixar film about two elf brothers on a quest", cat: "movies", diff: 2 },
  { w: "MONSTERSINC", c: "Pixar film about monsters who scare for power", cat: "movies", diff: 1 },
  { w: "INCREDIBLES", c: "Pixar film about a family of superheroes", cat: "movies", diff: 1 },
  { w: "CARSFILM", c: "Pixar film about a hotshot race car", cat: "movies", diff: 3 },
  { w: "PLANET", c: "Setting of many sci-fi film franchises", cat: "movies", diff: 1 },
  { w: "ROBOT", c: "A common sci-fi film character type", cat: "movies", diff: 1 },
  { w: "ALIEN", c: "A creature from another planet, in sci-fi films", cat: "movies", diff: 1 },
  { w: "TIMETRAVEL", c: "A common sci-fi film plot device", cat: "movies", diff: 1 },
  { w: "DYSTOPIA", c: "A grim, oppressive future society in fiction", cat: "movies", diff: 2 },
  { w: "UTOPIA", c: "An idealized, perfect society in fiction", cat: "movies", diff: 2 },
  { w: "PARALLELUNIVERSE", c: "An alternate reality in sci-fi storytelling", cat: "movies", diff: 3 },
  { w: "MULTIVERSE", c: "A collection of parallel universes in a story", cat: "movies", diff: 2 },
  { w: "SUPERVILLAIN", c: "A hero's powerful, costumed nemesis", cat: "movies", diff: 1 },
  { w: "ORIGIN", c: "A hero's backstory film, often called this kind of \"story\"", cat: "movies", diff: 2 },
  { w: "POSTCREDITSCENE", c: "A teaser shown after the credits roll", cat: "movies", diff: 3 },
  { w: "EASTEREGG", c: "A hidden reference for attentive fans", cat: "movies", diff: 2 },
  { w: "CAMEO", c: "A brief, notable celebrity appearance", cat: "movies", diff: 2 },
  { w: "VOICEACTOR", c: "Performer who voices an animated character", cat: "movies", diff: 2 },
  { w: "STUNTDOUBLE", c: "Performer who replaces an actor for dangerous scenes", cat: "movies", diff: 2 },
  { w: "GREENSCREEN", c: "Backdrop replaced digitally in post-production", cat: "movies", diff: 2 },
  { w: "CGI", c: "Computer-generated imagery used in film effects", cat: "movies", diff: 2 },
  { w: "SPECIALEFFECTS", c: "Visual trickery used to create illusions on film", cat: "movies", diff: 2 },

  // history (batch 5)
  { w: "VICTORIA", c: "British queen with a long-named era", cat: "history", diff: 2 },
  { w: "ELIZABETH", c: "Name shared by two famous long-reigning English queens", cat: "history", diff: 1 },
  { w: "HENRY", c: "English king famous for having six wives", cat: "history", diff: 2 },
  { w: "RICHARD", c: "English king known as \"the Lionheart\"", cat: "history", diff: 2 },
  { w: "WILLIAM", c: "Norman duke who conquered England in 1066", cat: "history", diff: 2 },
  { w: "CHARLEMAGNE", c: "Frankish king crowned the first Holy Roman Emperor", cat: "history", diff: 3 },
  { w: "BISMARCK", c: "Prussian statesman who unified Germany", cat: "history", diff: 3 },
  { w: "STALIN", c: "Soviet leader during much of the 20th century", cat: "history", diff: 2 },
  { w: "LENIN", c: "Leader of the Bolshevik Revolution", cat: "history", diff: 2 },
  { w: "COLONIST", c: "A settler in a new territory under a home government", cat: "history", diff: 2 },
  { w: "LOYALIST", c: "A colonist who remained faithful to the crown", cat: "history", diff: 3 },
  { w: "PATRIOT", c: "A colonist who supported independence", cat: "history", diff: 2 },
  { w: "MUSKETEER", c: "A historic soldier armed with a long gun", cat: "history", diff: 3 },
  { w: "CAVALRY", c: "Soldiers who fight on horseback", cat: "history", diff: 2 },
  { w: "INFANTRY", c: "Soldiers who fight on foot", cat: "history", diff: 2 },
  { w: "ARTILLERY", c: "Large-caliber weapons used in warfare", cat: "history", diff: 2 },
  { w: "TRENCH", c: "A dug defensive line used in WWI warfare", cat: "history", diff: 2 },
  { w: "BUNKER", c: "A fortified underground shelter", cat: "history", diff: 2 },
  { w: "BLOCKADE", c: "A military tactic sealing off a location", cat: "history", diff: 2 },
  { w: "MUTINY", c: "An open rebellion against authority, often naval", cat: "history", diff: 3 },
  { w: "COUP", c: "A sudden, illegal seizure of power", cat: "history", diff: 3 },
  { w: "DICTATOR", c: "A ruler with absolute, unchecked power", cat: "history", diff: 2 },
  { w: "TYRANT", c: "A cruel and oppressive ruler", cat: "history", diff: 2 },
  { w: "REGIME", c: "A particular government or ruling system", cat: "history", diff: 2 },
  { w: "CENSORSHIP", c: "Suppression of speech or information", cat: "history", diff: 2 },
  { w: "REVOLT", c: "An act of violent uprising", cat: "history", diff: 2 },
  { w: "UPRISING", c: "A rebellion or revolt against authority", cat: "history", diff: 2 },
  { w: "ABOLITION", c: "The formal ending of slavery", cat: "history", diff: 2 },
  { w: "SUFFRAGE", c: "The right to vote", cat: "history", diff: 2 },
  { w: "AMENDMENT", c: "A formal change to a constitution", cat: "history", diff: 2 },
  { w: "CENSUS", c: "An official population count with a long history", cat: "history", diff: 2 },
  { w: "GUILD", c: "A medieval association of craftsmen", cat: "history", diff: 3 },
  { w: "SERF", c: "A medieval peasant bound to the land", cat: "history", diff: 3 },
  { w: "VASSAL", c: "A medieval subject who owed loyalty to a lord", cat: "history", diff: 3 },
  { w: "FEUDALISM", c: "The medieval land-for-loyalty social system", cat: "history", diff: 3 },
  { w: "MONASTERY", c: "A medieval religious community's home", cat: "history", diff: 2 },
  { w: "CATHEDRAL", c: "A grand medieval church", cat: "history", diff: 1 },
  { w: "STAINEDGLASS", c: "Colorful decorative window art in old churches", cat: "history", diff: 2 },
  { w: "TAPESTRY", c: "A woven wall hanging depicting a scene", cat: "history", diff: 3 },
  { w: "ARMADA", c: "A large fleet of warships", cat: "history", diff: 2 },

  // sports (batch 5)
  { w: "OLYMPICGAMES", c: "Global multi-sport event held every four years", cat: "sports", diff: 1 },
  { w: "WORLDCUP", c: "Global soccer championship held every four years", cat: "sports", diff: 1 },
  { w: "SUPERBOWL", c: "The championship game of American football", cat: "sports", diff: 1 },
  { w: "WIMBLEDON", c: "Famous grass-court tennis championship", cat: "sports", diff: 2 },
  { w: "TOURDEFRANCE", c: "Legendary multi-stage cycling race", cat: "sports", diff: 2 },
  { w: "MARATHON", c: "26.2-mile endurance running race", cat: "sports", diff: 1 },
  { w: "IRONMAN", c: "Grueling triathlon combining three endurance events", cat: "sports", diff: 2 },
  { w: "GRANDSLAM", c: "Winning all four major titles in a season", cat: "sports", diff: 2 },
  { w: "HATTRICK", c: "Scoring three goals in a single game", cat: "sports", diff: 2 },
  { w: "ACE", c: "An unreturnable serve in tennis", cat: "sports", diff: 1 },
  { w: "BIRDIE", c: "A golf score of one under par", cat: "sports", diff: 2 },
  { w: "EAGLE", c: "A golf score of two under par", cat: "sports", diff: 2 },
  { w: "BOGEY", c: "A golf score of one over par", cat: "sports", diff: 2 },
  { w: "HOMERUN", c: "A baseball hit that clears the outfield fence", cat: "sports", diff: 1 },
  { w: "STRIKEOUT", c: "Three strikes against a baseball batter", cat: "sports", diff: 1 },
  { w: "TOUCHDOWN", c: "A six-point score in American football", cat: "sports", diff: 1 },
  { w: "FIELDGOAL", c: "A kicked score in American football", cat: "sports", diff: 2 },
  { w: "SLAMDUNK", c: "A forceful basketball shot straight through the hoop", cat: "sports", diff: 1 },
  { w: "FREETHROW", c: "An unguarded basketball shot after a foul", cat: "sports", diff: 1 },
  { w: "THREEPOINTER", c: "A basketball shot from beyond the arc", cat: "sports", diff: 2 },
  { w: "PENALTYKICK", c: "A free shot on goal awarded in soccer", cat: "sports", diff: 2 },
  { w: "CORNERKICK", c: "A soccer restart taken from the corner of the field", cat: "sports", diff: 2 },
  { w: "YELLOWCARD", c: "A soccer referee's warning card", cat: "sports", diff: 2 },
  { w: "REDCARD", c: "A soccer referee's ejection card", cat: "sports", diff: 2 },
  { w: "POWERPLAY", c: "A hockey advantage after an opponent's penalty", cat: "sports", diff: 2 },
  { w: "FACEOFF", c: "How play restarts in ice hockey", cat: "sports", diff: 2 },
  { w: "ICING", c: "A hockey rule violation for shooting the puck too far", cat: "sports", diff: 3 },
  { w: "DRIBBLING", c: "Bouncing or tapping a ball while moving", cat: "sports", diff: 1 },
  { w: "PASSING", c: "Moving the ball between teammates", cat: "sports", diff: 1 },
  { w: "TACKLING", c: "Bringing down an opponent who has the ball", cat: "sports", diff: 1 },
  { w: "BLOCKING", c: "Preventing an opponent's shot or pass", cat: "sports", diff: 1 },
  { w: "REBOUNDING", c: "Recovering a missed basketball shot", cat: "sports", diff: 2 },
  { w: "SUBSTITUTE", c: "A player who replaces another during a game", cat: "sports", diff: 1 },
  { w: "LINEUP", c: "The list of players starting a game", cat: "sports", diff: 1 },
  { w: "FORMATION", c: "A team's tactical arrangement on the field", cat: "sports", diff: 2 },

  // science (batch 5)
  { w: "PLANET", c: "A large body orbiting a star", cat: "science", diff: 1 },
  { w: "MERCURY", c: "The closest planet to the sun", cat: "science", diff: 1 },
  { w: "VENUS", c: "The hottest planet in the solar system", cat: "science", diff: 1 },
  { w: "MARS", c: "The Red Planet", cat: "science", diff: 1 },
  { w: "JUPITER", c: "The largest planet in the solar system", cat: "science", diff: 1 },
  { w: "SATURN", c: "The ringed planet", cat: "science", diff: 1 },
  { w: "URANUS", c: "The planet that rotates on its side", cat: "science", diff: 2 },
  { w: "NEPTUNE", c: "The windiest planet in the solar system", cat: "science", diff: 1 },
  { w: "PLUTO", c: "Once the ninth planet, now a dwarf planet", cat: "science", diff: 1 },
  { w: "SOLARSYSTEM", c: "The sun and everything orbiting it", cat: "science", diff: 1 },
  { w: "ASTRONAUT", c: "A person trained to travel into space", cat: "science", diff: 1 },
  { w: "SPACESHIP", c: "A vehicle for traveling through space", cat: "science", diff: 1 },
  { w: "SPACESTATION", c: "A habitable structure orbiting Earth", cat: "science", diff: 2 },
  { w: "ROVER", c: "A robotic vehicle that explores a planet's surface", cat: "science", diff: 1 },
  { w: "LAUNCH", c: "The moment a rocket lifts off", cat: "science", diff: 1 },
  { w: "ORBITER", c: "A spacecraft that circles a celestial body", cat: "science", diff: 2 },
  { w: "GRAVITYASSIST", c: "Using a planet's gravity to speed up a spacecraft", cat: "science", diff: 3 },
  { w: "GEOTHERMAL", c: "Energy harnessed from the Earth's internal heat", cat: "science", diff: 3 },
  { w: "RENEWABLE", c: "Energy from a naturally replenishing source", cat: "science", diff: 2 },
  { w: "FOSSILFUEL", c: "Energy source formed from ancient organic matter", cat: "science", diff: 2 },
  { w: "SOLARPANEL", c: "A device that converts sunlight into electricity", cat: "science", diff: 1 },
  { w: "TURBINE", c: "A machine that converts fluid flow into rotation", cat: "science", diff: 2 },
  { w: "GREENHOUSE", c: "Effect trapping heat in Earth's atmosphere", cat: "science", diff: 2 },
  { w: "POLLUTION", c: "Harmful substances introduced into the environment", cat: "science", diff: 1 },
  { w: "RECYCLING", c: "Converting waste into reusable material", cat: "science", diff: 1 },
  { w: "BIODIVERSITY", c: "The variety of life in an ecosystem", cat: "science", diff: 2 },
  { w: "EXTINCTION", c: "The complete dying-out of a species", cat: "science", diff: 1 },
  { w: "ADAPTATION", c: "A trait helping an organism survive its environment", cat: "science", diff: 2 },
  { w: "MUTATION", c: "A change in an organism's genetic code", cat: "science", diff: 2 },
  { w: "NATURALSELECTION", c: "The evolutionary process favoring beneficial traits", cat: "science", diff: 3 },
  { w: "CLONE", c: "A genetically identical copy of an organism", cat: "science", diff: 2 },
  { w: "STEMCELL", c: "An undifferentiated cell that can become many types", cat: "science", diff: 3 },

  // food (batch 5)
  { w: "ICECREAM", c: "Frozen, creamy sweet treat", cat: "food", diff: 1 },
  { w: "CHOCOLATE", c: "Sweet treat made from cacao", cat: "food", diff: 1 },
  { w: "CANDY", c: "Sweet confection, often for kids", cat: "food", diff: 1 },
  { w: "GUMMY", c: "Chewy, fruit-flavored candy", cat: "food", diff: 1 },
  { w: "LOLLIPOP", c: "Hard candy on a stick", cat: "food", diff: 1 },
  { w: "MARSHMALLOW", c: "Soft, fluffy sweet often roasted", cat: "food", diff: 1 },
  { w: "TOFFEE", c: "Buttery, chewy sugar candy", cat: "food", diff: 2 },
  { w: "FUDGE", c: "Rich, dense chocolate confection", cat: "food", diff: 1 },
  { w: "PRALINE", c: "Nut-based caramelized candy", cat: "food", diff: 3 },
  { w: "NOUGAT", c: "Chewy candy made with nuts and sugar", cat: "food", diff: 3 },
  { w: "LICORICE", c: "Chewy candy flavored with an anise-like root", cat: "food", diff: 2 },
  { w: "PEPPERMINT", c: "Cool, minty candy flavor", cat: "food", diff: 1 },
  { w: "BUTTERSCOTCH", c: "Buttery brown-sugar candy flavor", cat: "food", diff: 2 },
  { w: "SPRINKLES", c: "Tiny candy pieces used to decorate desserts", cat: "food", diff: 1 },
  { w: "FROSTING", c: "Sweet coating spread on a cake", cat: "food", diff: 1 },
  { w: "CUPCAKE", c: "Single-serving frosted cake", cat: "food", diff: 1 },
  { w: "GINGERBREAD", c: "Spiced cookie often shaped like a person", cat: "food", diff: 1 },
  { w: "SHORTBREAD", c: "Crumbly, buttery Scottish cookie", cat: "food", diff: 2 },
  { w: "OATMEALCOOKIE", c: "Chewy cookie made with rolled oats", cat: "food", diff: 2 },
  { w: "SNICKERDOODLE", c: "Cinnamon-sugar-coated cookie", cat: "food", diff: 3 },
  { w: "APPLEPIE", c: "Classic American dessert with a fruit filling", cat: "food", diff: 1 },
  { w: "PUMPKINPIE", c: "Autumn dessert made from squash filling", cat: "food", diff: 1 },
  { w: "CHEESECAKE", c: "Rich, creamy dessert with a graham cracker crust", cat: "food", diff: 1 },
  { w: "REDVELVET", c: "Deep red, cocoa-tinged layer cake", cat: "food", diff: 2 },
  { w: "CARROTCAKE", c: "Spiced cake studded with shredded vegetables", cat: "food", diff: 2 },
  { w: "BUTTERMILK", c: "Tangy dairy product used in baking", cat: "food", diff: 2 },
  { w: "WHIPPEDCREAM", c: "Light, airy dessert topping", cat: "food", diff: 1 },
  { w: "CUSTARD", c: "Rich, egg-thickened dessert", cat: "food", diff: 2 },
  { w: "PUDDING", c: "Soft, creamy spoonable dessert", cat: "food", diff: 1 },
  { w: "JELLY", c: "Fruit spread set with pectin", cat: "food", diff: 1 },
  { w: "PEANUTBUTTER", c: "Spread made from ground legumes", cat: "food", diff: 1 },
  { w: "CEREAL", c: "Breakfast food eaten with milk", cat: "food", diff: 1 },
  { w: "YOGURT", c: "Fermented, creamy dairy snack", cat: "food", diff: 1 },
  { w: "CHEESE", c: "Dairy product made by curdling milk", cat: "food", diff: 1 },
  { w: "BUTTER", c: "Churned dairy fat spread on bread", cat: "food", diff: 1 },
  { w: "CREAM", c: "Rich, fatty part of milk", cat: "food", diff: 1 },

  // kids (batch 5)
  { w: "TEDDYBEAR", c: "Classic stuffed animal companion", cat: "kids", diff: 1 },
  { w: "PACIFIER", c: "A soothing device for a baby", cat: "kids", diff: 2 },
  { w: "RATTLE", c: "A noisy toy shaken by a baby", cat: "kids", diff: 1 },
  { w: "STROLLER", c: "A wheeled seat for pushing a baby around", cat: "kids", diff: 1 },
  { w: "CRIB", c: "A baby's bed with railed sides", cat: "kids", diff: 1 },
  { w: "HIGHCHAIR", c: "A raised seat for feeding a small child", cat: "kids", diff: 1 },
  { w: "BIB", c: "A cloth worn to catch food spills", cat: "kids", diff: 1 },
  { w: "DIAPER", c: "What a baby wears before potty training", cat: "kids", diff: 1 },
  { w: "TOOTHFAIRY", c: "Who leaves money under your pillow for a lost tooth", cat: "kids", diff: 1 },
  { w: "EASTERBUNNY", c: "Who hides eggs on a spring holiday", cat: "kids", diff: 1 },
  { w: "REINDEER", c: "Santa's flying sleigh-pullers", cat: "kids", diff: 1 },
  { w: "RUDOLPH", c: "The reindeer with the glowing red nose", cat: "kids", diff: 1 },
  { w: "SNOWFLAKE", c: "A single crystal of falling snow", cat: "kids", diff: 1 },
  { w: "ICICLE", c: "A hanging spike of frozen dripping water", cat: "kids", diff: 1 },
  { w: "FIREWORKS", c: "Colorful explosive displays lighting up the sky", cat: "kids", diff: 1 },
  { w: "PARADE", c: "A festive procession down the street", cat: "kids", diff: 1 },
  { w: "CARNIVAL", c: "A festive fair with rides and games", cat: "kids", diff: 1 },
  { w: "FERRISWHEEL", c: "A giant rotating carnival wheel of seats", cat: "kids", diff: 1 },
  { w: "MERRYGOROUND", c: "A spinning carnival ride with painted horses", cat: "kids", diff: 1 },
  { w: "COTTONCANDY", c: "Spun sugar fair treat", cat: "kids", diff: 1 },
  { w: "CLOWN", c: "A colorfully dressed circus entertainer", cat: "kids", diff: 1 },
  { w: "JUGGLER", c: "A performer who keeps objects in the air", cat: "kids", diff: 1 },
  { w: "ACROBAT", c: "A performer skilled in daring physical feats", cat: "kids", diff: 2 },
  { w: "MAGICIAN", c: "A performer of illusions and tricks", cat: "kids", diff: 1 },
  { w: "COSTUME", c: "An outfit worn to dress up as someone else", cat: "kids", diff: 1 },
  { w: "TRICKORTREAT", c: "What kids say going door to door for candy", cat: "kids", diff: 1 },
  { w: "JACKOLANTERN", c: "A carved, glowing pumpkin", cat: "kids", diff: 1 },
  { w: "SCARECROW", c: "A stuffed figure meant to frighten birds away", cat: "kids", diff: 1 },
  { w: "GHOST", c: "A sheet-draped spooky spirit costume", cat: "kids", diff: 1 },
  { w: "SKELETON", c: "A bony Halloween costume classic", cat: "kids", diff: 1 },
  { w: "VAMPIRE", c: "A fanged, cape-wearing Halloween character", cat: "kids", diff: 1 },
  { w: "WEREWOLF", c: "A person who transforms into a wolf", cat: "kids", diff: 1 },
  { w: "ZOMBIE", c: "A shuffling, undead Halloween character", cat: "kids", diff: 1 },

  // general (batch 5, more everyday fill words)
  { w: "MORNING", c: "The start of the day", cat: "general", diff: 1 },
  { w: "NOON", c: "The middle of the day", cat: "general", diff: 1 },
  { w: "MIDNIGHT", c: "The middle of the night", cat: "general", diff: 1 },
  { w: "DAWN", c: "The first light of day", cat: "general", diff: 1 },
  { w: "DUSK", c: "The fading light before night", cat: "general", diff: 1 },
  { w: "SUNRISE", c: "When the sun first appears over the horizon", cat: "general", diff: 1 },
  { w: "SUNSET", c: "When the sun disappears below the horizon", cat: "general", diff: 1 },
  { w: "CALENDAR", c: "A chart organizing days into months", cat: "general", diff: 1 },
  { w: "SCHEDULE", c: "A planned list of times and events", cat: "general", diff: 1 },
  { w: "APPOINTMENT", c: "An arranged meeting at a set time", cat: "general", diff: 1 },
  { w: "DEADLINE", c: "The latest time something is due", cat: "general", diff: 1 },
  { w: "ROUTINE", c: "A regular, fixed sequence of actions", cat: "general", diff: 1 },
  { w: "HABIT", c: "A settled, regularly repeated practice", cat: "general", diff: 1 },
  { w: "CUSTOM", c: "A traditional way of behaving", cat: "general", diff: 1 },
  { w: "TRADITION", c: "A long-established custom passed down", cat: "general", diff: 1 },
  { w: "CELEBRATION", c: "A festive event marking something special", cat: "general", diff: 1 },
  { w: "ANNIVERSARY", c: "The yearly return of a notable date", cat: "general", diff: 1 },
  { w: "REUNION", c: "A gathering of people who haven't met in a while", cat: "general", diff: 1 },
  { w: "GATHERING", c: "A group of people assembled together", cat: "general", diff: 1 },
  { w: "NEIGHBOR", c: "A person who lives nearby", cat: "general", diff: 1 },
  { w: "STRANGER", c: "A person you don't know", cat: "general", diff: 1 },
  { w: "COMPANION", c: "A person who accompanies another", cat: "general", diff: 1 },
  { w: "PARTNER", c: "A person who works or plays alongside another", cat: "general", diff: 1 },
  { w: "COLLEAGUE", c: "A person you work with", cat: "general", diff: 1 },
  { w: "MENTOR", c: "An experienced advisor and guide", cat: "general", diff: 2 },
  { w: "STUDENT", c: "A person who is learning", cat: "general", diff: 1 },
  { w: "TEACHER", c: "A person who instructs others", cat: "general", diff: 1 },
  { w: "LESSON", c: "A period of instruction on a topic", cat: "general", diff: 1 },
  { w: "HOMEWORK", c: "Schoolwork done outside of class", cat: "general", diff: 1 },
  { w: "LIBRARY", c: "A building full of books to borrow", cat: "general", diff: 1 },
  { w: "MUSEUM", c: "A building displaying objects of interest", cat: "general", diff: 1 },
  { w: "GALLERY", c: "A room or building displaying art", cat: "general", diff: 1 },
  { w: "THEATER", c: "A venue for watching plays or films", cat: "general", diff: 1 },
  { w: "STADIUM", c: "A large venue for sporting events", cat: "general", diff: 1 },
  { w: "MARKET", c: "A place where goods are bought and sold", cat: "general", diff: 1 },
  { w: "FACTORY", c: "A building where goods are manufactured", cat: "general", diff: 1 },
  { w: "WAREHOUSE", c: "A large building for storing goods", cat: "general", diff: 1 },
  { w: "OFFICE", c: "A room or building for professional work", cat: "general", diff: 1 },
  { w: "HOSPITAL", c: "A building where the sick are treated", cat: "general", diff: 1 },
  { w: "PHARMACY", c: "A shop that dispenses medicine", cat: "general", diff: 1 },
  { w: "BAKERY", c: "A shop that sells baked goods", cat: "general", diff: 1 },
];


// Across — crossword grid generator.
//
// A simplified constraint-based fill: place the longest candidate word,
// then greedily place further words wherever they can validly intersect
// what's already down, backtracking-free (skip and move to the next
// candidate on failure rather than undoing prior placements). This is not
// the symmetric-block-pattern-first approach a real NYT-style constructor
// uses — grids will be sparser and less uniformly shaped — but it's real
// interlocking generation from the word bank, constrained by keywords,
// size, and difficulty.
//
// Density is improved three cost-bounded ways (kept bounded rather than
// exhaustive because this runs as pure CPU-bound JS inside a Cloudflare
// Worker request, which has a real — and on the free plan, tight — CPU
// time budget per invocation; unlike I/O waits, computation time here
// counts directly against that budget):
//   1. findPlacement prefers a placement that overlaps 2+ existing letters
//      over one that only overlaps 1, instead of just taking whichever
//      valid spot is scanned first.
//   2. attemptFill sweeps the candidate list up to 3 times — a word that
//      couldn't intersect anything on pass 1 often can once more letters
//      are down from later passes.
//   3. generatePuzzle tries a few full reshuffled attempts and keeps
//      whichever produced the tightest-packed (highest fill-ratio) grid.
// Together that's at most a 3x3=9x multiplier over the original
// single-pass/single-attempt cost, not an unbounded search.

const SIZE_MAP = { mini: 5, standard: 11, large: 15 };
const DIFFICULTY_MAP = { easy: 1, medium: 2, hard: 3 };
// Aspirational caps — the fill loop stops early if the candidate pool (esp.
// a narrow single-category one) runs out before reaching these.
const TARGET_WORDS = { mini: 8, standard: 24, large: 38 };
const FILL_ATTEMPTS = 5;
const FILL_PASSES = 4;

function generatePuzzle({ keywords = [], size = "standard", difficulty = "medium", wordBank }) {
  const n = SIZE_MAP[size] || SIZE_MAP.standard;
  const maxDiff = DIFFICULTY_MAP[difficulty] || DIFFICULTY_MAP.medium;
  const targetWords = TARGET_WORDS[size] || TARGET_WORDS.standard;

  const groups = buildCandidateGroups(wordBank, keywords, maxDiff, n);
  let result = attemptBest(groups, n, targetWords);

  if (result.words.length < 3 && keywords.length > 0) {
    // Keywords were too restrictive to build a real grid — retry with the
    // full corpus so puzzle creation doesn't just fail on a niche topic.
    const fallbackGroups = buildCandidateGroups(wordBank, [], maxDiff, n);
    result = attemptBest(fallbackGroups, n, targetWords);
  }

  if (result.words.length < 3) {
    throw new Error("could not generate enough interlocking words for this size/difficulty");
  }

  return cropAndNumber(result.grid, result.words, n);
}

// Runs a few independently-reshuffled fill attempts and keeps whichever
// packed the most letters into the tightest bounding box — a cheap stand-in
// for real backtracking search.
function attemptBest(groups, n, targetWords) {
  let best = null;
  let bestScore = -1;
  for (let i = 0; i < FILL_ATTEMPTS; i++) {
    const candidates = groups.flatMap((g) => shuffleByLength(g));
    const result = attemptFill(candidates, n, targetWords);
    const score = densityScore(result.grid, n);
    if (score > bestScore) {
      bestScore = score;
      best = result;
    }
  }
  return best;
}

function densityScore(grid, n) {
  let minRow = n, maxRow = -1, minCol = n, maxCol = -1, filled = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c].letter) {
        minRow = Math.min(minRow, r);
        maxRow = Math.max(maxRow, r);
        minCol = Math.min(minCol, c);
        maxCol = Math.max(maxCol, c);
        filled++;
      }
    }
  }
  if (filled === 0) return 0;
  const area = (maxRow - minRow + 1) * (maxCol - minCol + 1);
  // Filled-cell count weighted by how tightly packed they are — rewards
  // both "more words" and "less white space" together, since either alone
  // is a bad proxy (a tiny fully-packed cluster shouldn't beat a bigger,
  // still-reasonably-dense grid).
  return filled * (filled / area);
}

// Returns priority-ordered *groups* (not a flat shuffled list) so
// attemptBest can reshuffle within each group per attempt while preserving
// the strong/weak keyword-match priority across every attempt.
function buildCandidateGroups(wordBank, keywords, maxDiff, n) {
  const seen = new Set();
  const deduped = [];
  for (const entry of wordBank) {
    const w = entry.w.toUpperCase();
    if (!/^[A-Z]+$/.test(w)) continue;
    if (w.length < 3 || w.length > n) continue;
    if (entry.diff > maxDiff) continue;
    if (seen.has(w)) continue;
    seen.add(w);
    deduped.push({ word: w, clue: entry.c, cat: entry.cat });
  }

  // Multi-word topics ("European capitals") almost never appear as one
  // exact substring in a clue, so match on individual significant words
  // instead (dropping short stopwords that would otherwise match almost
  // everything).
  const STOPWORDS = new Set(["the", "and", "for", "with", "from", "that", "this", "are", "was", "were"]);
  const rawTokens = keywords
    .flatMap((k) => k.toLowerCase().split(/\s+/))
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
  // A plain substring check misses "capitals" against a clue that says
  // "capital" (singular) — add the naive-singular form of any plural-looking
  // token so simple pluralization doesn't cause a miss.
  const keywordTokens = [...new Set(rawTokens.flatMap((t) => (t.endsWith("s") && t.length > 4 ? [t, t.slice(0, -1)] : [t])))];
  const matchCount = (entry) => {
    if (keywordTokens.length === 0) return 0;
    const hay = `${entry.word.toLowerCase()} ${entry.clue.toLowerCase()} ${entry.cat.toLowerCase()}`;
    return keywordTokens.reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0);
  };

  if (keywordTokens.length === 0) return [deduped];

  // Keyword-topic puzzles stay 100% on-topic — no silent padding from the
  // rest of the word bank. If that's too sparse to build a real grid,
  // generatePuzzle()'s caller-level fallback retries with the full corpus.
  //
  // Entries matching more than one keyword token (e.g. both "european" and
  // "capital" for the topic "European capitals") are placed first, so a
  // compound topic prioritizes its most specifically-relevant words as
  // anchors before falling back to single-token matches to fill the grid.
  const strong = [];
  const weak = [];
  for (const entry of deduped) {
    const n = matchCount(entry);
    if (n >= 2) strong.push(entry);
    else if (n === 1) weak.push(entry);
  }
  return [strong, weak];
}

function shuffleByLength(list) {
  // Sort longest-first (better anchors / more intersection surface),
  // shuffling within each length band so regenerating the same request
  // doesn't always produce an identical grid.
  const byLength = new Map();
  for (const entry of list) {
    if (!byLength.has(entry.word.length)) byLength.set(entry.word.length, []);
    byLength.get(entry.word.length).push(entry);
  }
  const lengths = [...byLength.keys()].sort((a, b) => b - a);
  const out = [];
  for (const len of lengths) {
    const bucket = byLength.get(len);
    for (let i = bucket.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bucket[i], bucket[j]] = [bucket[j], bucket[i]];
    }
    out.push(...bucket);
  }
  return out;
}

function attemptFill(candidates, n, targetWords) {
  if (candidates.length === 0) return { grid: makeEmptyGrid(n), words: [] };

  const grid = makeEmptyGrid(n);
  const words = [];
  const placedSet = new Set();

  const first = candidates[0];
  const startRow = Math.floor(n / 2);
  const startCol = Math.floor((n - first.word.length) / 2);
  placeWord(grid, first.word, startRow, startCol, "across");
  words.push(makeWordRecord(first, startRow, startCol, "across", words.length));
  placedSet.add(first.word);

  // Multiple sweeps: a word that couldn't intersect anything on pass 1 may
  // become placeable once later words in that same pass opened up new
  // letters, so re-sweep the still-unplaced candidates a bounded number of
  // times rather than a single forward pass.
  for (let pass = 0; pass < FILL_PASSES && words.length < targetWords; pass++) {
    let placedThisPass = false;
    for (let idx = 1; idx < candidates.length && words.length < targetWords; idx++) {
      const entry = candidates[idx];
      if (placedSet.has(entry.word)) continue;
      const placement = findPlacement(grid, entry.word, n);
      if (!placement) continue;
      placeWord(grid, entry.word, placement.row, placement.col, placement.direction);
      words.push(makeWordRecord(entry, placement.row, placement.col, placement.direction, words.length));
      placedSet.add(entry.word);
      placedThisPass = true;
    }
    if (!placedThisPass) break; // no point sweeping again if nothing changed
  }

  return { grid, words };
}

function makeWordRecord(entry, row, col, direction, tempId) {
  return { id: tempId, answer: entry.word, clue: entry.clue, row, col, direction, length: entry.word.length };
}

function makeEmptyGrid(n) {
  const grid = [];
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push({ letter: null, across: false, down: false });
    grid.push(row);
  }
  return grid;
}

function inBounds(n, r, c) {
  return r >= 0 && r < n && c >= 0 && c < n;
}

// Prefers a placement that overlaps 2+ existing letters (denser — it's
// pulling double duty crossing two words) over one that only overlaps the
// single letter it was found from, but doesn't exhaustively search for the
// true best — stops as soon as it finds a "good enough" (2+) one, falling
// back to the first valid placement seen if nothing better ever turns up.
// Same overall scan cost as plain first-fit, just smarter about which hit
// it commits to.
function findPlacement(grid, word, n) {
  let fallback = null;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const cell = grid[r][c];
        if (cell.letter !== letter) continue;

        let direction = null;
        if (cell.across && !cell.down) direction = "down";
        else if (cell.down && !cell.across) direction = "across";
        else continue; // both taken, or neither (shouldn't happen for a filled cell)

        const row = direction === "down" ? r - i : r;
        const col = direction === "across" ? c - i : c;
        const overlaps = validPlacementOverlaps(grid, word, row, col, direction, n);
        if (overlaps === 0) continue; // invalid
        if (overlaps >= 2) return { row, col, direction };
        if (!fallback) fallback = { row, col, direction };
      }
    }
  }
  return fallback;
}

// Returns the number of existing letters this placement would overlap
// (always >=1 for a valid placement, since it must intersect something to
// be valid at all), or 0 if the placement isn't valid.
function validPlacementOverlaps(grid, word, row, col, direction, n) {
  return isValidPlacement(grid, word, row, col, direction, n) ? countOverlaps(grid, word, row, col, direction) : 0;
}

function countOverlaps(grid, word, row, col, direction) {
  const dRow = direction === "down" ? 1 : 0;
  const dCol = direction === "across" ? 1 : 0;
  let overlaps = 0;
  for (let i = 0; i < word.length; i++) {
    if (grid[row + dRow * i][col + dCol * i].letter) overlaps++;
  }
  return overlaps;
}

function isValidPlacement(grid, word, row, col, direction, n) {
  const dRow = direction === "down" ? 1 : 0;
  const dCol = direction === "across" ? 1 : 0;

  const endRow = row + dRow * (word.length - 1);
  const endCol = col + dCol * (word.length - 1);
  if (!inBounds(n, row, col) || !inBounds(n, endRow, endCol)) return false;

  const beforeRow = row - dRow;
  const beforeCol = col - dCol;
  if (inBounds(n, beforeRow, beforeCol) && grid[beforeRow][beforeCol].letter) return false;
  const afterRow = row + dRow * word.length;
  const afterCol = col + dCol * word.length;
  if (inBounds(n, afterRow, afterCol) && grid[afterRow][afterCol].letter) return false;

  let hasIntersection = false;
  for (let i = 0; i < word.length; i++) {
    const r = row + dRow * i;
    const c = col + dCol * i;
    const cell = grid[r][c];

    if (cell.letter) {
      if (cell.letter !== word[i]) return false;
      // Existing cell being crossed — must not already have this same
      // direction occupied (would mean overlapping parallel words).
      if (direction === "across" && cell.across) return false;
      if (direction === "down" && cell.down) return false;
      hasIntersection = true;
      continue;
    }

    // New cell for this word — its perpendicular neighbors must be empty,
    // otherwise it would silently run alongside another word.
    const perp1r = r + dCol;
    const perp1c = c + dRow;
    const perp2r = r - dCol;
    const perp2c = c - dRow;
    if (inBounds(n, perp1r, perp1c) && grid[perp1r][perp1c].letter) return false;
    if (inBounds(n, perp2r, perp2c) && grid[perp2r][perp2c].letter) return false;
  }

  return hasIntersection;
}

function placeWord(grid, word, row, col, direction) {
  const dRow = direction === "down" ? 1 : 0;
  const dCol = direction === "across" ? 1 : 0;
  for (let i = 0; i < word.length; i++) {
    const r = row + dRow * i;
    const c = col + dCol * i;
    grid[r][c].letter = word[i];
    if (direction === "across") grid[r][c].across = true;
    else grid[r][c].down = true;
  }
}

function cropAndNumber(grid, words, n) {
  let minRow = n, maxRow = -1, minCol = n, maxCol = -1;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c].letter) {
        minRow = Math.min(minRow, r);
        maxRow = Math.max(maxRow, r);
        minCol = Math.min(minCol, c);
        maxCol = Math.max(maxCol, c);
      }
    }
  }

  const rows = maxRow - minRow + 1;
  const cols = maxCol - minCol + 1;

  const cells = [];
  const numberAt = new Map();
  let nextNumber = 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const src = grid[r + minRow][c + minCol];
      const block = !src.letter;
      let number = null;
      if (!block) {
        const startsAcross = src.across && (c === 0 || !grid[r + minRow][c + minCol - 1].letter) && c + 1 < cols && grid[r + minRow][c + minCol + 1]?.letter;
        const startsDown = src.down && (r === 0 || !grid[r + minRow - 1][c + minCol]?.letter) && r + 1 < rows && grid[r + minRow + 1]?.[c + minCol]?.letter;
        if (startsAcross || startsDown) {
          number = nextNumber++;
          numberAt.set(`${r}-${c}`, number);
        }
      }
      cells.push({ row: r, col: c, letter: block ? null : src.letter, block, number });
    }
  }

  const finalWords = words.map((w) => {
    const row = w.row - minRow;
    const col = w.col - minCol;
    const number = numberAt.get(`${row}-${col}`) || null;
    const wordCells = [];
    for (let i = 0; i < w.length; i++) {
      wordCells.push(w.direction === "across" ? [row, col + i] : [row + i, col]);
    }
    return { number, direction: w.direction, answer: w.answer, clue: w.clue, row, col, length: w.length, cells: wordCells };
  }).filter((w) => w.number !== null)
    .sort((a, b) => a.number - b.number || (a.direction === "across" ? 0 : 1) - (b.direction === "across" ? 0 : 1));

  return { rows, cols, cells, words: finalWords };
}


// Across — Cloudflare Worker.
//
// Same "holds the one GitHub token server-side" pattern as Boys Pushup
// Bonanza's worker, plus one new piece Bonanza didn't need: a Durable Object
// (PuzzleRoom) that holds *live* in-progress grid state and pushes it to
// connected players over WebSockets, since collaborative letter-by-letter
// typing needs sub-second propagation that a commit-per-write pattern can't
// give it. Completed/durable puzzle data still lives in data.json in GitHub,
// exactly like Bonanza's sessions.
//
//   GET  /data                       -> current data.json contents (no auth to read)
//   POST /register-user   { user }                              -> creates the user if new, assigns a stable color hue
//   POST /delete-user     { user }                              -> removes the user record and scrubs them from every puzzle's player list
//   POST /create-puzzle   { title, description, keywords[], size, difficulty, visibility, createdBy }
//                                                                 -> generates a grid from the word bank, creates the puzzle, server-assigns id
//   POST /join-puzzle     { puzzleId, user }                     -> adds user to the puzzle's player list
//   POST /delete-puzzle   { puzzleId }                           -> removes the puzzle from data.json, wipes its PuzzleRoom DO
//                                                                    state, and disconnects anyone still in it
//   POST /complete-puzzle { puzzleId, cells, sessions, totalTimeMs, completed }
//                                                                 -> manual/fallback snapshot commit; the PuzzleRoom DO normally
//                                                                    commits snapshots directly (see commitSnapshot below) since it
//                                                                    shares this Worker's env/secrets, but this REST path exists too
//   GET/Upgrade /puzzle/:id/connect                              -> WebSocket, routed to that puzzle's PuzzleRoom Durable Object
//
// Required Worker secrets/variables (Settings -> Variables and Secrets):
//   GITHUB_TOKEN   (secret)  fine-grained PAT, Contents: Read and write, scoped to one repo
//   GH_OWNER       (var)     e.g. "heee"
//   GH_REPO        (var)     e.g. "across"
//   GH_BRANCH      (var)     e.g. "main"
//   APP_KEY        (secret)  any string; must match APP_KEY in config.js — a casual
//                            deterrent only, not real auth (visible in client source)
//   ALLOWED_ORIGIN (var)     e.g. "https://<you>.github.io"
//
// Required binding (Settings -> Bindings -> Durable Object, dashboard-only —
// see README, this is the one step that can't be done via Quick Edit):
//   PUZZLE_ROOM -> class PuzzleRoom (this file)


const PLAYER_HUES = [250, 30, 140, 90, 320, 190, 10, 220];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(env);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const puzzleConnectMatch = url.pathname.match(/^\/puzzle\/([a-zA-Z0-9_-]+)\/connect$/);
    if (puzzleConnectMatch) {
      const id = env.PUZZLE_ROOM.idFromName(puzzleConnectMatch[1]);
      const stub = env.PUZZLE_ROOM.get(id);
      return stub.fetch(request);
    }

    if (url.pathname === "/data" && request.method === "GET") {
      try {
        const { data } = await fetchGithubFile(env);
        return json(data, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/register-user" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const name = typeof body?.user === "string" ? body.user.trim().slice(0, 40) : "";
      if (!name) return json({ error: "invalid user" }, 400, cors);

      try {
        let user;
        await commitMutation(env, (data) => {
          if (!data.users[name]) {
            const hue = PLAYER_HUES[Object.keys(data.users).length % PLAYER_HUES.length];
            data.users[name] = {
              hue,
              createdAt: new Date().toISOString(),
              settings: { push: true, sound: true, haptic: true },
            };
          }
          user = data.users[name];
        }, `Register user: ${name}`);
        return json({ ok: true, user: { name, ...user } }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/delete-user" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const name = typeof body?.user === "string" ? body.user.trim().slice(0, 40) : "";
      if (!name) return json({ error: "invalid user" }, 400, cors);

      try {
        await commitMutation(env, (data) => {
          delete data.users[name];
          for (const p of Object.values(data.puzzles)) {
            p.players = (p.players || []).filter((n) => n !== name);
          }
        }, `Delete user: ${name}`);
        return json({ ok: true }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/delete-puzzle" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const puzzleId = typeof body?.puzzleId === "string" ? body.puzzleId.slice(0, 64) : "";
      if (!puzzleId) return json({ error: "invalid payload" }, 400, cors);

      try {
        await commitMutation(env, (data) => {
          delete data.puzzles[puzzleId];
        }, `Delete puzzle: ${puzzleId}`);
        // Also clear the DO's own live copy and kick anyone still connected,
        // otherwise it keeps serving (and re-committing) the deleted puzzle.
        const roomId = env.PUZZLE_ROOM.idFromName(puzzleId);
        const stub = env.PUZZLE_ROOM.get(roomId);
        await stub.fetch("https://internal/delete", { method: "POST" });
        return json({ ok: true }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/create-puzzle" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const validated = validateCreateRequest(body);
      if (!validated) return json({ error: "invalid puzzle payload" }, 400, cors);

      let puzzle;
      try {
        puzzle = buildPuzzle(validated, WORD_BANK);
      } catch (e) {
        return json({ error: `generation failed: ${e.message}` }, 422, cors);
      }

      try {
        await commitMutation(env, (data) => {
          data.puzzles[puzzle.id] = puzzle;
        }, `Create puzzle: ${puzzle.title}`);
        // Seed the live room so the creator's first connect has state immediately.
        const roomId = env.PUZZLE_ROOM.idFromName(puzzle.id);
        const stub = env.PUZZLE_ROOM.get(roomId);
        await stub.fetch("https://internal/seed", {
          method: "POST",
          body: JSON.stringify(puzzle),
          headers: { "Content-Type": "application/json" },
        });
        return json({ ok: true, puzzle }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/join-puzzle" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const puzzleId = typeof body?.puzzleId === "string" ? body.puzzleId.slice(0, 64) : "";
      const user = typeof body?.user === "string" ? body.user.trim().slice(0, 40) : "";
      if (!puzzleId || !user) return json({ error: "invalid payload" }, 400, cors);

      try {
        await commitMutation(env, (data) => {
          const puzzle = data.puzzles[puzzleId];
          if (!puzzle) throw new Error("puzzle not found");
          if (!puzzle.players.includes(user)) puzzle.players.push(user);
          if (!puzzle.sessions[user]) puzzle.sessions[user] = newSession();
        }, `Join puzzle: ${user} -> ${puzzleId}`);
        return json({ ok: true }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    // Internal — called by PuzzleRoom DO only, never directly by clients.
    if (url.pathname === "/complete-puzzle" && request.method === "POST") {
      const body = await safeJson(request);
      const { puzzleId, cells, sessions, totalTimeMs, completed } = body || {};
      if (!puzzleId) return json({ error: "invalid payload" }, 400, cors);

      try {
        await commitMutation(env, (data) => {
          const puzzle = data.puzzles[puzzleId];
          if (!puzzle) throw new Error("puzzle not found");
          puzzle.cells = cells;
          puzzle.sessions = sessions;
          puzzle.totalTimeMs = totalTimeMs;
          if (completed && !puzzle.completedAt) {
            puzzle.completedAt = new Date().toISOString();
            puzzle.state = "completed";
            puzzle.highlights = computeHighlights(puzzle);
          }
        }, `Snapshot puzzle: ${puzzleId}${completed ? " (completed)" : ""}`);
        return json({ ok: true }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    return json({ error: "not found" }, 404, cors);
  },
};

// ===========================================================================
// PuzzleRoom Durable Object — one instance per active puzzle.
// ===========================================================================

export class PuzzleRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sockets = new Map(); // WebSocket -> { user }
    this.puzzle = null; // loaded lazily from storage
    this.lastPersist = 0;
    this.deleted = false;
  }

  async loadPuzzle() {
    if (this.deleted) return null;
    if (this.puzzle) return this.puzzle;
    this.puzzle = (await this.state.storage.get("puzzle")) || null;
    return this.puzzle;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/seed" && request.method === "POST") {
      const puzzle = await request.json();
      await this.state.storage.put("puzzle", puzzle);
      this.puzzle = puzzle;
      return new Response("ok");
    }

    if (url.pathname === "/delete" && request.method === "POST") {
      this.deleted = true; // blocks any in-flight persist from re-committing it
      this.broadcast({ type: "puzzle-deleted" }, null);
      for (const socket of this.sockets.keys()) {
        try { socket.close(1000, "puzzle deleted"); } catch (e) {}
      }
      this.sockets.clear();
      this.puzzle = null;
      await this.state.storage.deleteAll();
      return new Response("ok");
    }

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("expected websocket", { status: 426 });
    }

    const user = url.searchParams.get("user") || "anonymous";
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();
    await this.loadPuzzle();

    // /join-puzzle (a plain REST call) only ever updates GitHub's data.json
    // — it never reaches this Durable Object, which holds its own separate
    // live copy of the puzzle in durable storage. Without this, a player
    // who joined but wasn't the original creator would never appear in
    // this.puzzle.players (what onInit actually sends to clients), even
    // though they're actively connected and typing. Connecting via
    // WebSocket is required to play at all, so it's a reliable signal to
    // self-heal that list here regardless of whether /join-puzzle ran.
    if (this.puzzle && !this.puzzle.players.includes(user)) {
      this.puzzle.players.push(user);
      await this.state.storage.put("puzzle", this.puzzle);
    }

    this.sockets.set(server, { user });
    this.sendTo(server, { type: "init", puzzle: this.puzzle, presence: this.presenceList() });
    this.broadcastPresence();

    server.addEventListener("message", (evt) => this.handleMessage(server, user, evt));
    server.addEventListener("close", () => {
      this.sockets.delete(server);
      this.broadcastPresence();
    });
    server.addEventListener("error", () => {
      this.sockets.delete(server);
      this.broadcastPresence();
    });

    return new Response(null, { status: 101, webSocket: client });
  }

  presenceList() {
    return [...this.sockets.values()].map((v) => v.user);
  }

  broadcastPresence() {
    this.broadcast({ type: "presence", players: this.presenceList() }, null);
  }

  sendTo(socket, msg) {
    try {
      socket.send(JSON.stringify(msg));
    } catch (e) {
      // socket already gone; will be cleaned up on next close/error event
    }
  }

  broadcast(msg, exceptSocket) {
    const payload = JSON.stringify(msg);
    for (const socket of this.sockets.keys()) {
      if (socket === exceptSocket) continue;
      try {
        socket.send(payload);
      } catch (e) {
        // ignore; cleaned up on close
      }
    }
  }

  async handleMessage(socket, user, evt) {
    let msg;
    try {
      msg = JSON.parse(evt.data);
    } catch (e) {
      return;
    }
    await this.loadPuzzle();
    if (!this.puzzle) return;

    if (msg.type === "cell-update") {
      const { row, col, letter, isCorrect, corrected, wordCompleted } = msg;
      if (!Number.isInteger(row) || !Number.isInteger(col)) return;
      if (typeof letter !== "string" || letter.length > 1) return;
      const key = `${row}-${col}`;
      if (!this.puzzle.grid.cells.some((c) => c.row === row && c.col === col && !c.block)) return;

      this.puzzle.cells[key] = { letter: letter.toUpperCase(), owner: user, revealed: false };
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      const sess = this.puzzle.sessions[user];
      if (letter) {
        sess.lettersEntered += 1;
        if (isCorrect) sess.correctLetters += 1;
        else sess.incorrectLetters += 1;
        if (corrected) sess.correctionsMade += 1;
      }
      if (wordCompleted) sess.wordsCompleted += 1;

      this.broadcast({ type: "cell-update", row, col, letter: letter.toUpperCase(), owner: user }, socket);

      const isComplete = this.checkComplete();
      await this.persist(isComplete);
      if (isComplete) {
        this.broadcast({ type: "completed" }, null);
      }
    } else if (msg.type === "cursor") {
      this.broadcast({ type: "cursor", user, row: msg.row, col: msg.col, direction: msg.direction }, socket);
    } else if (msg.type === "reveal") {
      const { row, col, letter } = msg;
      const key = `${row}-${col}`;
      this.puzzle.cells[key] = { letter, owner: null, revealed: true };
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      this.puzzle.sessions[user].revealsUsed += 1;
      this.broadcast({ type: "cell-update", row, col, letter, owner: null, revealed: true }, null);
      const isComplete = this.checkComplete();
      await this.persist(isComplete);
      if (isComplete) {
        this.broadcast({ type: "completed" }, null);
      }
    } else if (msg.type === "auto-check-on") {
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      this.puzzle.sessions[user].autoCheckUsed = true;
      await this.persist(false);
    } else if (msg.type === "time-heartbeat") {
      // Bounded sanity check — a heartbeat should only ever cover the client's
      // own flush interval (see FLUSH_INTERVAL_MS in app.js), never something
      // wildly larger (clock skew, a resumed/suspended tab, a bad client).
      const deltaMs = Number(msg.deltaMs);
      if (!Number.isFinite(deltaMs) || deltaMs <= 0 || deltaMs > 120000) return;
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      this.puzzle.sessions[user].timeSpentMs = (this.puzzle.sessions[user].timeSpentMs || 0) + deltaMs;
      this.puzzle.totalTimeMs = Object.values(this.puzzle.sessions).reduce((s, sess) => s + (sess.timeSpentMs || 0), 0);
      this.broadcast({ type: "time-update", sessions: this.puzzle.sessions, totalTimeMs: this.puzzle.totalTimeMs }, socket);
      await this.persist(false);
    }
  }

  checkComplete() {
    for (const cell of this.puzzle.grid.cells) {
      if (cell.block) continue;
      const key = `${cell.row}-${cell.col}`;
      const filled = this.puzzle.cells[key];
      if (!filled || filled.letter !== cell.letter) return false;
    }
    return true;
  }

  async persist(completed) {
    // A message that arrived just before/during deletion must not resurrect
    // the puzzle in storage or re-commit it to data.json.
    if (this.deleted || !this.puzzle) return;
    await this.state.storage.put("puzzle", this.puzzle);
    const now = Date.now();
    // Snapshot to GitHub on completion always; otherwise throttle to avoid
    // hammering the GitHub API on every keystroke from every player.
    if (completed || now - this.lastPersist > 15000) {
      this.lastPersist = now;
      await this.commitSnapshot(completed);
    }
  }

  async commitSnapshot(completed) {
    // The DO has the same env bindings/secrets as the parent Worker, so it
    // commits directly rather than round-tripping through the Worker's fetch.
    await commitMutation(this.env, (data) => {
      const puzzle = data.puzzles[this.puzzle.id];
      if (!puzzle) return;
      puzzle.cells = this.puzzle.cells;
      puzzle.sessions = this.puzzle.sessions;
      if (completed && !puzzle.completedAt) {
        puzzle.completedAt = new Date().toISOString();
        puzzle.state = "completed";
        puzzle.grid = this.puzzle.grid;
        puzzle.highlights = computeHighlights(puzzle);
      }
    }, `Snapshot puzzle: ${this.puzzle.id}${completed ? " (completed)" : ""}`);
  }
}

// ===========================================================================
// Puzzle generation
// ===========================================================================

function validateCreateRequest(body) {
  if (!body || typeof body !== "object") return null;
  const title = String(body.title || "").trim().slice(0, 60);
  const description = String(body.description || "").trim().slice(0, 140);
  const keywords = Array.isArray(body.keywords) ? body.keywords.map((k) => String(k).trim().toLowerCase()).filter(Boolean).slice(0, 10) : [];
  const size = ["mini", "standard", "large"].includes(body.size) ? body.size : "standard";
  const difficulty = ["easy", "medium", "hard"].includes(body.difficulty) ? body.difficulty : "medium";
  const visibility = body.visibility === "private" ? "private" : "open";
  const createdBy = String(body.createdBy || "").trim().slice(0, 40);
  if (!title || !createdBy) return null;
  return { title, description, keywords, size, difficulty, visibility, createdBy };
}

function buildPuzzle(req, wordBank) {
  const grid = generatePuzzle({ keywords: req.keywords, title: req.title, size: req.size, difficulty: req.difficulty, wordBank });
  const slug = slugify(req.title) || "puzzle";
  const id = `${slug}-${Date.now().toString(36)}`;
  return {
    id,
    title: req.title,
    description: req.description,
    keywords: req.keywords,
    size: req.size,
    difficulty: req.difficulty,
    visibility: req.visibility,
    createdBy: req.createdBy,
    createdAt: new Date().toISOString(),
    grid,
    cells: {},
    players: [req.createdBy],
    sessions: { [req.createdBy]: newSession() },
    state: "open",
    completedAt: null,
    totalTimeMs: 0,
    highlights: [],
  };
}

function computeHighlights(puzzle) {
  const highlights = [];
  const sessions = Object.entries(puzzle.sessions || {});
  if (sessions.length === 0) return highlights;
  const totalLetters = sessions.reduce((sum, [, s]) => sum + (s.lettersEntered || 0), 0);
  const top = sessions.slice().sort((a, b) => (b[1].lettersEntered || 0) - (a[1].lettersEntered || 0))[0];
  if (top && totalLetters > 0) {
    highlights.push(`${top[0]} typed the most letters — ${top[1].lettersEntered} of ${totalLetters}`);
  }
  const autoCheckers = sessions.filter(([, s]) => s.autoCheckUsed).map(([n]) => n);
  if (autoCheckers.length > 0) {
    highlights.push(`${autoCheckers.join(", ")} played with Auto Check on (half credit this round)`);
  }
  return highlights;
}

function newSession() {
  return {
    lettersEntered: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    correctionsMade: 0,
    revealsUsed: 0,
    wordsCompleted: 0,
    timeSpentMs: 0,
    autoCheckUsed: false,
    joinedAt: new Date().toISOString(),
  };
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}

// ===========================================================================
// Shared helpers
// ===========================================================================

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-App-Key",
  };
}

function checkAppKey(request, env) {
  return !env.APP_KEY || request.headers.get("X-App-Key") === env.APP_KEY;
}

async function safeJson(request) {
  try {
    return await request.json();
  } catch (e) {
    return null;
  }
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

async function ghHeaders(env) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    "User-Agent": "across-worker",
  };
}

function decodeBase64Utf8(b64) {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

function encodeBase64Utf8(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

async function fetchGithubFile(env) {
  const url = `https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/data.json?ref=${encodeURIComponent(env.GH_BRANCH || "main")}`;
  const res = await fetch(url, { headers: await ghHeaders(env) });
  if (!res.ok) throw new Error(`GitHub fetch failed (${res.status})`);
  const fileJson = await res.json();
  let data;
  try {
    data = JSON.parse(decodeBase64Utf8(fileJson.content));
  } catch (e) {
    data = { users: {}, puzzles: {} };
  }
  if (!data.users || typeof data.users !== "object") data.users = {};
  if (!data.puzzles || typeof data.puzzles !== "object") data.puzzles = {};
  return { data, sha: fileJson.sha };
}

async function putGithubFile(env, data, sha, message) {
  const url = `https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/data.json`;
  const body = {
    message,
    content: encodeBase64Utf8(JSON.stringify(data, null, 2)),
    sha,
    branch: env.GH_BRANCH || "main",
  };
  const res = await fetch(url, {
    method: "PUT",
    headers: { ...(await ghHeaders(env)), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub write failed (${res.status}): ${text.slice(0, 200)}`);
  }
}

// Re-fetches immediately before writing (and retries a few times) so
// concurrent writes (two puzzles finishing, a create + a join) don't
// clobber each other's `sha` — same pattern as Bonanza's commitMutation.
async function commitMutation(env, mutate, message, attempts = 4) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const { data, sha } = await fetchGithubFile(env);
      mutate(data);
      await putGithubFile(env, data, sha, message);
      return;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 250 * (i + 1)));
    }
  }
  throw lastErr;
}
