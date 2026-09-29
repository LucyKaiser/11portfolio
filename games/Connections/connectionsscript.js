import Game from "./game.js";

let id = window.location.href;
id = id.split("?id=").pop();
console.log("id ==> ", id);

console.log(
  "%cNO CHEATING!",
  "color: red; font-size: 32px; font-weight: bold;",
);

//  /$$   /$$  /$$$$$$         /$$$$$$  /$$   /$$ /$$$$$$$$  /$$$$$$  /$$$$$$$$ /$$$$$$ /$$   /$$  /$$$$$$  /$$
// | $$$ | $$ /$$__  $$       /$$__  $$| $$  | $$| $$_____/ /$$__  $$|__  $$__/|_  $$_/| $$$ | $$ /$$__  $$| $$
// | $$$$| $$| $$  \ $$      | $$  \__/| $$  | $$| $$      | $$  \ $$   | $$     | $$  | $$$$| $$| $$  \__/| $$
// | $$ $$ $$| $$  | $$      | $$      | $$$$$$$$| $$$$$   | $$$$$$$$   | $$     | $$  | $$ $$ $$| $$ /$$$$| $$
// | $$  $$$$| $$  | $$      | $$      | $$__  $$| $$__/   | $$__  $$   | $$     | $$  | $$  $$$$| $$|_  $$|__/
// | $$\  $$$| $$  | $$      | $$    $$| $$  | $$| $$      | $$  | $$   | $$     | $$  | $$\  $$$| $$  \ $$
// | $$ \  $$|  $$$$$$/      |  $$$$$$/| $$  | $$| $$$$$$$$| $$  | $$   | $$    /$$$$$$| $$ \  $$|  $$$$$$/ /$$
// |__/  \__/ \______/        \______/ |__/  |__/|________/|__/  |__/   |__/   |______/|__/  \__/ \______/ |__/

const puzzleListObject = {
  1: {
    name: "Stem Staff",
    author: "Lucy",
    difficulty: "3",
    initialBoardState: {
      r1c1: "WILLIAMS",
      r2c1: "HA",
      r3c1: "CURRAN",
      r4c1: "ROBINSON",
      r1c2: "JACOB",
      r2c2: "SEARS",
      r3c2: "POTTS",
      r4c2: "PAUL",
      r1c3: "HARRIS",
      r2c3: "BONE",
      r3c3: "CARTER",
      r4c3: "BHANDARI",
      r1c4: "SHORES",
      r2c4: "HILL",
      r3c4: "FISHER",
      r4c4: "CHEN",
    },
    solutionGroups: {
      yellow: {
        yellow1: "CURRAN",
        yellow2: "FISHER",
        yellow3: "HA",
        yellow4: "SEARS",
      },
      yellowDescription: "ADMINISTRATORS",
      green: {
        green1: "BHANDARI",
        green2: "CHEN",
        green3: "HARRIS",
        green4: "ROBINSON",
      },
      greenDescription: "LANGUAGE TEACHERS",
      blue: { blue1: "BONE", blue2: "HILL", blue3: "POTTS", blue4: "SHORES" },
      blueDescription: "LAST NAMES THAT ARE ALSO NOUNS",
      purple: {
        purple1: "CARTER",
        purple2: "JACOB",
        purple3: "PAUL",
        purple4: "WILLIAMS",
      },
      purpleDescription: "LAST NAMES THAT COULD BE FIRST NAMES",
    },
  },
  2: {
    name: "1, 2, 3, ...",
    author: "Lucy",
    difficulty: "2",
    initialBoardState: {
      r1c1: "STEVE",
      r2c1: "NOTEPAD",
      r3c1: "PRUIM",
      r4c1: "MAIN",
      r1c2: "MARK",
      r2c2: "BODY",
      r3c2: "CALCULATOR",
      r4c2: "AGENT",
      r1c3: "MARIO",
      r2c3: "HALLOWEEN",
      r3c3: "HEAD",
      r4c3: "CORTANA",
      r1c4: "LINK",
      r2c4: "CHRISTMAS",
      r3c4: "VALENTINES",
      r4c4: "FILE EXPLORER",
    },
    solutionGroups: {
      yellow: {
        yellow1: "CALCULATOR",
        yellow2: "CORTANA",
        yellow3: "FILE EXPLORER",
        yellow4: "NOTEPAD",
      },
      yellowDescription: "PRE INSTALLED WINDOWS APPS",
      green: { green1: "BODY", green2: "HEAD", green3: "MAIN", green4: "MARK" },
      greenDescription: "HTML TAGS",
      blue: {
        blue1: "CHRISTMAS",
        blue2: "HALLOWEEN",
        blue3: "PRUIM",
        blue4: "VALENTINES",
      },
      blueDescription: "HOLIDAYS",
      purple: {
        purple1: "AGENT",
        purple2: "LINK",
        purple3: "MARIO",
        purple4: "STEVE",
      },
      purpleDescription: "FAMOUS VIDEO GAME CHARACTERS",
    },
  },
  3: {
    name: "5 in a Category?",
    author: "lucy",
    difficulty: "4",
    initialBoardState: {
      r1c1: "NARRATOR",
      r2c1: "GUPPY",
      r3c1: "SURGEI",
      r4c1: "BITES",
      r1c2: "CHEKOV",
      r2c2: "CATFISH",
      r3c2: "GERMAN",
      r4c2: "DROPOUT",
      r1c3: "MAAD",
      r2c3: "SALMON",
      r3c3: "MUSLIM",
      r4c3: "TROUT",
      r1c4: "HERRING",
      r2c4: "CARTER",
      r3c4: "IGOR",
      r4c4: "CLIFF",
    },
    solutionGroups: {
      yellow: {
        yellow1: "CATFISH",
        yellow2: "GUPPY",
        yellow3: "SALMON",
        yellow4: "TROUT",
      },
      yellowDescription: "FRESHWATER FISH",
      green: {
        green1: "BITES",
        green2: "CARTER",
        green3: "DROPOUT",
        green4: "MAAD",
      },
      greenDescription: "PARTS OF GRAMMY NOMINATED RAP ALBUMS",
      blue: {
        blue1: "CHEKOV",
        blue2: "CLIFF",
        blue3: "HERRING",
        blue4: "NARRATOR",
      },
      blueDescription: "LITERARY DEVICES MISSING A WORD",
      purple: {
        purple1: "GERMAN",
        purple2: "IGOR",
        purple3: "MUSLIM",
        purple4: "SURGEI",
      },
      purpleDescription: "FIRST NAMES OF RUSSIAN POLITICIANS ",
    },
  },
  4: {
    name: "Pandemonium",
    author: "Lucy and Viv",
    difficulty: "4",
    initialBoardState: {
      r1c1: "LUMBER",
      r2c1: "TRUE LOVE",
      r3c1: "HERSHEY",
      r4c1: "SCHOOL",
      r1c2: "FRENCH",
      r2c2: "FUJI",
      r3c2: "GAGGLE",
      r4c2: "MURDER",
      r1c3: "TIP",
      r2c3: "SHUN",
      r3c3: "FIREARM",
      r4c3: "PRIDE",
      r1c4: "HONEYCRISP",
      r2c4: "ENVY",
      r3c4: "DEATH",
      r4c4: "GALA",
    },
    solutionGroups: {
      yellow: {
        yellow1: "GAGGLE",
        yellow2: "MURDER",
        yellow3: "SCHOOL",
        yellow4: "PRIDE",
      },
      yellowDescription: "ANIMAL GROUPS",
      green: {
        green1: "GALA",
        green2: "ENVY",
        green3: "FUJI",
        green4: "HONEYCRISP",
      },
      greenDescription: "TYPES OF APPLES",
      blue: {
        blue1: "FRENCH",
        blue2: "TRUE LOVE",
        blue3: "HERSHEY",
        blue4: "DEATH",
      },
      blueDescription: "TYPES OF KISSES",
      purple: {
        purple1: "FIREARM",
        purple2: "LUMBER",
        purple3: "SHUN",
        purple4: "TIP",
      },
      purpleDescription: "BODY PARTS WITH A LETTER CHANGED",
    },
  },
  5: {
    name: "Don't Rush It",
    author: "Lucy",
    difficulty: "1",
    initialBoardState: {
      r1c1: "SUPERMAN",
      r2c1: "DEADPOOL",
      r3c1: "LETTER",
      r4c1: "WOLVERINE",
      r1c2: "BIRD",
      r2c2: "BIC",
      r3c2: "HULK",
      r4c2: "NOVEL",
      r1c3: "PILOT",
      r2c3: "ESSAY",
      r3c3: "FLIES",
      r4c3: "SHARPIE",
      r1c4: "PAPERMATE",
      r2c4: "PLANE",
      r3c4: "CAPTAIN AMERICA",
      r4c4: "POEM",
    },
    solutionGroups: {
      yellow: {
        yellow1: "HULK",
        yellow2: "WOLVERINE",
        yellow3: "CAPTAIN AMERICA",
        yellow4: "DEADPOOL",
      },
      yellowDescription: "MARVEL SUPERHEROS",
      green: {
        green1: "POEM",
        green2: "ESSAY",
        green3: "LETTER",
        green4: "NOVEL",
      },
      greenDescription: "TYPES OF WRITING",
      blue: {
        blue1: "BIRD",
        blue2: "PLANE",
        blue3: "FLIES",
        blue4: "SUPERMAN",
      },
      blueDescription: "THINGS THAT FLY",
      purple: {
        purple1: "PILOT",
        purple2: "BIC",
        purple3: "SHARPIE",
        purple4: "PAPERMATE",
      },
      purpleDescription: "PEN BRANDS",
    },
  },
  6: {
    name: "Number 6",
    author: "Lucy",
    difficulty: "2",
    initialBoardState: {
      r1c1: "5.2",
      r2c1: "31",
      r3c1: "4",
      r4c1: "25",
      r1c2: "2.6",
      r2c2: "41.01",
      r3c2: "2",
      r4c2: "49",
      r1c3: "89",
      r2c3: "100",
      r3c3: "1.8",
      r4c3: "8",
      r1c4: "43",
      r2c4: "36",
      r3c4: "6",
      r4c4: "13",
    },
    solutionGroups: {
      yellow: { yellow1: "2", yellow2: "4", yellow3: "6", yellow4: "8" },
      yellowDescription: "FIRST 4 EVEN NUMBERS",
      green: { green1: "25", green2: "36", green3: "49", green4: "100" },
      greenDescription: "PERFECT SQUARES",
      blue: { blue1: "5.2", blue2: "1.8", blue3: "41.01", blue4: "2.6" },
      blueDescription: "DECIMALS",
      purple: { purple1: "31", purple2: "43", purple3: "13", purple4: "89" },
      purpleDescription: "PRIME NUMBERS",
    },
  },
  7: {
    name: "Morning Routine",
    author: "Lucy",
    difficulty: "3",
    initialBoardState: {
      r1c1: "MAKE UP",
      r2c1: "SET",
      r3c1: "CONCEAL",
      r4c1: "GLOSS",
      r1c2: "JEWELRY",
      r2c2: "PAINT",
      r3c2: "VEIL",
      r4c2: "MASK",
      r1c3: "BURY",
      r2c3: "FABRICATE",
      r3c3: "BASEBALL",
      r4c3: "SMOOTH",
      r1c4: "LIE",
      r2c4: "DECK",
      r3c4: "MATTE",
      r4c4: "FIB",
    },
    solutionGroups: {
      yellow: {
        yellow1: "MAKE UP",
        yellow2: "FABRICATE",
        yellow3: "FIB",
        yellow4: "LIE",
      },
      yellowDescription: "NOT TRUE",
      green: {
        green1: "CONCEAL",
        green2: "BURY",
        green3: "VEIL",
        green4: "MASK",
      },
      greenDescription: "HIDE",
      blue: { blue1: "GLOSS", blue2: "MATTE", blue3: "PAINT", blue4: "SMOOTH" },
      blueDescription: "SURFACE FINISHES",
      purple: {
        purple1: "SET",
        purple2: "DECK",
        purple3: "BASEBALL",
        purple4: "JEWELRY",
      },
      purpleDescription: "FEATURING DIAMONDS",
    },
  },
  8: {
    name: "My",
    author: "Lucy",
    difficulty: "1",
    initialBoardState: {
      r1c1: "BEAUTIFUL",
      r2c1: "DARK",
      r3c1: "TWISTED",
      r4c1: "FANTASY",
      r1c2: "LIGHT",
      r2c2: "ATTRACTIVE",
      r3c2: "ASH",
      r4c2: "CUTE",
      r1c3: "MIDDLE",
      r2c3: "ROTATE",
      r3c3: "SCI-FI",
      r4c3: "SKEW",
      r1c4: "MYSTERY",
      r2c4: "PRETTY",
      r3c4: "SCALE",
      r4c4: "REALISTIC",
    },
    solutionGroups: {
      yellow: {
        yellow1: "BEAUTIFUL",
        yellow2: "CUTE",
        yellow3: "PRETTY",
        yellow4: "ATTRACTIVE",
      },
      yellowDescription: "BEAUTY",
      green: {
        green1: "DARK",
        green2: "LIGHT",
        green3: "MIDDLE",
        green4: "ASH",
      },
      greenDescription: "'____ GRAY'",
      blue: {
        blue1: "TWISTED",
        blue2: "ROTATE",
        blue3: "SKEW",
        blue4: "SCALE",
      },
      blueDescription: "GEOMETRICAL TRANSLATIONS",
      purple: {
        purple1: "FANTASY",
        purple2: "SCI-FI",
        purple3: "MYSTERY",
        purple4: "REALISTIC",
      },
      purpleDescription: "TYPES OF FICTION",
    },
  },
  9: {
    name: "Don't Scratch",
    author: "Lucy and Viv",
    difficulty: "4",
    initialBoardState: {
      r1c1: "EIGHT",
      r2c1: "BALL",
      r3c1: "POOL",
      r4c1: "BAR",
      r1c2: "TRIANGLE",
      r2c2: "NO",
      r3c2: "SCHOOL",
      r4c2: "HOURGLASS",
      r1c3: "NEGATIVE",
      r2c3: "FATHER",
      r3c3: "SQUARE",
      r4c3: "PENTAGON",
      r1c4: "NAY",
      r2c4: "CIRCLE",
      r3c4: "NEIN",
      r4c4: "HIDDEN",
    },
    solutionGroups: {
      yellow: {
        yellow1: "PENTAGON",
        yellow2: "SQUARE",
        yellow3: "TRIANGLE",
        yellow4: "CIRCLE",
      },
      yellowDescription: "2D SHAPES",
      green: {
        green1: "POOL",
        green2: "BAR",
        green3: "SCHOOL",
        green4: "BALL",
      },
      greenDescription: "SOCIAL PLACES",
      blue: { blue1: "NEIN", blue2: "NO", blue3: "NEGATIVE", blue4: "NAY" },
      blueDescription: "WAYS TO SAY NO",
      purple: {
        purple1: "EIGHT",
        purple2: "FATHER",
        purple3: "HOURGLASS",
        purple4: "HIDDEN",
      },
      purpleDescription: "FIGURES",
    },
  },
  10: {
    name: "Trivia Night",
    author: "Lucy, Marek, and Derek",
    difficulty: "5",
    initialBoardState: {
      r1c1: "ENAMEL",
      r2c1: "LOCATION",
      r3c1: "ELEPHANT",
      r4c1: "BOARD",
      r1c2: "TOUCH",
      r2c2: "LUCKY",
      r3c2: "HARD",
      r4c2: "BUFFONT",
      r1c3: "CASE",
      r2c3: "CONTACT",
      r3c3: "SPEECH",
      r4c3: "MOTHERBOARD",
      r1c4: "POWER",
      r2c4: "PEAR",
      r3c4: "CANTALOUPE",
      r4c4: "FAT",
    },
    solutionGroups: {
      yellow: {
        yellow1: "MOTHERBOARD",
        yellow2: "LUCKY",
        yellow3: "TOUCH",
        yellow4: "CONTACT",
      },
      yellowDescription: "DAFT PUNK SONGS",
      green: {
        green1: "HARD",
        green2: "POWER",
        green3: "BOARD",
        green4: "CASE",
      },
      greenDescription: "PC PARTS MINUS A WORD",
      blue: {
        blue1: "ELEPHANT",
        blue2: "LOCATION",
        blue3: "SPEECH",
        blue4: "BUFFONT",
      },
      blueDescription: "WHAT 'ADDRESS' MIGHT REFER TO",
      purple: {
        purple1: "CANTALOUPE",
        purple2: "FAT",
        purple3: "PEAR",
        purple4: "ENAMEL",
      },
      purpleDescription: "SOUNDS WITH ENDANGERED SPECIES",
    },
  },
  11: {
    name: "🟨🟦🟩🟪",
    author: "Lucy and Viv",
    difficulty: "2",
    initialBoardState: {
      r1c1: "🐔",
      r2c1: "💉",
      r3c1: "☔",
      r4c1: "🌗",
      r1c2: "🧑‍🌾",
      r2c2: "🐳",
      r3c2: "🌾",
      r4c2: "🕯️",
      r1c3: "🧬",
      r2c3: "🕛",
      r3c3: "🚜",
      r4c3: "💧",
      r1c4: "🚣",
      r2c4: "🧑‍⚕️",
      r3c4: "🦠",
      r4c4: "📆",
    },
    solutionGroups: {
      yellow: { yellow1: "🚣", yellow2: "💧", yellow3: "☔", yellow4: "🐳" },
      yellowDescription: "FEATURING WATER",
      green: { green1: "🧬", green2: "🦠", green3: "🧑‍⚕️", green4: "💉" },
      greenDescription: "BIOLOGY TOPICS THIS YEAR",
      blue: { blue1: "🌗", blue2: "🕯️", blue3: "🕛", blue4: "📆" },
      blueDescription: "USED TO TELL TIME",
      purple: { purple1: "🌾", purple2: "🐔", purple3: "🧑‍🌾", purple4: "🚜" },
      purpleDescription: "THINGS ON A FARM",
    },
  },
  12: {
    name: "Involving ___",
    author: "Lucy",
    difficulty: "4",
    initialBoardState: {
      r1c1: "BENCH",
      r2c1: "SOCCER",
      r3c1: "ALGEBRA",
      r4c1: "TEA",
      r1c2: "MYSTIC TIMBERS",
      r2c2: "COMPUTER",
      r3c2: "MARBLES",
      r4c2: "TREE",
      r1c3: "DIAMONDBACK",
      r2c3: "POOL",
      r3c3: "BASKETBALL",
      r4c3: "TAX",
      r1c4: "PAPER",
      r2c4: "LIFE",
      r3c4: "RAIN",
      r4c4: "TIME",
    },
    solutionGroups: {
      yellow: {
        yellow1: "SOCCER",
        yellow2: "POOL",
        yellow3: "BASKETBALL",
        yellow4: "MARBLES",
      },
      yellowDescription: "INVOLVING BALLS",
      green: {
        green1: "BENCH",
        green2: "TREE",
        green3: "MYSTIC TIMBERS",
        green4: "PAPER",
      },
      greenDescription: "INVOLVING WOOD",
      blue: {
        blue1: "ALGEBRA",
        blue2: "TAX",
        blue3: "TIME",
        blue4: "COMPUTER",
      },
      blueDescription: "INVOLVING NUMBERS",
      purple: {
        purple1: "TEA",
        purple2: "RAIN",
        purple3: "DIAMONDBACK",
        purple4: "LIFE",
      },
      purpleDescription: "INVOLVING WATER",
    },
  },
  13: {
    name: "The Lion King",
    author: "Lucy, Marek",
    difficulty: "3",
    initialBoardState: {
      r1c1: "SCAR",
      r2c1: "GLASSES",
      r3c1: "EYESTRAIN",
      r4c1: "EXCEL",
      r1c2: "STOP",
      r2c2: "PLUS",
      r3c2: "FIRST",
      r4c2: "CAMERA",
      r1c3: "WINDOW",
      r2c3: "SUCCEED",
      r3c3: "GRADUATED CYLINDER",
      r4c3: "HYDROPLANE",
      r1c4: "HOLLYWOOD",
      r2c4: "BOARDWALK",
      r3c4: "SURPASS",
      r4c4: "PEACE",
    },
    solutionGroups: {
      yellow: {
        yellow1: "EXCEL",
        yellow2: "SUCCEED",
        yellow3: "SURPASS",
        yellow4: "FIRST",
      },
      yellowDescription: "DO GOOD",
      green: {
        green1: "HOLLYWOOD",
        green2: "STOP",
        green3: "PLUS",
        green4: "PEACE",
      },
      greenDescription: "____ SIGN",
      blue: {
        blue1: "GLASSES",
        blue2: "WINDOW",
        blue3: "CAMERA",
        blue4: "GRADUATED CYLINDER",
      },
      blueDescription: "FEATURING GLASS",
      purple: {
        purple1: "SCAR",
        purple2: "BOARDWALK",
        purple3: "EYESTRAIN",
        purple4: "HYDROPLANE",
      },
      purpleDescription: "ENDING IN MODES OF TRANSPORT",
    },
  },
};

window.currentGame = null;

function initializeGame(id) {
  let gameConfig = puzzleListObject[id];
  window.currentGame = new Game(
    gameConfig.name,
    gameConfig.author,
    gameConfig.difficulty,
    gameConfig.initialBoardState,
    gameConfig.solutionGroups,
  );
  window.currentGame.initializeBoard();
}

// Source - https://stackoverflow.com/a/494348
// Posted by Crescent Fresh, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-08, License - CC BY-SA 4.0

function createElementFromHTML(htmlString) {
  var a = document.createElement("a");
  a.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return a.firstChild;
}

function setPuzzleList() {
  let wrapper = document.getElementById("listWrapper");
  for (let x = 1; x <= Object.keys(puzzleListObject).length; x++) {
    const templateString = `<a href="/game.html?id=[ID]" class="puzzleLink">[PUZZLENAME] by [PUZZLEAUTHOR] | Difficulty [DIFFICULTY]/5</a>`;
    let constructedString = templateString;
    constructedString = constructedString.replace("[ID]", x);
    constructedString = constructedString.replace(
      "[PUZZLENAME]",
      puzzleListObject[x].name,
    );
    constructedString = constructedString.replace(
      "[PUZZLEAUTHOR]",
      puzzleListObject[x].author,
    );
    constructedString = constructedString.replace(
      "[PUZZLENAME]",
      puzzleListObject[x].name,
    );
    constructedString = constructedString.replace(
      "[DIFFICULTY]",
      puzzleListObject[x].difficulty,
    );
    console.log(createElementFromHTML(constructedString));
    wrapper.appendChild(createElementFromHTML(constructedString));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeGame(id);
  } catch {}
  if (document.getElementById("listWrapper")) {
    setPuzzleList();
    twemoji.parse(document.body);
  }
});

// let game = new Game("Puzzle 1", "Lucy", {r1c1:"1", r2c1:"2", r3c1:"3", r4c1:"4",
//                                         r1c2:"5", r2c2:"6", r3c2:"7", r4c2:"8",
//                                         r1c3:"9", r2c3:"10", r3c3:"11", r4c3:"12",
//                                         r1c4:"13", r2c4:"14", r3c4:"15", r4c4:"16"},
//                                        {yellow:{yellow1:"1", yellow2:"2", yellow3:"3", yellow4:"4"},
//                                         green:{green1:"5", green2:"6", green3:"7", yellow4:"8"},
//                                         blue:{blue1:"9", blue2:"10", blue3:"11", blue4:"12"},
//                                         purple:{purple1:"13", purple2:"14", purple3:"15", purple4:"16"}})
