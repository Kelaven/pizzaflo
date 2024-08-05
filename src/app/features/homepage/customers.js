export function animateCardsModal() {
    // Variables
    const overlayRows = document.querySelectorAll('.overlay__row');
    const previews = document.querySelectorAll('.preview');
    const links = document.querySelectorAll('.item__link');
    const backButtons = document.querySelectorAll('.preview__back');
    const overlays = document.querySelector('.overlay');


    // Fonction pour ouvrir l'élément
    const openItem = (index) => {
        // afficher la preview :
        setTimeout(() => {
            document.querySelector('.previews').style.display = 'block';
        }, 1200);
        // ajouter la classe CSS active quand la preview est affichée pour rendre le bouton cliquable
        setTimeout(() => {
            previews[index].classList.add('active');
        }, 1500);

        // setTimeout(() => { // ? à suppr ?
        // body.classList.add('no-scroll');
        // }, 1900);

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.inOut' }
        });
        // animation des overlays : 
        tl.set(overlayRows, { transformOrigin: (i) => (i === 0 ? 'top' : 'bottom') }) // définit l’origine de la transformation des deux rangées. La première rangée s’ouvre vers le bas (top), et la deuxième vers le haut (bottom). tl.set() est une méthode de GSAP utilisée pour définir des propriétés CSS sans animation (elle applique immédiatement les valeurs spécifiées). Voir détails en dessous. 
            .to(overlayRows, { scaleY: 1, stagger: 0.1 }) //  anime les deux rangées pour les faire passer de scaleY(0) à scaleY(1), les rendant visibles (stagger: 0.1 introduit un décalage entre les animations des deux rangées pour un effet plus fluide)
            .to(previews[index], { opacity: 1, display: 'flex' }, '-=0.5') // index est l’index de l’élément actuellement sélectionné. Il est nécessaire de redéfinir la propriété display: flex sinon l'affichage bug quand on rouvre plusieurs fois la même preview voir détail en bas
            .to(previews[index].querySelectorAll('.oh__inner'), { y: 0, stagger: 0.05 }, '-=0.5'); // stagger produit l'effet de cascade. y: 0 permet de replacer l'élément à sa position d'origine.
    };

    // Fonction pour fermer l'élément
    const closeItem = (index) => {
        // setTimeout(() => { // ? à suppr ?
        //     body.classList.remove('no-scroll');
        // }, 1200);
        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power3.inOut' }
        });

        tl.to(previews[index].querySelectorAll('.oh__inner'), { y: 100, stagger: 0.05 })
            .to(previews[index], { opacity: 0, display: 'none' }, '-=0.5')
            .to(overlayRows, { scaleY: 0, stagger: 0.1 }, '-=0.5') // anime les rangées pour les faire passer de scaleY(1) à scaleY(0), les rendant invisibles
            .set('.previews', { display: 'none' })  // Masquer la section previews après l'animation
            .add(() => {
                previews[index].classList.remove('active'); // retire la classe active de la prévisualisation pour la rendre non interactive
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



// Détails : 

// Fonction de rappel (i) => (i === 0 ? ‘top’ : ‘bottom’) :
    // Elle est appelée pour chaque élément de overlayRows.
    // •	i est l’index de l’élément actuel dans la collection overlayRows.
    // •	La fonction retourne 'top' si i est 0, et 'bottom' sinon.
	// •	'top' défini l’origine de la transformation en haut de l’élément. Cela signifie que si on applique scaleY, l’élément va se développer à partir du haut.
	// •	'bottom', défini l’origine de la transformation en bas de l’élément.
    // Code non fléché :
        // tl.set(overlayRows, {
        //     transformOrigin: function(i) {
        //         return (i === 0 ? 'top' : 'bottom');
        //     }
        // });

// .to(previews[index], { opacity: 1, display: 'flex' }, '-=0.5') :
    // Lors de la première ouverture de la prévisualisation, display: flex est correctement appliqué via le CSS et l’animation GSAP sans avoir à spécifier ici display: 'flex'. Cependant, lorsque la prévisualisation est fermée et réouverte, quelque chose empêche display: flex d’être réappliqué correctement, ce qui entraîne le problème de rendu. Ajouter display: 'flex' dans le script GSAP garantit que l’élément .preview est toujours rendu correctement à chaque ouverture, indépendamment de son état précédent.

// Correspondance entre les cartes et les prévisualisations
    // Dans le code HTML et JavaScript, il y a un mécanisme implicite pour faire correspondre les cards et les previews. La correspondance repose sur l’index des éléments dans les collections previews et links (l'ordre des éléments dans le DOM est donc primordial). La correspondance entre les cards et les previews est donc automatique car les deux collections links et previews sont itérées avec le même index index.
    // Les fonctions récupèrent l'index grâce aux closures (capture des variables de leur environnement lexical).