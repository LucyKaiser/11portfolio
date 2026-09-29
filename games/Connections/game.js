export default class Game {
    puzzleName
    puzzleAuthor
    initialPuzzleStateObject = {r1c1:"", r2c1:"", r3c1:"", r4c1:"",
                               r1c2:"", r2c2:"", r3c2:"", r4c2:"",
                               r1c3:"", r2c3:"", r3c3:"", r4c3:"",
                               r1c4:"", r2c4:"", r3c4:"", r4c4:""}
    puzzleSolutionObject = {yellow:{yellow1:"", yellow2:"", yellow3:"", yellow4:""}, yellowDescription:"",
                           green:{green1:"", green2:"", green3:"", yellow4:""}, greenDescription:"",
                           blue:{blue1:"", blue2:"", blue3:"", blue4:""}, blueDescription:"",
                           purple:{purple1:"", purple2:"", purple3:"", purple4:""}, purpleDescription:""}
    maxGuessAmount = 4
    categoriesGuessed = 0
    difficulty
    guessHistory = []
    remainingValues

    constructor(puzzleName, puzzleAuthor, difficulty, initialPuzzleStateObject, puzzleSolutionObject) {
        this.puzzleName = puzzleName
        this.puzzleAuthor = puzzleAuthor
        this.initialPuzzleStateObject = initialPuzzleStateObject
        this.puzzleSolutionObject = puzzleSolutionObject
        this.difficulty = difficulty
        this.remainingValues = Object.values(this.initialPuzzleStateObject)
    }
    getNumberOfSelectedBlocks() {
        let totalCount = 0
        for (let x = 1; x <= 16; x++) {
            let currentDiv = document.getElementById(`div${x}`)
            if (currentDiv.classList.contains("selected")) {
                totalCount += 1
            }
        }
        return totalCount
    }
    initializeBoard() {
        let puzzleTitle = document.getElementById("puzzleTitle")
        let puzzleAuthor = document.getElementById("puzzleAuthor")
        puzzleTitle.innerText = this.puzzleName
        puzzleAuthor.innerText = this.puzzleAuthor
        let i = 1
        for (let key in this.initialPuzzleStateObject) {
            let currentDivName = `div${i}`
            // console.log(currentDivName);
            let currentDiv = document.getElementById(currentDivName)
            currentDiv.innerText = this.initialPuzzleStateObject[key]

            currentDiv.addEventListener("click", (e) => {
                let currentDiv = document.getElementById(currentDivName)

                if (currentDiv.classList.contains("selected")) {
                    currentDiv.classList.remove("selected")
                }

                else if (this.getNumberOfSelectedBlocks() < 4) {
                    currentDiv.classList.add("selected")
                }
            })

            i++
        }
        let button = document.getElementById("submitButton")
        button.addEventListener("click", () => {
            console.log(this.getNumberOfSelectedBlocks());
            if (this.getNumberOfSelectedBlocks() == 4) {
                this.submit()
            }
        })
        document.getElementById("clearAll").addEventListener("click", () => {
            this.removeSelected()
        })
    }
    getPathString(obj, value, currentPath = '') {
        for (const key in obj) {

            let newPath = currentPath
            ? (Array.isArray(obj) ? `${currentPath}[${key}]` : `${currentPath}.${key}`)
            : key;

            if (obj[key] === value) {
                return newPath;
            }

            if (typeof obj[key] === 'object' && obj[key] !== null) {
            const result = this.getPathString(obj[key], value, newPath);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }

    guessHistoryToString() {
        console.log("this.guessHistory ==> ", this.guessHistory);
        console.log("this.guessHistory.length ==> ", this.guessHistory.length);
        let answersString = ""
        console.log("typeof this.answerHistory ==> ", typeof this.answerHistory);
        for (let x = 0; x < this.guessHistory.length; x++) {
            if ((this.guessHistory[x]) == "NEWLINE") {
                answersString = answersString + "\n"
            } else {
                answersString = answersString + this.guessHistory[x]
            }
        }
        return answersString
    }

    removeSelected() {
        for (let x = 1; x <= 16; x++) {
            let currentDiv = document.getElementById(`div${x}`)
            if (currentDiv.classList.contains("selected")) {
                currentDiv.classList.remove("selected")
            }
        }
    }

    setCorrectlyGuessedCategory(color) {
        /*
        pseudocode:
        Get number of correct categories
        based on that number, determine if its 1st 2nd ...
        loop over items in the correct category and put them in the number category
        duplicate the initial puzzle state object and remove items from it that are in the selected category list
        loop through the rest of the blocks starting at 4*number of correct categories and set value to updated value list
        if 4 correct categories call win condition
        */
        let backgroundColorToSet = ""
        color == "yellow" ? backgroundColorToSet = "#f9df6d" : backgroundColorToSet
        color == "green" ? backgroundColorToSet = "#a0c35a" : backgroundColorToSet
        color == "blue" ? backgroundColorToSet = "#b0c4ef" : backgroundColorToSet
        color == "purple" ? backgroundColorToSet = "#ba81c5" : backgroundColorToSet
        console.log(`setting correct category to ${color}`);
        this.categoriesGuessed += 1
        let categoryBlock = document.getElementById(`categoryBlock${this.categoriesGuessed}`)
        console.log("categoryBlock ==> ", categoryBlock);
        let x = (4*(this.categoriesGuessed-1))+1
        // move correct selected boxes to highest avaiable row
        for (let key in this.puzzleSolutionObject[color]) {
            let currentDiv = document.getElementById(`div${x}`)
            currentDiv.innerText = this.puzzleSolutionObject[color][key]
            console.log("this.puzzleSolutionObject.yellow[key] ==> ", this.puzzleSolutionObject[color][key]);
            x++
        }
        let currentCategoryBlock = document.getElementById(`categoryBlock${this.categoriesGuessed}`)
        currentCategoryBlock.style.display = "flex"
        currentCategoryBlock.style.backgroundColor = backgroundColorToSet
        console.log(`${color}description`);
        document.getElementById(`categoryTitle${this.categoriesGuessed}`).innerText = this.puzzleSolutionObject[`${color}Description`]
        let valuesInCategory = ""
        for (let key3 in this.puzzleSolutionObject[color]) {
            valuesInCategory = valuesInCategory + this.puzzleSolutionObject[color][key3] + ", "
        }
        valuesInCategory = valuesInCategory.slice(0,-2)
        console.log("valuesInCategory ==> ", valuesInCategory);
        
        document.getElementById(`categoryItems${this.categoriesGuessed}`).innerText = valuesInCategory

        // remove values that were guessed from the remainingValues list
        for (let key in this.initialPuzzleStateObject) {
            for (let key2 in this.puzzleSolutionObject[color]) {
                if (this.initialPuzzleStateObject[key] == this.puzzleSolutionObject[color][key2]) {
                    let index = this.remainingValues.indexOf(this.puzzleSolutionObject[color][key2])
                    this.remainingValues.splice(index, 1)
                }
            }
        }
        // set the remaining blocks with the remaining values
        let i = 0
        console.log(`looping from ${(4*(this.categoriesGuessed-1))+1} to ${(4*this.categoriesGuessed)}`);
        for (let x = (4*(this.categoriesGuessed))+1; x <= 16; x++) {
            let currentDiv = document.getElementById(`div${x}`)
            currentDiv.innerText = this.remainingValues[i]
            console.log(`setting div ${x} to ${this.remainingValues[i]}`);
            i++
        }
        console.log(this.remainingValues);
        let remainingValues = this.remainingValues
        if (remainingValues.length == 0) {
            console.log("win");
            console.log(this.guessHistoryToString());
            document.getElementById("resultsWrapper").style.display = "flex"
            let resultsString = String(`"${this.puzzleName}" by ${this.puzzleAuthor} \n${this.guessHistoryToString()}`)
            console.log("resultsString ==> ", resultsString);
            document.getElementById("resultsText").innerText = this.guessHistoryToString()
            document.getElementById("copyResults").addEventListener("click", () => {
                navigator.clipboard.writeText(resultsString)
                document.getElementById("copyResults").innerText = "Copied!"
            })
        }
    }

    submit() {
        let submittedValues = []
        let guessPaths = []
        let guessColors = []
        for (let x = 1; x <= 16; x++) {
            let currentDiv = document.getElementById(`div${x}`)
            if (currentDiv.classList.contains("selected")) {
                submittedValues.push(currentDiv.innerText)
                guessPaths.push(this.getPathString(this.puzzleSolutionObject, currentDiv.innerText))
            }
        }
        console.log("guessPaths ==> ", guessPaths);
        console.log("submittedValues ==> ", submittedValues);
        for (let x = 0; x < 4; x++) {
            let text = guessPaths[x]
            text = text.split(".")[0]
            console.log("text ==> ", text);
            guessColors[x] = text
        }
        console.log("guessPaths ==> ", guessPaths);
        console.log("guessColors ==> ", guessColors);
        let numOfYellow = 0
        let numOfBlue = 0
        let numOfGreen = 0
        let numOfPurple = 0
        for (let x = 0; x < 4; x++) {
            switch (guessColors[x]) {
                case "yellow":
                    numOfYellow += 1
                    this.guessHistory.push("🟨")
                    break
                case "blue":
                    numOfBlue += 1
                    this.guessHistory.push("🟦")
                    break
                case "green":
                    numOfGreen += 1
                    this.guessHistory.push("🟩")
                    break
                case "purple":
                    numOfPurple += 1
                    this.guessHistory.push("🟪")
                    break
            }
        }
        this.guessHistory.push("NEWLINE")
        if (numOfYellow == 3 || numOfBlue == 3 || numOfGreen == 3 || numOfPurple == 3) {
            let alertText = document.getElementById("alert")
            alertText.style.display = "block"
            setTimeout(() => {
                alertText.style.display = "none"
            }, 2000);
        }
        else if (numOfYellow == 4) {
            this.setCorrectlyGuessedCategory("yellow")
            console.log("correct: yellow");
        }
        else if (numOfBlue == 4) {
            this.setCorrectlyGuessedCategory("blue")
            console.log("correct blue");
        }
        else if (numOfGreen == 4) {
            this.setCorrectlyGuessedCategory("green")
            console.log("correct green");
        }
        else if (numOfPurple == 4) {
            this.setCorrectlyGuessedCategory("purple")
            console.log("correct Purple");
        }
        else {
            let currentIncorrect = document.getElementById("incorrectCounter").innerText
            console.log("currentIncorrect ==> ", currentIncorrect);
            
            document.getElementById("incorrectCounter").innerText = Number(currentIncorrect) + 1
        }
        this.removeSelected()
    }
}