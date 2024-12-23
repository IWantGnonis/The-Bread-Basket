gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


    gsap.from(".page1", {
      y: "100vh",
      ease: "power2.in",
      duration: 1.5
    })

gsap.from(".title",{
    opacity:0,
    duration:2,
    delay:2
})


gsap.from("#navbar",{
    opacity:0,
    duration:2,
    delay:2.9
})
gsap.from(".text-1",{
    opacity:0,
    stagger:1,
    duration:1,
    delay:4
})
gsap.from(".grandbox",{
  opacity:0,
  scrollTrigger:{
    trigger:".grandbox",
    scroller:"body",
    start:"top 50%",
    end:"bottom 50%",

  }
})

gsap.to(window,{
  scrollTo:0
})

