var score = 0;
var eventListenerAdded = false;
var numDivs = 2;


if (localStorage.getItem("createdHighScoreItems") == null) {
  localStorage.setItem("createdHighScoreItems", true);
  console.log("Local Storage scores created")
  localStorage.setItem("highScoreEasy", 0);
  localStorage.setItem("highScoreMedium", 0);
  localStorage.setItem("highScoreHard", 0);
}
var highScores = {
  Easy: localStorage.getItem("highScoreEasy"),
  Medium: localStorage.getItem("highScoreMedium"),
  Hard: localStorage.getItem("highScoreHard"),
};

function updateHighScore(score, difficultyName, alert) {
  console.log(`Comparing score ${score} to high score for ${difficultyName}: ${highScores[difficultyName]}`);
  if (score > highScores[difficultyName]) {
    console.log(`Attempting to set highScore ${difficultyName.charAt(0).toUpperCase() + difficultyName.slice(1)} to ${score}`);
    localStorage.setItem(
      `highScore${difficultyName}`,
      score
    );

    document.getElementById("highScoreCounter").textContent = `High Score: ${localStorage.getItem("highScore" + difficultyName)}`;

    if (alert === true) {
      window.alert(`New high score: ${score} on ${difficultyName} difficulty!`);
    } 
  }
}

function handleCorrectDotClick(greenTime,animationDuration, difficultyName) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => dot.remove());
  score++;
  console.log("Score:", score);
  numDivs++;
  startRound(greenTime,animationDuration,difficultyName);
  console.log(`Updating high score with score: ${score} and difficulty: ${difficultyName}`);
  updateHighScore(score, difficultyName, false);
}

function handleIncorrectDotClick(difficultyName) {
    console.log("Wrong dot!");
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => {
        dot.style.backgroundColor = "red";
    });
    updateHighScore(score, difficultyName, true);
    alert(`Score: ${score}
Difficulty: ${difficultyName}`);
    dots.forEach((dots) => dots.remove());

    numDivs = 2;
    score = 0;
    const hideOnStart = document.querySelectorAll(".hideOnStart");
  hideOnStart.forEach((element) => {
    element.style.display = "";
  });

}

function clearHighScores() {
  localStorage.setItem("highScoreEasy", 0);
  localStorage.setItem("highScoreMedium", 0);
  localStorage.setItem("highScoreHard", 0);
  alert("High scores cleared!");
}

function startRound(greenTime,animationDuration, difficultyName) {
  console.log(`Showing green for ${greenTime} ms and animating for ${animationDuration} sec`);
  const hideOnStart = document.querySelectorAll(".hideOnStart");
  hideOnStart.forEach((element) => {
    element.style.display = "none";
  });

  const dotCounter = document.getElementById("dotCounter");
  const scoreCounter = document.getElementById("scoreCounter");
  const highScoreCounter = document.getElementById("highScoreCounter");

  dotCounter.textContent = `Dots: ${numDivs}`;
  scoreCounter.textContent = `Score: ${score}`;
  highScoreCounter.textContent = `High Score: ${highScores[difficultyName]}`;


  let greenDotIndex = -1;

  for (let i = 0; i < numDivs; i++) {
       console.log(`Added and positioned dot ${i}`)

    const div = document.createElement("div");
    div.classList.add("dot");

    let x = Math.floor(Math.random() * (window.innerWidth / 2));
    let y = Math.floor(Math.random() * (window.innerHeight / 2));
    console.log(x, y);

    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    
    document.body.appendChild(div);

    var showCursor = false

    if (greenDotIndex === -1) {
      greenDotIndex = Math.floor(Math.random() * numDivs);
    }

    if (i === greenDotIndex) {
      setTimeout(() => {
        div.style.backgroundColor = "#67F502";
        div.classList.add("green-dot");
        setTimeout(() => {
          div.style.backgroundColor = "black";

          const divs = document.querySelectorAll(".dot");
          let animationCount = 0;

          for (let i = 0; i < numDivs; i++) {
            console.log(`middle loop iteration: ${i}`)
            console.log(`l < numDivs: ${i < numDivs}`)
            const div = divs[i];

            for (let j = 0; j < numDivs; j++) {
              console.log(`animating dot ${j}`)

              setTimeout(() => {
                  document.body.style.cursor = "none"; // Hide cursor
                gsap.to(div, {
                  duration: animationDuration,
                  x: Math.floor(Math.random() * (window.innerWidth / 2)),
                  y: Math.floor(Math.random() * (window.innerHeight / 2)),
                  delay: i * 0.1,
                  ease: "power2.inOut",
                  onUpdate: () => {
                    // Ensure the dot is within the viewport
                    div.style.left = Math.max(
                      0,
                      Math.min(
                        div.offsetLeft,
                        window.innerWidth - div.offsetWidth
                      )
                    );
                    div.style.top = Math.max(
                      0,
                      Math.min(
                        div.offsetTop,
                        window.innerHeight - div.offsetHeight
                      )
                    );
                  },
                  onComplete: () => {
                    animationCount++;
                    if (animationCount === numDivs * numDivs) {
                      document.body.style.cursor = "auto"; // Unhide cursor
                    }
                  },
                });
              }, 800 * j);
            }
          }
        }, greenTime);
      }, 1000);
    }

  if (!eventListenerAdded) {
    eventListenerAdded = true;
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("green-dot")) {
        handleCorrectDotClick(greenTime,animationDuration,difficultyName);
      } else if (event.target.classList.contains("ignoreClickEvents")) {
      } else {
        handleIncorrectDotClick(difficultyName);
      }
    });
  }}}