//Learned from GSAP Docs and GSAP forums: https://greensock.com/docs/ and https://greensock.com/forums/
gsap.registerPlugin("ScrollTrigger");//registers ScrollTrigger plugin
var splitLucy = new SplitType(".Lucy", { types: 'chars' })//splits the element into spans of single letters
var splitIntro = new SplitType(".intro", { types: 'words' })//splits the paragraph into spans of words
//making this a constant breaks the code idk why
//random speeds for homepage
var randDur1 = gsap.utils.random(15,25)//random number betwween 15 and 25
var randDur2 = gsap.utils.random(26, 35)
var randDur3 = gsap.utils.random(36, 45)
var randDur4 = gsap.utils.random(46, 55)
var randDur5 = gsap.utils.random(56, 90)

var tl = gsap.timeline({});//makes it easier to type
tl.set(".char",{y:-100,})//moves the .char spans up 100px

//for homepage 
//makes waves go back and forth with random speed
gsap.to("#wave1",{
  x:-2600,
  duration:randDur1,//sets the speed (duration) to a random number from 15-25
  yoyo:true,//if true the ABBA, if false then ABAB
  repeat:-1,//loop forever
  ease:"none",
  
})
gsap.to("#wave2",{
  x:-2600,
  duration:randDur2,
  yoyo:true,
  repeat:-1,
  ease:"none",
})
gsap.to("#wave3",{
  x:-2600,
  duration:randDur3,
  yoyo:true,
  repeat:-1,
  ease:"none",
})
gsap.to("#wave4",{
  x:-2600,
  duration:randDur4,
  yoyo:true,
  repeat:-1,
  ease:"none",
})
gsap.to("#wave5",{
  x:-2600,
  duration:randDur5,
  yoyo:true,
  repeat:-1,
  ease:"none",
})
//tl makes so they animate in order
tl.from(".hello", {
  x:-220,
  delay:0.5,//wait 0.5s before animating
  ease: "back.out(3)"
})
tl.from(".mynameis", {
  x:-220,
  ease: "back.out(3)"
},"<")//"<"" means start at last animation 

tl.to(".char",{
  y:0,
  stagger:0.05,//like a mini timeline, delay in seconds
  delay:-0.2,
})
gsap.set(".me",{//sets a position
  x:700
})
tl.to(".me",{
  x:0,
  ease: "power4.out",
  duration:2,
}, "<")

tl.from(".word", {
  opacity:0,
  delay:-1,
  stagger: {//random order stagger
    from: "random",
    amount: 0.5,
  },
  ease: "power3.inOut",
})



// following code was "adapted" (copied) from https://codepen.io/DariaIvK/pen/RwrBvaW
ScrollTrigger.create({
  trigger: ".quality1",//what causes the animation
  start: 'top 60%',
  end: 'bottom 20%',
  // markers: true,
  //uncomment prevoious line to see how it works
  onEnter: () => gsap.to(".quality1", {y: 0,opacity: 1,}),//animation on enter
  onLeave: () => gsap.to(".quality1", {y: -50,opacity: 0,}),//animation on leave
  onEnterBack: () => gsap.to(".quality1", {y: 0,opacity: 1,}),//animation on re-enter
  onLeaveBack: () => gsap.to(".quality1", {y: 50,opacity: 0,}),//animation on re-leave
})
ScrollTrigger.create({
  trigger: ".quality2",
  start: 'top 60%',
  end: 'bottom 20%',
  // markers: true,
  onEnter: () => gsap.to(".quality2", {y: 0,opacity: 1,}),
  onLeave: () => gsap.to(".quality2", {y: -50,opacity: 0,}),
  onEnterBack: () => gsap.to(".quality2", {y: 0,opacity: 1,}),
  onLeaveBack: () => gsap.to(".quality2", {y: 50,opacity: 0,}),
})
ScrollTrigger.create({
  trigger: ".quality3",
  start: 'top 60%',
  end: 'bottom 20%',
  // markers: true,
  onEnter: () => gsap.to(".quality3", {y: 0,opacity: 1,}),
  onLeave: () => gsap.to(".quality3", {y: -50,opacity: 0,}),
  onEnterBack: () => gsap.to(".quality3", {y: 0,opacity: 1,}),
  onLeaveBack: () => gsap.to(".quality3", {y: 50,opacity: 0,}),
})
ScrollTrigger.create({
  trigger: ".quality4",
  start: 'top 60%',
  end: 'bottom 20%',
  // markers: true,
  onEnter: () => gsap.to(".quality4", {y: 0,opacity: 1,}),
  onLeave: () => gsap.to(".quality4", {y: -50,opacity: 0,}),
  onEnterBack: () => gsap.to(".quality4", {y: 0,opacity: 1,}),
  onLeaveBack: () => gsap.to(".quality4", {y: 50,opacity: 0,}),
})
ScrollTrigger.create({
  trigger: ".quality5",
  start: 'top 60%',
  end: 'bottom 20%',
  // markers: true,
  onEnter: () => gsap.to(".quality5", {y: 0,opacity: 1,}),
  onLeave: () => gsap.to(".quality5", {y: -50,opacity: 0,}),
  onEnterBack: () => gsap.to(".quality5", {y: 0,opacity: 1,}),
  onLeaveBack: () => gsap.to(".quality5", {y: 50,opacity: 0,}),
})
// from here https://stackoverflow.com/questions/32679960/want-to-change-fonts-back-and-forth-using-javascript-button
function changeFont() {
  var fon = document.getElementById("changeable");//shorten document.getElementById("changeable") to fon
  if (fon.className == "raleway") { //if changeable element has a class of raleway 
    fon.className = 'openDyslexic'; //change class to openDyslexic
  } else {                          //if not
    fon.className = 'raleway';      //change to raleway
  }
}

