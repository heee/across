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

  // ---- general (short fill, added for grid density) ----
  { w: "ADD", c: "To combine numbers into a sum", cat: "general", diff: 1 },
  { w: "AID", c: "Help or assistance", cat: "general", diff: 1 },
  { w: "AIM", c: "To point something at a target", cat: "general", diff: 1 },
  { w: "ALE", c: "A hoppy malt beverage", cat: "general", diff: 1 },
  { w: "ANY", c: "Some, no matter which one", cat: "general", diff: 1 },
  { w: "APE", c: "A tailless primate like a gorilla", cat: "general", diff: 1 },
  { w: "ARC", c: "A curved line or part of a circle", cat: "general", diff: 1 },
  { w: "ARM", c: "The limb between shoulder and hand", cat: "general", diff: 1 },
  { w: "ART", c: "Creative work meant to be admired", cat: "general", diff: 1 },
  { w: "ASH", c: "What remains after a fire", cat: "general", diff: 1 },
  { w: "ASK", c: "To pose a question", cat: "general", diff: 1 },
  { w: "ATE", c: "Past tense of eat", cat: "general", diff: 1 },
  { w: "AWE", c: "A feeling of wonder", cat: "general", diff: 1 },
  { w: "BAG", c: "A container you carry things in", cat: "general", diff: 1 },
  { w: "BAN", c: "An official prohibition", cat: "general", diff: 1 },
  { w: "BAR", c: "A counter where drinks are served", cat: "general", diff: 1 },
  { w: "BED", c: "Where you sleep", cat: "general", diff: 1 },
  { w: "BET", c: "A wager on an outcome", cat: "general", diff: 1 },
  { w: "BID", c: "An offer of a price", cat: "general", diff: 1 },
  { w: "BIN", c: "A container for trash or storage", cat: "general", diff: 1 },
  { w: "BIT", c: "A small piece of something", cat: "general", diff: 1 },
  { w: "BOG", c: "A wet, spongy area of ground", cat: "general", diff: 1 },
  { w: "BOW", c: "To bend forward in respect, or a knot with loops", cat: "general", diff: 1 },
  { w: "BOY", c: "A young male", cat: "general", diff: 1 },
  { w: "BUD", c: "A small growth on a plant before it flowers", cat: "general", diff: 1 },
  { w: "BUG", c: "A small insect, or a software glitch", cat: "general", diff: 1 },
  { w: "BUN", c: "A small round bread roll", cat: "general", diff: 1 },
  { w: "BUS", c: "A large vehicle that carries many passengers", cat: "general", diff: 1 },
  { w: "BUY", c: "To purchase", cat: "general", diff: 1 },
  { w: "CAB", c: "A taxi", cat: "general", diff: 1 },
  { w: "CAP", c: "A soft hat, or a bottle's lid", cat: "general", diff: 1 },
  { w: "CAR", c: "A motor vehicle with four wheels", cat: "general", diff: 1 },
  { w: "CAT", c: "A common household pet that meows", cat: "general", diff: 1 },
  { w: "COB", c: "The core of an ear of corn", cat: "general", diff: 1 },
  { w: "COD", c: "A cold-water fish often fried", cat: "general", diff: 1 },
  { w: "COG", c: "A tooth on a gear wheel", cat: "general", diff: 1 },
  { w: "COT", c: "A small, portable bed", cat: "general", diff: 1 },
  { w: "COY", c: "Shy or evasively modest", cat: "general", diff: 1 },
  { w: "CRY", c: "To shed tears", cat: "general", diff: 1 },
  { w: "CUB", c: "A young bear, lion, or wolf", cat: "general", diff: 1 },
  { w: "CUE", c: "A signal to begin, or a pool stick", cat: "general", diff: 1 },
  { w: "CUT", c: "To slice with a sharp tool", cat: "general", diff: 1 },
  { w: "DAB", c: "A small quantity applied with light pats", cat: "general", diff: 1 },
  { w: "DAD", c: "Your father", cat: "general", diff: 1 },
  { w: "DAM", c: "A barrier built across a river", cat: "general", diff: 1 },
  { w: "DEN", c: "A small, cozy room, or an animal's lair", cat: "general", diff: 1 },
  { w: "DEW", c: "Moisture that forms on grass overnight", cat: "general", diff: 1 },
  { w: "DIE", c: "One of a pair of dice", cat: "general", diff: 1 },
  { w: "DIG", c: "To excavate the ground", cat: "general", diff: 1 },
  { w: "DIM", c: "Not brightly lit", cat: "general", diff: 1 },
  { w: "DIP", c: "A creamy sauce for chips or vegetables", cat: "general", diff: 1 },
  { w: "DOE", c: "A female deer", cat: "general", diff: 1 },
  { w: "DOT", c: "A small round mark", cat: "general", diff: 1 },
  { w: "DUE", c: "Expected or owed", cat: "general", diff: 1 },
  { w: "DUG", c: "Past tense of dig", cat: "general", diff: 1 },
  { w: "DYE", c: "A substance used to change color", cat: "general", diff: 1 },
  { w: "EAR", c: "The organ used for hearing", cat: "general", diff: 1 },
  { w: "EAT", c: "To consume food", cat: "general", diff: 1 },
  { w: "ELM", c: "A tall shade tree", cat: "general", diff: 1 },
  { w: "EWE", c: "A female sheep", cat: "general", diff: 1 },
  { w: "EYE", c: "The organ used for sight", cat: "general", diff: 1 },
  { w: "FAR", c: "A great distance away", cat: "general", diff: 1 },
  { w: "FAT", c: "Containing a lot of body tissue, or rich in oil", cat: "general", diff: 1 },
  { w: "FEW", c: "Not many", cat: "general", diff: 1 },
  { w: "FIB", c: "A small, harmless lie", cat: "general", diff: 1 },
  { w: "FIG", c: "A sweet fruit often dried", cat: "general", diff: 1 },
  { w: "FIN", c: "A fish's steering appendage", cat: "general", diff: 1 },
  { w: "FIT", c: "In good physical shape, or the right size", cat: "general", diff: 1 },
  { w: "FIX", c: "To repair", cat: "general", diff: 1 },
  { w: "FLY", c: "To move through the air", cat: "general", diff: 1 },
  { w: "FOE", c: "An enemy", cat: "general", diff: 1 },
  { w: "FOG", c: "A thick mist that reduces visibility", cat: "general", diff: 1 },
  { w: "FRY", c: "To cook in hot oil", cat: "general", diff: 1 },
  { w: "FUN", c: "Enjoyable activity", cat: "general", diff: 1 },
  { w: "FUR", c: "An animal's soft coat of hair", cat: "general", diff: 1 },
  { w: "GAP", c: "A break or space between two things", cat: "general", diff: 1 },
  { w: "GEL", c: "A thick, jellylike substance", cat: "general", diff: 1 },
  { w: "GUM", c: "Chewy candy, or the tissue around your teeth", cat: "general", diff: 1 },
  { w: "GUN", c: "A firearm", cat: "general", diff: 1 },
  { w: "GUT", c: "The stomach or intestines", cat: "general", diff: 1 },
  { w: "GUY", c: "An informal word for a man", cat: "general", diff: 1 },
  { w: "HAY", c: "Dried grass used as animal feed", cat: "general", diff: 1 },
  { w: "HID", c: "Past tense of hide", cat: "general", diff: 1 },
  { w: "HIP", c: "The joint connecting leg to torso", cat: "general", diff: 1 },
  { w: "HOG", c: "A domestic pig", cat: "general", diff: 1 },
  { w: "HOT", c: "Very warm in temperature", cat: "general", diff: 1 },
  { w: "HUB", c: "A center of activity, or the middle of a wheel", cat: "general", diff: 1 },
  { w: "HUG", c: "To embrace warmly", cat: "general", diff: 1 },
  { w: "HUT", c: "A small, simple shelter", cat: "general", diff: 1 },
  { w: "ILL", c: "Sick or unwell", cat: "general", diff: 1 },
  { w: "INK", c: "The colored liquid used for writing or printing", cat: "general", diff: 1 },
  { w: "IVY", c: "A climbing evergreen vine", cat: "general", diff: 1 },
  { w: "JAW", c: "The bone that forms the mouth's frame", cat: "general", diff: 1 },
  { w: "JOB", c: "Paid work", cat: "general", diff: 1 },
  { w: "JOT", c: "To write something down quickly", cat: "general", diff: 1 },
  { w: "JUG", c: "A large container for liquids with a handle", cat: "general", diff: 1 },
  { w: "KEG", c: "A small barrel, often for beer", cat: "general", diff: 1 },
  { w: "KID", c: "A child, or a young goat", cat: "general", diff: 1 },
  { w: "KIN", c: "Family members", cat: "general", diff: 1 },
  { w: "LAD", c: "A boy or young man", cat: "general", diff: 1 },
  { w: "LAG", c: "To fall behind", cat: "general", diff: 1 },
  { w: "LAY", c: "To put something down", cat: "general", diff: 1 },
  { w: "LEG", c: "One of the limbs used for walking", cat: "general", diff: 1 },
  { w: "LIP", c: "The edge of the mouth", cat: "general", diff: 1 },
  { w: "LIT", c: "Past tense of light, or brightly illuminated", cat: "general", diff: 1 },
  { w: "LOG", c: "A cut section of a tree trunk", cat: "general", diff: 1 },
  { w: "LOT", c: "A large quantity, or a plot of land", cat: "general", diff: 1 },
  { w: "LOW", c: "Not high", cat: "general", diff: 1 },
  { w: "MAT", c: "A flat piece of material placed on a floor", cat: "general", diff: 1 },
  { w: "MIX", c: "To combine ingredients together", cat: "general", diff: 1 },
  { w: "MOB", c: "A large, disorderly crowd", cat: "general", diff: 1 },
  { w: "MOM", c: "Your mother", cat: "general", diff: 1 },
  { w: "MOP", c: "A tool for cleaning floors", cat: "general", diff: 1 },
  { w: "MUD", c: "Wet, soft earth", cat: "general", diff: 1 },
  { w: "MUG", c: "A cup with a handle", cat: "general", diff: 1 },
  { w: "NUT", c: "A hard-shelled seed, or a threaded fastener", cat: "general", diff: 1 },
  { w: "OAK", c: "A sturdy hardwood tree", cat: "general", diff: 1 },
  { w: "OAR", c: "A pole used to row a boat", cat: "general", diff: 1 },
  { w: "OAT", c: "A cereal grain used in porridge", cat: "general", diff: 1 },
  { w: "OIL", c: "A slippery liquid used for cooking or fuel", cat: "general", diff: 1 },
  { w: "ORB", c: "A spherical object", cat: "general", diff: 1 },
  { w: "OWN", c: "To possess", cat: "general", diff: 1 },
  { w: "PAD", c: "A cushioned surface, or a stack of paper", cat: "general", diff: 1 },
  { w: "PAL", c: "A close friend", cat: "general", diff: 1 },
  { w: "PAN", c: "A shallow cooking vessel", cat: "general", diff: 1 },
  { w: "PAT", c: "To tap gently", cat: "general", diff: 1 },
  { w: "PAW", c: "An animal's foot", cat: "general", diff: 1 },
  { w: "PEA", c: "A small round green vegetable", cat: "general", diff: 1 },
  { w: "PEG", c: "A wooden or metal pin", cat: "general", diff: 1 },
  { w: "PET", c: "A domesticated companion animal", cat: "general", diff: 1 },
  { w: "PIN", c: "A thin, pointed piece of metal", cat: "general", diff: 1 },
  { w: "PIT", c: "A hole in the ground", cat: "general", diff: 1 },
  { w: "POD", c: "A seed case, or a small group", cat: "general", diff: 1 },
  { w: "POT", c: "A round container used for cooking", cat: "general", diff: 1 },
  { w: "PUB", c: "A place to drink and socialize", cat: "general", diff: 1 },
  { w: "PUP", c: "A young dog", cat: "general", diff: 1 },
  { w: "RAG", c: "A worn scrap of cloth", cat: "general", diff: 1 },
  { w: "RAM", c: "A male sheep, or to strike forcefully", cat: "general", diff: 1 },
  { w: "RAT", c: "A long-tailed rodent", cat: "general", diff: 1 },
  { w: "RAW", c: "Uncooked", cat: "general", diff: 1 },
  { w: "RAY", c: "A beam of light", cat: "general", diff: 1 },
  { w: "RID", c: "To free from something unwanted", cat: "general", diff: 1 },
  { w: "RIG", c: "A truck, or drilling equipment", cat: "general", diff: 1 },
  { w: "RIM", c: "The outer edge of something round", cat: "general", diff: 1 },
  { w: "RIP", c: "To tear apart", cat: "general", diff: 1 },
  { w: "ROB", c: "To steal from", cat: "general", diff: 1 },
  { w: "ROD", c: "A thin, straight bar", cat: "general", diff: 1 },
  { w: "ROT", c: "Decay", cat: "general", diff: 1 },
  { w: "ROW", c: "A straight line of things, or to paddle a boat", cat: "general", diff: 1 },
  { w: "RUB", c: "To move something back and forth against a surface", cat: "general", diff: 1 },
  { w: "ACRE", c: "A unit of land area", cat: "general", diff: 2 },
  { w: "ALSO", c: "In addition", cat: "general", diff: 2 },
  { w: "ALTO", c: "A low singing voice for a woman", cat: "general", diff: 2 },
  { w: "ARID", c: "Extremely dry", cat: "general", diff: 2 },
  { w: "AXIS", c: "An imaginary line something rotates around", cat: "general", diff: 2 },
  { w: "BAKE", c: "To cook in an oven", cat: "general", diff: 2 },
  { w: "BALD", c: "Lacking hair on the head", cat: "general", diff: 2 },
  { w: "BARE", c: "Uncovered or empty", cat: "general", diff: 2 },
  { w: "BARN", c: "A farm building for storing crops or housing animals", cat: "general", diff: 2 },
  { w: "BASK", c: "To lie in warm sunlight", cat: "general", diff: 2 },
  { w: "BEEF", c: "Meat from cattle", cat: "general", diff: 2 },
  { w: "BEEP", c: "A short electronic sound", cat: "general", diff: 2 },
  { w: "BELT", c: "A strap worn around the waist", cat: "general", diff: 2 },
  { w: "BEND", c: "To curve something", cat: "general", diff: 2 },
  { w: "BLOB", c: "A soft, shapeless mass", cat: "general", diff: 2 },
  { w: "BLUR", c: "An indistinct, hazy shape", cat: "general", diff: 2 },
  { w: "BOIL", c: "To heat a liquid until it bubbles", cat: "general", diff: 2 },
  { w: "BOLT", c: "A metal fastener, or to run suddenly", cat: "general", diff: 2 },
  { w: "BOND", c: "A connection, or a financial security", cat: "general", diff: 2 },
  { w: "BONE", c: "A hard structure that forms the skeleton", cat: "general", diff: 2 },
  { w: "BOOM", c: "A loud, deep sound", cat: "general", diff: 2 },
  { w: "BOOT", c: "Footwear that covers the ankle", cat: "general", diff: 2 },
  { w: "BORE", c: "To drill a hole, or to make someone lose interest", cat: "general", diff: 2 },
  { w: "BOSS", c: "A person in charge at work", cat: "general", diff: 2 },
  { w: "BOWL", c: "A round, open dish", cat: "general", diff: 2 },
  { w: "BRAG", c: "To boast", cat: "general", diff: 2 },
  { w: "BRIM", c: "The edge of a hat or cup", cat: "general", diff: 2 },
  { w: "BUCK", c: "A male deer, or an informal word for a dollar", cat: "general", diff: 2 },
  { w: "BULB", c: "A rounded plant root, or a light fixture", cat: "general", diff: 2 },
  { w: "BULK", c: "Large in size or quantity", cat: "general", diff: 2 },
  { w: "BULL", c: "A male cattle animal", cat: "general", diff: 2 },
  { w: "BUMP", c: "A small collision, or a raised area", cat: "general", diff: 2 },
  { w: "BUNK", c: "A narrow built-in bed", cat: "general", diff: 2 },
  { w: "BURN", c: "To be consumed by fire", cat: "general", diff: 2 },
  { w: "BUSY", c: "Occupied with activity", cat: "general", diff: 2 },
  { w: "CAGE", c: "An enclosure with bars", cat: "general", diff: 2 },
  { w: "CAMP", c: "A temporary outdoor shelter site", cat: "general", diff: 2 },
  { w: "CANE", c: "A walking stick", cat: "general", diff: 2 },
  { w: "CARD", c: "A small piece of stiff paper, often used in games", cat: "general", diff: 2 },
  { w: "CARE", c: "Attention or concern for someone", cat: "general", diff: 2 },
  { w: "CASH", c: "Physical money", cat: "general", diff: 2 },
  { w: "CAST", c: "The actors in a show, or a plaster covering for a broken bone", cat: "general", diff: 2 },
  { w: "CHAT", c: "A casual conversation", cat: "general", diff: 2 },
  { w: "CHEF", c: "A professional cook", cat: "general", diff: 2 },
  { w: "CHIN", c: "The lower part of the face", cat: "general", diff: 2 },
  { w: "CHIP", c: "A small fragment, or a fried potato slice", cat: "general", diff: 2 },
  { w: "CHOP", c: "To cut with quick, sharp strokes", cat: "general", diff: 2 },
  { w: "CLAM", c: "A bivalve shellfish", cat: "general", diff: 2 },
  { w: "CLAP", c: "To strike your hands together", cat: "general", diff: 2 },
  { w: "CLAY", c: "A fine, moldable earth material", cat: "general", diff: 2 },
  { w: "CLIP", c: "A fastener, or a short video segment", cat: "general", diff: 2 },
  { w: "CLUB", c: "A group with shared interests, or a heavy stick", cat: "general", diff: 2 },
  { w: "COAL", c: "A black rock burned as fuel", cat: "general", diff: 2 },
  { w: "COAT", c: "An outer garment worn for warmth", cat: "general", diff: 2 },
  { w: "COIL", c: "To wind into loops", cat: "general", diff: 2 },
  { w: "COLD", c: "Low in temperature", cat: "general", diff: 2 },
  { w: "COMB", c: "A tool used to untangle hair", cat: "general", diff: 2 },
  { w: "CORD", c: "A thin length of twisted strands", cat: "general", diff: 2 },
  { w: "CORK", c: "A stopper for a wine bottle", cat: "general", diff: 2 },
  { w: "CRAB", c: "A sideways-walking shelled sea creature", cat: "general", diff: 2 },
  { w: "CROP", c: "A cultivated plant grown for harvest", cat: "general", diff: 2 },
  { w: "CURB", c: "The edge of a sidewalk, or to restrain", cat: "general", diff: 2 },
  { w: "CURL", c: "A spiral shape, especially of hair", cat: "general", diff: 2 },
  { w: "DARE", c: "To challenge someone", cat: "general", diff: 2 },
  { w: "DASH", c: "A quick sprint, or a small amount", cat: "general", diff: 2 },
  { w: "DEAF", c: "Unable to hear", cat: "general", diff: 2 },
  { w: "DEAL", c: "An agreement, or to distribute cards", cat: "general", diff: 2 },
  { w: "DECK", c: "The floor of a ship, or a set of playing cards", cat: "general", diff: 2 },
  { w: "DEED", c: "An action, or a legal property document", cat: "general", diff: 2 },
  { w: "DENT", c: "A small dip caused by an impact", cat: "general", diff: 2 },
  { w: "DESK", c: "A table used for writing or work", cat: "general", diff: 2 },
  { w: "DIAL", c: "A rotating control, or to place a phone call", cat: "general", diff: 2 },
  { w: "DICE", c: "Small cubes used in games of chance", cat: "general", diff: 2 },
  { w: "DISC", c: "A flat, round object", cat: "general", diff: 2 },
  { w: "DOCK", c: "A platform where boats load and unload", cat: "general", diff: 2 },
  { w: "DOSE", c: "A measured amount of medicine", cat: "general", diff: 2 },
  { w: "DOZE", c: "To sleep lightly", cat: "general", diff: 2 },
  { w: "DRIP", c: "A slow fall of liquid, drop by drop", cat: "general", diff: 2 },
  { w: "DRUM", c: "A percussion instrument played by striking", cat: "general", diff: 2 },
  { w: "DUCK", c: "A water bird, or to quickly lower your head", cat: "general", diff: 2 },
  { w: "DUEL", c: "A formal fight between two people", cat: "general", diff: 2 },
  { w: "DUMP", c: "To discard carelessly", cat: "general", diff: 2 },
  { w: "DUST", c: "Fine, dry particles of matter", cat: "general", diff: 2 },
  { w: "EASE", c: "Freedom from difficulty", cat: "general", diff: 2 },
  { w: "EAST", c: "The direction the sun rises from", cat: "general", diff: 2 },
  { w: "EDGE", c: "The outer boundary of something", cat: "general", diff: 2 },
  { w: "EPIC", c: "A grand, heroic story", cat: "general", diff: 2 },
  { w: "EXIT", c: "A way out", cat: "general", diff: 2 },
  { w: "FACT", c: "A statement known to be true", cat: "general", diff: 2 },
  { w: "FADE", c: "To gradually disappear", cat: "general", diff: 2 },
  { w: "FAME", c: "Widespread public recognition", cat: "general", diff: 2 },
  { w: "FANG", c: "A long, pointed animal tooth", cat: "general", diff: 2 },
  { w: "FARM", c: "Land used to grow crops or raise animals", cat: "general", diff: 2 },
  { w: "FEAT", c: "An impressive achievement", cat: "general", diff: 2 },
  { w: "FEED", c: "To give food to", cat: "general", diff: 2 },
  { w: "FERN", c: "A leafy plant that reproduces by spores", cat: "general", diff: 2 },
  { w: "FIST", c: "A tightly closed hand", cat: "general", diff: 2 },
  { w: "FLAP", c: "To move up and down, like a bird's wing", cat: "general", diff: 2 },
  { w: "FLAT", c: "Level and even, or an apartment", cat: "general", diff: 2 },
  { w: "FLEE", c: "To run away from danger", cat: "general", diff: 2 },
  { w: "FLIP", c: "To turn over quickly", cat: "general", diff: 2 },
  { w: "FLOW", c: "To move steadily, like water", cat: "general", diff: 2 },
  { w: "FOAM", c: "A mass of small bubbles", cat: "general", diff: 2 },
  { w: "FOLD", c: "To bend something over on itself", cat: "general", diff: 2 },
  { w: "FONT", c: "A style of typeface", cat: "general", diff: 2 },
  { w: "FORK", c: "A utensil with prongs used for eating", cat: "general", diff: 2 },
  { w: "FRAY", c: "To become worn or unraveled", cat: "general", diff: 2 },
  { w: "FUEL", c: "A substance burned to produce energy", cat: "general", diff: 2 },
  { w: "FUME", c: "To be very angry, or a strong-smelling gas", cat: "general", diff: 2 },
  { w: "FUND", c: "A pool of money set aside for a purpose", cat: "general", diff: 2 },
  { w: "GAIN", c: "To acquire more of something", cat: "general", diff: 2 },
  { w: "GALE", c: "A very strong wind", cat: "general", diff: 2 },
  { w: "GASP", c: "A sharp intake of breath", cat: "general", diff: 2 },
  { w: "GAZE", c: "A steady, prolonged look", cat: "general", diff: 2 },
  { w: "GEAR", c: "Equipment needed for an activity", cat: "general", diff: 2 },
  { w: "GLUE", c: "A sticky substance used to bond things", cat: "general", diff: 2 },
  { w: "GOAT", c: "A horned farm animal known for climbing", cat: "general", diff: 2 },
  { w: "GONG", c: "A metal disc struck to make a resonant sound", cat: "general", diff: 2 },
  { w: "GOWN", c: "A long, formal dress", cat: "general", diff: 2 },
  { w: "GRIN", c: "A broad smile", cat: "general", diff: 2 },
  { w: "GRIP", c: "A firm hold", cat: "general", diff: 2 },
  { w: "GULF", c: "A large area of sea partly enclosed by land", cat: "general", diff: 2 },
  { w: "GUSH", c: "To flow out forcefully", cat: "general", diff: 2 },
  { w: "HAIL", c: "Frozen rain, or to greet enthusiastically", cat: "general", diff: 2 },
  { w: "HALL", c: "A long passage inside a building", cat: "general", diff: 2 },
  { w: "HALO", c: "A ring of light around a saint's head", cat: "general", diff: 2 },
  { w: "HALT", c: "To stop suddenly", cat: "general", diff: 2 },
  { w: "HARM", c: "Damage or injury", cat: "general", diff: 2 },
  { w: "HAZE", c: "A light mist that obscures visibility", cat: "general", diff: 2 },
  { w: "HEAP", c: "A messy pile", cat: "general", diff: 2 },
  { w: "HEEL", c: "The back part of the foot", cat: "general", diff: 2 },
  { w: "HERB", c: "A plant used for flavoring or medicine", cat: "general", diff: 2 },
  { w: "HERD", c: "A large group of grazing animals", cat: "general", diff: 2 },
  { w: "HIDE", c: "To conceal from view", cat: "general", diff: 2 },
  { w: "HINT", c: "A slight indication or clue", cat: "general", diff: 2 },
  { w: "HISS", c: "A sharp sibilant sound, like a snake makes", cat: "general", diff: 2 },
  { w: "HIVE", c: "A structure where bees live", cat: "general", diff: 2 },
  { w: "HOAX", c: "A deliberate deception", cat: "general", diff: 2 },
  { w: "HOLD", c: "To grasp or keep something", cat: "general", diff: 2 },
  { w: "HOLE", c: "An opening or gap", cat: "general", diff: 2 },
  { w: "HONK", c: "The sound a car horn makes", cat: "general", diff: 2 },
  { w: "HOOD", c: "A covering for the head, or a car's front panel", cat: "general", diff: 2 },
  { w: "HOOF", c: "The hard covering on a horse's foot", cat: "general", diff: 2 },
  { w: "HOOK", c: "A curved device used for catching or hanging", cat: "general", diff: 2 },
  { w: "HOOT", c: "The call an owl makes", cat: "general", diff: 2 },
  { w: "HOSE", c: "A flexible tube for carrying liquid", cat: "general", diff: 2 },
  { w: "HUSH", c: "To make quiet", cat: "general", diff: 2 },
  { w: "HUSK", c: "The dry outer covering of a seed", cat: "general", diff: 2 },
  { w: "HYMN", c: "A religious song of praise", cat: "general", diff: 2 },
  { w: "ICON", c: "A small picture representing a program, or a revered figure", cat: "general", diff: 2 },
  { w: "TOOTH", c: "One of the hard structures used for chewing", cat: "general", diff: 2 },
  { w: "TWIST", c: "To turn something into a spiral shape", cat: "general", diff: 2 },
  { w: "ABIDE", c: "To accept or tolerate something", cat: "general", diff: 2 },
  { w: "ABOVE", c: "In a higher position than", cat: "general", diff: 2 },
  { w: "ADAPT", c: "To adjust to new conditions", cat: "general", diff: 2 },
  { w: "AGENT", c: "A person who acts on behalf of another", cat: "general", diff: 2 },
  { w: "ALARM", c: "A warning sound or device", cat: "general", diff: 2 },
  { w: "ALIKE", c: "Similar to one another", cat: "general", diff: 2 },
  { w: "ALIVE", c: "Living, not dead", cat: "general", diff: 2 },
  { w: "ALLOW", c: "To permit", cat: "general", diff: 2 },
  { w: "ALONE", c: "Without other people", cat: "general", diff: 2 },
  { w: "ALTER", c: "To change something", cat: "general", diff: 2 },
  { w: "AMONG", c: "In the middle of a group", cat: "general", diff: 2 },
  { w: "ANGLE", c: "The space between two intersecting lines", cat: "general", diff: 2 },
  { w: "ANKLE", c: "The joint connecting foot and leg", cat: "general", diff: 2 },
  { w: "APPLY", c: "To make a formal request, or to put something on", cat: "general", diff: 2 },
  { w: "ARGUE", c: "To disagree verbally", cat: "general", diff: 2 },
  { w: "ARISE", c: "To come into being", cat: "general", diff: 2 },
  { w: "AROMA", c: "A pleasant, distinctive smell", cat: "general", diff: 2 },
  { w: "ASIDE", c: "To one side, or a remark not part of the main dialogue", cat: "general", diff: 2 },
  { w: "ASSET", c: "Something valuable that is owned", cat: "general", diff: 2 },
  { w: "AVOID", c: "To keep away from", cat: "general", diff: 2 },
  { w: "AWAKE", c: "Not asleep", cat: "general", diff: 2 },
  { w: "BADGE", c: "A small emblem worn to show identity", cat: "general", diff: 2 },
  { w: "BASIC", c: "Forming an essential foundation", cat: "general", diff: 2 },
  { w: "BEACH", c: "A sandy shore beside water", cat: "general", diff: 2 },
  { w: "BEGIN", c: "To start", cat: "general", diff: 2 },
  { w: "BENCH", c: "A long seat for several people", cat: "general", diff: 2 },
  { w: "BERRY", c: "A small, juicy fruit", cat: "general", diff: 2 },
  { w: "BIRTH", c: "The beginning of life", cat: "general", diff: 2 },
  { w: "BLADE", c: "The flat cutting edge of a knife", cat: "general", diff: 2 },
  { w: "BLAME", c: "To hold someone responsible for a fault", cat: "general", diff: 2 },
  { w: "BLANK", c: "Empty, without content", cat: "general", diff: 2 },
  { w: "BLAST", c: "A sudden, forceful explosion of air or sound", cat: "general", diff: 2 },
  { w: "BLEND", c: "To mix together smoothly", cat: "general", diff: 2 },
  { w: "BLESS", c: "To ask for divine favor upon", cat: "general", diff: 2 },
  { w: "BLIND", c: "Unable to see", cat: "general", diff: 2 },
  { w: "BLOCK", c: "A solid piece, or to obstruct", cat: "general", diff: 2 },
  { w: "BLOOD", c: "The red liquid that circulates in the body", cat: "general", diff: 2 },
  { w: "BLOOM", c: "To produce flowers", cat: "general", diff: 2 },
  { w: "BOARD", c: "A flat piece of wood, or a group that governs", cat: "general", diff: 2 },
  { w: "BOAST", c: "To speak with excessive pride", cat: "general", diff: 2 },
  { w: "BOOST", c: "To increase or improve", cat: "general", diff: 2 },
  { w: "BOOTH", c: "A small enclosed stall", cat: "general", diff: 2 },
  { w: "BOUND", c: "Certain to happen, or to leap", cat: "general", diff: 2 },
  { w: "BRAIN", c: "The organ used for thinking", cat: "general", diff: 2 },
  { w: "BRAND", c: "A name or trademark identifying a product", cat: "general", diff: 2 },
  { w: "BREAD", c: "A baked food made from flour and water", cat: "general", diff: 2 },
  { w: "BREAK", c: "To separate into pieces, or a pause", cat: "general", diff: 2 },
  { w: "BREED", c: "A specific type within a species", cat: "general", diff: 2 },
  { w: "BRICK", c: "A rectangular block used for building", cat: "general", diff: 2 },
  { w: "BRIDE", c: "A woman on her wedding day", cat: "general", diff: 2 },
  { w: "BRIEF", c: "Short in duration", cat: "general", diff: 2 },
  { w: "BRING", c: "To carry something along", cat: "general", diff: 2 },
  { w: "BROAD", c: "Wide in extent", cat: "general", diff: 2 },
  { w: "BROOM", c: "A tool used for sweeping", cat: "general", diff: 2 },
  { w: "BROTH", c: "A thin, flavorful soup", cat: "general", diff: 2 },
  { w: "BROWN", c: "A dark, earthy color", cat: "general", diff: 2 },
  { w: "BRUSH", c: "A tool with bristles used for cleaning or painting", cat: "general", diff: 2 },
  { w: "BUILD", c: "To construct something", cat: "general", diff: 2 },
  { w: "BUNCH", c: "A group of things gathered together", cat: "general", diff: 2 },
  { w: "BURST", c: "To break open suddenly", cat: "general", diff: 2 },
  { w: "CABIN", c: "A small wooden house, or a room on a ship", cat: "general", diff: 2 },
  { w: "CANOE", c: "A narrow boat propelled by paddling", cat: "general", diff: 2 },
  { w: "CARGO", c: "Goods transported by a vehicle", cat: "general", diff: 2 },
  { w: "CARVE", c: "To cut into a shape", cat: "general", diff: 2 },
  { w: "CATCH", c: "To capture something moving", cat: "general", diff: 2 },
  { w: "CAUSE", c: "The reason something happens", cat: "general", diff: 2 },
  { w: "CHAIN", c: "A series of connected metal links", cat: "general", diff: 2 },
  { w: "CHALK", c: "A soft white material used for writing on boards", cat: "general", diff: 2 },
  { w: "CHARM", c: "A quality that attracts, or a small trinket", cat: "general", diff: 2 },
  { w: "CHASE", c: "To pursue quickly", cat: "general", diff: 2 },
  { w: "CHEAP", c: "Low in price", cat: "general", diff: 2 },
  { w: "CHECK", c: "To verify, or a restaurant bill", cat: "general", diff: 2 },
  { w: "CHEEK", c: "The side of the face below the eye", cat: "general", diff: 2 },
  { w: "CHESS", c: "A strategy board game played with pieces like kings and knights", cat: "general", diff: 2 },
  { w: "CHEST", c: "The upper front of the body, or a storage box", cat: "general", diff: 2 },
  { w: "CHILD", c: "A young human", cat: "general", diff: 2 },
  { w: "CHILL", c: "A cold sensation, or to relax", cat: "general", diff: 2 },
  { w: "CHORD", c: "A group of musical notes played together", cat: "general", diff: 2 },
  { w: "CIVIL", c: "Relating to citizens, or polite", cat: "general", diff: 2 },
  { w: "CLAIM", c: "To assert something is true", cat: "general", diff: 2 },
  { w: "CLASH", c: "A conflict, or a loud discordant sound", cat: "general", diff: 2 },
  { w: "CLASS", c: "A group of students, or a category", cat: "general", diff: 2 },
  { w: "CLICK", c: "A short, sharp sound", cat: "general", diff: 2 },
  { w: "CLING", c: "To hold on tightly", cat: "general", diff: 2 },
  { w: "CLOTH", c: "Woven fabric", cat: "general", diff: 2 },
  { w: "COVER", c: "To place something over another", cat: "general", diff: 2 },
  { w: "CRACK", c: "A narrow break, or a sharp sound", cat: "general", diff: 2 },
  { w: "CRAFT", c: "A skilled activity, or a small boat", cat: "general", diff: 2 },

  // ---- general (more short fill, round 2) ----
  { w: "RUG", c: "A small carpet", cat: "general", diff: 1 },
  { w: "RUM", c: "A spirit distilled from sugarcane", cat: "general", diff: 1 },
  { w: "RYE", c: "A grain used to make bread and whiskey", cat: "general", diff: 1 },
  { w: "SAD", c: "Feeling unhappy", cat: "general", diff: 1 },
  { w: "SAP", c: "The fluid inside a plant's stem", cat: "general", diff: 1 },
  { w: "SET", c: "A matched group of things", cat: "general", diff: 1 },
  { w: "SEW", c: "To join fabric with a needle and thread", cat: "general", diff: 1 },
  { w: "SIN", c: "A moral wrongdoing", cat: "general", diff: 1 },
  { w: "SIP", c: "A small drink", cat: "general", diff: 1 },
  { w: "SKI", c: "To glide over snow on long boards", cat: "general", diff: 1 },
  { w: "SLY", c: "Cunning and secretive", cat: "general", diff: 1 },
  { w: "SOB", c: "To cry with heaving breaths", cat: "general", diff: 1 },
  { w: "SOD", c: "A layer of grass and soil", cat: "general", diff: 1 },
  { w: "SON", c: "A male child", cat: "general", diff: 1 },
  { w: "SOW", c: "To plant seeds", cat: "general", diff: 1 },
  { w: "SOY", c: "A bean used to make tofu and sauce", cat: "general", diff: 1 },
  { w: "SPA", c: "A place for relaxing treatments", cat: "general", diff: 1 },
  { w: "SPY", c: "Someone who secretly gathers information", cat: "general", diff: 1 },
  { w: "SUM", c: "The result of addition", cat: "general", diff: 1 },
  { w: "TAB", c: "A small flap, or a running bill", cat: "general", diff: 1 },
  { w: "TAN", c: "A light brown color from sun exposure", cat: "general", diff: 1 },
  { w: "TAP", c: "To strike lightly, or a faucet", cat: "general", diff: 1 },
  { w: "TAR", c: "A thick, black, sticky substance", cat: "general", diff: 1 },
  { w: "TAX", c: "A mandatory payment to the government", cat: "general", diff: 1 },
  { w: "TEA", c: "A hot drink brewed from leaves", cat: "general", diff: 1 },
  { w: "TEN", c: "The number after nine", cat: "general", diff: 1 },
  { w: "TIP", c: "A pointed end, or a gratuity", cat: "general", diff: 1 },
  { w: "TOE", c: "A digit on the foot", cat: "general", diff: 1 },
  { w: "TON", c: "A unit of weight equal to 2,000 pounds", cat: "general", diff: 1 },
  { w: "TOW", c: "To pull a vehicle behind another", cat: "general", diff: 1 },
  { w: "TRY", c: "To attempt something", cat: "general", diff: 1 },
  { w: "TUB", c: "A container for bathing", cat: "general", diff: 1 },
  { w: "TUG", c: "To pull with force", cat: "general", diff: 1 },
  { w: "TWO", c: "The number after one", cat: "general", diff: 1 },
  { w: "USE", c: "To put something into service", cat: "general", diff: 1 },
  { w: "VAN", c: "A boxy vehicle used for hauling", cat: "general", diff: 1 },
  { w: "VAT", c: "A large tank for liquids", cat: "general", diff: 1 },
  { w: "VET", c: "An animal doctor", cat: "general", diff: 1 },
  { w: "VOW", c: "A solemn promise", cat: "general", diff: 1 },
  { w: "WAG", c: "To swing back and forth, like a dog's tail", cat: "general", diff: 1 },
  { w: "WAX", c: "A substance used in candles and polish", cat: "general", diff: 1 },
  { w: "WED", c: "To marry", cat: "general", diff: 1 },
  { w: "WIG", c: "A hairpiece", cat: "general", diff: 1 },
  { w: "WIT", c: "Quick and clever humor", cat: "general", diff: 1 },
  { w: "WOK", c: "A round-bottomed pan used in stir-frying", cat: "general", diff: 1 },
  { w: "WON", c: "Past tense of win", cat: "general", diff: 1 },
  { w: "ZIP", c: "To fasten with a sliding closure, or move quickly", cat: "general", diff: 1 },
  { w: "ZOO", c: "A park where animals are kept for viewing", cat: "general", diff: 1 },
  { w: "IDLE", c: "Not doing anything; inactive", cat: "general", diff: 2 },
  { w: "IDOL", c: "Someone greatly admired, or an object of worship", cat: "general", diff: 2 },
  { w: "INCH", c: "A small unit of length", cat: "general", diff: 2 },
  { w: "ITCH", c: "A tingling skin sensation that makes you want to scratch", cat: "general", diff: 2 },
  { w: "JADE", c: "A green gemstone", cat: "general", diff: 2 },
  { w: "JEEP", c: "A rugged off-road vehicle", cat: "general", diff: 2 },
  { w: "JELL", c: "To take shape or firm up", cat: "general", diff: 2 },
  { w: "JUMP", c: "To spring off the ground", cat: "general", diff: 2 },
  { w: "JURY", c: "A group of citizens who decide a legal verdict", cat: "general", diff: 2 },
  { w: "JUST", c: "Fair, or merely", cat: "general", diff: 2 },
  { w: "KELP", c: "A large brown seaweed", cat: "general", diff: 2 },
  { w: "KEPT", c: "Past tense of keep", cat: "general", diff: 2 },
  { w: "KICK", c: "To strike with the foot", cat: "general", diff: 2 },
  { w: "KILN", c: "An oven used to fire pottery", cat: "general", diff: 2 },
  { w: "KILT", c: "A traditional Scottish garment worn like a skirt", cat: "general", diff: 2 },
  { w: "KISS", c: "A touch of the lips as a sign of affection", cat: "general", diff: 2 },
  { w: "KNEE", c: "The joint between thigh and lower leg", cat: "general", diff: 2 },
  { w: "KNIT", c: "To create fabric by looping yarn", cat: "general", diff: 2 },
  { w: "KNOB", c: "A rounded handle", cat: "general", diff: 2 },
  { w: "LACE", c: "Delicate patterned fabric, or a shoe fastener", cat: "general", diff: 2 },
  { w: "LACK", c: "To be without something needed", cat: "general", diff: 2 },
  { w: "LAMB", c: "A young sheep", cat: "general", diff: 2 },
  { w: "LAMP", c: "A device that produces light", cat: "general", diff: 2 },
  { w: "LAND", c: "The solid ground, as opposed to sea", cat: "general", diff: 2 },
  { w: "LANE", c: "A narrow road or marked path", cat: "general", diff: 2 },
  { w: "LARK", c: "A songbird, or a playful adventure", cat: "general", diff: 2 },
  { w: "LAVA", c: "Molten rock from a volcano", cat: "general", diff: 2 },
  { w: "LEAK", c: "An unwanted escape of liquid or gas", cat: "general", diff: 2 },
  { w: "LEAN", c: "To tilt to one side, or having little fat", cat: "general", diff: 2 },
  { w: "LOAF", c: "A shaped mass of baked bread", cat: "general", diff: 2 },
  { w: "LOAN", c: "Money lent to be repaid", cat: "general", diff: 2 },
  { w: "LOOM", c: "A machine for weaving cloth, or to appear ominously close", cat: "general", diff: 2 },
  { w: "LOOP", c: "A closed curve of rope or wire", cat: "general", diff: 2 },
  { w: "LORD", c: "A nobleman, or a title of authority", cat: "general", diff: 2 },
  { w: "LOSS", c: "The state of losing something", cat: "general", diff: 2 },
  { w: "LUCK", c: "Good or bad fortune", cat: "general", diff: 2 },
  { w: "LUMP", c: "A small, irregular mass", cat: "general", diff: 2 },
  { w: "LUNG", c: "An organ used for breathing", cat: "general", diff: 2 },
  { w: "LURE", c: "Something used to tempt or attract", cat: "general", diff: 2 },
  { w: "LUSH", c: "Rich and full of growth", cat: "general", diff: 2 },
  { w: "MALL", c: "A large shopping complex", cat: "general", diff: 2 },
  { w: "MANE", c: "The long hair on a lion's or horse's neck", cat: "general", diff: 2 },
  { w: "MAST", c: "A tall pole that holds a ship's sails", cat: "general", diff: 2 },
  { w: "MEAL", c: "A occasion of eating food", cat: "general", diff: 2 },
  { w: "MELT", c: "To turn from solid to liquid with heat", cat: "general", diff: 2 },
  { w: "MEND", c: "To repair", cat: "general", diff: 2 },
  { w: "MESH", c: "An open, woven material", cat: "general", diff: 2 },
  { w: "MESS", c: "A state of untidiness", cat: "general", diff: 2 },
  { w: "MICE", c: "Plural of mouse", cat: "general", diff: 2 },
  { w: "MILD", c: "Gentle in intensity", cat: "general", diff: 2 },
  { w: "MILK", c: "A white liquid produced by mammals", cat: "general", diff: 2 },
  { w: "MILL", c: "A building that grinds grain, or a factory", cat: "general", diff: 2 },
  { w: "MIND", c: "The part of you that thinks", cat: "general", diff: 2 },
  { w: "MINE", c: "A place where minerals are dug, or belonging to me", cat: "general", diff: 2 },
  { w: "MOAN", c: "A low, mournful sound", cat: "general", diff: 2 },
  { w: "MOLD", c: "A fungus that grows on damp surfaces, or a shaping form", cat: "general", diff: 2 },
  { w: "MOOD", c: "One's emotional state", cat: "general", diff: 2 },
  { w: "MOSS", c: "A small, soft green plant that grows on damp surfaces", cat: "general", diff: 2 },
  { w: "MOTH", c: "A nocturnal insect related to the butterfly", cat: "general", diff: 2 },
  { w: "MULE", c: "A hybrid of a horse and donkey", cat: "general", diff: 2 },
  { w: "MUTE", c: "Unable or unwilling to speak", cat: "general", diff: 2 },
  { w: "NAVY", c: "A dark blue color, or a country's sea-based military", cat: "general", diff: 2 },
  { w: "NECK", c: "The part connecting head to body", cat: "general", diff: 2 },
  { w: "NEST", c: "A structure birds build to lay eggs in", cat: "general", diff: 2 },
  { w: "NOSE", c: "The organ used for smelling", cat: "general", diff: 2 },
  { w: "NUDE", c: "Without clothing", cat: "general", diff: 2 },
  { w: "OATH", c: "A solemn promise", cat: "general", diff: 2 },
  { w: "ODOR", c: "A smell, often unpleasant", cat: "general", diff: 2 },
  { w: "OMEN", c: "A sign of something to come", cat: "general", diff: 2 },
  { w: "ORAL", c: "Spoken, or relating to the mouth", cat: "general", diff: 2 },
  { w: "OVAL", c: "Egg-shaped", cat: "general", diff: 2 },
  { w: "OVEN", c: "An appliance used for baking", cat: "general", diff: 2 },
  { w: "PACE", c: "The speed of movement", cat: "general", diff: 2 },
  { w: "PAIL", c: "A bucket", cat: "general", diff: 2 },
  { w: "PAIN", c: "Physical or emotional suffering", cat: "general", diff: 2 },
  { w: "PALE", c: "Light in color, lacking intensity", cat: "general", diff: 2 },
  { w: "PALM", c: "The inner surface of the hand, or a tropical tree", cat: "general", diff: 2 },
  { w: "PANE", c: "A single sheet of glass in a window", cat: "general", diff: 2 },
  { w: "PARK", c: "A public green space", cat: "general", diff: 2 },
  { w: "PART", c: "A piece of a whole", cat: "general", diff: 2 },
  { w: "PASS", c: "To go by, or to succeed at a test", cat: "general", diff: 2 },
  { w: "PAST", c: "The time before now", cat: "general", diff: 2 },
  { w: "PATH", c: "A track for walking", cat: "general", diff: 2 },
  { w: "PAVE", c: "To cover a surface with a hard material", cat: "general", diff: 2 },
  { w: "PEEL", c: "To remove the outer skin of a fruit", cat: "general", diff: 2 },
  { w: "PIER", c: "A structure extending into the water", cat: "general", diff: 2 },
  { w: "PILE", c: "A stack of things", cat: "general", diff: 2 },
  { w: "PILL", c: "A small tablet of medicine", cat: "general", diff: 2 },
  { w: "PINE", c: "An evergreen tree, or to long for something", cat: "general", diff: 2 },
  { w: "PINK", c: "A pale reddish color", cat: "general", diff: 2 },
  { w: "PINT", c: "A unit of liquid measure", cat: "general", diff: 2 },
  { w: "PIPE", c: "A tube used to carry liquid or gas", cat: "general", diff: 2 },
  { w: "PLOW", c: "A farming tool used to turn soil", cat: "general", diff: 2 },
  { w: "PLUG", c: "A device inserted into an outlet or a hole", cat: "general", diff: 2 },
  { w: "POEM", c: "A piece of writing with rhythm and often rhyme", cat: "general", diff: 2 },
  { w: "POKE", c: "To jab with a finger or pointed object", cat: "general", diff: 2 },
  { w: "POLE", c: "A long, slender rod", cat: "general", diff: 2 },
  { w: "PORE", c: "A tiny opening in skin", cat: "general", diff: 2 },
  { w: "PORK", c: "Meat from a pig", cat: "general", diff: 2 },
  { w: "PORT", c: "A harbor town, or a connector on a device", cat: "general", diff: 2 },
  { w: "POSE", c: "To position oneself for a photo or artwork", cat: "general", diff: 2 },
  { w: "POUR", c: "To make liquid flow from a container", cat: "general", diff: 2 },
  { w: "PRAY", c: "To speak to a deity", cat: "general", diff: 2 },
  { w: "PREY", c: "An animal hunted by another for food", cat: "general", diff: 2 },
  { w: "PULL", c: "To draw something toward you", cat: "general", diff: 2 },
  { w: "PULP", c: "The soft, moist part of a fruit", cat: "general", diff: 2 },
  { w: "PUMP", c: "A device that moves fluid or air", cat: "general", diff: 2 },
  { w: "PUSH", c: "To press something away from you", cat: "general", diff: 2 },
  { w: "QUIT", c: "To stop doing something", cat: "general", diff: 2 },
  { w: "QUIZ", c: "A short test of knowledge", cat: "general", diff: 2 },
  { w: "RAFT", c: "A flat structure used to float on water", cat: "general", diff: 2 },
  { w: "RAID", c: "A sudden attack", cat: "general", diff: 2 },
  { w: "RAIL", c: "A metal bar used for tracks or fences", cat: "general", diff: 2 },
  { w: "RANK", c: "A position in a hierarchy", cat: "general", diff: 2 },
  { w: "RASH", c: "A skin irritation, or reckless", cat: "general", diff: 2 },
  { w: "RENT", c: "A regular payment for using property", cat: "general", diff: 2 },
  { w: "RIDE", c: "To travel in or on a vehicle or animal", cat: "general", diff: 2 },
  { w: "RIFT", c: "A crack or split", cat: "general", diff: 2 },
  { w: "RING", c: "A circular band, often worn on a finger", cat: "general", diff: 2 },
  { w: "RISE", c: "To move upward", cat: "general", diff: 2 },
  { w: "RISK", c: "The chance of danger or loss", cat: "general", diff: 2 },
  { w: "ROAM", c: "To wander freely", cat: "general", diff: 2 },
  { w: "ROAR", c: "A loud, deep sound made by a lion or crowd", cat: "general", diff: 2 },
  { w: "ROBE", c: "A loose-fitting outer garment", cat: "general", diff: 2 },
  { w: "ROCK", c: "A hard mineral mass", cat: "general", diff: 2 },
  { w: "ROLL", c: "To move by turning over and over", cat: "general", diff: 2 },
  { w: "ROOF", c: "The covering on top of a building", cat: "general", diff: 2 },
  { w: "ROOM", c: "An enclosed space inside a building", cat: "general", diff: 2 },
  { w: "ROOT", c: "The part of a plant underground", cat: "general", diff: 2 },
  { w: "ROSE", c: "A flower known for its thorns and fragrance", cat: "general", diff: 2 },
  { w: "RUDE", c: "Lacking good manners", cat: "general", diff: 2 },
  { w: "RUIN", c: "To destroy or spoil", cat: "general", diff: 2 },
  { w: "RUST", c: "Reddish-brown corrosion on iron", cat: "general", diff: 2 },
  { w: "SACK", c: "A large bag", cat: "general", diff: 2 },
  { w: "SAGE", c: "A wise person, or an aromatic herb", cat: "general", diff: 2 },
  { w: "SAIL", c: "A sheet of fabric that catches wind to move a boat", cat: "general", diff: 2 },
  { w: "SALE", c: "The exchange of goods for money", cat: "general", diff: 2 },
  { w: "SANE", c: "Mentally sound", cat: "general", diff: 2 },
  { w: "SASH", c: "A band of cloth worn around the waist or shoulder", cat: "general", diff: 2 },
  { w: "SEAL", c: "A marine mammal, or an official stamp", cat: "general", diff: 2 },
  { w: "SEAT", c: "A place to sit", cat: "general", diff: 2 },
  { w: "SEED", c: "The part of a plant from which a new plant grows", cat: "general", diff: 2 },
  { w: "SHED", c: "A small outdoor storage building", cat: "general", diff: 2 },
  { w: "SHIN", c: "The front of the lower leg", cat: "general", diff: 2 },
  { w: "SHOE", c: "Footwear", cat: "general", diff: 2 },
  { w: "SHOP", c: "A store where goods are sold", cat: "general", diff: 2 },
  { w: "SHOT", c: "A single firing of a gun, or an attempt", cat: "general", diff: 2 },
  { w: "SHOW", c: "A performance, or to display", cat: "general", diff: 2 },
  { w: "SICK", c: "Unwell", cat: "general", diff: 2 },
  { w: "SIDE", c: "One face or edge of something", cat: "general", diff: 2 },
  { w: "CRANE", c: "A tall bird, or a machine for lifting", cat: "general", diff: 2 },
  { w: "CRASH", c: "A violent collision", cat: "general", diff: 2 },
  { w: "CRAWL", c: "To move on hands and knees", cat: "general", diff: 2 },
  { w: "CREEP", c: "To move slowly and carefully", cat: "general", diff: 2 },
  { w: "CREST", c: "The top of a hill or wave", cat: "general", diff: 2 },
  { w: "CRISP", c: "Firm and brittle, pleasantly so", cat: "general", diff: 2 },
  { w: "CROSS", c: "A shape with intersecting lines, or to go over", cat: "general", diff: 2 },
  { w: "CROWD", c: "A large group of people gathered together", cat: "general", diff: 2 },
  { w: "CRUEL", c: "Causing pain deliberately", cat: "general", diff: 2 },
  { w: "CRUSH", c: "To press with great force", cat: "general", diff: 2 },
  { w: "CURVE", c: "A smoothly bending line", cat: "general", diff: 2 },
  { w: "DAILY", c: "Happening every day", cat: "general", diff: 2 },
  { w: "DEBUT", c: "A first public appearance", cat: "general", diff: 2 },
  { w: "DECAY", c: "To rot or break down gradually", cat: "general", diff: 2 },
  { w: "DELAY", c: "To postpone", cat: "general", diff: 2 },
  { w: "DEPTH", c: "How deep something is", cat: "general", diff: 2 },
  { w: "DERBY", c: "A horse race, or a type of hat", cat: "general", diff: 2 },
  { w: "DEVIL", c: "A figure of evil", cat: "general", diff: 2 },
  { w: "DITCH", c: "A narrow trench, or to abandon", cat: "general", diff: 2 },
  { w: "DIZZY", c: "Feeling unsteady or faint", cat: "general", diff: 2 },
  { w: "DODGE", c: "To avoid something by moving quickly", cat: "general", diff: 2 },
  { w: "DONOR", c: "A person who gives something, like blood or money", cat: "general", diff: 2 },
  { w: "DOUBT", c: "A feeling of uncertainty", cat: "general", diff: 2 },
  { w: "DRAIN", c: "A pipe that carries away liquid", cat: "general", diff: 2 },
  { w: "DRAMA", c: "A serious play or an intense situation", cat: "general", diff: 2 },
  { w: "DRAWN", c: "Past participle of draw", cat: "general", diff: 2 },
  { w: "DRESS", c: "A one-piece garment worn by women", cat: "general", diff: 2 },
  { w: "DRIFT", c: "To move slowly, carried by current or wind", cat: "general", diff: 2 },
  { w: "DRILL", c: "A tool for boring holes, or repeated practice", cat: "general", diff: 2 },
  { w: "DRINK", c: "A liquid consumed for hydration or pleasure", cat: "general", diff: 2 },
  { w: "DROVE", c: "Past tense of drive", cat: "general", diff: 2 },
  { w: "EARLY", c: "Before the usual time", cat: "general", diff: 2 },
  { w: "EARTH", c: "The planet we live on", cat: "general", diff: 2 },
  { w: "ELBOW", c: "The joint between upper and lower arm", cat: "general", diff: 2 },
  { w: "ENJOY", c: "To take pleasure in", cat: "general", diff: 2 },
  { w: "ENTER", c: "To go into a place", cat: "general", diff: 2 },
  { w: "ENTRY", c: "The act of entering, or a written item in a log", cat: "general", diff: 2 },
  { w: "ERROR", c: "A mistake", cat: "general", diff: 2 },
  { w: "EVENT", c: "A planned or notable occurrence", cat: "general", diff: 2 },
  { w: "EXACT", c: "Precisely correct", cat: "general", diff: 2 },
  { w: "FAINT", c: "Weak, or to lose consciousness briefly", cat: "general", diff: 2 },
  { w: "FALSE", c: "Not true", cat: "general", diff: 2 },
  { w: "FAULT", c: "A mistake or flaw", cat: "general", diff: 2 },
  { w: "FENCE", c: "A barrier enclosing an area", cat: "general", diff: 2 },
  { w: "FIERY", c: "Full of fire or intense passion", cat: "general", diff: 2 },
  { w: "FIFTH", c: "The ordinal number after fourth", cat: "general", diff: 2 },
  { w: "FIGHT", c: "A physical or verbal conflict", cat: "general", diff: 2 },
  { w: "FINAL", c: "Last in a series", cat: "general", diff: 2 },
  { w: "FIRST", c: "Coming before all others", cat: "general", diff: 2 },
  { w: "FLASH", c: "A brief burst of light", cat: "general", diff: 2 },
  { w: "FLEET", c: "A group of ships, or swift", cat: "general", diff: 2 },
  { w: "FLESH", c: "The soft substance of a body", cat: "general", diff: 2 },
  { w: "FLING", c: "To throw with force", cat: "general", diff: 2 },
  { w: "FLOAT", c: "To rest on the surface of a liquid without sinking", cat: "general", diff: 2 },
  { w: "FLOCK", c: "A group of birds or sheep", cat: "general", diff: 2 },
  { w: "FLOOD", c: "An overflow of water onto land", cat: "general", diff: 2 },
  { w: "FLOOR", c: "The surface you stand on inside a room", cat: "general", diff: 2 },
  { w: "FLUID", c: "A substance that flows, like a liquid or gas", cat: "general", diff: 2 },
  { w: "FOCUS", c: "To concentrate attention on something", cat: "general", diff: 2 },
  { w: "FORGE", c: "To shape metal with heat, or to counterfeit", cat: "general", diff: 2 },
  { w: "FRAME", c: "A structure that surrounds or supports something", cat: "general", diff: 2 },
  { w: "FRESH", c: "Newly made or gathered", cat: "general", diff: 2 },
  { w: "FROWN", c: "A facial expression showing displeasure", cat: "general", diff: 2 },
  { w: "FRUIT", c: "The sweet, edible part of a plant", cat: "general", diff: 2 },
  { w: "GLIDE", c: "To move smoothly and effortlessly", cat: "general", diff: 2 },
  { w: "GLORY", c: "Great honor or renown", cat: "general", diff: 2 },
  { w: "GLOVE", c: "A covering for the hand", cat: "general", diff: 2 },
  { w: "GOOSE", c: "A large water bird related to the duck", cat: "general", diff: 2 },
  { w: "GRACE", c: "Elegance of movement, or a blessing said before meals", cat: "general", diff: 2 },
  { w: "GRADE", c: "A level of quality, or a school year", cat: "general", diff: 2 },
  { w: "GRAIN", c: "A small hard seed, or the texture of wood", cat: "general", diff: 2 },
  { w: "GRANT", c: "To give formally, or a sum of money awarded", cat: "general", diff: 2 },
  { w: "GRAPE", c: "A small round fruit that grows in clusters", cat: "general", diff: 2 },
  { w: "GRASP", c: "To seize firmly, or to understand", cat: "general", diff: 2 },
  { w: "GRASS", c: "Green ground-covering plants", cat: "general", diff: 2 },
  { w: "GRAVE", c: "A burial site, or serious", cat: "general", diff: 2 },
  { w: "GRAZE", c: "To feed on grass, or a minor scrape", cat: "general", diff: 2 },
  { w: "GREED", c: "An excessive desire for wealth", cat: "general", diff: 2 },
  { w: "GREEN", c: "The color of grass", cat: "general", diff: 2 },
  { w: "GRIEF", c: "Deep sorrow", cat: "general", diff: 2 },
  { w: "GRILL", c: "A cooking device that uses direct heat", cat: "general", diff: 2 },
  { w: "GRIND", c: "To crush into small pieces", cat: "general", diff: 2 },
  { w: "GROOM", c: "To care for one's appearance, or a man about to marry", cat: "general", diff: 2 },
  { w: "GROSS", c: "Disgusting, or a total before deductions", cat: "general", diff: 2 },
  { w: "GROUP", c: "A number of things gathered together", cat: "general", diff: 2 },
  { w: "GROWL", c: "A low, threatening sound", cat: "general", diff: 2 },
  { w: "GUARD", c: "To protect, or a person who protects", cat: "general", diff: 2 },
  { w: "GUESS", c: "To estimate without certain knowledge", cat: "general", diff: 2 },
  { w: "GUEST", c: "A visitor invited to a place", cat: "general", diff: 2 },
  { w: "GUIDE", c: "A person or book that shows the way", cat: "general", diff: 2 },
  { w: "HAPPY", c: "Feeling pleasure or contentment", cat: "general", diff: 2 },
  { w: "HARSH", c: "Severe or unpleasant", cat: "general", diff: 2 },
  { w: "HEART", c: "The organ that pumps blood", cat: "general", diff: 2 },
  { w: "HEAVY", c: "Having great weight", cat: "general", diff: 2 },
  { w: "HEDGE", c: "A boundary formed by closely growing shrubs", cat: "general", diff: 2 },
  { w: "HONOR", c: "Great respect, or to keep a promise", cat: "general", diff: 2 },
  { w: "HORSE", c: "A large animal used for riding", cat: "general", diff: 2 },
  { w: "HOTEL", c: "A building offering paid lodging", cat: "general", diff: 2 },
  { w: "HOUSE", c: "A building where people live", cat: "general", diff: 2 },
  { w: "HUMAN", c: "A member of the species Homo sapiens", cat: "general", diff: 2 },
  { w: "HUMID", c: "Containing a lot of moisture in the air", cat: "general", diff: 2 },
  { w: "HUMOR", c: "The quality of being funny", cat: "general", diff: 2 },
  { w: "IDEAL", c: "Perfect or most suitable", cat: "general", diff: 2 },
  { w: "IMAGE", c: "A visual representation", cat: "general", diff: 2 },
  { w: "INDEX", c: "An alphabetical list, or a measure", cat: "general", diff: 2 },
  { w: "INNER", c: "Located further inside", cat: "general", diff: 2 },
  { w: "ISSUE", c: "A topic for discussion, or a single edition", cat: "general", diff: 2 },
  { w: "JOINT", c: "A place where two parts connect", cat: "general", diff: 2 },
  { w: "JUDGE", c: "A person who decides a case in court", cat: "general", diff: 2 },
  { w: "JUICE", c: "The liquid extracted from fruit", cat: "general", diff: 2 },
  { w: "KNEEL", c: "To go down on one's knees", cat: "general", diff: 2 },
  { w: "KNIFE", c: "A tool with a sharp blade used for cutting", cat: "general", diff: 2 },
  { w: "LABEL", c: "A small piece of paper attached to identify something", cat: "general", diff: 2 },
  { w: "LARGE", c: "Big in size", cat: "general", diff: 2 },
  { w: "LAUGH", c: "To make sounds expressing amusement", cat: "general", diff: 2 },
  { w: "LAYER", c: "A single thickness of material covering a surface", cat: "general", diff: 2 },
  { w: "LEASE", c: "A contract for renting property", cat: "general", diff: 2 },
  { w: "LEDGE", c: "A narrow horizontal surface projecting from a wall", cat: "general", diff: 2 },
  { w: "LEGAL", c: "Permitted or required by law", cat: "general", diff: 2 },
  { w: "LEMON", c: "A sour yellow citrus fruit", cat: "general", diff: 2 },
  { w: "LEVEL", c: "A flat, horizontal surface, or a stage in a game", cat: "general", diff: 2 },
  { w: "LIMIT", c: "The furthest extent allowed", cat: "general", diff: 2 },
  { w: "LIVER", c: "An organ that filters blood", cat: "general", diff: 2 },
  { w: "LOOSE", c: "Not tightly fastened", cat: "general", diff: 2 },
  { w: "LOWER", c: "To move down", cat: "general", diff: 2 },
  { w: "LOYAL", c: "Faithful to a person or cause", cat: "general", diff: 2 },
  { w: "LUNAR", c: "Relating to the moon", cat: "general", diff: 2 },
  { w: "LUNCH", c: "A midday meal", cat: "general", diff: 2 },
  { w: "LYRIC", c: "The words of a song", cat: "general", diff: 2 },
  { w: "MAGIC", c: "Supernatural power, or the art of illusion", cat: "general", diff: 2 },
  { w: "MAJOR", c: "Significant, or a military rank", cat: "general", diff: 2 },
  { w: "MERCY", c: "Compassion shown toward someone", cat: "general", diff: 2 },
  { w: "MERGE", c: "To combine into one", cat: "general", diff: 2 },
  { w: "METAL", c: "A hard, shiny material like iron or gold", cat: "general", diff: 2 },
  { w: "MODEL", c: "A representation, or a person who poses for art", cat: "general", diff: 2 },
  { w: "MOIST", c: "Slightly wet", cat: "general", diff: 2 },
  { w: "MOTOR", c: "A machine that produces motion", cat: "general", diff: 2 },
  { w: "MOUSE", c: "A small rodent, or a computer pointing device", cat: "general", diff: 2 },
  { w: "MOUTH", c: "The opening used for eating and speaking", cat: "general", diff: 2 },
  { w: "MOVIE", c: "A film shown for entertainment", cat: "general", diff: 2 },
  { w: "NAKED", c: "Without clothing", cat: "general", diff: 2 },
  { w: "NASTY", c: "Very unpleasant", cat: "general", diff: 2 },
  { w: "NERVE", c: "A fiber that carries signals in the body, or courage", cat: "general", diff: 2 },
  { w: "NIGHT", c: "The time when the sun is down", cat: "general", diff: 2 },
  { w: "NOBLE", c: "Having high moral qualities, or of high rank", cat: "general", diff: 2 },
  { w: "NORTH", c: "The direction toward the top of a map", cat: "general", diff: 2 },
  { w: "NOVEL", c: "A long fictional book, or something new", cat: "general", diff: 2 },
  { w: "NURSE", c: "A person trained to care for the sick", cat: "general", diff: 2 },
  { w: "OFFER", c: "To present something for acceptance", cat: "general", diff: 2 },
  { w: "ONION", c: "A pungent bulb vegetable", cat: "general", diff: 2 },
  { w: "OUTER", c: "Located on the outside", cat: "general", diff: 2 },
  { w: "OWNER", c: "A person who possesses something", cat: "general", diff: 2 },
  { w: "PANEL", c: "A flat section of a surface, or a group of experts", cat: "general", diff: 2 },
  { w: "PATCH", c: "A small piece used to cover a hole", cat: "general", diff: 2 },
  { w: "PAUSE", c: "A brief stop", cat: "general", diff: 2 },
  { w: "PEARL", c: "A smooth gem formed inside an oyster", cat: "general", diff: 2 },
  { w: "PHASE", c: "A distinct stage in a process", cat: "general", diff: 2 },
  { w: "PHOTO", c: "A picture taken with a camera", cat: "general", diff: 2 },
  { w: "PIANO", c: "A keyboard instrument played by striking strings", cat: "general", diff: 2 },
  { w: "PIECE", c: "A part of a whole", cat: "general", diff: 2 },
  { w: "PITCH", c: "The highness or lowness of a sound, or to throw", cat: "general", diff: 2 },
  { w: "PIXEL", c: "The smallest unit of a digital image", cat: "general", diff: 2 },
  { w: "PLANT", c: "A living organism that grows in soil", cat: "general", diff: 2 },
  { w: "PLATE", c: "A flat dish used for serving food", cat: "general", diff: 2 },
  { w: "POINT", c: "A sharp end, or a specific location", cat: "general", diff: 2 },
  { w: "POUND", c: "A unit of weight, or to strike heavily", cat: "general", diff: 2 },
  { w: "POWER", c: "The ability to do something, or electricity", cat: "general", diff: 2 },
  { w: "PRICE", c: "The amount of money needed to buy something", cat: "general", diff: 2 },
  { w: "PRIDE", c: "A feeling of satisfaction with achievement", cat: "general", diff: 2 },
  { w: "PRIZE", c: "A reward for winning", cat: "general", diff: 2 },
  { w: "PROOF", c: "Evidence that something is true", cat: "general", diff: 2 },
  { w: "PULSE", c: "The rhythmic beating of the heart", cat: "general", diff: 2 },
  { w: "PUPIL", c: "A student, or the opening in the eye", cat: "general", diff: 2 },
  { w: "QUICK", c: "Fast", cat: "general", diff: 2 },
  { w: "QUOTE", c: "A repeated statement, or a price estimate", cat: "general", diff: 2 },
  { w: "RADAR", c: "A system that detects objects using radio waves", cat: "general", diff: 2 },
  { w: "RADIO", c: "A device that receives broadcast sound", cat: "general", diff: 2 },
  { w: "RAISE", c: "To lift up", cat: "general", diff: 2 },
  { w: "RANCH", c: "A large farm for raising livestock", cat: "general", diff: 2 },
  { w: "RANGE", c: "The extent of variation, or a cooking stove", cat: "general", diff: 2 },
  { w: "RAPID", c: "Happening very quickly", cat: "general", diff: 2 },
  { w: "RATIO", c: "The relationship between two quantities", cat: "general", diff: 2 },
  { w: "REACH", c: "To extend far enough to touch", cat: "general", diff: 2 },
  { w: "READY", c: "Prepared for action", cat: "general", diff: 2 },
  { w: "REBEL", c: "A person who resists authority", cat: "general", diff: 2 },
  { w: "RELAX", c: "To become less tense", cat: "general", diff: 2 },
  { w: "RIGID", c: "Stiff and unbending", cat: "general", diff: 2 },
  { w: "RIVAL", c: "A competitor", cat: "general", diff: 2 },
  { w: "ROUGH", c: "Not smooth", cat: "general", diff: 2 },
  { w: "ROUND", c: "Shaped like a circle", cat: "general", diff: 2 },
  { w: "ROUTE", c: "A path taken to get somewhere", cat: "general", diff: 2 },
  { w: "ROYAL", c: "Relating to a king or queen", cat: "general", diff: 2 },
  { w: "RUMOR", c: "Unverified information passed by word of mouth", cat: "general", diff: 2 },
  { w: "SALAD", c: "A cold dish of mixed vegetables", cat: "general", diff: 2 },
  { w: "SCALE", c: "A device for weighing, or the size of something", cat: "general", diff: 2 },
  { w: "SCARE", c: "To frighten", cat: "general", diff: 2 },
  { w: "SCARF", c: "A strip of fabric worn around the neck", cat: "general", diff: 2 },
  { w: "SCENT", c: "A distinctive smell", cat: "general", diff: 2 },
  { w: "SCOLD", c: "To criticize someone sharply", cat: "general", diff: 2 },
  { w: "SCOPE", c: "The extent of an area or subject", cat: "general", diff: 2 },
  { w: "SCRUB", c: "To clean by rubbing hard", cat: "general", diff: 2 },
  { w: "SENSE", c: "One of the faculties like sight or hearing", cat: "general", diff: 2 },
  { w: "SHADE", c: "An area sheltered from sunlight", cat: "general", diff: 2 },
  { w: "SHAKE", c: "To move rapidly back and forth", cat: "general", diff: 2 },
  { w: "SHAME", c: "A feeling of embarrassment", cat: "general", diff: 2 },
  { w: "SHARE", c: "To divide among several people", cat: "general", diff: 2 },
  { w: "SHARK", c: "A large predatory fish", cat: "general", diff: 2 },
  { w: "SHEEP", c: "A woolly farm animal", cat: "general", diff: 2 },
  { w: "SHEET", c: "A large piece of thin material", cat: "general", diff: 2 },
  { w: "SHELF", c: "A flat surface for storing objects", cat: "general", diff: 2 },
  { w: "SHELL", c: "A hard outer covering", cat: "general", diff: 2 },
  { w: "SHIFT", c: "A change, or a work period", cat: "general", diff: 2 },
  { w: "SHINE", c: "To give off light", cat: "general", diff: 2 },
  { w: "SHIRT", c: "An upper-body garment with sleeves", cat: "general", diff: 2 },
  { w: "SHOCK", c: "A sudden, surprising event", cat: "general", diff: 2 },
  { w: "SHORT", c: "Not long in length or duration", cat: "general", diff: 2 },
  { w: "SHOUT", c: "To speak loudly", cat: "general", diff: 2 },
  { w: "SIGHT", c: "The ability to see", cat: "general", diff: 2 },
  { w: "SIXTH", c: "The ordinal number after fifth", cat: "general", diff: 2 },
  { w: "SKATE", c: "To glide on blades or wheels", cat: "general", diff: 2 },
  { w: "SKIRT", c: "A garment that hangs from the waist", cat: "general", diff: 2 },
  { w: "SKULL", c: "The bony framework of the head", cat: "general", diff: 2 },
  { w: "SLEEP", c: "A state of rest with reduced consciousness", cat: "general", diff: 2 },
  { w: "SLICE", c: "A thin piece cut from something larger", cat: "general", diff: 2 },
  { w: "SMALL", c: "Little in size", cat: "general", diff: 2 },
  { w: "SMART", c: "Intelligent", cat: "general", diff: 2 },
  { w: "SMELL", c: "The sense used to detect odors", cat: "general", diff: 2 },
  { w: "SMOKE", c: "The visible cloud from something burning", cat: "general", diff: 2 },
  { w: "SNAKE", c: "A long, legless reptile", cat: "general", diff: 2 },
  { w: "SOLAR", c: "Relating to the sun", cat: "general", diff: 2 },
  { w: "SOUND", c: "Vibrations that can be heard", cat: "general", diff: 2 },
  { w: "SOUTH", c: "The direction opposite north", cat: "general", diff: 2 },
  { w: "SPACE", c: "The area beyond earth's atmosphere, or room", cat: "general", diff: 2 },
  { w: "SPEAK", c: "To say words aloud", cat: "general", diff: 2 },
  { w: "SPEED", c: "The rate at which something moves", cat: "general", diff: 2 },
  { w: "SPEND", c: "To pay out money", cat: "general", diff: 2 },
  { w: "SPICE", c: "A flavorful seasoning made from plants", cat: "general", diff: 2 },
  { w: "SPINE", c: "The backbone", cat: "general", diff: 2 },
  { w: "SPLIT", c: "To divide into parts", cat: "general", diff: 2 },
  { w: "SPOIL", c: "To ruin, or to indulge excessively", cat: "general", diff: 2 },
  { w: "SPOON", c: "A utensil with a shallow bowl for eating", cat: "general", diff: 2 },
  { w: "SPORT", c: "A physical activity governed by rules", cat: "general", diff: 2 },
  { w: "SPRAY", c: "A fine mist of liquid", cat: "general", diff: 2 },
  { w: "SQUAD", c: "A small organized group", cat: "general", diff: 2 },
  { w: "STACK", c: "A neat pile", cat: "general", diff: 2 },
  { w: "STAFF", c: "Employees, or a long stick", cat: "general", diff: 2 },
  { w: "STAGE", c: "A platform for performances, or a phase", cat: "general", diff: 2 },
  { w: "STAIN", c: "A discolored mark that is hard to remove", cat: "general", diff: 2 },
  { w: "STAIR", c: "A single step in a flight of stairs", cat: "general", diff: 2 },
  { w: "STALE", c: "No longer fresh", cat: "general", diff: 2 },
  { w: "STALL", c: "A small stand for selling goods, or to delay", cat: "general", diff: 2 },
  { w: "STAMP", c: "A small adhesive label for mail, or to press down", cat: "general", diff: 2 },
  { w: "STAND", c: "To be upright, or a small structure for selling goods", cat: "general", diff: 2 },
  { w: "STARE", c: "To look fixedly at something", cat: "general", diff: 2 },
  { w: "STEAM", c: "The vapor produced by boiling water", cat: "general", diff: 2 },
  { w: "STEEL", c: "A strong metal alloy of iron and carbon", cat: "general", diff: 2 },
  { w: "STEEP", c: "Having a sharp slope", cat: "general", diff: 2 },
  { w: "STICK", c: "A thin piece of wood, or to adhere", cat: "general", diff: 2 },
  { w: "STIFF", c: "Rigid and hard to bend", cat: "general", diff: 2 },
  { w: "STING", c: "A sharp pain from an insect bite, or to hurt sharply", cat: "general", diff: 2 },
  { w: "STOCK", c: "Goods kept for sale, or a broth", cat: "general", diff: 2 },
  { w: "STOOL", c: "A seat without a back or arms", cat: "general", diff: 2 },
  { w: "STORE", c: "A place where goods are sold", cat: "general", diff: 2 },
  { w: "STOVE", c: "An appliance used for cooking", cat: "general", diff: 2 },
  { w: "STRAW", c: "A dried plant stalk, or a tube for drinking", cat: "general", diff: 2 },
  { w: "STRAY", c: "To wander off course", cat: "general", diff: 2 },
  { w: "STUDY", c: "To learn about a subject", cat: "general", diff: 2 },
  { w: "STUFF", c: "Items or material of an unspecified kind", cat: "general", diff: 2 },
  { w: "STYLE", c: "A distinctive manner or fashion", cat: "general", diff: 2 },
  { w: "SWEAT", c: "Moisture produced by the skin when hot", cat: "general", diff: 2 },
  { w: "SWEEP", c: "To clean using a broom", cat: "general", diff: 2 },
  { w: "SWEET", c: "Having a sugary taste", cat: "general", diff: 2 },
  { w: "SWELL", c: "To expand in size, or a large ocean wave", cat: "general", diff: 2 },
  { w: "SWIFT", c: "Moving very fast", cat: "general", diff: 2 },
  { w: "TASTE", c: "The sense used to perceive flavor", cat: "general", diff: 2 },
  { w: "TEACH", c: "To help someone learn", cat: "general", diff: 2 },
  { w: "THEFT", c: "The act of stealing", cat: "general", diff: 2 },
  { w: "THICK", c: "Having a large distance between opposite sides", cat: "general", diff: 2 },
  { w: "THIEF", c: "A person who steals", cat: "general", diff: 2 },
  { w: "THING", c: "An object or matter", cat: "general", diff: 2 },
  { w: "THINK", c: "To use one's mind to consider something", cat: "general", diff: 2 },
  { w: "THIRD", c: "The ordinal number after second", cat: "general", diff: 2 },
  { w: "THORN", c: "A sharp point on a plant stem", cat: "general", diff: 2 },
  { w: "THROW", c: "To propel something through the air", cat: "general", diff: 2 },
  { w: "THUMB", c: "The short, thick digit of the hand", cat: "general", diff: 2 },
  { w: "TIGHT", c: "Fitting closely", cat: "general", diff: 2 },
  { w: "TITLE", c: "The name of a work, or a legal right to property", cat: "general", diff: 2 },
  { w: "TODAY", c: "The current day", cat: "general", diff: 2 },
  { w: "TOKEN", c: "A symbolic object, or a substitute for currency", cat: "general", diff: 2 },
  { w: "TOPIC", c: "The subject of a discussion", cat: "general", diff: 2 },
  { w: "TOUCH", c: "To make physical contact with", cat: "general", diff: 2 },
  { w: "TOWEL", c: "A cloth used for drying", cat: "general", diff: 2 },
  { w: "TOXIC", c: "Poisonous", cat: "general", diff: 2 },
  { w: "TRACE", c: "A small remaining sign of something", cat: "general", diff: 2 },
  { w: "TRADE", c: "The exchange of goods, or a skilled occupation", cat: "general", diff: 2 },
  { w: "TRAIL", c: "A path through a natural area", cat: "general", diff: 2 },
  { w: "TREAT", c: "To handle in a particular way, or a small gift", cat: "general", diff: 2 },
  { w: "TREND", c: "A general direction of change", cat: "general", diff: 2 },
  { w: "TRIAL", c: "A legal proceeding, or a test", cat: "general", diff: 2 },
  { w: "TRICK", c: "A clever act meant to deceive or entertain", cat: "general", diff: 2 },
  { w: "TROOP", c: "A group of soldiers", cat: "general", diff: 2 },
  { w: "TRUCK", c: "A large motor vehicle for hauling goods", cat: "general", diff: 2 },
  { w: "TRUNK", c: "The main stem of a tree, or a storage box", cat: "general", diff: 2 },
  { w: "TRUTH", c: "The state of being true", cat: "general", diff: 2 },
  { w: "TULIP", c: "A cup-shaped spring flower", cat: "general", diff: 2 },
  { w: "TWICE", c: "Two times", cat: "general", diff: 2 },
  { w: "ULTRA", c: "Extreme or beyond the usual", cat: "general", diff: 2 },
  { w: "UNCLE", c: "The brother of one's parent", cat: "general", diff: 2 },
  { w: "UNDER", c: "Below something", cat: "general", diff: 2 },
  { w: "UNION", c: "A group joined together for a common purpose", cat: "general", diff: 2 },
  { w: "UNITE", c: "To join together", cat: "general", diff: 2 },
  { w: "UPPER", c: "Higher in position", cat: "general", diff: 2 },
  { w: "URBAN", c: "Relating to a city", cat: "general", diff: 2 },
  { w: "USUAL", c: "Habitually occurring", cat: "general", diff: 2 },
  { w: "VALID", c: "Legally or logically acceptable", cat: "general", diff: 2 },
  { w: "VIDEO", c: "Recorded visual media", cat: "general", diff: 2 },
  { w: "VILLA", c: "A large, comfortable country house", cat: "general", diff: 2 },
  { w: "VISIT", c: "To go to see a person or place", cat: "general", diff: 2 },
  { w: "VOCAL", c: "Relating to the voice", cat: "general", diff: 2 },
  { w: "VOICE", c: "The sound produced when speaking", cat: "general", diff: 2 },
  { w: "WAGON", c: "A four-wheeled vehicle for hauling", cat: "general", diff: 2 },
  { w: "WASTE", c: "To use carelessly, or unwanted material", cat: "general", diff: 2 },
  { w: "WATCH", c: "A device for telling time, or to observe", cat: "general", diff: 2 },
  { w: "WEIGH", c: "To measure the heaviness of", cat: "general", diff: 2 },
  { w: "WHALE", c: "A large marine mammal", cat: "general", diff: 2 },
  { w: "WHEAT", c: "A cereal grain used to make flour", cat: "general", diff: 2 },
  { w: "WHEEL", c: "A circular object that rotates to allow movement", cat: "general", diff: 2 },
  { w: "WHILE", c: "During the time that", cat: "general", diff: 2 },
  { w: "WHITE", c: "The color of snow", cat: "general", diff: 2 },
  { w: "WHOLE", c: "Complete, with nothing missing", cat: "general", diff: 2 },
  { w: "WOMAN", c: "An adult female human", cat: "general", diff: 2 },
  { w: "WOODY", c: "Resembling or made of wood", cat: "general", diff: 2 },
  { w: "WORRY", c: "To feel anxious about something", cat: "general", diff: 2 },
  { w: "WORTH", c: "The value of something", cat: "general", diff: 2 },
  { w: "WOUND", c: "An injury that breaks the skin", cat: "general", diff: 2 },
  { w: "WOVEN", c: "Past participle of weave", cat: "general", diff: 2 },
  { w: "WRIST", c: "The joint between hand and forearm", cat: "general", diff: 2 },
  { w: "WRONG", c: "Not correct", cat: "general", diff: 2 },
  { w: "YIELD", c: "To give way, or a crop's output", cat: "general", diff: 2 },
  { w: "YOUTH", c: "The period of being young", cat: "general", diff: 2 },

  // ---- general (more short fill, round 3) ----
  { w: "SIGH", c: "A long, audible breath expressing emotion", cat: "general", diff: 2 },
  { w: "SIGN", c: "A symbol conveying information", cat: "general", diff: 2 },
  { w: "SILK", c: "A soft, smooth fabric made from fibers spun by worms", cat: "general", diff: 2 },
  { w: "SINK", c: "A basin for washing, or to go underwater", cat: "general", diff: 2 },
  { w: "SITE", c: "A location", cat: "general", diff: 2 },
  { w: "SIZE", c: "The measurements of something", cat: "general", diff: 2 },
  { w: "SLAB", c: "A flat, thick piece of material", cat: "general", diff: 2 },
  { w: "SLAM", c: "To shut forcefully", cat: "general", diff: 2 },
  { w: "SLAP", c: "A quick strike with an open hand", cat: "general", diff: 2 },
  { w: "SLIM", c: "Thin", cat: "general", diff: 2 },
  { w: "SLIP", c: "To slide accidentally", cat: "general", diff: 2 },
  { w: "SLOT", c: "A narrow opening", cat: "general", diff: 2 },
  { w: "SMOG", c: "Polluted, hazy air", cat: "general", diff: 2 },
  { w: "SNAG", c: "An unexpected obstacle", cat: "general", diff: 2 },
  { w: "SNAP", c: "A quick, sharp break, or a photo", cat: "general", diff: 2 },
  { w: "SOAK", c: "To immerse in liquid", cat: "general", diff: 2 },
  { w: "SOAP", c: "A substance used to wash with", cat: "general", diff: 2 },
  { w: "SOIL", c: "The top layer of earth used to grow plants", cat: "general", diff: 2 },
  { w: "SOLD", c: "Past tense of sell", cat: "general", diff: 2 },
  { w: "SOLE", c: "The bottom of a shoe or foot, or being the only one", cat: "general", diff: 2 },
  { w: "SOOT", c: "Black powder left by burning", cat: "general", diff: 2 },
  { w: "SORE", c: "Painful, especially from strain", cat: "general", diff: 2 },
  { w: "SORT", c: "To arrange into groups", cat: "general", diff: 2 },
  { w: "SOUR", c: "Having a sharp, acidic taste", cat: "general", diff: 2 },
  { w: "SPAN", c: "The full extent of something", cat: "general", diff: 2 },
  { w: "SPIN", c: "To turn rapidly around an axis", cat: "general", diff: 2 },
  { w: "SPOT", c: "A small mark, or a particular place", cat: "general", diff: 2 },
  { w: "STAB", c: "To pierce with a pointed object", cat: "general", diff: 2 },
  { w: "STAG", c: "A male deer", cat: "general", diff: 2 },
  { w: "STIR", c: "To mix by moving a spoon in circles", cat: "general", diff: 2 },
  { w: "STUB", c: "A short remaining piece, like a ticket receipt", cat: "general", diff: 2 },
  { w: "SUIT", c: "A matching set of formal clothing", cat: "general", diff: 2 },
  { w: "SWAP", c: "To trade one thing for another", cat: "general", diff: 2 },
  { w: "SWAY", c: "To rock gently from side to side", cat: "general", diff: 2 },
  { w: "SWIM", c: "To move through water using your limbs", cat: "general", diff: 2 },
  { w: "TALE", c: "A story, often fictional", cat: "general", diff: 2 },
  { w: "TANK", c: "A large container for liquid, or an armored vehicle", cat: "general", diff: 2 },
  { w: "TAPE", c: "A strip of adhesive material", cat: "general", diff: 2 },
  { w: "TEAR", c: "A drop of liquid from the eye, or to rip", cat: "general", diff: 2 },
  { w: "TENT", c: "A portable shelter made of fabric", cat: "general", diff: 2 },
  { w: "TERM", c: "A word or phrase, or a period of time", cat: "general", diff: 2 },
  { w: "TEXT", c: "Written words, or to send a written message", cat: "general", diff: 2 },
  { w: "THUD", c: "A dull, heavy sound", cat: "general", diff: 2 },
  { w: "TILE", c: "A flat piece used to cover floors or walls", cat: "general", diff: 2 },
  { w: "TILL", c: "Until, or to cultivate soil", cat: "general", diff: 2 },
  { w: "TILT", c: "To lean at an angle", cat: "general", diff: 2 },
  { w: "TINY", c: "Extremely small", cat: "general", diff: 2 },
  { w: "TONE", c: "The quality of a sound or a shade of color", cat: "general", diff: 2 },
  { w: "TOOL", c: "An implement used to do work", cat: "general", diff: 2 },
  { w: "TORE", c: "Past tense of tear", cat: "general", diff: 2 },
  { w: "TOSS", c: "To throw lightly", cat: "general", diff: 2 },
  { w: "TOUR", c: "A trip to see various places", cat: "general", diff: 2 },
  { w: "TRAM", c: "A vehicle that runs on rails through a city", cat: "general", diff: 2 },
  { w: "TRAP", c: "A device used to catch something", cat: "general", diff: 2 },
  { w: "TRAY", c: "A flat surface used to carry items", cat: "general", diff: 2 },
  { w: "TREK", c: "A long, difficult journey", cat: "general", diff: 2 },
  { w: "TRIM", c: "To cut something neatly", cat: "general", diff: 2 },
  { w: "TRIP", c: "A journey, or to stumble", cat: "general", diff: 2 },
  { w: "TUBE", c: "A hollow cylinder", cat: "general", diff: 2 },
  { w: "TURF", c: "A layer of grass and soil", cat: "general", diff: 2 },
  { w: "TUSK", c: "A long, pointed tooth on an elephant or walrus", cat: "general", diff: 2 },
  { w: "TWIN", c: "One of two children born at the same birth", cat: "general", diff: 2 },
  { w: "VAIN", c: "Excessively proud of one's appearance", cat: "general", diff: 2 },
  { w: "VASE", c: "A decorative container for flowers", cat: "general", diff: 2 },
  { w: "VEAL", c: "Meat from a young calf", cat: "general", diff: 2 },
  { w: "VEIL", c: "A piece of fabric worn over the face", cat: "general", diff: 2 },
  { w: "VEIN", c: "A blood vessel carrying blood to the heart", cat: "general", diff: 2 },
  { w: "VENT", c: "An opening that allows air to pass through", cat: "general", diff: 2 },
  { w: "VERB", c: "A word describing an action or state", cat: "general", diff: 2 },
  { w: "VEST", c: "A sleeveless garment worn over a shirt", cat: "general", diff: 2 },
  { w: "VETO", c: "To officially reject a proposal", cat: "general", diff: 2 },
  { w: "VIEW", c: "What you can see from a place", cat: "general", diff: 2 },
  { w: "VINE", c: "A climbing or trailing plant", cat: "general", diff: 2 },
  { w: "VOID", c: "Completely empty", cat: "general", diff: 2 },
  { w: "WADE", c: "To walk through water", cat: "general", diff: 2 },
  { w: "WAGE", c: "Payment for work done", cat: "general", diff: 2 },
  { w: "WAIL", c: "A long, loud cry of grief", cat: "general", diff: 2 },
  { w: "WAIT", c: "To stay in place until something happens", cat: "general", diff: 2 },
  { w: "WAKE", c: "To stop sleeping", cat: "general", diff: 2 },
  { w: "WALK", c: "To move on foot at a normal pace", cat: "general", diff: 2 },
  { w: "WALL", c: "A vertical structure that divides or encloses space", cat: "general", diff: 2 },
  { w: "WANT", c: "To desire something", cat: "general", diff: 2 },
  { w: "WARD", c: "A hospital section, or to fend off", cat: "general", diff: 2 },
  { w: "WARN", c: "To alert someone of danger", cat: "general", diff: 2 },
  { w: "WASH", c: "To clean with water", cat: "general", diff: 2 },
  { w: "WASP", c: "A stinging flying insect related to bees", cat: "general", diff: 2 },
  { w: "WEED", c: "An unwanted plant", cat: "general", diff: 2 },
  { w: "WEEK", c: "A period of seven days", cat: "general", diff: 2 },
  { w: "WEST", c: "The direction the sun sets in", cat: "general", diff: 2 },
  { w: "WHEN", c: "At what time", cat: "general", diff: 2 },
  { w: "WHIP", c: "A flexible strap used to strike, or to beat quickly", cat: "general", diff: 2 },
  { w: "WICK", c: "The string in a candle that burns", cat: "general", diff: 2 },
  { w: "WINE", c: "An alcoholic drink made from grapes", cat: "general", diff: 2 },
  { w: "WING", c: "The limb a bird uses to fly", cat: "general", diff: 2 },
  { w: "WIRE", c: "A thin strand of metal", cat: "general", diff: 2 },
  { w: "WOOD", c: "The hard material that trees are made of", cat: "general", diff: 2 },
  { w: "WOOL", c: "The soft, curly hair of sheep", cat: "general", diff: 2 },
  { w: "WORD", c: "A unit of language with meaning", cat: "general", diff: 2 },
  { w: "WORE", c: "Past tense of wear", cat: "general", diff: 2 },
  { w: "WORM", c: "A long, legless invertebrate", cat: "general", diff: 2 },
  { w: "WORN", c: "Showing the effects of use", cat: "general", diff: 2 },
  { w: "WRAP", c: "To cover something by folding material around it", cat: "general", diff: 2 },
  { w: "YARD", c: "A unit of length, or the area around a house", cat: "general", diff: 2 },
  { w: "YARN", c: "Spun thread used for knitting", cat: "general", diff: 2 },
  { w: "YEAR", c: "A period of twelve months", cat: "general", diff: 2 },
  { w: "YELL", c: "To shout loudly", cat: "general", diff: 2 },
  { w: "YOGA", c: "An exercise practice involving stretching and breathing", cat: "general", diff: 2 },
  { w: "YOLK", c: "The yellow center of an egg", cat: "general", diff: 2 },
  { w: "ZERO", c: "The number representing nothing", cat: "general", diff: 2 },
  { w: "ZONE", c: "A specific area or region", cat: "general", diff: 2 },
  { w: "ZOOM", c: "To move very quickly, or to enlarge a view", cat: "general", diff: 2 },
  { w: "CREW", c: "A team that works together on a vessel or project", cat: "general", diff: 2 },

  // ===========================================================================
  // Batch 6 — targeted depth expansion. Every crossword template needs a
  // dense supply of short (3-4 letter) fill words plus long (9-13 letter)
  // anchors *within each category*; both were thin (verified: e.g. only
  // 1-6 three-letter words and single-digit 9-12 letter words per category
  // pre-batch), which is what capped standard/large grid density. This
  // batch is weighted almost entirely toward those two ends.
  // ===========================================================================

  // ---- food: short fill ----
  { w: "RYE", c: "Grain used in dense, dark bread", cat: "food", diff: 2 },
  { w: "YAM", c: "Starchy orange root vegetable", cat: "food", diff: 1 },
  { w: "PIE", c: "Baked dish with a crust and filling", cat: "food", diff: 1 },
  { w: "JAM", c: "Sweet fruit spread", cat: "food", diff: 1 },
  { w: "TEA", c: "Hot drink brewed from leaves", cat: "food", diff: 1 },
  { w: "FIG", c: "Sweet, seed-filled fruit", cat: "food", diff: 1 },
  { w: "NUT", c: "Hard-shelled edible seed", cat: "food", diff: 1 },
  { w: "EGG", c: "Breakfast staple laid by a hen", cat: "food", diff: 1 },
  { w: "HAM", c: "Cured pork, often sliced for sandwiches", cat: "food", diff: 1 },
  { w: "OAT", c: "Grain used in porridge, singular", cat: "food", diff: 2 },
  { w: "BUN", c: "Small round bread roll", cat: "food", diff: 1 },
  { w: "POT", c: "Vessel used for boiling or stewing", cat: "food", diff: 1 },
  { w: "PAN", c: "Flat vessel used for frying", cat: "food", diff: 1 },
  { w: "WOK", c: "Round-bottomed pan for stir-frying", cat: "food", diff: 2 },
  { w: "ALE", c: "A type of top-fermented beer", cat: "food", diff: 2 },
  { w: "COD", c: "Mild, flaky white fish", cat: "food", diff: 2 },
  { w: "EEL", c: "Long, slippery fish sometimes smoked", cat: "food", diff: 2 },
  { w: "SOY", c: "Bean used to make tofu and sauce", cat: "food", diff: 1 },
  { w: "PEA", c: "Small round green vegetable", cat: "food", diff: 1 },
  { w: "FAT", c: "Greasy component that adds richness to food", cat: "food", diff: 2 },
  { w: "OIL", c: "Liquid fat used for cooking", cat: "food", diff: 1 },
  // ---- food: long anchors ----
  { w: "SHEPHERDSPIE", c: "Baked dish of minced meat under mashed potato", cat: "food", diff: 2 },
  { w: "EGGSBENEDICT", c: "Brunch dish with poached eggs and hollandaise", cat: "food", diff: 3 },
  { w: "FETTUCCINE", c: "Flat ribbon pasta", cat: "food", diff: 2 },
  { w: "MOZZARELLA", c: "Soft, stretchy Italian cheese", cat: "food", diff: 1 },
  { w: "WORCESTERSHIRE", c: "Tangy, savory British fermented sauce", cat: "food", diff: 3 },
  { w: "HOLLANDAISE", c: "Rich, buttery egg-based sauce", cat: "food", diff: 3 },
  { w: "BOUILLABAISSE", c: "French fish stew from Marseille", cat: "food", diff: 3 },
  { w: "CHARCUTERIE", c: "A board of cured meats and cheeses", cat: "food", diff: 2 },
  { w: "GORGONZOLA", c: "Pungent Italian blue cheese", cat: "food", diff: 3 },
  { w: "SHORTCRUST", c: "Crumbly pastry used for pies and tarts", cat: "food", diff: 3 },
  { w: "CARAMELIZE", c: "To cook sugar until it browns and sweetens", cat: "food", diff: 2 },
  { w: "REFRIGERATE", c: "To keep food cold for storage", cat: "food", diff: 1 },
  { w: "MARINATE", c: "To soak food in a flavorful liquid before cooking", cat: "food", diff: 1 },
  { w: "TENDERIZE", c: "To make meat softer before cooking", cat: "food", diff: 2 },
  { w: "GARNISHING", c: "Decorating a dish before serving", cat: "food", diff: 2 },
  { w: "SEASONING", c: "Herbs and spices added to flavor food", cat: "food", diff: 1 },
  { w: "APPETIZERS", c: "Small dishes served before the main course", cat: "food", diff: 1 },
  { w: "CONFECTIONERY", c: "Sweets and candy, collectively", cat: "food", diff: 2 },
  { w: "PATISSERIE", c: "A shop specializing in pastries", cat: "food", diff: 3 },
  { w: "DELICATESSEN", c: "A shop selling prepared cold meats and cheeses", cat: "food", diff: 2 },
  { w: "VINAIGRETTE", c: "Oil-and-vinegar salad dressing", cat: "food", diff: 2 },
  { w: "PROSCIUTTO", c: "Italian dry-cured ham, thinly sliced", cat: "food", diff: 3 },
  { w: "BRUSCHETTA", c: "Toasted bread topped with tomato and basil", cat: "food", diff: 2 },
  { w: "ROTISSERIE", c: "A rotating spit used to roast meat evenly", cat: "food", diff: 2 },

  // ---- geography: short fill ----
  { w: "BAY", c: "A body of water partly enclosed by land", cat: "geography", diff: 1 },
  { w: "SEA", c: "A large body of salt water", cat: "geography", diff: 1 },
  { w: "COVE", c: "A small, sheltered bay", cat: "geography", diff: 2 },
  { w: "CAY", c: "A small low island or reef of sand", cat: "geography", diff: 3 },
  { w: "FEN", c: "A low, marshy area of land", cat: "geography", diff: 3 },
  { w: "TOR", c: "A rocky hilltop outcrop", cat: "geography", diff: 3 },
  { w: "CRAG", c: "A steep, rugged rock or cliff", cat: "geography", diff: 2 },
  { w: "GLEN", c: "A narrow, secluded valley", cat: "geography", diff: 2 },
  { w: "MESA", c: "A flat-topped hill with steep sides", cat: "geography", diff: 2 },
  { w: "ISLE", c: "A small island", cat: "geography", diff: 1 },
  { w: "CAPE", c: "A pointed piece of land jutting into the sea", cat: "geography", diff: 1 },
  { w: "REEF", c: "A ridge of rock or coral near the water's surface", cat: "geography", diff: 1 },
  { w: "PEAK", c: "The pointed top of a mountain", cat: "geography", diff: 1 },
  { w: "PASS", c: "A route through mountains", cat: "geography", diff: 1 },
  { w: "GULF", c: "A large inlet of the sea bordered by land", cat: "geography", diff: 1 },
  { w: "COAST", c: "Land bordering the sea", cat: "geography", diff: 1 },
  // ---- geography: long anchors ----
  { w: "MEDITERRANEAN", c: "Sea bordered by three continents", cat: "geography", diff: 2 },
  { w: "CONSTANTINOPLE", c: "Former name of Istanbul", cat: "geography", diff: 3 },
  { w: "SCANDINAVIA", c: "Region including Norway, Sweden, and Denmark", cat: "geography", diff: 2 },
  { w: "SUBCONTINENT", c: "A large landmass forming part of a continent", cat: "geography", diff: 2 },
  { w: "TRANSCONTINENTAL", c: "Crossing an entire continent", cat: "geography", diff: 3 },
  { w: "HEMISPHERES", c: "The two halves of the globe", cat: "geography", diff: 2 },
  { w: "PRECIPITATION", c: "Rain, snow, or hail falling from clouds", cat: "geography", diff: 2 },
  { w: "DEFORESTATION", c: "The clearing of forests on a large scale", cat: "geography", diff: 2 },
  { w: "URBANIZATION", c: "The growth of cities and city populations", cat: "geography", diff: 2 },
  { w: "ARCHIPELAGO", c: "A chain or cluster of islands", cat: "geography", diff: 2 },
  { w: "PENINSULAS", c: "Landmasses surrounded by water on three sides", cat: "geography", diff: 2 },
  { w: "EQUATORIAL", c: "Relating to the line dividing north and south", cat: "geography", diff: 2 },
  { w: "TOPOGRAPHY", c: "The arrangement of physical features of a place", cat: "geography", diff: 2 },
  { w: "METROPOLIS", c: "A very large, busy city", cat: "geography", diff: 2 },
  { w: "POPULATION", c: "The number of people living in a place", cat: "geography", diff: 1 },
  { w: "CIVILIZATION", c: "A complex, organized human society", cat: "geography", diff: 1 },
  { w: "DESERTIFICATION", c: "The process of land becoming desert", cat: "geography", diff: 3 },
  { w: "MOUNTAINOUS", c: "Full of mountains", cat: "geography", diff: 2 },
  { w: "UNINHABITED", c: "Not lived in by people", cat: "geography", diff: 2 },
  { w: "INTERNATIONAL", c: "Involving more than one nation", cat: "geography", diff: 1 },

  // ---- history: short fill ----
  { w: "WAR", c: "Armed conflict between nations or groups", cat: "history", diff: 1 },
  { w: "ERA", c: "A distinct period of history", cat: "history", diff: 1 },
  { w: "AGE", c: "A significant period of time in history", cat: "history", diff: 1 },
  { w: "LAW", c: "A binding rule established by authority", cat: "history", diff: 1 },
  { w: "TSAR", c: "Historic Russian emperor", cat: "history", diff: 2 },
  { w: "KHAN", c: "Historic Mongol or Turkic ruler", cat: "history", diff: 2 },
  { w: "DUKE", c: "A high-ranking nobleman", cat: "history", diff: 1 },
  { w: "EARL", c: "A British nobleman's title", cat: "history", diff: 2 },
  { w: "LORD", c: "A title for a nobleman or ruler", cat: "history", diff: 1 },
  { w: "REIGN", c: "The period a monarch rules", cat: "history", diff: 1 },
  { w: "THRONE", c: "The seat of a ruling monarch", cat: "history", diff: 1 },
  // ---- history: long anchors ----
  { w: "RENAISSANCE", c: "European cultural rebirth after the Middle Ages", cat: "history", diff: 1 },
  { w: "ENLIGHTENMENT", c: "18th-century movement emphasizing reason", cat: "history", diff: 2 },
  { w: "INDUSTRIALIZATION", c: "The shift from agrarian to factory-based economy", cat: "history", diff: 2 },
  { w: "COLONIZATION", c: "The process of settling and controlling a territory", cat: "history", diff: 2 },
  { w: "EMANCIPATION", c: "The act of being set free from restriction", cat: "history", diff: 2 },
  { w: "REVOLUTIONARY", c: "Relating to a dramatic political upheaval", cat: "history", diff: 1 },
  { w: "ASSASSINATION", c: "The murder of a prominent political figure", cat: "history", diff: 2 },
  { w: "INDEPENDENCE", c: "Freedom from control by another nation", cat: "history", diff: 1 },
  { w: "CONFEDERATION", c: "A union of states or groups for a common purpose", cat: "history", diff: 2 },
  { w: "ARISTOCRACY", c: "A ruling class of nobility", cat: "history", diff: 2 },
  { w: "MONARCHY", c: "A government headed by a king or queen", cat: "history", diff: 1 },
  { w: "DEMOCRACY", c: "A government elected by the people", cat: "history", diff: 1 },
  { w: "DICTATORSHIP", c: "Rule by a single, all-powerful leader", cat: "history", diff: 2 },
  { w: "PROCLAMATION", c: "A formal public announcement", cat: "history", diff: 2 },
  { w: "EXPEDITIONARY", c: "Relating to a military force sent on a mission", cat: "history", diff: 3 },
  { w: "ARCHAEOLOGIST", c: "Scientist who studies ancient human history", cat: "history", diff: 2 },
  { w: "CIVILIZATIONS", c: "Complex, organized human societies", cat: "history", diff: 1 },
  { w: "PARLIAMENTARY", c: "Relating to a legislative governing body", cat: "history", diff: 2 },

  // ---- kids: short fill ----
  { w: "TOY", c: "Something a child plays with", cat: "kids", diff: 1 },
  { w: "PAL", c: "A close friend", cat: "kids", diff: 1 },
  { w: "HUG", c: "A warm, affectionate embrace", cat: "kids", diff: 1 },
  { w: "FUN", c: "Enjoyment or amusement", cat: "kids", diff: 1 },
  { w: "ZOO", c: "A place to see wild animals", cat: "kids", diff: 1 },
  { w: "GAME", c: "An activity played for fun", cat: "kids", diff: 1 },
  { w: "DOLL", c: "A toy shaped like a small person", cat: "kids", diff: 1 },
  { w: "SLED", c: "A ride down a snowy hill", cat: "kids", diff: 1 },
  { w: "SWING", c: "A playground seat that moves back and forth", cat: "kids", diff: 1 },
  { w: "SLIDE", c: "A playground ramp you slide down", cat: "kids", diff: 1 },
  { w: "PARTY", c: "A festive gathering with games and treats", cat: "kids", diff: 1 },
  // ---- kids: long anchors ----
  { w: "TRAMPOLINING", c: "Bouncing on a springy mat for fun", cat: "kids", diff: 1 },
  { w: "IMAGINATION", c: "The ability to dream up make-believe things", cat: "kids", diff: 1 },
  { w: "PLAYGROUND", c: "An outdoor space with swings and slides", cat: "kids", diff: 1 },
  { w: "BABYSITTER", c: "Someone who watches children for the evening", cat: "kids", diff: 1 },
  { w: "KINDERGARTEN", c: "A child's first year of formal school", cat: "kids", diff: 1 },
  { w: "SLEEPOVER", c: "Staying the night at a friend's house", cat: "kids", diff: 1 },
  { w: "SCAVENGERHUNT", c: "A game of finding hidden listed items", cat: "kids", diff: 2 },
  { w: "SHOWANDTELL", c: "Classroom activity of sharing a favorite object", cat: "kids", diff: 1 },
  { w: "MERRYGOROUNDS", c: "Spinning carnival rides with painted horses", cat: "kids", diff: 1 },
  { w: "SUPERHEROES", c: "Costumed characters with amazing powers", cat: "kids", diff: 1 },
  { w: "BEDTIMESTORY", c: "A tale read to help a child fall asleep", cat: "kids", diff: 1 },
  { w: "TREASUREHUNT", c: "A game of searching for hidden riches", cat: "kids", diff: 1 },
  { w: "COLORINGBOOK", c: "A book of outlined pictures to fill in", cat: "kids", diff: 1 },

  // ---- movies: short fill ----
  { w: "ACT", c: "To perform in a film or play", cat: "movies", diff: 1 },
  { w: "SET", c: "The constructed location where a scene is filmed", cat: "movies", diff: 1 },
  { w: "CUT", c: "Director's command to stop filming a take", cat: "movies", diff: 1 },
  { w: "FLOP", c: "A film that fails commercially", cat: "movies", diff: 2 },
  { w: "HIT", c: "A very successful film", cat: "movies", diff: 1 },
  { w: "STAR", c: "The leading actor in a film", cat: "movies", diff: 1 },
  { w: "TAKE", c: "One filmed attempt at a scene", cat: "movies", diff: 2 },
  { w: "PROP", c: "An object used by actors during a scene", cat: "movies", diff: 1 },
  { w: "LENS", c: "Camera part that focuses the image", cat: "movies", diff: 2 },
  { w: "SCENE", c: "A single continuous piece of action in a film", cat: "movies", diff: 1 },
  { w: "EXTRA", c: "A background performer with no lines", cat: "movies", diff: 1 },
  // ---- movies: long anchors ----
  { w: "CINEMATOGRAPHY", c: "The art of camera work and visual style in film", cat: "movies", diff: 2 },
  { w: "CHOREOGRAPHY", c: "The design of dance or fight movement for film", cat: "movies", diff: 2 },
  { w: "SCREENWRITER", c: "Person who writes a film's script", cat: "movies", diff: 1 },
  { w: "BLOCKBUSTERS", c: "Hugely successful hit films", cat: "movies", diff: 1 },
  { w: "PROTAGONISTS", c: "The main characters of a story", cat: "movies", diff: 2 },
  { w: "SOUNDTRACKS", c: "Musical albums accompanying films", cat: "movies", diff: 1 },
  { w: "PRODUCTION", c: "The process of making a film", cat: "movies", diff: 1 },
  { w: "DOCUMENTARIES", c: "Non-fiction films", cat: "movies", diff: 1 },
  { w: "ANIMATRONICS", c: "Robotic figures used as film special effects", cat: "movies", diff: 3 },
  { w: "CLIFFHANGER", c: "A suspenseful, unresolved ending", cat: "movies", diff: 2 },
  { w: "PLOTTWIST", c: "A sudden unexpected turn in a story", cat: "movies", diff: 2 },
  { w: "SUPERHEROMOVIE", c: "A film genre starring costumed crimefighters", cat: "movies", diff: 1 },
  { w: "INTERMISSION", c: "A break partway through a long film or show", cat: "movies", diff: 2 },
  { w: "TECHNICOLOR", c: "An early vivid color film process", cat: "movies", diff: 3 },

  // ---- science: short fill ----
  { w: "GAS", c: "A state of matter with no fixed shape", cat: "science", diff: 1 },
  { w: "ION", c: "A charged atom or molecule", cat: "science", diff: 2 },
  { w: "LAB", c: "A room equipped for scientific experiments", cat: "science", diff: 1 },
  { w: "CELL", c: "The basic structural unit of living things", cat: "science", diff: 1 },
  { w: "ATOM", c: "The smallest unit of a chemical element", cat: "science", diff: 1 },
  { w: "MASS", c: "The amount of matter an object contains", cat: "science", diff: 1 },
  { w: "FORCE", c: "A push or pull acting on an object", cat: "science", diff: 1 },
  { w: "ORBIT", c: "The curved path of one body around another", cat: "science", diff: 1 },
  { w: "SOLID", c: "A state of matter with a fixed shape", cat: "science", diff: 1 },
  { w: "LIQUID", c: "A state of matter that flows and takes the shape of its container", cat: "science", diff: 1 },
  // ---- science: long anchors ----
  { w: "PHOTOSYNTHETIC", c: "Relating to the process plants use to make food", cat: "science", diff: 2 },
  { w: "THERMODYNAMICS", c: "The physics of heat and energy transfer", cat: "science", diff: 3 },
  { w: "ELECTROMAGNETIC", c: "Relating to both electric and magnetic fields", cat: "science", diff: 2 },
  { w: "MICROORGANISM", c: "A tiny living thing visible only under a microscope", cat: "science", diff: 2 },
  { w: "BIOLUMINESCENCE", c: "Light produced by a living organism", cat: "science", diff: 3 },
  { w: "CRYSTALLIZATION", c: "The process of forming crystal structures", cat: "science", diff: 3 },
  { w: "PALEONTOLOGIST", c: "Scientist who studies fossils", cat: "science", diff: 2 },
  { w: "ASTROPHYSICIST", c: "Scientist who studies celestial physics", cat: "science", diff: 2 },
  { w: "EXPERIMENTATION", c: "The process of testing scientific ideas", cat: "science", diff: 2 },
  { w: "CLASSIFICATION", c: "The grouping of things by shared traits", cat: "science", diff: 2 },
  { w: "INVERTEBRATES", c: "Animals without a backbone", cat: "science", diff: 2 },
  { w: "PRECIPITATION", c: "Water falling from clouds as rain or snow", cat: "science", diff: 1 },
  { w: "CONSTELLATIONS", c: "Recognized patterns of stars", cat: "science", diff: 2 },
  { w: "RADIOACTIVITY", c: "The emission of energy from unstable atoms", cat: "science", diff: 2 },

  // ---- sports: short fill ----
  { w: "GYM", c: "A place to work out and train", cat: "sports", diff: 1 },
  { w: "REF", c: "Short for the official who enforces the rules", cat: "sports", diff: 2 },
  { w: "LAP", c: "One complete circuit of a track", cat: "sports", diff: 1 },
  { w: "SET", c: "A scoring segment in tennis or volleyball", cat: "sports", diff: 1 },
  { w: "GOAL", c: "A score in soccer or hockey", cat: "sports", diff: 1 },
  { w: "PUCK", c: "The disc used in ice hockey", cat: "sports", diff: 1 },
  { w: "BALL", c: "The round object used in most sports", cat: "sports", diff: 1 },
  { w: "RACE", c: "A competition of speed", cat: "sports", diff: 1 },
  { w: "TEAM", c: "A group of players competing together", cat: "sports", diff: 1 },
  { w: "COURT", c: "The playing surface for basketball or tennis", cat: "sports", diff: 1 },
  { w: "MEDAL", c: "An award given for athletic achievement", cat: "sports", diff: 1 },
  // ---- sports: long anchors ----
  { w: "CHAMPIONSHIPS", c: "Tournaments deciding an overall winner", cat: "sports", diff: 1 },
  { w: "QUARTERBACKS", c: "American football players who lead the offense", cat: "sports", diff: 1 },
  { w: "SPORTSMANSHIP", c: "Fair and generous conduct in competition", cat: "sports", diff: 1 },
  { w: "GYMNASTICIANS", c: "Athletes who compete on beams, bars, and mats", cat: "sports", diff: 2 },
  { w: "WEIGHTLIFTING", c: "Sport of lifting maximum barbell weight", cat: "sports", diff: 1 },
  { w: "CHOREOGRAPHED", c: "Carefully planned and arranged movement", cat: "sports", diff: 2 },
  { w: "DISQUALIFIED", c: "Ruled ineligible after breaking the rules", cat: "sports", diff: 2 },
  { w: "SUBSTITUTIONS", c: "Player swaps made during a game", cat: "sports", diff: 2 },
  { w: "TOURNAMENTS", c: "Series of contests to determine a champion", cat: "sports", diff: 1 },
  { w: "ENDURANCE", c: "The ability to sustain long physical effort", cat: "sports", diff: 1 },
  { w: "COMPETITIVE", c: "Having a strong desire to win", cat: "sports", diff: 1 },
  { w: "OLYMPICGAMES", c: "The world's largest multi-sport competition", cat: "sports", diff: 1 },

  // ---- general: long anchors (thin at 9-12 letters, the fallback pool for no-category puzzles) ----
  { w: "IMAGINATION", c: "The ability to form new ideas or images", cat: "general", diff: 1 },
  { w: "CELEBRATION", c: "A festive event marking something special", cat: "general", diff: 1 },
  { w: "OPPORTUNITY", c: "A favorable chance to do something", cat: "general", diff: 1 },
  { w: "PERSONALITY", c: "The combination of traits that make someone who they are", cat: "general", diff: 1 },
  { w: "RESPONSIBILITY", c: "A duty to deal with something", cat: "general", diff: 1 },
  { w: "COMMUNICATION", c: "The exchange of information between people", cat: "general", diff: 1 },
  { w: "ENVIRONMENT", c: "The surroundings in which something exists", cat: "general", diff: 1 },
  { w: "INFORMATION", c: "Facts provided or learned about something", cat: "general", diff: 1 },
  { w: "ORGANIZATION", c: "A structured group with a shared purpose", cat: "general", diff: 1 },
  { w: "TRANSPORTATION", c: "The means of moving people or goods", cat: "general", diff: 1 },
  { w: "ACCOMPLISHMENT", c: "Something successfully achieved", cat: "general", diff: 1 },
  { w: "CONVERSATION", c: "A talk between two or more people", cat: "general", diff: 1 },
  { w: "RELATIONSHIP", c: "A connection between people", cat: "general", diff: 1 },
  { w: "CIRCUMSTANCE", c: "A fact or condition connected to an event", cat: "general", diff: 1 },
  { w: "NEIGHBORHOOD", c: "A local community area", cat: "general", diff: 1 },
  { w: "UNDERSTANDING", c: "The ability to comprehend something", cat: "general", diff: 1 },
  { w: "APPRECIATION", c: "Recognition of the value of something", cat: "general", diff: 1 },
  { w: "PERSPECTIVE", c: "A particular way of viewing things", cat: "general", diff: 1 },
  { w: "CONFIDENCE", c: "A feeling of self-assurance", cat: "general", diff: 1 },
  { w: "DETERMINATION", c: "Firmness of purpose in pursuing a goal", cat: "general", diff: 1 },
  { w: "COOPERATION", c: "Working together toward a shared goal", cat: "general", diff: 1 },
  { w: "INDEPENDENCE", c: "Freedom from outside control", cat: "general", diff: 1 },
  { w: "ENTERTAINMENT", c: "Activities that provide amusement", cat: "general", diff: 1 },
  { w: "IMPROVEMENT", c: "The act of making something better", cat: "general", diff: 1 },
];


// Across — crossword grid generator.
//
// Template-first, NYT-style density: a hardcoded set of symmetric block
// patterns fixes the fill ratio *before* any word is placed (70-85%+ white
// cells by construction), then a backtracking solver with MRV ordering and
// forward checking fills the slots from the word bank. This replaces the
// old greedy "place the longest word, then bolt more on wherever they fit"
// approach, which topped out around 50-60% fill because nothing forced the
// grid to stay dense.
//
// Cost control: this runs as CPU-bound JS inside a Cloudflare Worker
// request, which has a hard per-invocation CPU budget. The backtracking
// solver is bounded by both a step count and a wall-clock deadline, tries
// templates in shuffled order, and only accepts a fully-filled grid (never
// emits a partially-filled template). If every template attempt fails
// within budget, generation falls back to the legacy greedy algorithm
// (kept below, unmodified in spirit) so puzzle creation never just fails.

const SIZE_MAP = { mini: 5, standard: 11, large: 15 };
const DIFFICULTY_MAP = { easy: 1, medium: 2, hard: 3 };

// ---------------------------------------------------------------------
// 1. Symmetric block templates (180-degree rotational symmetry).
//    '.' = white/fillable, '#' = block. Each satisfies (validated by
//    validateTemplate, see test script): symmetric, single connected
//    white region, no white run <3 in either direction, every white cell
//    belongs to both an across and a down slot.
// ---------------------------------------------------------------------

// Generated by scripts/gen-templates.mjs, which builds valid symmetric
// templates *incrementally* (start from the all-white grid — always valid —
// and add one randomly-placed symmetric block-pair at a time, keeping each
// addition only if the template is still valid) rather than gambling on a
// single from-scratch random placement, which almost never satisfies the
// connectivity + min-run-length + full-coverage constraints simultaneously
// at 11x11/15x15 scale. Each candidate is additionally scored by
// "tightness" — how many same-length slots it demands versus how many
// words of that length the corpus actually has — and the lowest-tightness
// survivor per block count is kept. This matters: the original hand-written
// templates all leaned on 4-6 simultaneous 11-letter slots against a
// ~42-word pool for that length, which is *why* the backtracking solver
// below never found a solution within budget (empirically 0 successes in
// testing, not merely slow) — it wasn't a solver bug, it was structurally
// unsolvable-in-practice for this corpus. Re-run the script (and eyeball
// the printed tightness/fill numbers) if the corpus's length distribution
// changes significantly.
const TEMPLATES = {
  mini: [
    // blocks=4 fill=84% tightness=0.07 lens={"3":2,"4":4,"5":4}
    ["...##", ".....", ".....", ".....", "##..."],
    // blocks=6 fill=76% tightness=0.09 lens={"3":4,"4":4,"5":2}
    ["##...", "#....", ".....", "....#", "...##"],
  ],
  standard: [
    // blocks=24 fill=80% tightness=0.58 lens={"3":6,"4":8,"5":7,"7":4,"8":4,"9":3,"11":2}
    ["....####...", ".......#...", ".......#...", "...........", "##........#", "###.....###", "#........##", "...........", "...#.......", "...#.......", "...####...."],
    // blocks=32 fill=74% tightness=0.59 lens={"3":8,"4":2,"5":8,"6":2,"8":2,"9":4,"10":2,"11":2}
    ["####...####", ".........##", "..........#", "....#.....#", "...##.....#", "...........", "#.....##...", "#.....#....", "#..........", "##.........", "####...####"],
    // blocks=20 fill=83% tightness=0.65 lens={"3":6,"4":8,"5":7,"6":6,"7":2,"8":2,"9":2,"11":3}
    ["....###....", "....##.....", ".....#.....", "...#......#", ".........##", "...........", "##.........", "#......#...", ".....#.....", ".....##....", "....###...."],
    // blocks=22 fill=82% tightness=0.66 lens={"3":8,"4":4,"5":2,"6":4,"7":4,"8":2,"9":2,"10":4,"11":2}
    ["###......##", "##.........", "#..........", ".......#...", "....#.....#", "...........", "#.....#....", "...#.......", "..........#", ".........##", "##......###"],
    // blocks=26 fill=79% tightness=0.72 lens={"3":6,"4":10,"5":11,"6":4,"10":2,"11":3}
    ["#....#...##", ".....#....#", ".....#....#", "....#.....#", "...##.....#", "...........", "#.....##...", "#.....#....", "#....#.....", "#....#.....", "##...#....#"],
    // blocks=28 fill=77% tightness=0.73 lens={"3":10,"4":6,"5":7,"6":6,"7":2,"8":2,"9":1,"11":2}
    ["#...###...#", "#...##.....", ".....#.....", "...........", ".......####", "#.........#", "####.......", "...........", ".....#.....", ".....##...#", "#...###...#"],
  ],
  large: [
    // blocks=38 fill=83% tightness=2.10 lens={"3":12,"4":14,"5":16,"6":8,"7":2,"8":4,"9":4,"11":4,"13":1,"15":1}
    [".....#####.....", "........##.....", "........#......", "...#......#....", "#...##....#....", ".....#......###", "...........#...", "...............", "...#...........", "###......#.....", "....#....##...#", "....#......#...", "......#........", ".....##........", ".....#####....."],
    // blocks=42 fill=81% tightness=2.32 lens={"3":13,"4":18,"5":23,"6":4,"7":4,"8":4,"9":4,"10":2}
    ["...##.....#....", "...##.....#....", "....#..........", "........#......", "#.......##.....", "#....###....###", "......#........", "...##.....##...", "........#......", "###....###....#", ".....##.......#", "......#........", "..........#....", "....#.....##...", "....#.....##..."],
    // blocks=46 fill=80% tightness=2.37 lens={"3":15,"4":8,"5":15,"6":4,"7":8,"8":10,"9":2,"14":2}
    ["##.......#....#", "##.......#....#", "..............#", ".....##........", ".....#.........", "##.....###.....", "###........#...", "#...#.....#...#", "...#........###", ".....###.....##", ".........#.....", "........##.....", "#..............", "#....#.......##", "#....#.......##"],
    // blocks=50 fill=78% tightness=2.40 lens={"3":18,"4":16,"5":14,"6":4,"7":6,"8":4,"9":2,"10":2,"11":1,"15":1}
    ["#....##...#...#", "#....#........#", ".....#.........", ".....#...#.....", "...#.....##....", "....#...###....", "#.......#...###", "##...........##", "###...#.......#", "....###...#....", "....##.....#...", ".....#...#.....", ".........#.....", "#........#....#", "#...#...##....#"],
  ],
};

// Validates every symmetry/connectivity/min-run-length/coverage invariant a
// template must satisfy. Exported so the test script can assert it holds
// for every hardcoded template above; not on the hot path at runtime.
function validateTemplate(rows) {
  const n = rows.length;
  for (const row of rows) if (row.length !== n) return { ok: false, reason: "not square" };
  const isBlock = (r, c) => rows[r][c] === "#";

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (isBlock(r, c) !== isBlock(n - 1 - r, n - 1 - c)) return { ok: false, reason: "asymmetric" };
    }
  }

  let total = 0;
  let start = null;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!isBlock(r, c)) {
        total++;
        if (!start) start = [r, c];
      }
    }
  }
  if (total === 0) return { ok: false, reason: "no white cells" };
  const seen = new Set([start[0] * n + start[1]]);
  const stack = [start];
  while (stack.length) {
    const [r, c] = stack.pop();
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= n || nc < 0 || nc >= n || isBlock(nr, nc)) continue;
      const key = nr * n + nc;
      if (seen.has(key)) continue;
      seen.add(key);
      stack.push([nr, nc]);
    }
  }
  if (seen.size !== total) return { ok: false, reason: "disconnected" };

  const acrossCover = new Set();
  const downCover = new Set();
  for (let r = 0; r < n; r++) {
    let runStart = null;
    for (let c = 0; c <= n; c++) {
      const white = c < n && !isBlock(r, c);
      if (white) {
        if (runStart === null) runStart = c;
      } else if (runStart !== null) {
        const len = c - runStart;
        if (len === 1 || len === 2) return { ok: false, reason: `short across run at row ${r}` };
        if (len >= 3) for (let cc = runStart; cc < c; cc++) acrossCover.add(r * n + cc);
        runStart = null;
      }
    }
  }
  for (let c = 0; c < n; c++) {
    let runStart = null;
    for (let r = 0; r <= n; r++) {
      const white = r < n && !isBlock(r, c);
      if (white) {
        if (runStart === null) runStart = r;
      } else if (runStart !== null) {
        const len = r - runStart;
        if (len === 1 || len === 2) return { ok: false, reason: `short down run at col ${c}` };
        if (len >= 3) for (let rr = runStart; rr < r; rr++) downCover.add(rr * n + c);
        runStart = null;
      }
    }
  }
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!isBlock(r, c)) {
        const key = r * n + c;
        if (!acrossCover.has(key) || !downCover.has(key)) return { ok: false, reason: `cell ${r},${c} missing across/down slot` };
      }
    }
  }

  return { ok: true, whiteCount: total, blockCount: n * n - total };
}

// ---------------------------------------------------------------------
// 2. Slot extraction + crossing map
// ---------------------------------------------------------------------

function extractSlots(rows) {
  const n = rows.length;
  const isBlock = (r, c) => rows[r][c] === "#";
  const slots = [];
  let id = 0;

  for (let r = 0; r < n; r++) {
    let c = 0;
    while (c < n) {
      if (isBlock(r, c)) { c++; continue; }
      const start = c;
      while (c < n && !isBlock(r, c)) c++;
      const len = c - start;
      if (len >= 3) {
        const cells = [];
        for (let i = 0; i < len; i++) cells.push([r, start + i]);
        slots.push({ id: id++, direction: "across", row: r, col: start, length: len, cells, crossings: new Array(len).fill(null) });
      }
    }
  }
  for (let c = 0; c < n; c++) {
    let r = 0;
    while (r < n) {
      if (isBlock(r, c)) { r++; continue; }
      const start = r;
      while (r < n && !isBlock(r, c)) r++;
      const len = r - start;
      if (len >= 3) {
        const cells = [];
        for (let i = 0; i < len; i++) cells.push([start + i, c]);
        slots.push({ id: id++, direction: "down", row: start, col: c, length: len, cells, crossings: new Array(len).fill(null) });
      }
    }
  }

  const cellMap = new Map();
  for (const slot of slots) {
    slot.cells.forEach(([r, c], idx) => {
      const key = r * n + c;
      let entry = cellMap.get(key);
      if (!entry) { entry = {}; cellMap.set(key, entry); }
      entry[slot.direction] = { slotId: slot.id, idx };
    });
  }
  for (const entry of cellMap.values()) {
    if (entry.across && entry.down) {
      const a = slots[entry.across.slotId];
      const d = slots[entry.down.slotId];
      a.crossings[entry.across.idx] = { otherSlotId: d.id, theirIndex: entry.down.idx };
      d.crossings[entry.down.idx] = { otherSlotId: a.id, theirIndex: entry.across.idx };
    }
  }

  return slots;
}

// The longest ~30% of slots get strong theme preference; the rest are
// treated as ordinary short fill and may draw from the whole corpus.
function computeLongSlotIds(slots) {
  const sorted = [...slots].sort((a, b) => b.length - a.length);
  const count = Math.max(1, Math.round(sorted.length * 0.3));
  return new Set(sorted.slice(0, count).map((s) => s.id));
}

// ---------------------------------------------------------------------
// 3 + 4. Word index + theme scoring
// ---------------------------------------------------------------------

const STOPWORDS = new Set(["the", "and", "for", "with", "from", "that", "this", "are", "was", "were", "your", "you", "its", "into", "onto", "our"]);

function tokenize(str) {
  return (str || "")
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
}

// Naive-singular handling ("capitals" -> also matches "capital") reused
// from the original buildCandidateGroups tokenization logic.
function withSingulars(tokens) {
  return [...new Set(tokens.flatMap((t) => (t.endsWith("s") && t.length > 4 ? [t, t.slice(0, -1)] : [t])))];
}

// Builds the deduped, size/difficulty-filtered candidate pool, scored by
// theme relevance: title tokens match (tier 2) > category/keyword match
// (tier 1) > general (tier 0). Crucially, nothing is *excluded* by
// relevance — tier only affects ordering — so a narrow topic never starves
// the grid of fill words the way the old keyword-filtered pool could.
function buildCandidatePool(wordBank, keywords, title, maxDiff, n) {
  const seen = new Set();
  const all = [];
  for (const entry of wordBank) {
    const w = entry.w.toUpperCase();
    if (!/^[A-Z]+$/.test(w)) continue;
    if (w.length < 3 || w.length > n) continue;
    if (entry.diff > maxDiff) continue;
    if (seen.has(w)) continue;
    seen.add(w);
    all.push({ word: w, clue: entry.c, cat: (entry.cat || "").toLowerCase(), tier: 0 });
  }

  const categoryTokens = withSingulars(tokenize((keywords || []).join(" ")));
  const titleTokens = withSingulars(tokenize(title));

  for (const e of all) {
    const hay = `${e.word.toLowerCase()} ${e.clue.toLowerCase()} ${e.cat}`;
    const titleHit = titleTokens.length > 0 && titleTokens.some((t) => hay.includes(t));
    const catHit = categoryTokens.length > 0 && categoryTokens.some((t) => hay.includes(t));
    e.tier = titleHit ? 2 : catHit ? 1 : 0;
  }

  return all;
}

function buildWordIndex(entries) {
  const byLength = new Map();
  const byLenPosLetter = new Map();
  for (const e of entries) {
    const len = e.word.length;
    if (!byLength.has(len)) byLength.set(len, []);
    byLength.get(len).push(e);
    for (let i = 0; i < len; i++) {
      const key = `${len}:${i}:${e.word[i]}`;
      if (!byLenPosLetter.has(key)) byLenPosLetter.set(key, []);
      byLenPosLetter.get(key).push(e);
    }
  }
  return { byLength, byLenPosLetter };
}

// ---------------------------------------------------------------------
// 2b. Arc-consistency preprocessing (AC-3-lite)
//
// Before any word gets placed, prune each slot's candidate domain down to
// only words that have *some* supporting match in every crossing slot's
// domain, and repeat until nothing more can be removed. Without this, plain
// backtracking with only forward-checking regularly reached 90%+ of the way
// through a grid and then died on a single slot needing an letter-position
// combination (e.g. a 4-letter word starting "TRE") that plain doesn't
// exist in this word bank — a dead end that arc consistency rules out
// *before* search starts, instead of search discovering it empirically deep
// in the tree, over and over, across thousands of restarts. This is the
// standard AC-3 algorithm restricted to this problem's binary constraints
// (one shared letter per crossing pair), which keeps it cheap: cost is
// roughly iterations x slots x domain-size x crossings, all O(1) set
// lookups, not the exponential cost backtracking search has.
function pruneDomains(slots, index) {
  const domains = new Map();
  for (const slot of slots) domains.set(slot.id, (index.byLength.get(slot.length) || []).slice());

  let changed = true;
  let iterations = 0;
  const MAX_ITERATIONS = 6;
  while (changed && iterations < MAX_ITERATIONS) {
    changed = false;
    iterations++;

    // Letter-present-at-position sets, derived from the *current* (possibly
    // already-pruned) domains — recomputed each round so a removal in one
    // slot can cascade into further removals elsewhere on the next pass.
    const letterSets = new Map();
    for (const slot of slots) {
      const dom = domains.get(slot.id);
      const sets = Array.from({ length: slot.length }, () => new Set());
      for (const e of dom) for (let i = 0; i < slot.length; i++) sets[i].add(e.word[i]);
      letterSets.set(slot.id, sets);
    }

    for (const slot of slots) {
      const dom = domains.get(slot.id);
      const kept = [];
      for (const entry of dom) {
        let ok = true;
        for (let i = 0; i < slot.length; i++) {
          const cross = slot.crossings[i];
          if (!cross) continue;
          const otherSets = letterSets.get(cross.otherSlotId);
          if (!otherSets[cross.theirIndex].has(entry.word[i])) {
            ok = false;
            break;
          }
        }
        if (ok) kept.push(entry);
      }
      if (kept.length !== dom.length) {
        domains.set(slot.id, kept);
        changed = true;
      }
    }
  }

  return domains;
}

// ---------------------------------------------------------------------
// 3. Backtracking fill with MRV + forward checking
// ---------------------------------------------------------------------

const CANDIDATE_CAP = 15;
const STEP_BUDGET_PER_TEMPLATE = 150000;
// A single DFS attempt can get stuck deep in a subtree that "looks"
// promising (lots of locally-valid partial assignments) but has no complete
// solution, and burn the *entire* shared step budget without ever
// backtracking out far enough to try a different top-level word. Capping
// steps per attempt forces a fresh reshuffle — a cheap, different dice
// roll — instead of over-investing in one unlucky branch. This is the
// standard "restart with cutoff" strategy for hard CSP search.
const STEPS_PER_ATTEMPT = 1500;

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Runs the backtracking DFS, restarting with a freshly-shuffled candidate
// order whenever a full attempt exhausts its search tree without finding a
// solution. A single DFS attempt on a tightly-constrained grid (e.g. a
// wide-open mini template) can dead-end after visiting only a few dozen
// nodes — far short of the step budget — simply because the top-level
// slot's candidate cap (14) didn't happen to include a workable word this
// shuffle. Restarting with a new shuffle is what actually spends the rest
// of the budget productively, the same way random-restart search does for
// any CSP with a large but not-fully-explorable branching factor.
function runBacktrackFill(slots, index, longIds, deadline, domains) {
  let steps = 0; // shared across restarts, bounds total work for this template
  let aborted = false; // budget fully exhausted — stop restarting entirely
  let attemptSteps = 0; // steps used by the current attempt only

  function budgetOk() {
    steps++;
    attemptSteps++;
    if (steps > STEP_BUDGET_PER_TEMPLATE || Date.now() > deadline) {
      aborted = true;
      return false;
    }
    if (attemptSteps > STEPS_PER_ATTEMPT) return false; // cut this attempt short, try a fresh shuffle
    return true;
  }

  // One DFS attempt with a fresh, freshly-shuffled assignment. Returns the
  // filled assignment array on success, or null if this attempt's search
  // tree was exhausted (cutoff or otherwise) without a solution.
  function attempt() {
    attemptSteps = 0;
    const assignment = new Array(slots.length).fill(null);
    const usedWords = new Set();
    // Candidate-count cache, keyed by slot id, invalidated only for the
    // slots whose fixed letters actually changed (i.e. the crossings of
    // whichever slot was just assigned/unassigned). Without this, MRV
    // selection would recompute candidatesFor() for every unfilled slot on
    // every node — O(slots) full recomputations per step — which is by far
    // the dominant cost and made real backtracking depth unreachable within
    // budget. With it, an assign/unassign only touches that slot's actual
    // crossings (typically a handful), the same locality forward-checking
    // already relies on.
    const candCache = new Map();

    function invalidateCrossingsOf(slot) {
      for (let i = 0; i < slot.length; i++) {
        const cross = slot.crossings[i];
        if (cross) candCache.delete(cross.otherSlotId);
      }
    }

    function fixedLettersFor(slot) {
      const letters = new Array(slot.length).fill(null);
      for (let i = 0; i < slot.length; i++) {
        const cross = slot.crossings[i];
        if (!cross) continue;
        const other = assignment[cross.otherSlotId];
        if (other) letters[i] = other.word[cross.theirIndex];
      }
      return letters;
    }

    function matchesFixed(word, letters) {
      for (let i = 0; i < letters.length; i++) {
        if (letters[i] && word[i] !== letters[i]) return false;
      }
      return true;
    }

    // Matches for a slot's currently-fixed letters, ignoring which words are
    // already used elsewhere in the grid — this is what gets cached, since
    // it only depends on crossing letters (invalidated precisely on those).
    // usedWords is filtered separately at lookup time (cheap: a pass over
    // an already letter-narrowed list) so the cache never goes stale when
    // some unrelated slot uses/frees a word.
    function lettersMatchesFor(slot) {
      const letters = fixedLettersFor(slot);
      const fixedPositions = [];
      for (let i = 0; i < letters.length; i++) if (letters[i]) fixedPositions.push(i);

      let base;
      if (fixedPositions.length === 0) {
        // Arc-consistency-pruned domain, not the raw length bucket — see
        // pruneDomains. Falls back to the raw bucket if no domains map was
        // passed in (keeps this function usable standalone/in tests).
        base = (domains ? domains.get(slot.id) : null) || index.byLength.get(slot.length) || [];
      } else {
        const lists = fixedPositions
          .map((i) => index.byLenPosLetter.get(`${slot.length}:${i}:${letters[i]}`) || [])
          .sort((a, b) => a.length - b.length);
        base = lists[0];
        for (let k = 1; k < lists.length && base.length > 0; k++) {
          const s = new Set(lists[k]);
          base = base.filter((e) => s.has(e));
        }
      }

      const out = [];
      for (const e of base) {
        if (!matchesFixed(e.word, letters)) continue;
        out.push(e);
      }
      return out;
    }

    function getLetterMatches(slot) {
      const cached = candCache.get(slot.id);
      if (cached) return cached;
      const c = lettersMatchesFor(slot);
      candCache.set(slot.id, c);
      return c;
    }

    function getCandidates(slot) {
      const matches = getLetterMatches(slot);
      if (usedWords.size === 0) return matches;
      const out = [];
      for (const e of matches) {
        if (!usedWords.has(e.word)) out.push(e);
      }
      return out;
    }

    function orderCandidates(slot, candidates) {
      if (longIds.has(slot.id)) {
        const t2 = [], t1 = [], t0 = [];
        for (const e of candidates) (e.tier === 2 ? t2 : e.tier === 1 ? t1 : t0).push(e);
        shuffleInPlace(t2);
        shuffleInPlace(t1);
        shuffleInPlace(t0);
        return [...t2, ...t1, ...t0];
      }
      return shuffleInPlace(candidates.slice());
    }

    function selectSlot() {
      let best = null;
      let bestCandidates = null;
      let bestCount = Infinity;
      for (const slot of slots) {
        if (assignment[slot.id] !== null) continue;
        const cands = getCandidates(slot);
        if (cands.length === 0) {
          return { slot, candidates: cands, deadEnd: true };
        }
        if (cands.length < bestCount) {
          bestCount = cands.length;
          best = slot;
          bestCandidates = cands;
        }
      }
      if (!best) return null; // all slots filled
      return { slot: best, candidates: bestCandidates, deadEnd: false };
    }

    function forwardCheckOk(justFilled) {
      for (let i = 0; i < justFilled.length; i++) {
        const cross = justFilled.crossings[i];
        if (!cross) continue;
        const other = slots[cross.otherSlotId];
        if (assignment[other.id]) continue;
        if (getCandidates(other).length === 0) return false;
      }
      return true;
    }

    function solve() {
      if (!budgetOk()) return false;
      const sel = selectSlot();
      if (sel === null) return true; // every slot filled
      if (sel.deadEnd) return false;

      const ordered = orderCandidates(sel.slot, sel.candidates);
      const cap = Math.min(ordered.length, CANDIDATE_CAP);
      for (let i = 0; i < cap; i++) {
        const entry = ordered[i];
        assignment[sel.slot.id] = entry;
        usedWords.add(entry.word);
        invalidateCrossingsOf(sel.slot);
        if (forwardCheckOk(sel.slot) && solve()) return true;
        assignment[sel.slot.id] = null;
        usedWords.delete(entry.word);
        invalidateCrossingsOf(sel.slot);
        if (aborted) return false;
      }
      return false;
    }

    return solve() ? assignment : null;
  }

  // Random-restart loop: a single DFS attempt on a tightly-constrained grid
  // (e.g. a wide-open mini template) can exhaust its whole search tree
  // after only a few dozen nodes — far short of the step budget — simply
  // because the root slot's capped candidate sample (CANDIDATE_CAP) didn't
  // happen to include a workable word this shuffle. Restarting with a
  // freshly-shuffled order spends the rest of the budget productively,
  // the same way random-restart search does for any CSP whose branching
  // factor is too large to fully explore.
  const MAX_RESTARTS = 5000;
  for (let r = 0; r < MAX_RESTARTS && !aborted && Date.now() <= deadline; r++) {
    const result = attempt();
    if (result) return { success: true, assignment: result };
  }
  return { success: false, assignment: null };
}

function buildOutputFromSlots(rows, slots, assignment, n) {
  const isBlock = (r, c) => rows[r][c] === "#";
  const startKeys = new Set();
  for (const slot of slots) startKeys.add(`${slot.row},${slot.col}`);

  const cells = [];
  const numberAt = new Map();
  let next = 1;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const block = isBlock(r, c);
      let number = null;
      if (!block && startKeys.has(`${r},${c}`)) {
        number = next++;
        numberAt.set(`${r},${c}`, number);
      }
      cells.push({ row: r, col: c, letter: null, block, number });
    }
  }
  for (const slot of slots) {
    const entry = assignment[slot.id];
    for (let i = 0; i < slot.length; i++) {
      const [r, c] = slot.cells[i];
      cells[r * n + c].letter = entry.word[i];
    }
  }

  const words = slots
    .map((slot) => {
      const entry = assignment[slot.id];
      return {
        number: numberAt.get(`${slot.row},${slot.col}`) ?? null,
        direction: slot.direction,
        answer: entry.word,
        clue: entry.clue,
        row: slot.row,
        col: slot.col,
        length: slot.length,
        cells: slot.cells.map(([r, c]) => [r, c]),
      };
    })
    .sort((a, b) => a.number - b.number || (a.direction === "across" ? 0 : 1) - (b.direction === "across" ? 0 : 1));

  return { rows: n, cols: n, cells, words };
}

// ---------------------------------------------------------------------
// Top-level entry point
// ---------------------------------------------------------------------

const TIME_BUDGET_MS = 3000;

function generatePuzzle({ keywords = [], title = "", size = "standard", difficulty = "medium", wordBank }) {
  const n = SIZE_MAP[size] || SIZE_MAP.standard;
  const maxDiff = DIFFICULTY_MAP[difficulty] || DIFFICULTY_MAP.medium;

  const pool = buildCandidatePool(wordBank, keywords, title, maxDiff, n);
  const index = buildWordIndex(pool);

  const templates = shuffleInPlace([...(TEMPLATES[size] || TEMPLATES.standard)]);
  const overallDeadline = Date.now() + TIME_BUDGET_MS;
  // Each template gets its own fair slice of the total budget — critical,
  // because template difficulty varies wildly for a given word pool (two
  // templates that both validate fine and look similarly dense can differ
  // from "solves instantly" to "never solves" purely by luck of which
  // letter-position constraints they demand). A single shared deadline let
  // whichever template got tried *first* silently burn the entire budget
  // on a hard/unsolvable-for-this-corpus case, starving every other
  // template — including easy ones — of any chance to even be attempted.
  const perTemplateBudget = Math.max(50, Math.floor(TIME_BUDGET_MS / templates.length));

  for (const rows of templates) {
    if (Date.now() > overallDeadline) break;
    const slots = extractSlots(rows);
    const longIds = computeLongSlotIds(slots);
    const domains = pruneDomains(slots, index);
    // Arc consistency can prove a template unsolvable for this exact word
    // pool outright (some slot's domain pruned to nothing) — skip straight
    // to the next template instead of burning its time slice on
    // backtracking search that's guaranteed to fail.
    if (slots.some((s) => (domains.get(s.id) || []).length === 0)) continue;
    const templateDeadline = Math.min(overallDeadline, Date.now() + perTemplateBudget);
    const { success, assignment } = runBacktrackFill(slots, index, longIds, templateDeadline, domains);
    if (success) return buildOutputFromSlots(rows, slots, assignment, n);
  }

  // Fallback chain: no template filled completely within budget (e.g. a
  // very narrow/thin word bank for this size+difficulty). Fall back to the
  // legacy greedy algorithm rather than fail puzzle creation outright.
  const legacy = legacyGenerate(wordBank, keywords, size, difficulty);
  if (legacy.words.length >= 3) return legacy;

  throw new Error("could not generate enough interlocking words for this size/difficulty");
}

// =======================================================================
// Legacy greedy algorithm — kept as the last-resort fallback for when the
// template+backtracking approach above can't fully fill any template
// within its CPU budget (e.g. an extremely thin word bank). This is the
// original implementation, functionally unchanged.
// =======================================================================

const LEGACY_TARGET_WORDS = { mini: 8, standard: 24, large: 38 };
const LEGACY_FILL_ATTEMPTS = 5;
const LEGACY_FILL_PASSES = 4;

function legacyGenerate(wordBank, keywords, size, difficulty) {
  const n = SIZE_MAP[size] || SIZE_MAP.standard;
  const maxDiff = DIFFICULTY_MAP[difficulty] || DIFFICULTY_MAP.medium;
  const targetWords = LEGACY_TARGET_WORDS[size] || LEGACY_TARGET_WORDS.standard;

  const groups = legacyBuildCandidateGroups(wordBank, keywords, maxDiff, n);
  let result = legacyAttemptBest(groups, n, targetWords);

  if (result.words.length < 3 && keywords.length > 0) {
    const fallbackGroups = legacyBuildCandidateGroups(wordBank, [], maxDiff, n);
    result = legacyAttemptBest(fallbackGroups, n, targetWords);
  }

  if (result.words.length < 3) {
    return { words: [] };
  }

  return legacyCropAndNumber(result.grid, result.words, n);
}

function legacyAttemptBest(groups, n, targetWords) {
  let best = null;
  let bestScore = -1;
  for (let i = 0; i < LEGACY_FILL_ATTEMPTS; i++) {
    const candidates = groups.flatMap((g) => legacyShuffleByLength(g));
    const result = legacyAttemptFill(candidates, n, targetWords);
    const score = legacyDensityScore(result.grid, n);
    if (score > bestScore) {
      bestScore = score;
      best = result;
    }
  }
  return best;
}

function legacyDensityScore(grid, n) {
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
  return filled * (filled / area);
}

function legacyBuildCandidateGroups(wordBank, keywords, maxDiff, n) {
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

  const STOPWORDS_LOCAL = new Set(["the", "and", "for", "with", "from", "that", "this", "are", "was", "were"]);
  const rawTokens = keywords
    .flatMap((k) => k.toLowerCase().split(/\s+/))
    .filter((t) => t.length >= 3 && !STOPWORDS_LOCAL.has(t));
  const keywordTokens = [...new Set(rawTokens.flatMap((t) => (t.endsWith("s") && t.length > 4 ? [t, t.slice(0, -1)] : [t])))];
  const matchCount = (entry) => {
    if (keywordTokens.length === 0) return 0;
    const hay = `${entry.word.toLowerCase()} ${entry.clue.toLowerCase()} ${entry.cat.toLowerCase()}`;
    return keywordTokens.reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0);
  };

  if (keywordTokens.length === 0) return [deduped];

  const strong = [];
  const weak = [];
  for (const entry of deduped) {
    const n2 = matchCount(entry);
    if (n2 >= 2) strong.push(entry);
    else if (n2 === 1) weak.push(entry);
  }
  return [strong, weak];
}

function legacyShuffleByLength(list) {
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

function legacyAttemptFill(candidates, n, targetWords) {
  if (candidates.length === 0) return { grid: legacyMakeEmptyGrid(n), words: [] };

  const grid = legacyMakeEmptyGrid(n);
  const words = [];
  const placedSet = new Set();

  const first = candidates[0];
  const startRow = Math.floor(n / 2);
  const startCol = Math.floor((n - first.word.length) / 2);
  legacyPlaceWord(grid, first.word, startRow, startCol, "across");
  words.push(legacyMakeWordRecord(first, startRow, startCol, "across", words.length));
  placedSet.add(first.word);

  for (let pass = 0; pass < LEGACY_FILL_PASSES && words.length < targetWords; pass++) {
    let placedThisPass = false;
    for (let idx = 1; idx < candidates.length && words.length < targetWords; idx++) {
      const entry = candidates[idx];
      if (placedSet.has(entry.word)) continue;
      const placement = legacyFindPlacement(grid, entry.word, n);
      if (!placement) continue;
      legacyPlaceWord(grid, entry.word, placement.row, placement.col, placement.direction);
      words.push(legacyMakeWordRecord(entry, placement.row, placement.col, placement.direction, words.length));
      placedSet.add(entry.word);
      placedThisPass = true;
    }
    if (!placedThisPass) break;
  }

  return { grid, words };
}

function legacyMakeWordRecord(entry, row, col, direction, tempId) {
  return { id: tempId, answer: entry.word, clue: entry.clue, row, col, direction, length: entry.word.length };
}

function legacyMakeEmptyGrid(n) {
  const grid = [];
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push({ letter: null, across: false, down: false });
    grid.push(row);
  }
  return grid;
}

function legacyInBounds(n, r, c) {
  return r >= 0 && r < n && c >= 0 && c < n;
}

function legacyFindPlacement(grid, word, n) {
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
        else continue;

        const row = direction === "down" ? r - i : r;
        const col = direction === "across" ? c - i : c;
        const overlaps = legacyValidPlacementOverlaps(grid, word, row, col, direction, n);
        if (overlaps === 0) continue;
        if (overlaps >= 2) return { row, col, direction };
        if (!fallback) fallback = { row, col, direction };
      }
    }
  }
  return fallback;
}

function legacyValidPlacementOverlaps(grid, word, row, col, direction, n) {
  return legacyIsValidPlacement(grid, word, row, col, direction, n) ? legacyCountOverlaps(grid, word, row, col, direction) : 0;
}

function legacyCountOverlaps(grid, word, row, col, direction) {
  const dRow = direction === "down" ? 1 : 0;
  const dCol = direction === "across" ? 1 : 0;
  let overlaps = 0;
  for (let i = 0; i < word.length; i++) {
    if (grid[row + dRow * i][col + dCol * i].letter) overlaps++;
  }
  return overlaps;
}

function legacyIsValidPlacement(grid, word, row, col, direction, n) {
  const dRow = direction === "down" ? 1 : 0;
  const dCol = direction === "across" ? 1 : 0;

  const endRow = row + dRow * (word.length - 1);
  const endCol = col + dCol * (word.length - 1);
  if (!legacyInBounds(n, row, col) || !legacyInBounds(n, endRow, endCol)) return false;

  const beforeRow = row - dRow;
  const beforeCol = col - dCol;
  if (legacyInBounds(n, beforeRow, beforeCol) && grid[beforeRow][beforeCol].letter) return false;
  const afterRow = row + dRow * word.length;
  const afterCol = col + dCol * word.length;
  if (legacyInBounds(n, afterRow, afterCol) && grid[afterRow][afterCol].letter) return false;

  let hasIntersection = false;
  for (let i = 0; i < word.length; i++) {
    const r = row + dRow * i;
    const c = col + dCol * i;
    const cell = grid[r][c];

    if (cell.letter) {
      if (cell.letter !== word[i]) return false;
      if (direction === "across" && cell.across) return false;
      if (direction === "down" && cell.down) return false;
      hasIntersection = true;
      continue;
    }

    const perp1r = r + dCol;
    const perp1c = c + dRow;
    const perp2r = r - dCol;
    const perp2c = c - dRow;
    if (legacyInBounds(n, perp1r, perp1c) && grid[perp1r][perp1c].letter) return false;
    if (legacyInBounds(n, perp2r, perp2c) && grid[perp2r][perp2c].letter) return false;
  }

  return hasIntersection;
}

function legacyPlaceWord(grid, word, row, col, direction) {
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

function legacyCropAndNumber(grid, words, n) {
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

  const finalWords = words
    .map((w) => {
      const row = w.row - minRow;
      const col = w.col - minCol;
      const number = numberAt.get(`${row}-${col}`) || null;
      const wordCells = [];
      for (let i = 0; i < w.length; i++) {
        wordCells.push(w.direction === "across" ? [row, col + i] : [row + i, col]);
      }
      return { number, direction: w.direction, answer: w.answer, clue: w.clue, row, col, length: w.length, cells: wordCells };
    })
    .filter((w) => w.number !== null)
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
