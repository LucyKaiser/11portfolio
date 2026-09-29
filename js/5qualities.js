// Code for the horizontal scrolling effect on my five qualities page
//
// This effect uses the GreenStock Animation Platform (GSAP)
// It basically works by animating the 5 quality elements to the right as the user scrolls down
//
// All code, unless otherwise noted, is written by me, with knowledge learned from the GSAP docs
// Gsap docs: https://gsap.com/docs/v3/
// ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

// Wait for the DOM to be fully loaded
// Fixes gsap throwing error "scrollWrapperWrapper not defined"
document.addEventListener("DOMContentLoaded", () => {
  // Set to true to indicate that the page can use smooth scrolling, if they do not have prefers reduced motion set to true
  const isReduced =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  // For respecting prefers reduced motion preference; from here: https://natclark.com/tutorials/javascript-reduced-motion/

  var widerScreenWidth = window.matchMedia("(max-width: 64em)");
  // From https://stackoverflow.com/a/45947699

  console.log("isReduced = ", isReduced);
  console.log("screenwidth =", widerScreenWidth.matches);

  if (isReduced == false && widerScreenWidth.matches == true) {
    canUseLenis = true;
  } else {
    canUseLenis = null;
    console.log("set lenis to null");
  }

  console.log(canUseLenis);

  // Define variables to use in animation code

  const scrollWrapperWrapper = document.querySelector(
    ".scroll-wrapper-wrapper"
  );
  // Scroll Wrapper Wrapper is the element that takes up the page

  const scrollWrapper = document.querySelector(".scroll-wrapper");
  // Scroll Wrapper is the element that contains the boxes with the 5 qualities

  const fiveQualityHeader = document.querySelector(".five-qualities");
  // The header next to the boxes

  // Used getBoundingClientRect because it includes the margin, while element.offsetWidth does not
  // From here: https://www.geeksforgeeks.org/how-to-get-the-elements-actual-width-and-height-in-javascript/

  const scrollWrapperWidth = scrollWrapper.getBoundingClientRect();
  // Get the width of the scroll wrapper element to be used in the x value of the animation, to make it responsive if I change the font size

  const fiveQualityHeaderWidth = fiveQualityHeader.getBoundingClientRect();
  // Get the width of the Header to be used in the y value of the animation, to make it responsive for different screen sizes

  // Only run the animation code if the user does not have Prefer reduced motion set to true
  if (isReduced == false && widerScreenWidth.matches == false) {
    gsap.set(".five-qualities", {
      x: fiveQualityHeaderWidth.width / 4,
    });

    gsap.to(".five-qualities", {
      y: -(scrollWrapperWidth.height / 2),
      scrollTrigger: {
        trigger: scrollWrapperWrapper,
        start: "top top",
        end: "+=50",
        scrub: true,
        // pin:true,
        // markers:true,
        anticipatePin: 1,
      },
    });

    // learned form gsap docs and previous knowledge
    // ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
    // Gsap docs: https://gsap.com/docs/v3/
    // Create a GSAP animation for the scroll-wrapper element to create a horizontal scrolling effect
    gsap.to(scrollWrapper, {
      x:
        -(
          scrollWrapperWidth.width -
          window.innerWidth +
          window.innerHeight / 5
        ) + "px", // Moves the scroll-wrapper element to the left so that the scroll-wrapper's right margin ends on the right side of the screen
      scrollTrigger: {
        trigger: scrollWrapperWrapper, // Use the scroll-wrapper-wrapper as the trigger for the animation
        start: "top top", // Start the animation when the top of the scroll-wrapper-wrapper hits the top of the viewport
        end: "+=" + scrollWrapperWidth.width / 1.1, // End the animation when the user has scrolled down the same amount as the width of the scroll-wrapper element.
        // Divided by 1.1 to make the distance between the start and end shorter, which causes the animation to play slightly faster
        scrub: true, // Makes the animation animate as the user scrolls
        pin: true, // Pin the scroll-wrapper-wrapper in place while it's being animated, stops user from scrolling past it
        anticipatePin: 1, // Prevents a jittery effect when the animation is reversed, best practice
        // markers: true, // Uncomment to see where the start and ending triggers are
        ease: "none",
      },
    });
  } //Prefers reduced motion
}); //DOM lister
