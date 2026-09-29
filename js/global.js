// This file is so I don't have to repeat this code in every JS file

// Fixes the GSAP not defined error
document.addEventListener("DOMContentLoaded", () => {
  function splitLastOccurrence(str, substring) {
    const lastIndex = str.lastIndexOf(substring);
  
    const before = str.slice(0, lastIndex);
  
    const after = str.slice(lastIndex + 1);
  
    return [before, after];
  }
  document.addEventListener("keyup", (e) => {
      keysArray.push(e.key)
      if (keysArray.length > 9){
          keysArray.shift()
      }
      console.log(e);
      // up up down down right left right left enter
      if (JSON.stringify(keysArray) == JSON.stringify(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'Enter'])) {
          window.location.href = "/games.html"
          const [before, after] = splitLastOccurrence(window.location.href, '/');
          window.location.href =  before + "/games.html"
      }
  })
  const isReduced =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  // For respecting prefers reduced motion preference; from here: https://natclark.com/tutorials/javascript-reduced-motion/

  // Only apply Lenis smooth scrolling if the user has not set prefers reduced motion to reduce
  if (isReduced === false) {
    // Wait for 100 ms to check so the canUseLenis variable can be defined in the page's JS file
    setTimeout(() => {
      if (canUseLenis !== null) {
        // From lenis docs: https://github.com/darkroomengineering/lenis?tab=readme-ov-file#gsap-scrolltrigger
        // Initializes a Lenis object that makes scrolling smoother
        const lenis = new Lenis(
          {
            duration: 1.5, // How long it takes to catch up with the actual scroll position
            wheelMultiplier: 1.3, // Makes the user scroll faster
            smooth: true,
          },
          100
        );

        lenis.on("scroll", (e) => {
          //   console.log(e) // Shows information about the current scrolling state
        });

        // lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
      }
    }, 100);
    // Check to see if page has waves footer
    const hasFooter = document.querySelector(".wave1");
    // If not, don't animate it
    if (hasFooter !== null) {
      // Random Durations for wave animations, get faster if the user is zoomed out more
      const wave1dur =
        gsap.utils.random(27, 30) /
        (window.innerWidth / (window.innerWidth / 2));
      const wave2dur =
        gsap.utils.random(24, 27) /
        (window.innerWidth / (window.innerWidth / 2));
      const wave3dur =
        gsap.utils.random(19, 21) /
        (window.innerWidth / (window.innerWidth / 2));
      const wave4dur =
        gsap.utils.random(16, 19) /
        (window.innerWidth / (window.innerWidth / 2));
      const wave5dur =
        gsap.utils.random(13, 16) /
        (window.innerWidth / (window.innerWidth / 2));

      // If the screen width times 2.5 minus 5000 is not a negative number, then make x 0, causing the waves to not animate
      var xAmount = -(5000 - window.innerWidth * 2.5);
      if (xAmount > 0) {
        xAmount = 0;
      }

      // Animate the waves, repeat forever, and yoyo (reverse) the animation on complete
      gsap.to(".wave1", {
        x: xAmount,
        duration: wave1dur,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
      gsap.to(".wave2", {
        x: xAmount,
        duration: wave2dur,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
      gsap.to(".wave3", {
        x: xAmount,
        duration: wave3dur,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
      gsap.to(".wave4", {
        x: xAmount,
        duration: wave4dur,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
      gsap.to(".wave5", {
        x: xAmount,
        duration: wave5dur,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    }
  }
  let keysArray = []
});
