gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const btn = document.querySelectorAll("#btn");

btn.forEach((btn,idx)=>{
    btn.addEventListener("click",()=>{
        gsap.to(window,{
        duration:1,
        scrollTo:{y: "#Section"+(idx + 1),
            autoKill:true,
        },
        });
    });
});

  gsap.from(".title",{
    opacity:0,
    duration:2,
    delay:1
})


gsap.from("#navbar",{
    opacity:0,
    duration:2,
    delay:1.9
})

gsap.to(".image-c-1",{
    y:70,
    scrollTrigger:{
        trigger:"#Section1",
        scroller:"body",
        start:"top 50%",
        end:"bottom 50%",
        scrub:true,
    }
})


gsap.to(".image-c-2",{
    y:50,
    scrollTrigger:{
        trigger:"#Section2",
        scroller:"body",
        start:"top 50%",
        end:"bottom 50%",
        scrub:true,
    }
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

var tl=gsap.timeline()
tl.from(".shop-text",{
    y:145,
    duration:2,
    delay:2.3
})

tl.from("#btn",{
    opacity:0,
    duration:2,
})

tl.from(".s-line",{
    x:-1490,
    duration:2,
})

tl.from(".image-c-1",{
    width:"0",
    duration:2,
})

tl.from(".title-font",{
    x:300,
    duration:2,
})

tl.from(".locate",{
    opacity:0,
    duration:2,
})


tl.from(".time",{
    opacity:0,
    duration:2,
})



tl.from(".s-line2",{
    x:1490,
    duration:2,
})

tl.from(".image-c-2",{
    width:"0",
    duration:2,
})

tl.from(".title-font1",{
    x:300,
    duration:2,
})

tl.from(".locate1",{
    opacity:0,
    duration:2,
})


tl.from(".time1",{
    opacity:0,
    duration:2,
})

tl.from(".s-line3",{
    x:-1490,
    duration:2,
})
