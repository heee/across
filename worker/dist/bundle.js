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
// size, and difficulty, which is what v1 needs. Revisit with a proper
// symmetric template + full backtracking if grid density becomes a
// complaint once real puzzles are being played.

const SIZE_MAP = { mini: 5, standard: 11, large: 15 };
const DIFFICULTY_MAP = { easy: 1, medium: 2, hard: 3 };
const TARGET_WORDS = { mini: 6, standard: 18, large: 30 };

function generatePuzzle({ keywords = [], size = "standard", difficulty = "medium", wordBank }) {
  const n = SIZE_MAP[size] || SIZE_MAP.standard;
  const maxDiff = DIFFICULTY_MAP[difficulty] || DIFFICULTY_MAP.medium;
  const targetWords = TARGET_WORDS[size] || TARGET_WORDS.standard;

  const candidates = buildCandidateList(wordBank, keywords, maxDiff, n);
  let result = attemptFill(candidates, n, targetWords);

  if (result.words.length < 3 && keywords.length > 0) {
    // Keywords were too restrictive to build a real grid — retry with the
    // full corpus so puzzle creation doesn't just fail on a niche topic.
    const fallbackCandidates = buildCandidateList(wordBank, [], maxDiff, n);
    result = attemptFill(fallbackCandidates, n, targetWords);
  }

  if (result.words.length < 3) {
    throw new Error("could not generate enough interlocking words for this size/difficulty");
  }

  return cropAndNumber(result.grid, result.words, n);
}

function buildCandidateList(wordBank, keywords, maxDiff, n) {
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

  const lowerKeywords = keywords.map((k) => k.toLowerCase());
  const matches = (entry) => {
    if (lowerKeywords.length === 0) return false;
    const hay = `${entry.word.toLowerCase()} ${entry.clue.toLowerCase()} ${entry.cat.toLowerCase()}`;
    return lowerKeywords.some((k) => hay.includes(k));
  };

  const keywordMatches = shuffleByLength(deduped.filter(matches));
  const rest = shuffleByLength(deduped.filter((e) => !matches(e)));
  return [...keywordMatches, ...rest];
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

  for (let idx = 1; idx < candidates.length && words.length < targetWords; idx++) {
    const entry = candidates[idx];
    if (placedSet.has(entry.word)) continue;
    const placement = findPlacement(grid, entry.word, n);
    if (!placement) continue;
    placeWord(grid, entry.word, placement.row, placement.col, placement.direction);
    words.push(makeWordRecord(entry, placement.row, placement.col, placement.direction, words.length));
    placedSet.add(entry.word);
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

function findPlacement(grid, word, n) {
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
        if (isValidPlacement(grid, word, row, col, direction, n)) {
          return { row, col, direction };
        }
      }
    }
  }
  return null;
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
//   POST /create-puzzle   { title, description, keywords[], size, difficulty, visibility, createdBy }
//                                                                 -> generates a grid from the word bank, creates the puzzle, server-assigns id
//   POST /join-puzzle     { puzzleId, user }                     -> adds user to the puzzle's player list
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
  }

  async loadPuzzle() {
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

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("expected websocket", { status: 426 });
    }

    const user = url.searchParams.get("user") || "anonymous";
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();
    await this.loadPuzzle();

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
  const grid = generatePuzzle({ keywords: req.keywords, size: req.size, difficulty: req.difficulty, wordBank });
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
