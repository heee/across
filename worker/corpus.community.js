// Curated, original clue material inspired by broad interests shared by the
// app's community. No private-chat quotations, names, or inside jokes appear
// here. Answers are normalized because the grid supports letters only.

function parseCorpus(category, source) {
  return source.trim().split("\n").map((line, index) => {
    const [w, c, rawDiff] = line.split("|");
    const diff = Number(rawDiff);
    if (!/^[A-Z]{3,15}$/.test(w) || !c || ![1, 2, 3].includes(diff)) {
      throw new Error(`Invalid ${category} corpus row ${index + 1}: ${line}`);
    }
    return { w, c, cat: category, diff };
  });
}

const HOUSTON_TEXAS = parseCorpus("houston & texas", `
HOU|Airport-code shorthand often used for Houston|1
HTOWN|Nickname for Houston built from its initial|1
TEJAS|Spanish spelling that gave Texas its name|2
TEXAN|Resident of the Lone Star State|1
TEXIAN|Term for a settler of Mexican Texas or the Texas Republic|3
LONESTAR|Symbol displayed on the Texas flag|1
SIXFLAGS|Number of national flags historically flown over Texas|2
FRIENDSHIP|One-word Texas state motto|2
BLUEBONNET|Texas state flower|1
PECAN|Texas state tree and a favorite pie filling|1
MOCKINGBIRD|Texas state bird|1
ARMADILLO|Armor-plated mammal strongly associated with Texas|1
LONGHORN|Cattle breed and enduring Texas symbol|1
ROADRUNNER|Fast desert bird found across West Texas|2
JACKRABBIT|Long-eared runner of Texas grasslands and deserts|2
JAVELINA|Collared peccary of South and West Texas|2
ALLIGATOR|Large reptile native to the Texas Gulf Coast|1
OCELOT|Rare spotted wild cat of South Texas|3
PRONGHORN|Swift plains mammal found in West Texas|2
HORNLIZARD|Spiky reptile nicknamed the horny toad|2
MESQUITE|Thorny Texas tree whose wood flavors barbecue|1
LIVEOAK|Broad evergreen oak common in Texas landscapes|2
MAGNOLIA|Fragrant flowering tree common in East Texas|1
CYPRESS|Swamp tree growing along many Texas waterways|2
YUCCA|Spiky flowering plant of arid Texas|2
SAGEBRUSH|Aromatic shrub of dry western country|2
CACTUS|Water-storing plant of the Texas desert|1
PRICKLYPEAR|Flat-padded cactus found throughout Texas|2
GULF|Body of water along the Texas coast|1
BAYOU|Slow-moving waterway characteristic of Houston|1
BUFFALO|First word in Houston's Buffalo Bayou|1
BRAZOS|Texas river whose name means arms in Spanish|2
TRINITY|River flowing through Dallas and toward Galveston Bay|2
COLORADO|Texas river that runs through Austin|1
RIOGRANDE|River forming much of the Texas-Mexico border|1
REDRIVER|Waterway marking much of Texas's northern boundary|2
SABINE|River forming part of the Texas-Louisiana boundary|2
NECHES|East Texas river flowing toward Sabine Lake|3
GUADALUPE|Hill Country river popular for tubing|2
SANJACINTO|River and battlefield name central to Texas history|1
MATAGORDA|Texas bay and barrier-island region|3
GALVESTON|Island city southeast of Houston|1
GALVESTONISLAND|Barrier island city guarding the entrance to its namesake bay|2
BOLIVAR|Peninsula reached by ferry from Galveston|2
TRINITYBAY|Northern arm of the Galveston Bay system|3
CLEARLAKE|Bay-area community near Johnson Space Center|1
GULFCOAST|Coastal region that includes Houston and Galveston|1
COASTALBEND|Curving Texas coast around Corpus Christi|2
PINEYWOODS|Forested region of East Texas|2
HILLCOUNTRY|Rocky central Texas region known for springs and wineries|1
PANHANDLE|Rectangular northernmost region of Texas|1
BIGBEND|Remote West Texas region around a great river curve|1
TRANSPECOS|Texas region west of the Pecos River|3
BLACKLAND|Dark-soil Texas prairie region|3
EDWARDS|Plateau that covers much of west-central Texas|3
BALCONES|Escarpment separating uplands from coastal plain|3
LLANO|River and uplift region in central Texas|2
PECOS|West Texas river and frontier landmark|2
CHIHUAHUAN|Desert extending into far West Texas|3
PRAIRIE|Grassland landscape once widespread around Houston|1
MARSH|Wet coastal habitat around Galveston Bay|1
ESTUARY|Tidal ecosystem where river water meets the Gulf|2
BARRIERISLAND|Long coastal island that shields the mainland|2
HURRICANE|Powerful tropical storm threat on the Texas coast|1
STORMSURGE|Coastal flooding pushed ashore by a cyclone|2
HEATINDEX|Feels-like measure familiar in a Houston summer|1
HUMIDITY|Moisture that makes Gulf Coast heat feel hotter|1
THUNDERSTORM|Common warm-season producer of lightning and downpours|1
FLASHFLOOD|Rapid high-water hazard during intense Texas rain|2
DROUGHT|Long dry spell that strains Texas water supplies|1
NORTHER|Fast-arriving Texas cold front|3
ALAMO|San Antonio mission remembered from the Texas Revolution|1
GOLIAD|Texas Revolution site associated with a 1836 massacre|2
REPUBLIC|Texas form of government from 1836 to 1845|1
ANNEXATION|Process that made Texas part of the United States|2
INDEPENDENCE|What Texans declared on March 2, 1836|1
REVOLUTION|Conflict that created the Republic of Texas|1
FRONTIER|Settled edge that moved westward across Texas|1
PRESIDIO|Spanish frontier fort or garrison|3
MISSION|Religious settlement central to early Texas history|1
EMPRESARIO|Land agent who recruited settlers to Mexican Texas|3
TEJANO|Texan of Mexican heritage|2
VAQUERO|Spanish-speaking horseman who shaped cowboy culture|2
RANCHERO|Ranch owner or worker in Spanish-speaking Texas|3
CATTLEDRIVE|Movement of a herd along an overland trail|1
CHISHOLM|Famous cattle trail leading north from Texas|2
GOODNIGHT|Cattle trail and ranching name linked to Charles Goodnight|3
STOCKYARD|Place where cattle are held before sale or shipment|1
TRAILRIDE|Horseback journey that opens rodeo season in Houston|1
CHUCKWAGON|Mobile kitchen of a cattle drive|1
COWBOY|Horseback cattle worker|1
COWGIRL|Woman skilled in ranch or rodeo work|1
RANCHER|Person who operates a cattle ranch|1
WRANGLER|Worker who manages horses or livestock|2
RANCH|Large property used for raising livestock|1
LARIAT|Looped rope used to catch cattle|2
LASSO|Looped rope thrown from horseback|1
SADDLE|Rider's seat secured to a horse|1
STIRRUP|Foot support hanging from a saddle|1
SPURS|Metal riding aids worn on boot heels|1
STETSON|Hat brand whose name became shorthand for a cowboy hat|2
BOOTS|Western footwear made for riding|1
BUCKLE|Often oversized prize or accessory on a rodeo belt|1
BANDANA|Square cloth worn around a cowboy's neck|1
CHAPS|Leather leg coverings worn by riders|2
BRONC|Rodeo horse that bucks|2
BRONCO|Untrained or bucking horse|1
BULLRIDER|Contestant trying to stay mounted for eight seconds|1
MUTTONBUSTIN|Children's rodeo event involving a sheep ride|2
CALFSCRAMBLE|Rodeo youth event with competitors chasing calves|2
BARRELRACE|Timed cloverleaf riding event|1
STEER|Castrated male cattle used in several rodeo events|2
HEIFER|Young female cow that has not borne a calf|2
LIVESTOCK|Farm animals exhibited at the Houston show|1
SHOWRING|Arena where livestock are judged|1
CHUTE|Narrow enclosure that releases a rodeo animal|1
CORRAL|Enclosure for horses or cattle|1
ARENA|Venue for rodeo competition and concerts|1
RODEO|Competition built around ranching skills|1
COOKOFF|Barbecue competition held before Houston's rodeo|1
TRAILBOSS|Leader of a cattle drive or trail ride|2
HAYBALE|Bundled livestock feed and familiar ranch prop|1
ROPING|Rodeo skill involving a lariat|1
BULLDOGGING|Rodeo event also called steer wrestling|3
TWOSTEP|Partner dance popular in Texas dance halls|1
HONKYTONK|Bar featuring country music and dancing|1
WESTERN|Genre associated with cowboys and frontier stories|1
COUNTRY|Music genre at home on many Texas stages|1
FIDDLE|Violin played in country and western swing|1
STEELGUITAR|Instrument that gives country music its gliding sound|2
WESTERNSWING|Dance music style strongly associated with Texas|2
TEXMEX|Texas-Mexican culinary tradition|1
QUESO|Melted-cheese dip central to Tex-Mex tables|1
FAJITA|Grilled strips traditionally cut from skirt steak|1
BARBACOA|Slow-cooked meat often served in Texas tacos|2
BRISKET|Low-and-slow centerpiece of Texas barbecue|1
PITMASTER|Expert who tends a barbecue smoker|1
SMOKER|Cooking chamber used for low-and-slow barbecue|1
POSTOAK|Classic Central Texas wood for smoking brisket|2
KOLACHE|Czech pastry embraced across Texas|1
KLOBASNIK|Czech-Texan sausage-filled pastry|3
TACOS|Folded tortillas with countless Texas fillings|1
ENCHILADA|Filled tortilla covered in chile sauce|1
CHILICONCARNE|Meat-and-chile stew with deep Texas roots|2
BREAKFASTTACO|Morning tortilla staple in Texas|1
PECANPIE|Dessert made with the Texas state nut|1
BANANAPUDDING|Creamy dessert common at barbecue restaurants|1
TURKEYLEG|Smoky handheld favorite on the rodeo midway|1
CRAWFISH|Boiled springtime favorite along the upper Gulf Coast|1
SALSAVERDE|Green salsa commonly made with tomatillos|2
JALAPENO|Texas's official state pepper|1
CHILTEPIN|Tiny hot pepper native to South Texas|3
MIGAS|Egg-and-tortilla breakfast dish|2
PUFFYTACO|San Antonio specialty with a fried, inflated shell|2
SPACECITY|Houston nickname tied to human spaceflight|1
BAYOUCITY|Houston nickname drawn from its many waterways|1
CLUTCHCITY|Houston sports nickname born from comeback wins|2
ASTRODOME|Houston stadium once called the Eighth Wonder of the World|1
MISSIONCONTROL|NASA center that directs human spaceflight missions|1
NASA|U.S. agency with a major human-spaceflight center in Houston|1
JOHNSONSPACE|Houston-area NASA center named for Lyndon B. Johnson|2
SPACECENTER|Visitor destination beside Johnson Space Center|1
APOLLO|Moon program supported from Houston Mission Control|1
GEMINI|NASA program that preceded Apollo|2
ARTEMIS|NASA program aimed at returning people to the Moon|1
ASTRONAUT|Space traveler closely associated with Houston|1
MOONWALK|Activity trained for at Johnson Space Center|1
ROCKET|Vehicle that carries payloads beyond the atmosphere|1
ORBIT|Curved path followed by a spacecraft|1
SKYLAB|First U.S. space station, supported from Houston|2
SHUTTLE|Reusable spacecraft program long controlled from Houston|1
MOONROCK|Lunar sample studied and displayed in Houston|1
SHIPCHANNEL|Waterway connecting Houston's port to the Gulf|1
PORTHOUSTON|Major Gulf Coast port and ship-channel authority|1
PETROCHEMICAL|Industry concentrated along the Houston Ship Channel|2
REFINERY|Facility that turns crude oil into usable products|1
PIPELINE|Long conduit central to the Texas energy industry|1
OFFSHORE|Located in Gulf waters away from the coast|2
ROUGHNECK|Worker on an oil-drilling crew|2
DERRICK|Tall framework over a drilling site|1
GUSHER|Oil well that erupts under natural pressure|2
SPINDLETOP|1901 discovery that launched the Texas oil boom|2
ENERGY|Industry strongly identified with Houston|1
AEROSPACE|Industry spanning aircraft and spacecraft|1
MEDCENTER|Short name for Houston's vast medical district|1
TMC|Initials of the Texas Medical Center|2
LIFESCIENCE|Research field prominent in Houston medicine|2
TRANSPLANT|Surgical specialty advanced at Houston hospitals|2
SKYSCRAPER|Tall building shaping Houston's downtown silhouette|1
TUNNEL|Underground walkway in downtown Houston|1
METRORAIL|Houston's street-running light-rail system|1
BELTWAY|Orbital toll road around much of Houston|1
LOOP|Houston shorthand for Interstate 610|1
BAYOUBEND|Houston house museum known for American decorative arts|2
MENIL|Houston museum housing the de Menil collection|2
ROTHKO|Artist whose chapel is a Houston landmark|2
MFAH|Initials of Houston's major fine-arts museum|2
ARTCAR|Elaborately decorated vehicle in a famous Houston parade|1
ORANGESHOW|Houston folk-art environment built in tribute to citrus|2
DISCOVERYGREEN|Downtown Houston park beside the convention district|1
HERMANNPARK|Large Houston park beside museums and the zoo|1
MEMORIALPARK|Houston park containing trails and a municipal golf course|1
BUFFALOBAYOU|Waterway winding through central Houston|1
WAUGHBRIDGE|Houston bridge known for its bat colony|2
BATCOLONY|Group of bats living beneath a Houston bridge|2
HEIGHTS|Historic Houston neighborhood northwest of downtown|1
MONTROSE|Central Houston neighborhood known for arts and nightlife|1
MIDTOWN|Houston district between downtown and the museum area|1
DOWNTOWN|Houston's central business district|1
EASTEND|Historic Houston area east of downtown|2
THIRDWARD|Historic Houston neighborhood southeast of downtown|2
FIFTHWARD|Historic Houston neighborhood northeast of downtown|2
MEMORIAL|West Houston area sharing a name with a major park|1
WESTHEIMER|Long Houston road named for an early settler|2
BISSONNET|Major Houston street extending far southwest|2
KIRBY|Houston thoroughfare passing near Rice University|1
FANNIN|Downtown street named for a Texas Revolution figure|2
POSTOAKROAD|Uptown Houston boulevard named for a native tree|2
KEMAH|Bay-area city known for its waterfront boardwalk|1
KATY|City west of Houston named from railroad shorthand|1
HUMBLE|Houston-area city whose name has a silent first letter|1
SUGARLAND|Southwest Houston suburb named for sugar production|1
PEARLAND|Houston-area city named for orchard country|1
BELLAIRE|Enclave city surrounded largely by Houston|2
PASADENA|Industrial city southeast of Houston|1
TOMBALL|Northwest Houston-area city founded along a railroad|2
CONROE|Montgomery County seat north of Houston|1
BAYTOWN|Ship-channel city east of Houston|1
SEABROOK|Bay-area city on Clear Lake|2
WEBSTER|Bay-area city near Johnson Space Center|1
STAFFORD|Municipality southwest of Houston|2
RICHMOND|Fort Bend County seat on the Brazos|1
ROSENBERG|Fort Bend city named for a railroad executive|2
BEAUMONT|East Texas city near the Spindletop oil field|1
BRENHAM|Texas city associated with bluebonnets and ice cream|1
AUSTIN|Texas capital on the Colorado River|1
DALLAS|North Texas city on the Trinity River|1
FORTWORTH|North Texas city nicknamed Cowtown|1
SANANTONIO|Texas city home to the Alamo and River Walk|1
ELPASO|Far West Texas city on the Rio Grande|1
LUBBOCK|South Plains city associated with Buddy Holly|1
AMARILLO|Panhandle city near Palo Duro Canyon|1
WACO|Central Texas city on the Brazos River|1
CORPUSCHRISTI|Texas coastal city on a broad bay|1
MIDLAND|West Texas city in the Permian Basin|1
ODESSA|West Texas city paired regionally with Midland|1
MARFA|Small West Texas arts destination|1
ALPINE|Big Bend gateway and home of Sul Ross State|2
FREDERICKSBURG|Hill Country city with German heritage|1
GRUENE|Historic district known for a classic Texas dance hall|2
LOCKHART|Central Texas town famous for barbecue|1
NACOGDOCHES|East Texas city often called the state's oldest town|2
TERLINGUA|Big Bend ghost town known for chili cookoffs|2
PORTARANSAS|Gulf Coast town on Mustang Island|1
SOUTHPADRE|Resort community on a southern Texas barrier island|1
SURFSIDE|Beach community south of Galveston|1
STRAND|Historic commercial district in Galveston|1
SEAWALL|Galveston barrier built after the 1900 hurricane|1
FERRY|Free vessel connecting Galveston and Bolivar|1
JUNETEENTH|Holiday tracing to the 1865 emancipation announcement in Galveston|1
CYCLONE|Historic term often used for Galveston's 1900 hurricane|2
MOODYGARDENS|Galveston attraction recognized by its pyramids|1
BISHOPSPALACE|Ornate historic mansion in Galveston|2
ASTROS|Houston's Major League Baseball team|1
TEXANS|Houston's National Football League team|1
ROCKETS|Houston's National Basketball Association team|1
DYNAMO|Houston's men's Major League Soccer club|1
DASH|Houston's women's professional soccer club|1
COUGARS|University of Houston athletic teams|1
OWLS|Rice University athletic teams|1
AGGIES|Texas A and M athletic teams|1
LONGHORNS|University of Texas athletic teams|1
TWELFTHMAN|Texas A and M tradition honoring student support|2
HEB|Texas grocery chain identified by three initials|1
BUCEES|Texas-born travel center known for a beaver mascot|1
WHATABURGER|Texas-born burger chain with orange-and-white branding|1
`);

const BEER_BREWING = parseCorpus("beer & brewing", `
ALE|Beer fermented with yeast working relatively warm|1
LAGER|Beer conditioned cold after fermentation|1
STOUT|Dark ale style associated with roasted flavor|1
PORTER|Dark ale style that preceded stout|1
PILSNER|Pale lager style originating in Plzen|1
KOLSCH|Pale, cold-conditioned ale associated with Cologne|2
BOCK|Strong German lager style whose name means goat|2
DOPPELBOCK|Stronger malt-rich relative of bock|2
HELLES|Pale malty lager from Munich|2
DUNKEL|Dark Munich-style lager|2
MARZEN|Amber German lager historically brewed in March|2
FESTBIER|Golden German lager served at modern Oktoberfest|2
WEISSBIER|German wheat beer with expressive yeast character|2
HEFEWEIZEN|Unfiltered German wheat beer|1
WITBIER|Belgian-style wheat beer often spiced with coriander|2
SAISON|Dry, highly carbonated farmhouse ale|2
LAMBIC|Spontaneously fermented beer from Belgium|3
GUEUZE|Blend of young and old lambic refermented in a bottle|3
GOSE|Tart wheat beer traditionally seasoned with salt|2
BERLINER|First word in a tart Berlin wheat-beer style|3
TRIPEL|Strong pale Belgian abbey-style ale|2
DUBBEL|Malty dark Belgian abbey-style ale|2
QUADRUPEL|Very strong, dark Belgian-style ale|3
SAHTI|Traditional Finnish farmhouse beer|3
KELLERBIER|Unfiltered German cellar beer|3
ALTBIER|Copper ale associated with Dusseldorf|2
STEAMBEER|Historic American hybrid style fermented warm with lager yeast|2
CREAMALE|Light American ale designed for easy drinking|1
PALEALE|Hop-forward ale family lighter than porter|1
BROWNALE|Ale style emphasizing toast, nuts, or caramel|1
AMBERALE|Copper-colored ale balancing malt and hops|1
GOLDENALE|Pale, approachable ale style|1
BLONDEALE|Easy-drinking pale ale style|1
REDALE|Reddish ale with a malt-forward balance|2
MILD|Low-strength British ale style|2
BITTER|British draft-ale family despite its moderate bitterness|2
ESB|Initials for extra special bitter|2
IPA|Initials for India pale ale|1
DIPA|Initials often used for double India pale ale|2
NEIPA|Initials for hazy New England India pale ale|2
BLACKIPA|Dark beer combining roasted malt with IPA hopping|2
SESSIONIPA|Lower-alcohol form of India pale ale|1
WESTCOASTIPA|Dry, clear IPA style with assertive hop bitterness|2
HAZYIPA|Opaque, fruit-forward form of India pale ale|1
MILKSTOUT|Stout made with unfermentable lactose|2
OATMEALSTOUT|Stout whose grain bill includes oats|2
IMPERIALSTOUT|Very strong, intensely flavored stout|2
DRYSTOUT|Roasty stout style with a notably dry finish|1
FOREIGNSTOUT|Strong export-oriented stout style|3
BALTICPORTER|Strong dark lager descended from British porter|3
ROBUSTPORTER|American porter style with firm roast character|2
RAUCHBIER|German beer made with smoke-dried malt|3
SMOKEDBEER|Beer whose malt contributes a wood-smoke aroma|2
BARLEYWINE|Very strong ale built for aging|2
OLDALE|Aged British ale style with rich malt character|3
SCOTCHALE|Strong, malt-centered ale associated with Scotland|2
WEEHEAVY|Traditional name for a strong Scotch ale|2
TABLEBEER|Low-strength beer intended for meals|1
FARMHOUSEALE|Rustic ale family that includes saison|2
SOURALE|Ale made deliberately tart|1
FRUITBEER|Beer fermented or flavored with fruit|1
PUMPKINALE|Seasonal ale made with squash or pie spices|1
WINTERALE|Seasonal beer brewed for cold weather|1
STRONGALE|Broad family of high-alcohol ales|1
LIGHTLAGER|Pale lager brewed for low body or calories|1
DARKLAGER|Cold-fermented beer made with darker malts|1
VIENNALAGER|Amber lager style associated with Austrian brewing|2
MEXICANLAGER|Lager family associated with breweries of Mexico|1
RICELAGER|Crisp lager using rice as an adjunct|2
AMERICANLAGER|Clean, highly carbonated U.S. lager style|1
CZECHPILS|Hop-forward pale lager in the Czech tradition|2
MALT|Germinated grain dried for brewing|1
BARLEY|Most common base grain in beer|1
WHEAT|Grain central to hefeweizen and witbier|1
RYE|Spicy-tasting grain used in some beers|1
OATS|Grain that can add a silky body|1
HOPS|Flowers providing beer bitterness and aroma|1
YEAST|Microbe that converts wort sugars into alcohol and gas|1
WATER|Ingredient making up most of a finished beer|1
GRIST|Crushed grain mixture prepared for mashing|2
WORT|Sweet liquid extracted from mash before fermentation|2
MASH|Warm mixture that converts grain starches to sugars|1
LAUTER|Separate sweet wort from spent grain|2
SPARGE|Rinse a grain bed to collect remaining sugars|2
BOIL|Hot brewing stage that sterilizes wort and extracts hops|1
WHIRLPOOL|Circular wort movement used to collect solids|2
TRUB|Protein and hop sediment left from wort production|3
KRAUSEN|Foamy cap on actively fermenting beer|3
STARTER|Small yeast culture grown before pitching|1
ADJUNCT|Fermentable ingredient used beyond the main malt|2
DEXTROSE|Simple corn sugar used by some brewers|2
LACTOSE|Milk sugar that brewing yeast usually cannot ferment|2
MOLASSES|Dark sugar syrup sometimes used in specialty beer|1
HONEY|Fermentable sweetener used in some ales|1
CHERRY|Fruit classically used in kriek lambic|1
RASPBERRY|Fruit used in framboise-style beer|1
ORANGEPEEL|Citrus seasoning common in witbier|2
CORIANDER|Seed spice traditionally used in witbier|2
COFFEE|Roasted ingredient paired naturally with stout|1
CACAO|Chocolate source used in some dark beers|2
VANILLA|Bean whose flavor often complements barrel-aged stout|1
SPICE|Flavoring category used in many seasonal beers|1
SALT|Seasoning traditionally present in gose|1
OAK|Barrel wood that can add tannin and vanilla notes|1
HOPCONE|Whole flower of the hop plant|2
HOPPELLET|Compressed form of hops widely used by brewers|2
BITTERINGHOP|Hop addition selected mainly for bitterness|2
AROMAHOP|Hop addition selected mainly for fragrance|2
NOBLEHOP|Traditional European hop prized for delicate aroma|3
CITRA|Modern hop variety known for bright citrus character|2
MOSAIC|Hop variety known for layered fruit and herbal notes|2
SIMCOE|American hop associated with pine and fruit aromas|2
CASCADE|Classic American hop with grapefruit-like character|1
SAAZ|Traditional Czech hop used in pale lager|2
HALLERTAU|Major German hop-growing region and hop family|3
CENTENNIAL|American hop sometimes called a super Cascade|2
BREW|Make beer by mashing, boiling, and fermenting|1
BREWER|Person who makes beer|1
BREWERY|Place where beer is produced|1
BREWHOUSE|Area containing the mash and boiling equipment|1
MALTSTER|Specialist who converts raw grain into malt|3
MALTING|Controlled germination and drying of cereal grain|2
MILL|Machine that crushes brewing malt|1
CRUSH|Break malt kernels while largely preserving husks|1
MASHTUN|Vessel where grain and hot water are mixed|2
LAUTERTUN|Vessel designed to separate wort from grain|3
KETTLE|Vessel in which wort is boiled|1
FERMENTER|Tank or vessel where yeast makes beer|1
UNITANK|Single tank used for fermentation and conditioning|2
CARBOY|Large narrow-necked vessel used by homebrewers|2
AIRLOCK|One-way device that vents fermentation gas|1
HYDROMETER|Instrument that estimates sugar from liquid density|2
REFRACTOMETER|Optical tool used to measure dissolved solids|3
THERMOMETER|Tool essential for checking mash temperature|1
CHILLER|Device that cools hot wort quickly|1
COIL|Spiral tubing in an immersion chiller|1
PUMP|Device that moves wort through a brewhouse|1
HOSE|Flexible tube used for transferring brewing liquids|1
VALVE|Fitting that controls flow from a brewing vessel|1
KEG|Reusable container for draft beer|1
CORNYKEG|Soda-style keg popular with homebrewers|2
CASK|Container in which traditional real ale conditions|1
FIRKIN|British cask holding roughly nine imperial gallons|3
PIN|British beer cask half the size of a firkin|3
BARREL|Wooden vessel used to mature specialty beer|1
FOEDER|Large wooden vessel for aging or fermenting beer|3
BRITETANK|Vessel used for clarified, carbonated beer|2
TAP|Valve that dispenses draft beer|1
FAUCET|Bar fitting from which draft beer pours|1
DRAFT|Beer served from a keg or cask|1
DRAUGHT|British spelling of draft beer|2
BEERENGINE|Hand pump used to draw cask ale|2
HANDPUMP|Manual device for serving cask-conditioned ale|2
KEGERATOR|Refrigerator adapted to dispense kegged beer|1
COUPLER|Fitting that connects a gas-and-beer system to a keg|2
REGULATOR|Device that controls gas pressure in a draft system|2
NITROGEN|Gas used to create a creamy draft-beer texture|2
NITRO|Shorthand for beer served with a nitrogen-rich gas blend|1
CARBONATION|Dissolved gas that gives beer its bubbles|1
CONDITIONING|Maturation stage after primary fermentation|2
PRIMARY|Initial and most active fermentation stage|2
SECONDARY|Later maturation stage in a separate vessel|2
FERMENT|Let yeast convert sugars into alcohol and gas|1
LAGERING|Cold storage that smooths and clarifies lager|2
COLDCRASH|Rapid chilling used to help solids settle|2
DRYHOP|Add hops after the boil for aroma|1
HOPBACK|Vessel that exposes hot wort to aroma hops|3
PITCH|Add yeast to cooled wort|1
ATTENUATION|Share of wort sugars consumed during fermentation|3
FLOCCULATION|Tendency of yeast cells to clump and settle|3
OXIDATION|Staling reaction caused by unwanted oxygen exposure|2
DIACETYL|Compound that can smell or taste like butter|3
ESTER|Fermentation compound often perceived as fruity|2
PHENOL|Fermentation compound that may seem spicy or smoky|3
BRETT|Brewer's shorthand for Brettanomyces yeast|3
LACTO|Brewer's shorthand for Lactobacillus bacteria|3
PEDIO|Brewer's shorthand for Pediococcus bacteria|3
WILDYEAST|Uncultivated yeast used in spontaneous fermentation|2
MIXEDCULTURE|Blend of microbes used to ferment complex sour beer|3
KETTLESOUR|Tart beer acidified in the brewing kettle|2
BARRELSOUR|Tart beer matured with microbes in wood|2
REFERMENT|Ferment again, often in a bottle or cask|2
ABV|Standard initials for alcohol by volume|1
IBU|Standard initials for a bitterness measurement|2
SRM|U.S. scale used to describe beer color|3
GRAVITY|Density reading used to track fermentation|2
ORIGINALGRAVITY|Wort density measured before fermentation|3
FINALGRAVITY|Beer density measured after fermentation|3
PROOF|Alcohol scale more commonly used for spirits than beer|1
COLOR|Appearance ranging from straw to nearly black|1
CLARITY|Degree to which light passes through a beer|1
BODY|Perceived weight or fullness of beer in the mouth|1
MOUTHFEEL|Texture and physical sensation of a sip|2
HEAD|Foam layer at the top of a poured beer|1
LACING|Foam pattern left on a glass as beer is consumed|2
AROMA|Fragrance perceived before and during a sip|1
BOUQUET|Complex combination of aromas|2
FLAVOR|Combined taste and aroma impression|1
BITTERNESS|Hop-derived counterpoint to malt sweetness|1
SWEETNESS|Sugary impression from residual malt compounds|1
TART|Pleasantly sharp acidic quality|1
CRISP|Clean, brisk finish often sought in pale lager|1
MALTY|Emphasizing grain, bread, toast, or caramel|1
HOPPY|Emphasizing hop aroma, flavor, or bitterness|1
ROASTY|Suggesting deeply kilned or roasted grain|1
TOASTY|Reminiscent of browned bread|1
BISCUITY|Malt descriptor resembling a dry cracker|2
FLORAL|Aroma descriptor resembling flowers|1
CITRUS|Hop aroma family suggesting lemon or grapefruit|1
PINEY|Hop descriptor suggesting evergreen resin|1
RESINOUS|Sticky, pine-like hop impression|2
TROPICAL|Hop aroma family suggesting mango or passion fruit|1
BANANA|Classic hefeweizen ester aroma|1
CLOVE|Classic spicy hefeweizen phenol aroma|1
BREADY|Malt aroma resembling fresh bread|1
CARAMEL|Sweet toasted-sugar malt note|1
CHOCOLATE|Roasted-malt note common in dark beer|1
SMOKY|Aroma associated with fire-dried malt|1
EARTHY|Hop or fermentation note resembling soil and herbs|2
HERBAL|Plant-like aroma found in some hop varieties|1
SKUNKY|Light-struck aroma caused by altered hop compounds|1
PAPERY|Cardboard-like sign of oxidation|2
BUTTERY|Sensory descriptor commonly linked to diacetyl|1
ASTRINGENT|Drying, puckering mouth sensation|2
BALANCE|Relationship among malt, hops, yeast, and other flavors|1
FINISH|Flavor impression remaining after swallowing|1
PINT|Common serving measure and beer glass|1
GROWLER|Reusable jug filled with draft beer|1
CROWLER|Large can filled and sealed at a taproom|2
BOTTLE|Glass package sealed with a cap or cork|1
CAN|Lightproof metal beer package|1
TAPROOM|Brewery room where its beer is served|1
PUB|Public house centered on drinks and conversation|1
BEERHALL|Large communal drinking venue|1
BIERGARTEN|German-style outdoor beer garden|2
FLIGHT|Several small pours served for comparison|1
TASTER|Small sample pour|1
SAMPLE|Small amount offered before choosing a full pour|1
POUR|Transfer beer into a serving glass|1
FOAM|Bubbles gathered on top of a beer|1
COLLAR|Ring of foam around the top of a pour|2
COASTER|Small mat protecting a table from a glass|1
STEIN|Handled stoneware beer mug|1
MUG|Sturdy handled drinking vessel|1
TULIP|Curved glass that concentrates beer aroma|1
SNIFTER|Bowl-shaped glass for strong aromatic beer|2
GOBLET|Stemmed bowl-shaped beer glass|1
CHALICE|Heavy stemmed glass associated with Belgian ales|2
POKAL|Straight-sided stemmed beer glass|3
STANGE|Narrow cylindrical glass used for Kolsch|3
NONIC|British pint glass with a bulge near the rim|3
WEIZENGLASS|Tall curved glass designed for wheat beer|2
PILSNERGLASS|Tall tapered glass for pale lager|1
TEKU|Angular stemmed tasting glass|3
YARDGLASS|Very tall vessel traditionally used for a drinking challenge|2
RINSE|Wet a clean glass before a draft pour|1
CELLAR|Cool storage space for conditioning beer|1
COOLER|Insulated container for keeping cans cold|1
PROST|German toast meaning cheers|1
CHEERS|Friendly toast before drinking|1
OKTOBERFEST|Munich festival strongly associated with beer|1
PURITYLAW|Nickname for Germany's historic brewing regulation|2
REINHEITSGEBOT|German name for the historic beer purity law|3
BAVARIA|German region containing Munich and Bamberg|1
BELGIUM|Country renowned for abbey ales, saison, and lambic|1
BOHEMIA|Historic region where pale pilsner arose|2
PLZEN|Czech city that gave pilsner its name|2
BURTON|English brewing town famous for sulfate-rich water|3
DUBLIN|City strongly associated with dry stout|1
LONDON|City central to the history of porter|1
COLOGNE|German city whose local style is Kolsch|2
DUSSELDORF|German city associated with Altbier|2
MUNICH|Bavarian capital and home of Oktoberfest|1
BAMBERG|Franconian city famous for smoked beer|3
FRANCONIA|German region with an unusually dense brewing tradition|3
TRAPPIST|Monastic order whose breweries meet a protected standard|2
ABBEY|Religious house associated with Belgian-inspired ale styles|1
MONASTIC|Relating to monks and historic brewing traditions|2
BREWPUB|Restaurant that makes beer on site|1
MICROBREWERY|Small independently scaled brewery|1
NANOBREWERY|Very small commercial brewing operation|2
HOMEBREW|Beer made at home rather than commercially|1
HOMEBREWER|Person who makes beer at home|1
CRAFTBEER|Beer marketed around independent or small-scale production|1
BEERGEEK|Enthusiast eager to discuss styles and ingredients|1
BEERJUDGE|Evaluator trained to score beer against style guidelines|2
CICERONE|Professional beer-service certification title|2
BOTTLESHARE|Gathering where participants open beers together|1
TAPTAKEOVER|Event featuring many draft lines from one brewery|2
BEERFEST|Festival organized around brewery samples|1
RELEASEDAY|Date a brewery debuts a special beer|1
COLLAB|Beer made jointly by multiple breweries|1
SEASONAL|Beer offered during a particular part of the year|1
ROTATINGTAP|Draft line that changes beer frequently|2
HOUSEBEER|Beer made or selected as a venue's standard offering|1
FLAGSHIP|Brewery's best-known core beer|1
ONTAP|Available from a draft line|1
LASTCALL|Final opportunity to order before a bar closes|1
HAPPYHOUR|Period featuring reduced drink prices|1
SIXPACK|Package containing six cans or bottles|1
CASE|Bulk package of cans or bottles|1
STEP|Stage in a brewery's grain-to-glass process|1
POLE|Vertical support used to train climbing hop bines|1
SWAG|Branded merchandise sold by a favorite brewery|1
`);

// Focused entries help the new evergreen title packs surface meaningful long
// answers in existing categories without turning those categories local-only.
const TITLE_PACKS = [
  ...parseCorpus("sports", `
WORLDCUP|Global soccer tournament held every four years|1
GROUPSTAGE|Opening round played in pools before knockouts|1
KNOCKOUT|Tournament match that eliminates the loser|1
GOALKEEPER|Player allowed to handle the ball near the goal|1
MIDFIELDER|Player linking defense and attack|1
CORNERKICK|Restart taken from the corner arc|1
YELLOWCARD|Referee's formal caution in soccer|1
RODEORUN|Road race held as part of rodeo season|1
TEETIME|Scheduled start for a round of golf|1
MUNICIPAL|Publicly owned, as many city golf courses are|2
CLUBHOUSE|Golf-course building for players and staff|1
SHOTGUNSTART|Golf format with groups starting on many holes|2
TAILGATE|Pre-game gathering around parked vehicles|1
`),
  ...parseCorpus("games", `
DAILYSTREAK|Run of consecutive days playing a game|1
CARDGAME|Contest played with a deck|1
WORDGAME|Puzzle centered on vocabulary or spelling|1
TRIVIANIGHT|Scheduled team contest of general knowledge|1
SCORECARD|Record of points earned during play|1
LEADERBOARD|Ranked display of player results|1
WINNINGSTREAK|Consecutive run of victories|1
GUESSAGAIN|Invitation after an incorrect attempt|1
PUZZLERIVAL|Friendly competitor in a battle of wits|2
DAILYCHALLENGE|New task offered once each day|1
`),
  ...parseCorpus("travel", `
WEEKENDTRIP|Short journey fitting between workweeks|1
COASTALDRIVE|Road journey beside the sea|1
BEACHHOUSE|Vacation home close to the shore|1
FERRYRIDE|Journey across water on a vehicle-carrying boat|1
PACKLIGHT|Travel with only essential luggage|1
ROADTRIP|Long recreational journey by car|1
DAYTRIP|Journey completed without an overnight stay|1
GULFGETAWAY|Short vacation on the Gulf Coast|1
ISLANDTIME|Relaxed pace associated with a beach vacation|1
`),
  ...parseCorpus("food & drink", `
CAJUNCOOKING|Louisiana cuisine built on bold seasoning and local staples|1
CRAWFISHBOIL|Communal meal of shellfish, corn, and potatoes|1
BREAKFASTTACOS|Morning meal wrapped in tortillas|1
BACKYARDCOOKOUT|Casual outdoor meal cooked over flame|1
SMOKERING|Pink layer beneath properly barbecued meat's crust|2
DRYRUB|Blend of seasonings applied before cooking|1
BURNTENDS|Caramelized barbecue pieces cut from brisket|1
CHILICRISP|Crunchy, spicy oil-based condiment|1
TORTILLA|Flatbread forming the base of a taco|1
BOUDIN|Louisiana sausage mixture commonly containing rice|2
`),
  ...parseCorpus("kids", `
DADMODE|State of being fully occupied with parenting duties|1
POOLPARTY|Celebration centered on swimming|1
SCHOOLNIGHT|Evening before a day of classes|1
SIDELINE|Where parents watch a youth sports game|1
CARPOOL|Shared ride carrying children to activities|1
SNACKDUTY|Assignment to bring food for a children's team|1
BIRTHDAYCIRCUIT|Seemingly endless run of children's parties|2
BACKYARDENERGY|Restless enthusiasm best released outdoors|1
`),
  ...parseCorpus("music", `
HEADLINER|Top-billed performer at a concert or festival|1
ENCORE|Additional song performed after an ovation|1
FESTIVALSET|Artist's allotted performance at a music festival|1
GARAGEBAND|Music group rehearsing where a car usually parks|1
COUNTRYSONG|Musical story commonly backed by guitar or fiddle|1
SETLIST|Ordered songs planned for a live performance|1
OPENINGACT|Performer appearing before the headliner|1
SINGALONG|Song or performance inviting audience participation|1
`),
];

export const COMMUNITY_WORD_BANK = [...HOUSTON_TEXAS, ...BEER_BREWING, ...TITLE_PACKS];
