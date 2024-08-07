import "../styles/index.css";

import 'preline';


// ! disable right click on images
document.body.addEventListener('contextmenu', (event) => { // au click droit
    console.log(event);
    if (event.target.tagName === 'IMG') { // si l'élément ciblé est une image. Procéder comme ça plutôt qu'en sélectionnant toutes les images avec un querySelectorAll permet de cibler aussi les images générées dynamiquement (donc celles de la carte des pizzas)
        // Créer le tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bg-black text-white text-sm rounded-md p-2 shadow-md z-100';
        tooltip.innerText = 'Images protégées © Pizza Flo';

        // Ajouter le tooltip au document
        document.body.appendChild(tooltip);

        // Positionner le tooltip à l'endroit du clic
        tooltip.style.left = `${event.pageX}px`;
        tooltip.style.top = `${event.pageY}px`;

        // Cacher le tooltip après 2 secondes
        setTimeout(() => {
            tooltip.remove();
        }, 2000);

        event.preventDefault(); // empêcher le click droit
    }
});