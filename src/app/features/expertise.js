export function smoothScale() {
  const trigger = document.querySelector("#expertise__smooth-scroll");
  const imgs = document.querySelectorAll("#expertise__smooth-scroll img")
  console.log(imgs);

  gsap.registerPlugin(ScrollTrigger);

  imgs.forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger,
        // start: "top 70%",
        // end: "bottom 20%",
        // markers: true,
        scrub: 5.5 // to reverse and animate during scrolling, not just at once
      },
      scale: 1.1,
      ease: 'power1',
    });
  });
}


