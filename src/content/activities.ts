/* The real 101 — the book's own list.
   ─────────────────────────────────────────────────────────────
   Source: the 3/11/26 manuscript of UNPLUG! (154 pp). Numbers, names,
   page numbers and "What you need" lists come from the book itself
   (PDF page index == printed page number, checked).

   WHAT IS THE BOOK'S AND WHAT IS OURS
     · THE BOOK'S: n, name, chapter, page, needs.
     · OURS, and DRAFT until Wanda signs off: teaser, hook, and every
       tag — where / who / help / days — plus TEN_TO_START and MONTHLY.
       The book is deliberately ungraded ("4 to 12 or more", p. 25) and
       gives no times, so there are no age or minutes fields here. Don't
       add them; they'd be invented.

   TEASER RULES (also in AGENTS.md)
     · One or two sentences, our own words — never copy the book's text.
     · Never give away a trick's secret, a puzzle's answer, a game's
       board, or a punchline. That's what the book is for.
     · Second person, present tense, US English ("math", "flashlight").
     · No statistics, never "digital detox".

   Self-contained on purpose: no "@/" imports and only erasable
   TypeScript, so scripts/check-activities.ts can load this file
   straight under Node's type stripping. */

export type Pop = "red" | "blue" | "teal" | "magenta" | "orange";
export type Where = "Indoor" | "Outdoor";
export type Who = "Solo" | "Two" | "A crowd";
/** What a grown-up needs to be on hand for. One value, the most salient. */
export type Help = "oven" | "stove" | "tools" | "candles" | "sewing machine";
export type Kind =
  | "Tricks & puzzles"
  | "Make it"
  | "Grow & explore"
  | "Kitchen"
  | "Games & parties"
  | "Dress-up & holidays";

export type Chapter = {
  /** The book's chapter number, 1–18. */
  id: number;
  name: string;
  /** The chapter divider page. Its activities start on the next page. */
  firstPage: number;
  pop: Pop;
  kind: Kind;
};

export type Activity = {
  /** The book's number, zero-padded to two digits: "07", "44", "101". */
  n: string;
  name: string;
  /** Chapter id. */
  chapter: number;
  /** First page of the activity. */
  page: number;
  /** Last page, only when it runs over more than one. */
  endPage?: number;
  /** "What you need", shortened. */
  needs: string[];
  /** DRAFT — our words. */
  teaser: string;
  /** DRAFT — a nudge toward the book; default is "The steps are on page N." */
  hook?: string;
  where: Where[];
  who: Who[];
  help?: Help;
  /** Needs more than one sitting — something has to grow, dry or wait. */
  takesDays: boolean;
};

export const CHAPTERS: Chapter[] = [
  { id: 1, name: "Tricks", firstPage: 27, pop: "red", kind: "Tricks & puzzles" },
  { id: 2, name: "Growing Things", firstPage: 32, pop: "blue", kind: "Grow & explore" },
  { id: 3, name: "Make-It-Yourself Games", firstPage: 37, pop: "teal", kind: "Games & parties" },
  { id: 4, name: "Paper Folding", firstPage: 45, pop: "magenta", kind: "Make it" },
  { id: 5, name: "Collecting Things", firstPage: 51, pop: "orange", kind: "Grow & explore" },
  { id: 6, name: "Fun in the Kitchen", firstPage: 58, pop: "red", kind: "Kitchen" },
  { id: 7, name: "Making Things", firstPage: 65, pop: "blue", kind: "Make it" },
  { id: 8, name: "Head Games", firstPage: 73, pop: "teal", kind: "Tricks & puzzles" },
  { id: 9, name: "Number Games", firstPage: 81, pop: "magenta", kind: "Tricks & puzzles" },
  { id: 10, name: "Fun for a Group", firstPage: 88, pop: "orange", kind: "Games & parties" },
  { id: 11, name: "Workshop Projects", firstPage: 97, pop: "red", kind: "Make it" },
  { id: 12, name: "Science Stuff", firstPage: 105, pop: "blue", kind: "Grow & explore" },
  { id: 13, name: "Things to Do Outside", firstPage: 110, pop: "teal", kind: "Grow & explore" },
  { id: 14, name: "Costumes", firstPage: 117, pop: "magenta", kind: "Dress-up & holidays" },
  { id: 15, name: "Special Times", firstPage: 125, pop: "orange", kind: "Dress-up & holidays" },
  { id: 16, name: "Artsy Things", firstPage: 132, pop: "red", kind: "Make it" },
  { id: 17, name: "Sew Easy", firstPage: 141, pop: "blue", kind: "Make it" },
  { id: 18, name: "Silly Stuff", firstPage: 146, pop: "teal", kind: "Tricks & puzzles" },
];

export const KINDS: Kind[] = [
  "Tricks & puzzles",
  "Make it",
  "Grow & explore",
  "Kitchen",
  "Games & parties",
  "Dress-up & holidays",
];

type Extra = { end?: number; hook?: string; help?: Help; days?: boolean };

function act(
  n: number,
  chapter: number,
  page: number,
  name: string,
  where: Where[],
  who: Who[],
  needs: string[],
  teaser: string,
  x: Extra = {},
): Activity {
  const a: Activity = {
    n: String(n).padStart(2, "0"),
    name,
    chapter,
    page,
    needs,
    teaser,
    where,
    who,
    takesDays: x.days === true,
  };
  if (x.end !== undefined) a.endPage = x.end;
  if (x.hook !== undefined) a.hook = x.hook;
  if (x.help !== undefined) a.help = x.help;
  return a;
}

const IN: Where[] = ["Indoor"];
const OUT: Where[] = ["Outdoor"];
const BOTH: Where[] = ["Indoor", "Outdoor"];
const SOLO: Who[] = ["Solo"];
const TWO: Who[] = ["Two"];
const CROWD: Who[] = ["A crowd"];
const SOLO_TWO: Who[] = ["Solo", "Two"];
const TWO_CROWD: Who[] = ["Two", "A crowd"];

/** "The secret is on page N." — for the tricks. */
const secret = (p: number) => `The secret is on page ${p}.`;
/** For the puzzles, whose answers are all in the back. */
const SOLUTION = "Try it first. The solution is on page 152.";

export const ACTIVITIES: Activity[] = [
  // ── 1 · Tricks ──────────────────────────────────────────────
  act(1, 1, 28, "Catch the Dollar", IN, TWO, ["a dollar bill, not too wrinkled"],
    "Hold a dollar bill by one end and dare a friend to catch it as you drop it. It looks like the easiest bet in the world, and somehow it almost never works for them.",
    { hook: secret(28) }),
  act(2, 1, 29, "Instant Knot", IN, TWO, ["smooth, lightweight cord or rope, about 2 feet"],
    "Tie a knot in three seconds with one hand behind your back. Nobody else can, until they've seen the move.",
    { hook: "The move is on page 29. Practice it before you show off." }),
  act(3, 1, 30, "Dazzle ’Em with Dice", IN, TWO, ["three dice", "paper and a pencil (for younger players)"],
    "Turn your back while a friend rolls, adds and re-rolls. Then you turn around, glance at the dice and announce their total.",
    { hook: secret(30) }),
  act(4, 1, 31, "Coin Trick", IN, TWO_CROWD, ["a sheet of letter-size paper", "a quarter", "a dime"],
    "Bet your friends a quarter can’t pass through a hole only the size of a dime. Then pass it through.",
    { hook: secret(31) }),

  // ── 2 · Growing Things ─────────────────────────────────────
  act(5, 2, 33, "A Blooming Indoor Garden", IN, SOLO_TWO,
    ["flower bulbs: paperwhites or hyacinths", "potting pebbles", "a container for planting"],
    "Flowers that bloom indoors in the middle of winter, on nothing but pebbles and water, with the roots on show through clear glass. Paperwhites get going right away; hyacinths need a long cool rest first.",
    { days: true }),
  act(6, 2, 34, "Easy-to-Grow Greenery", IN, SOLO,
    ["a sweet potato, yam, carrot, turnip or parsnip", "a small container"],
    "Turn a kitchen root vegetable into a leafy vine to drape over a mirror or window. Each one grows a different kind of leaf.",
    { days: true }),
  act(7, 2, 35, "An Egghead", IN, SOLO,
    ["a large egg", "a strip of cardboard", "black and white paint, felt pens", "sprout seeds"],
    "An eggshell with a painted face and a head of green hair that really grows. You can eat the hair.",
    { days: true }),
  act(8, 2, 36, "A Monster Sunflower", OUT, SOLO,
    ["a big pot", "potting soil", "a shovel", "sunflower seeds (garden kind, not food kind)"],
    "Plant a few seeds, keep the strongest seedling, and watch it shoot up to six feet or more.",
    { days: true }),

  // ── 3 · Make-It-Yourself Games ─────────────────────────────
  act(9, 3, 38, "Ducks in a Row", IN, TWO,
    ["five pennies", "five dimes", "poster board or paper", "a felt pen"],
    "A two-player board game, pennies against dimes: get five of your ducks in a row before your opponent does.",
    {}),
  act(10, 3, 39, "Coyotes & Turkey Buzzard", IN, TWO,
    ["a big button", "twelve smaller buttons, pennies or pebbles", "an 8-inch square of poster board"],
    "One fierce turkey buzzard against twelve wily coyotes on a board you draw yourself. Trap him, or let him pick them off. Swap sides and go again."),
  act(11, 3, 40, "Ping-Pong Bounce", IN, TWO_CROWD,
    ["a muffin pan", "three ping-pong balls", "masking tape", "a felt marker"],
    "Bounce a ping-pong ball into the cups of a muffin pan for points. One cup is the lucky one, and the first to 100 wins."),
  act(12, 3, 41, "Thieves in the Henhouse", IN, TWO,
    ["the printable game boards in the book", "pencils"],
    "Hide a fox, a raccoon and a few other thieves on a grid, then call out squares to chase off the ones your opponent hid in your henhouse.",
    { end: 43, hook: "The game boards to copy are on pages 42–43." }),
  act(13, 3, 44, "Quickie Basketball", IN, TWO_CROWD,
    ["a wire coat hanger", "aluminum foil", "newspaper"],
    "A coat-hanger hoop on a doorknob, a foil-wrapped paper ball and a toe line. Keep score on the bulletin board and play to 50."),

  // ── 4 · Paper Folding ──────────────────────────────────────
  act(14, 4, 46, "Handy Paper Cup", IN, SOLO,
    ["paper (a 9-inch square; wax paper is best)", "scissors"],
    "Fold a square of paper into a cup that really holds water. There’s just one catch: you can’t put it down."),
  act(15, 4, 47, "Whirlygig", BOTH, SOLO,
    ["a 6-inch square of paper", "scissors", "a pencil with an eraser", "a straight pin"],
    "A paper pinwheel on a pencil. Blow on it, or run with it, and watch it spin."),
  act(16, 4, 48, "Wigglers", IN, SOLO,
    ["colored ad pages or construction paper", "a ruler and a fine felt pen", "a yardstick", "scissors", "a glue stick"],
    "Fold paper strips into long zig-zag springs and glue them together into bracelets, snakes, necklaces or a garland."),
  act(17, 4, 49, "Noah’s Dove", IN, SOLO,
    ["white paper", "a pen"],
    "Fold a square of paper into a little dove with a beak and wings. Hold it by the tail and shake, and its wings flap."),
  act(18, 4, 50, "The Rabbit That Turns into a Mouse", IN, SOLO,
    ["paper", "a pen", "scissors"],
    "A folded paper rabbit with a neat surprise: make a smaller one, trim the ears, and it becomes a mouse."),

  // ── 5 · Collecting Things ──────────────────────────────────
  act(19, 5, 52, "Lots of Bottles", IN, SOLO,
    ["a jar with a lid", "water", "cooking oil", "food coloring"],
    "Start a bottle collection, and turn one jar into a color-swirling toy that never mixes. Then work out why not."),
  act(20, 5, 53, "Inch Collection", IN, SOLO,
    ["light card or poster board (a 3×5 index card is perfect)", "a pen", "scissors", "a magnifying glass"],
    "A collection with one rule: everything has to fit inside a one-inch box. You make the box, then get picky."),
  act(21, 5, 54, "Coins, Coins, Coins", IN, SOLO,
    ["coins!"],
    "Start a coin collection with whatever’s in the family’s pockets. Sort by year, spot the special ones, and find out why a quarter is called “two bits.”"),
  act(22, 5, 55, "Silly Questions", IN, SOLO,
    ["a notebook or scrapbook", "a glue stick"],
    "Collect silly riddles in a scrapbook with your name on the cover. A handful of starters are on the page."),
  act(23, 5, 56, "Display Shelf for Collectibles", IN, SOLO,
    ["lots of small boxes of the same size", "rubber cement", "black spray paint", "tacks or push-pins"],
    "Glue a stack of boxes into a black display shelf for small treasures: toy cars, postcards, stones, or a Noah’s Ark of tiny animals."),
  act(24, 5, 57, "Shell Collecting", OUT, SOLO,
    ["seashells", "decorations"],
    "Start a shell collection, then make a sand-dollar decoration or a bracelet from a big round shell."),

  // ── 6 · Fun in the Kitchen ─────────────────────────────────
  act(25, 6, 59, "Crunchy Cheese Bread", IN, SOLO_TWO,
    ["a loaf of French or Italian bread", "butter", "crackers", "Parmesan cheese", "dried parsley", "garlic salt", "a cookie sheet", "a rolling pin"],
    "Garlicky broiled bread with a crushed-cracker crunch. Great with spaghetti, and the cracker-crushing is the fun part.",
    { help: "oven" }),
  act(26, 6, 60, "Super Spuds", IN, SOLO_TWO,
    ["potatoes", "butter", "salt and pepper", "cottage cheese", "paprika (optional)"],
    "Baked potatoes, squished open at the top and heaped with cottage cheese. Good, and good for you.",
    { help: "oven" }),
  act(27, 6, 61, "Flapjacks", IN, SOLO_TWO,
    ["pancake mix", "water", "toppings"],
    "Pancakes from a just-add-water mix, with ideas for add-ins and toppings from diced apple to honey butter.",
    { help: "stove" }),
  act(28, 6, 62, "Upsidedown Cake", IN, SOLO_TWO,
    ["butter", "brown sugar", "canned peach halves or pineapple slices", "maraschino cherries", "white cake mix", "whipped cream"],
    "Bake the fruit on the bottom, flip the whole cake over, and you’ve got a showpiece. Good for a birthday.",
    { help: "oven" }),
  act(29, 6, 63, "Fruit Leather", IN, SOLO_TWO,
    ["1½ pounds of ripe fruit", "cheesecloth", "plates", "plastic wrap", "tape"],
    "Turn ripe fruit into homemade fruit leather, dried in the sun, or in the oven on a rainy day.",
    { help: "stove", days: true }),
  act(30, 6, 64, "Popeyes", IN, SOLO_TWO,
    ["bread", "an egg", "butter"],
    "An egg cooked inside a hole cut from a slice of toast. An easy snack any time of day.",
    { help: "stove" }),

  // ── 7 · Making Things ──────────────────────────────────────
  act(31, 7, 66, "String Basket", IN, SOLO,
    ["a balloon", "white crochet cotton", "a small paint brush", "craft glue that dries clear", "narrow lace", "twisted paper ribbon"],
    "Wrap thread around a balloon, paint it with glue, then pop the balloon and keep a stiff little basket with a handle.",
    { days: true }),
  act(32, 7, 67, "Shooter", IN, SOLO_TWO,
    ["a wooden clothespin", "a big rubber band", "a slim piece of wood, about 10 inches", "white wood glue"],
    "A clothespin-and-rubber-band shooter. Stick up some sticky notes for targets and invent your own scoring."),
  act(33, 7, 68, "Button Buzzer", IN, SOLO,
    ["a great big button with four holes", "light cord, about 4 feet"],
    "Thread a big button on a string, wind it up, then pull. It whizzes and sings."),
  act(34, 7, 69, "Water Chimes", IN, SOLO_TWO,
    ["8 different clear glasses", "water", "a fork"],
    "Tune a row of glasses with different amounts of water until they play a scale, then play a tune."),
  act(35, 7, 70, "Paper Necklace", IN, SOLO,
    ["colorful paper (newspaper ad flyers are ideal)", "a glue stick", "toothpicks", "a big needle", "heavy thread"],
    "Roll bright paper into beads and string them into necklaces and bracelets."),
  act(36, 7, 71, "Boats", BOTH, SOLO_TWO,
    ["paper", "Styrofoam", "toothpicks", "bottle caps", "whatever works"],
    "Sketches for a whole fleet — a bottle-cap boat, a pea-pod boat, a paddle boat, a ketch — to copy or improve on, then float.",
    { end: 72 }),

  // ── 8 · Head Games ─────────────────────────────────────────
  act(37, 8, 74, "Pig Latin", BOTH, TWO_CROWD, ["nothing"],
    "A secret language almost everyone half-knows. Learn the one rule and you can say anything and still sound like a spy."),
  act(38, 8, 75, "Hog Latin", BOTH, TWO_CROWD, ["nothing"],
    "Wanda’s family language, learned from her mother and aunts. It sounds like a ridiculous jumble until it clicks. Her family can hold a whole conversation in it."),
  act(39, 8, 76, "Ope Language", BOTH, TWO_CROWD, ["nothing"],
    "A language even sillier than Hog Latin, with just one rule about vowels. Try swapping between the two in one conversation."),
  act(40, 8, 77, "Connect the Dots", IN, SOLO, ["paper", "a pencil"],
    "Nine dots, four straight lines, and you can’t lift your pencil. Leave it for a few days if it won’t give.",
    { hook: SOLUTION }),
  act(41, 8, 78, "Nine Coin Jump", IN, SOLO, ["paper", "nine coins", "masking tape"],
    "A jumping puzzle: end up with a single coin left, and it has to be the one in the center square.",
    { hook: SOLUTION }),
  act(42, 8, 79, "Puzzling Toothpicks", IN, SOLO, ["24 toothpicks"],
    "Arrange 24 toothpicks into nine squares, then take eight away and leave exactly two. It’s tricky.",
    { hook: SOLUTION }),
  act(43, 8, 80, "Chess", IN, TWO, ["a chess board", "chess pieces", "a how-to book"],
    "Not a lesson in how to play. It’s a nudge to put chess on the family game shelf, with ideas for handicaps, a family chess club and chili afterwards."),

  // ── 9 · Number Games ───────────────────────────────────────
  act(44, 9, 82, "Mind Reading", IN, TWO, ["paper", "a pencil"],
    "A friend thinks of a number, does four quick steps of math and tells you the total. You announce the number they started with. Works every time.",
    { hook: secret(82) }),
  act(45, 9, 83, "Finger Calc", IN, SOLO, ["your fingers"],
    "A finger-counting system from the Middle Ages for multiplying the bigger numbers, 6 through 10, without a calculator."),
  act(46, 9, 84, "The Human Calculator", IN, TWO, ["pencils", "paper", "a calculator (optional)"],
    "Tell a friend you’re faster than their calculator, then add up a whole column of numbers in a flash.",
    { hook: secret(84) }),
  act(47, 9, 85, "36 Is the Magic Number", IN, ["Solo", "A crowd"],
    ["copies of the chart", "scissors", "pencils"],
    "Cut a square chart into four pieces and rearrange them so every row and column adds up to 36. A very tough one, and a good party challenge.",
    { hook: SOLUTION }),
  act(48, 9, 86, "How Many Stops?", IN, TWO_CROWD, ["nothing"],
    "Read a long, busy story about a train and ask one question at the end. Keep track on your fingers, and see who gets it right.",
    { hook: "The story is on page 86, and so is the joke." }),
  act(49, 9, 87, "It’s Always 3 or 4", IN, TWO, ["nothing"],
    "Two number tricks that come out the same whatever number a friend picks. Do them only a few times, and mix them up.",
    { hook: "Both tricks are on page 87." }),

  // ── 10 · Fun for a Group ───────────────────────────────────
  act(50, 10, 89, "Scavenger Hunt", BOTH, CROWD, ["paper", "pencils", "paper bags"],
    "Teams of two race to collect a list of oddball items, with a bonus for the hard-to-find ones. A good birthday party.",
    {}),
  act(51, 10, 90, "Feed the Tiger", BOTH, CROWD,
    ["a large cardboard box", "poster board", "paints", "rubber cement", "fabric scraps", "beans"],
    "Make a big-mouthed tiger (or a clown, or any character you like) and toss bean bags into its mouth."),
  act(52, 10, 91, "Get in the Parade!", OUT, CROWD,
    ["cardboard boxes", "fabric scraps", "paints", "rubber cement", "a stapler", "black tights", "imagination"],
    "A cardboard-box centipede (or dragon), one kid per box, for a neighborhood parade. Rehearse it first."),
  act(53, 10, 92, "Goofy Stories", IN, CROWD, ["legal-size paper", "pencils"],
    "Pass folded paper around a circle, each person adding a line without seeing the rest. Then read the nonsense aloud, with no laughing allowed."),
  act(54, 10, 93, "Who’s That Beautiful Baby?", IN, CROWD,
    ["a baby picture of each guest", "mounting putty", "sticky notes", "paper and pencils"],
    "Put baby photos of everyone on a wall and match them to the guests. A great opener for any party."),
  act(55, 10, 94, "The Mystery Person", IN, CROWD, ["chairs in a circle"],
    "A party game where a clairvoyant finds the chosen person every time, with a little help from a secret accomplice.",
    { hook: secret(94) }),
  act(56, 10, 95, "Puddle Wipe", IN, TWO, ["water", "a towel", "two forks"],
    "A practical joke for good sports in casual clothes. It’s better unspoiled.",
    { hook: "The setup is on page 95." }),
  act(57, 10, 96, "Stage an Event", BOTH, CROWD,
    ["a team of people", "all the goodies to make a party"],
    "Plan a neighborhood event with the kids as committee chairs: a croquet tournament, a chili feed, a hobby night, a Western barbecue."),

  // ── 11 · Workshop Projects ─────────────────────────────────
  act(58, 11, 98, "Feed the Birds", BOTH, SOLO,
    ["a plastic gallon milk jug", "scissors", "a hammer and a nail", "string", "birdseed"],
    "Turn a milk jug into a bird feeder, hang it from a branch, and watch for visitors.",
    { help: "tools" }),
  act(59, 11, 99, "Jumping Nails", IN, SOLO,
    ["a 6-inch square board", "a drill", "32 nails"],
    "A board of upright nails to jump one over another until only one is left standing.",
    { help: "tools" }),
  act(60, 11, 100, "Bull Roarer", OUT, SOLO,
    ["pieces of wood", "sandpaper", "strong cord", "a drill"],
    "Spin a thin slab of wood on a cord and it roars. Change the wood and the cord to change the sound.",
    { help: "tools" }),
  act(61, 11, 101, "Musical Stuff", IN, SOLO_TWO,
    ["bottle caps", "paper plates", "a paper punch", "rubber cement", "a hammer and nail", "a big needle", "string", "a comb and tissue paper"],
    "A bottle-cap tambourine and a comb-and-tissue-paper buzzer: enough for a two-person band.",
    { help: "tools" }),
  act(62, 11, 102, "Easy Stilts", OUT, SOLO,
    ["two matching 5-pound coffee cans", "nylon rope"],
    "Stand on two coffee cans and walk by pulling up on the ropes. Tall enough to be a character in a play.",
    { help: "tools" }),
  act(63, 11, 103, "Bolas", OUT, SOLO,
    ["walnuts or horse chestnuts", "a drill", "heavy cord"],
    "A South American herding tool made from nuts and cord. Throw it at a small tree and watch it wrap.",
    { help: "tools" }),
  act(64, 11, 104, "Book Shelf for Kids", IN, SOLO_TWO,
    ["wood", "a workshop", "paint"],
    "A shelf with a slanted top that shows book covers face-up, so books actually get picked up. It’s a Montessori-style design, and kids can sand and paint.",
    { help: "tools" }),

  // ── 12 · Science Stuff ─────────────────────────────────────
  act(65, 12, 106, "Floating Eggs", IN, TWO, ["two matching glasses", "salt", "two raw eggs"],
    "Two glasses of water, two eggs: one sinks, one floats, and swapping the eggs changes nothing. Then you explain why."),
  act(66, 12, 107, "Sundial", OUT, SOLO,
    ["a square board, about 10–12 inches", "modeling clay", "a long pencil", "a black felt pen"],
    "Tell time by a pencil’s shadow on a board in the sun, and find out why it drifts out of true over the months."),
  act(67, 12, 108, "Temperature Charting", BOTH, SOLO,
    ["an outdoor thermometer", "paper and felt pens", "the chart on page 109"],
    "Check the thermometer at the same time every day and chart it. Over the weeks, the line goes up and down with the seasons.",
    { end: 109, days: true }),

  // ── 13 · Things to Do Outside ──────────────────────────────
  act(68, 13, 111, "Measuring Heights", OUT, TWO, ["a ruler", "a tape measure", "pencil and paper"],
    "Work out how tall a tree, a telephone pole or your own house is, using nothing but a ruler and shadows."),
  act(69, 13, 112, "Tennis Golf", OUT, CROWD, ["wood", "screws", "duct tape", "tennis balls"],
    "A neighborhood golf game with homemade clubs and a tennis ball. It comes with rules, and a cautionary true story about a window.",
    { help: "tools" }),
  act(70, 13, 113, "Clover Chains & Squawker", OUT, SOLO, ["clover", "string", "a wide blade of grass"],
    "Weave clover into chains, crowns and necklaces. Then blow through a blade of grass for a terrible honking noise.",
    { end: 114 }),
  act(71, 13, 115, "Trash Can Pitching", OUT, CROWD, ["snow (or tennis balls)", "a trash can", "kids"],
    "Throw snowballs into a trash can on its side. First to ten is the Trashlete.",
    {}),
  act(72, 13, 116, "Fox & Geese", OUT, CROWD, ["a big field of fresh snow (or a beach)", "4 or more kids"],
    "The old tag game, played on paths you trample into fresh snow or sand, with a safe spot in the middle."),

  // ── 14 · Costumes ──────────────────────────────────────────
  act(73, 14, 118, "Lion’s Tail", IN, SOLO, ["old jeans", "panty hose", "stuffing", "yarn"],
    "A stuffed lion’s tail that pokes out of the back of your jeans, with a loop on your wrist so you can swish it."),
  act(74, 14, 119, "Flower Baby", IN, SOLO, ["crepe paper", "an old T-shirt", "a stapler"],
    "A ring of petals around a small child’s face makes an instant flower costume."),
  act(75, 14, 120, "Pantry Hose", IN, SOLO,
    ["panty hose", "food boxes", "sunglasses", "a card for the label", "a black turtleneck"],
    "Fill a pair of panty hose with empty food boxes. The pun is the whole costume."),
  act(76, 14, 121, "Owl in a Tree", IN, SOLO_TWO,
    ["poster board", "felt pens", "sunglasses", "branches with leaves"],
    "Giant paper owl eyes on sunglasses and a head wrapped in leafy branches. Even better as a whole family of owls."),
  act(77, 14, 122, "Two-in-One", IN, TWO, ["a big pair of pants", "suspenders"],
    "Two kids, one very large pair of pants: a two-headed person who has to learn to walk together."),
  act(78, 14, 123, "Arrow Head", IN, TWO,
    ["¼-inch dowel, 18 inches long", "glue", "wood putty, joint filler or play dough", "white fabric", "safety pins"],
    "A silly arrow through the head, held in place by bandage-wrapped fabric.",
    { days: true }),
  act(79, 14, 124, "Mohawk", IN, TWO,
    ["a skull cap", "a crochet hook", "colored hair spray", "make-up"],
    "An outrageous, temporary mohawk with no permanent commitment, made from your own hair."),

  // ── 15 · Special Times ─────────────────────────────────────
  act(80, 15, 126, "Blown Eggs & Baubles", IN, SOLO,
    ["eggs", "a pin", "paints, glitter, ribbon", "a long needle"],
    "Empty an eggshell, then decorate it for Easter, or hang it on the Christmas tree."),
  act(81, 15, 127, "Championship Eggs", IN, CROWD, ["eggs", "felt pens", "egg dye"],
    "A family Easter-morning tradition: tap decorated eggs together until one is left uncracked. The winner gets to eat it.",
    { help: "stove" }),
  act(82, 15, 128, "Christmas Bird’s Nest", BOTH, SOLO, ["a bird’s nest", "paint", "teeny Christmas baubles"],
    "Find an abandoned nest on a fall walk, spray it gold and tuck it into the Christmas tree. Includes a salt-dough recipe for tiny eggs."),
  act(83, 15, 129, "Googley-Eyed Santa", IN, SOLO,
    ["red and white poster card", "white thread", "a felt pen"],
    "A hanging paper Santa whose eyes never quite line up, so he always seems to be moving."),
  act(84, 15, 130, "Merry Christmas Packages", IN, CROWD, ["presents", "wrapping paper and ribbon"],
    "Gather toys and outgrown clothes, fix them up and wrap them for a charity that’ll hand them out. Everyone has a job."),
  act(85, 15, 131, "Jack-O-Totem Pole", BOTH, SOLO_TWO,
    ["four pumpkins in graduated sizes", "a carving tool", "candles"],
    "Stack four carved pumpkins like a totem pole on the porch. The toasted pumpkin seeds are a bonus.",
    { help: "candles" }),

  // ── 16 · Artsy Things ──────────────────────────────────────
  act(86, 16, 133, "Sandcasting", OUT, SOLO,
    ["plaster of Paris", "a big coffee can", "a measuring cup", "a strip of heavy cardboard", "a paper clip"],
    "Press a footprint, or your name written backward, into wet sand and cast it in plaster."),
  act(87, 16, 134, "Mountain Tunnel", IN, SOLO,
    ["a big piece of heavy cardboard or board", "flour and water", "newspapers", "paints", "rocks, sand and twigs", "two tin cans", "masking tape", "glue"],
    "Papier-mâché a mountain over a tin-can tunnel, paint a road through it and drive your toy cars in.",
    { help: "tools", days: true }),
  act(88, 16, 135, "Shadow Portraits", IN, TWO, ["white paper", "black paper", "scissors", "tape"],
    "Trace a friend’s profile from its shadow on the wall, then cut it from black paper for a classic silhouette."),
  act(89, 16, 136, "Sandpainting", IN, SOLO,
    ["sand", "jars with lids", "food coloring or tempera paint", "white glue that dries clear", "a paint brush", "big cardboard"],
    "Color sand with food coloring (or beet water), then glue it down in layers for a desert-colored picture.",
    { end: 137, days: true }),
  act(90, 16, 138, "Zoom In", IN, SOLO, ["a ruler", "pencil and paper", "a ball-point pen", "a picture from the comics"],
    "Blow up your favorite comic-strip character to four times the size, one little square at a time."),
  act(91, 16, 139, "Bookends", IN, SOLO, ["colored sand", "two jars with lids"],
    "Layer colored sand in two jars until they look like the Painted Desert, then use them as bookends."),
  act(92, 16, 140, "Forever Flowers", BOTH, SOLO,
    ["flowers", "acrylic “glass”", "black electrical tape", "a paper clip"],
    "Press flowers, sandwich them between two squares of acrylic and hang them on the wall.",
    { help: "tools", days: true }),

  // ── 17 · Sew Easy ──────────────────────────────────────────
  act(93, 17, 142, "Popcorn Bags", IN, SOLO,
    ["fabric", "a sewing machine (or needle and thread)", "popcorn"],
    "Sew little felt hearts or other shapes and fill them with popcorn. They’re made for catching and throwing.",
    { help: "sewing machine" }),
  act(94, 17, 143, "Pompoms", IN, SOLO, ["your fingers", "yarn", "scissors", "cardboard", "eyes"],
    "Wind yarn around your fingers into fluffy pompoms for shoelaces, gifts and toys, or give one big feet and make a pompom gremlin."),
  act(95, 17, 144, "Shoulder Bag", IN, SOLO,
    ["¼ yard of felt", "heavy yarn", "matching thread", "a paper punch"],
    "A felt drawstring bag with a twisted-yarn shoulder strap. Make a few in different colors.",
    { help: "sewing machine" }),
  act(96, 17, 145, "Yo-Yo Pocket", IN, SOLO, ["fabric", "matching thread", "a needle"],
    "Gather little circles of fabric into puffs and stitch them together into a pocket for a T-shirt. Quilts have been made this way for 150 years."),

  // ── 18 · Silly Stuff ───────────────────────────────────────
  act(97, 18, 147, "Disembodied Finger", IN, SOLO, ["your fingers"],
    "Hold your two index fingers up in front of your eyes, look past them, and a funny floating finger appears."),
  act(98, 18, 148, "Mirror Writing", IN, SOLO, ["a mirror", "a big book", "paper and a pen"],
    "Try to write your name while looking only in the mirror. It’s much harder than it sounds."),
  act(99, 18, 149, "Cup Catcher", IN, SOLO_TWO, ["a Styrofoam cup", "string", "aluminum foil"],
    "A foil ball on a string and a cup: flip it up and catch it. Time a contest for the most catches in one minute."),
  act(100, 18, 150, "Broom Balance", OUT, SOLO, ["a broom", "space"],
    "Balance a broom upright on your palm. Try it outside until you get the hang of it.",
    { hook: secret(150) }),
  act(101, 18, 151, "Spin the Coin", IN, SOLO, ["a big coin", "two toothpicks"],
    "Pick a coin up with two toothpicks, blow it into a spin and try to beat your own record."),
];

/** The URL slug for an activity's own page: /activities/<slug>.
    "Coyotes & Turkey Buzzard" -> "coyotes-and-turkey-buzzard",
    "It’s Always 3 or 4" -> "its-always-3-or-4". Uniqueness is enforced by
    scripts/check-activities.mjs. Changing a name changes its URL, so
    prefer not to once the site is live. */
export function slugOf(a: Activity): string {
  return a.name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ── Curated sets — all DRAFT, all ours ─────────────────────────── */

/** The free checklist, the sticker chart and the Swap chips.
    Picked for: a kid can run it, everyday materials, any season. */
export const TEN_TO_START: string[] = [
  "01", "13", "14", "33", "34", "37", "44", "48", "88", "99",
];

/** The six spreads Peek Inside shows once Wanda approves them: two facing
    pages each, left page even, as they sit in the printed book. (The pages
    are landscape, so the site lays a spread out side by side from tablet
    width up and stacks the two pages on a phone — side by side at phone
    width, each page would be about 120px tall.)

    Chosen to give little away: no page is a trick or puzzle page, and
    scripts/check-activities.mjs rejects any whose hook points at a secret
    or a solution. One caveat, flagged for Wanda in DRAFT_CONTENT.md: pages
    74 and 75 (Pig Latin, Hog Latin) each print the answer to a small
    decoding exercise, upside-down in the corner. scripts/render-spreads.py
    reads this list for the pages to render, so this is the one place the
    choice lives. */
export type PeekPage = { page: number; activity: string };
export type PeekSpread = { left: PeekPage; right: PeekPage };

export const PEEK_SPREADS: PeekSpread[] = [
  { left: { page: 38, activity: "09" }, right: { page: 39, activity: "10" } },
  { left: { page: 46, activity: "14" }, right: { page: 47, activity: "15" } },
  { left: { page: 68, activity: "33" }, right: { page: 69, activity: "34" } },
  { left: { page: 74, activity: "37" }, right: { page: 75, activity: "38" } },
  { left: { page: 118, activity: "73" }, right: { page: 119, activity: "74" } },
  { left: { page: 120, activity: "75" }, right: { page: 121, activity: "76" } },
];

/** Every page in PEEK_SPREADS, in order. */
export const PEEK_PAGES: PeekPage[] = PEEK_SPREADS.flatMap((s) => [s.left, s.right]);

/** Pages offered as a free printable (the no-email download), gated
    exactly like the spreads. The book itself says to copy these: the
    Thieves in the Henhouse boards ("copies of next 2 pages", p. 41) and
    the weather chart ("make 12 copies", p. 108). The Thieves pages ARE a
    game's board — the one deliberate exception to "never give away a
    board", and only with Wanda's OK. */
export type BookPrintable = { id: string; title: string; activity: string; pages: number[] };

export const BOOK_PRINTABLES: BookPrintable[] = [
  { id: "thieves-in-the-henhouse", title: "Thieves in the Henhouse game boards", activity: "12", pages: [42, 43] },
  { id: "weather-chart", title: "The month-long weather chart", activity: "67", pages: [109] },
];

/** Never dealt by the Boredom Button. Puddle Wipe is a prank on a
    nominated victim, and a random card handed to a kid shouldn't be. */
export const DECK_EXCLUDE: string[] = ["56"];

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const MONTH_NAMES: Record<Month, string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

/** What the book suggests for this time of year. The picks are ours. */
export const MONTHLY: Record<Month, { line: string; picks: string[] }> = {
  1: { line: "Snow days and long evenings.", picks: ["71", "72", "67", "05"] },
  2: { line: "Short days, warm kitchen.", picks: ["28", "27", "34", "22"] },
  3: { line: "Nearly spring.", picks: ["06", "07", "58", "68"] },
  4: { line: "Easter, and the first planting.", picks: ["81", "80", "07", "08"] },
  5: { line: "Out the door.", picks: ["08", "69", "70", "62"] },
  6: { line: "Long light, long afternoons.", picks: ["66", "68", "69", "63"] },
  7: { line: "Beach and backyard.", picks: ["86", "24", "89", "100"] },
  8: { line: "The last of summer.", picks: ["52", "50", "51", "60"] },
  9: { line: "Back to school.", picks: ["64", "23", "22", "20"] },
  10: { line: "Costume season.", picks: ["85", "76", "75", "77"] },
  11: { line: "Gathering and giving.", picks: ["57", "84", "82", "53"] },
  12: { line: "The holiday season.", picks: ["83", "84", "80", "82"] },
};
