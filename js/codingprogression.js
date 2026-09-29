document.addEventListener('DOMContentLoaded', () => {
    canUseLenis = true
    // Make code blocks with  HighlightJS
    hljs.highlightAll()
        // They are centered on the page because of the wrapper so this moves the left edge of the waves to the left edge of the screen
        gsap.set(".wave1",{x:(2500-(window.innerWidth/2))})
        gsap.set(".wave2",{x:(2500-(window.innerWidth/2))})
        gsap.set(".wave3",{x:(2500-(window.innerWidth/2))})
        gsap.set(".wave4",{x:(2500-(window.innerWidth/2))})
        gsap.set(".wave5",{x:(2500-(window.innerWidth/2))})
})
