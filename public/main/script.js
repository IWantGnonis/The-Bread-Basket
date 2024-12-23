gsap.registerPlugin(ScrollTrigger);



gsap.from("#navbar",{
    opacity:0,
    duration:2,
    delay:1
})


gsap.from(".animation",{
    y:100,
    duration:2,
    delay:1.5,
    stagger:1
})
gsap.from(".scroll-down",{
    y:190,
    duration:2,
    delay:5.5,
})
//Login page js to open and close the login
function openForm() {
  document.getElementById("myForm").style.display = "block";

}
function close_Form() {
  document.getElementById("myForm").style.display = "none";

}







//Video PAge Animation



gsap.from(".VIDEO video",{
    scale:0.4,
    scrollTrigger:{
        trigger:".VIDEO",
        scroller:"body",
        scrub:1,
        start:"top 100%",
        end:"bottom 100%",
    }
})
gsap.to("#texts",{
    transform:"translateX(-31%)",
    scrollTrigger:{
        trigger:".page3",
        scroller:"body",
        scrub:1,
        start:"top 0%",
        end:"top -100%",
        pin:true,
        pinSpacing:"texts"
    }
})
gsap.from(".left-img",{
    y:100,
    scrollTrigger:{
        trigger:".left-img",
        scroller:"body",
        scrub:1,
        start:"top 50%",
        end:"bottom 50%",
    }
})
/*Page-4*/
/*
var hover1=document.querySelector(".hover-set-1")

hover1.addEventListener("mouseenter",function(){
    gsap.to(".img1-page-5",{
        y:-470,
        duration:1.5,
    })
})
hover1.addEventListener("mouseleave",function(){
    gsap.to(".img1-page-5",{
        y:300,
        duration:3.5,
    })
})




var hover2=document.querySelector(".hover-set-2")

hover2.addEventListener("mouseenter",function(){
    gsap.to(".img2-page-5",{
        y:-470,
        duration:1.5,
    })
})
hover2.addEventListener("mouseleave",function(){

    gsap.to(".img2-page-5",{
        y:300,
        duration:3.5,
    })
})



var hover3=document.querySelector(".hover-set-3")

hover3.addEventListener("mouseenter",function(){
    gsap.to(".img3-page-5",{
        y:-470,
        duration:1.5,
    })
})
hover3.addEventListener("mouseleave",function(){

    gsap.to(".img3-page-5",{
        y:300,
        duration:3.5,
    })
})*/


const elementsWorks = document.querySelectorAll(".item-work");
const slidePicWorks = document.querySelector("#gallery-work");
const slidePicsWorks = document.querySelector("#work-images");

gsap.set(slidePicWorks, { autoAlpha: 0 });

elementsWorks.forEach((element, index) => {
  element.addEventListener("mouseenter", function () {
    gsap.to(slidePicsWorks, {
      marginTop: `-${280 * index}px`,
      duration: 0.2,
      ease: "power1",
    });
  });

  element.addEventListener("mouseleave", function () {
    gsap.to(element, { color: "initial", duration: 0.2, ease: "power1" });
  });
});

window.addEventListener("mousemove", function (e) {
  gsap.to(slidePicWorks, {
    top: `${e.clientY}px`,
    left: `${e.clientX}px`,
    xPercent: -20,
    yPercent: -45,
    duration: 0.2,
    ease: "power1",
  });
});

document
  .querySelector(".items-works")
  .addEventListener("mouseenter", function () {
    gsap.to(slidePicWorks, {
      autoAlpha: 1,
      duration: 0.2,
      ease: "power1",
    });
  });

document
  .querySelector(".items-works")
  .addEventListener("mouseleave", function () {
    gsap.to(slidePicWorks, {
      autoAlpha: 0,
      duration: 0.2,
      ease: "power1",
    });
  });















/*footer*/

gsap.from(".grandbox",{
    opacity:0,
    scrollTrigger:{
      trigger:".grandbox",
      scroller:"body",
      start:"top 50%",
      end:"bottom 50%",
  
    }
  })

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/your-endpoint', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            window.location.href = '/success-page'; // Redirect after successful submission
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Add this to prevent back navigation after form submission
window.history.pushState(null, '', window.location.href);
window.onpopstate = function () {
    window.history.pushState(null, '', window.location.href);
};










// Add this to your script file
document.querySelector('.hamburger-menu').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.menu-overlay').classList.toggle('active');
});

// Optional: Close menu when clicking a link
document.querySelectorAll('.menu-content a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.hamburger-menu').classList.remove('active');
    document.querySelector('.menu-overlay').classList.remove('active');
  });
});


