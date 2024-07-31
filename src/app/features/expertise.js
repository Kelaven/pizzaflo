export function smoothScale() {
  const trigger = document.querySelector("#expertise__smooth-scroll");
  const imgs = document.querySelectorAll("#expertise__smooth-scroll img")
  // console.log(imgs);



  gsap.registerPlugin(ScrollTrigger);

  imgs.forEach(img => {
    gsap.to(img, {
      scale: 1.1,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: img,
        start: "top 80%", // Ajuster le déclenchement en fonction du point d'entrée de l'élément
        end: "bottom 20%",
        scrub: 5.5, // Ajuster pour un défilement plus fluide
        // markers: true,
        // onEnter: () => console.log('Entered'),
        // onLeave: () => console.log('Left'),
        // onEnterBack: () => console.log('Entered back'),
        // onLeaveBack: () => console.log('Left back'),
      }
    });
  });
}


