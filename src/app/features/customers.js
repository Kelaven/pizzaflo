export function animateCardsModal() {
    // Sélection des éléments
    const overlayRows = document.querySelectorAll('.overlay__row');
    const previews = document.querySelectorAll('.preview');
    const links = document.querySelectorAll('.item__link');
    const backButtons = document.querySelectorAll('.preview__back');
    const overlays = document.querySelector('.overlay');


    // Fonction pour ouvrir l'élément
    const openItem = (index) => {
        // S'assurer que la section previews est visible avant l'animation
        document.querySelector('.previews').style.display = 'block';
        setTimeout(() => {
            previews[index].classList.add('active');
        }, 1500);

        // setTimeout(() => {
        // body.classList.add('no-scroll');
        // }, 1900);

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.inOut' }
        });

        tl.set(overlayRows, { transformOrigin: (i) => (i === 0 ? 'top' : 'bottom') })
            .to(overlayRows, { scaleY: 1, stagger: 0.1 })
            .to(previews[index], { opacity: 1, display: 'flex' }, '-=0.5')
            .to(previews[index].querySelectorAll('.oh__inner'), { y: 0, stagger: 0.05 }, '-=0.5');
    };

    // Fonction pour fermer l'élément
    const closeItem = (index) => {
        // setTimeout(() => {
        //     body.classList.remove('no-scroll');
        // }, 1200);
        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.inOut' }
        });

        tl.to(previews[index].querySelectorAll('.oh__inner'), { y: 100, stagger: 0.05 })
            .to(previews[index], { opacity: 0, display: 'none' }, '-=0.5')
            .to(overlayRows, { scaleY: 0, stagger: 0.1 }, '-=0.5')
            .set('.previews', { display: 'none' })  // Masquer la section previews après l'animation
            .add(() => {
                previews[index].classList.remove('active');
            });
    };

    // Ajouter des écouteurs d'événements
    links.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();  // Empêche le comportement par défaut du lien
            openItem(index);
        });
    });

    backButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            closeItem(index);
        });
    });
}