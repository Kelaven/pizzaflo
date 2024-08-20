fetch("/assets/data/pizzas.json")
    .then(response => {
        // Vérifie si la réponse est ok (status 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // Récupère les éléments contenant les cartes
        const tradContainer = document.getElementById('trad-container');
        const cheeseContainer = document.getElementById('cheese-container');
        const fishContainer = document.getElementById('fish-container');
        const creamContainer = document.getElementById('cream-container');
        const originalsContainer = document.getElementById('originals-container');

        // Itérer sur chaque pizza dans le tableau data
        data.forEach(pizza => {
            // Créé l'enveloppe de la card
            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('pizzasList__cardWrapper', 'break-black-20', 'p-1', 'm-2', 'rounded-md', 'relative', 'z-0', 'overflow-hidden');

            // Crée un élément div pour la card de la pizza
            const card = document.createElement('div');
            card.classList.add('pizzasList__card', 'pizzasList__cards--resize', 'h-full', 'flex', 'flex-col', 'bg-break-black', 'shadow-sm', 'rounded-md');


            // Crée un élément img pour l'image de la pizza
            if (pizza.photo) {
                const img = document.createElement('img');
                img.classList.add('w-full', 'rounded-t-md', 'max-h-[200px]', 'object-cover');
                img.src = pizza.photo;
                img.alt = "Image de la pizza";
                img.loading = "lazy";
                card.appendChild(img);
            }

            // Crée un élément div pour le contenu textuel de la carte
            const cardContent = document.createElement('div');
            cardContent.classList.add('p-4', 'md:p-5');

            // Crée un élément h3 pour le nom de la pizza
            const cardTitle = document.createElement('h3');
            cardTitle.classList.add('text-lg', 'font-bold', 'text-white');
            cardTitle.textContent = pizza.nom;

            // Crée un élément p pour la description de la pizza
            const cardDescription = document.createElement('p');
            cardDescription.classList.add('mt-1', 'text-white');
            cardDescription.innerHTML = `
                <p>
                    Senior ${pizza.prix['29cm']} •
                    Familiale: ${pizza.prix['40cm']}
                    <br><br>
                    ${pizza.ingrédients.join(', ')}
                    </p>
            `;

            // Crée un élément blob pour l'effet de glow
            const blob = document.createElement('div');
            blob.classList.add(
                'blob',
            );
            // Seulement pour récupérer la position originelle du blob (on ne peut pas la stocker dans une variable car elle changerait selon le zoom du navigateur ou le scroll) :
            const fakeBlob = document.createElement('div');
            fakeBlob.classList.add(
                'fake-blob',
            );

            // Assemble la carte
            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardDescription);
            card.appendChild(cardContent);
            cardWrapper.appendChild(card);
            cardWrapper.appendChild(blob);
            cardWrapper.appendChild(fakeBlob);

            // Ajoute la card aux conteneurs attitrés
            switch (pizza.catégorie) {
                case "Pizzas traditionnelles":
                    tradContainer.appendChild(cardWrapper);
                    break;
                case "Pizzas aux fromages":
                    cheeseContainer.appendChild(cardWrapper);
                    break;
                case "Pizzas base crème fraîche":
                    creamContainer.appendChild(cardWrapper);
                    break;
                case "Pizzas aux poissons":
                    fishContainer.appendChild(cardWrapper);
                    break;
                case "Pizzas originales":
                    originalsContainer.appendChild(cardWrapper);
                    break;
                default:
                    console.log("Data error");
                    break;
            }
        });
        // Anime le blob
        const allCards = document.querySelectorAll(".break-black-20");

        // Optimisation : limiter les reflows en regroupant les calculs
        let isAnimating = false;

        window.addEventListener("mousemove", (ev) => {
            if (!isAnimating) {
                isAnimating = true;

                requestAnimationFrame(() => { // requestAnimationFrame est utilisé pour regrouper et limiter les reflows forcés (cela permet au navigateur de regrouper les modifications du DOM et d’éviter de déclencher des reflows inutiles à chaque mouvement de la souris). Plutôt que de déclencher immédiatement un reflow à chaque mouvement de la souris, getBoundingClientRect est appelé dans requestAnimationFrame, réduisant ainsi la fréquence des recalculs de la disposition.
                    allCards.forEach((e) => {
                        const blob = e.querySelector(".blob"); // Pour chaque carte, on récupère son élément enfant avec la classe .blob afin d'intéragir avec lui. On le sélectionne uniquement avec querySelector et non pas querySelectorAll car on ne cible qu'un seul élément par carte. Cela évite de manipuler par erreur plusieurs éléments et d'engendrer des bugs. 
                        const fblob = e.querySelector(".fake-blob");

                        const rec = fblob.getBoundingClientRect(); // Pour obtenir des informations sur la taille d’un élément et sa position par rapport à la zone de visualisation (viewport) du navigateur

                        blob.animate( // La méthode animate() est utilisée pour créer des animations directement dans le navigateur en manipulant les propriétés CSS d’un élément. Elle fait partie de l’API Web Animations, qui permet de contrôler les animations à l’aide de JavaScript sans avoir besoin de CSS supplémentaire. https://developer.mozilla.org/fr/docs/Web/API/Element/animate
                            [{
                                transform: `translate(${ev.clientX - rec.left - (rec.width / 2)}px,${ev.clientY - rec.top - (rec.height / 2)}px)`,
                            }], // Pour que le blob bouge avec le milieu de notre curseur. La fonction translate(x, y) déplace l’élément dans l’espace X et Y. 
                            // ev.clientX et ev.clientY : Ces propriétés représentent les coordonnées X et Y de la souris par rapport à la fenêtre d’affichage lorsque l’événement mousemove se produit.
                            // rec.left et rec.top : Ces valeurs proviennent de l’utilisation de getBoundingClientRect() et représentent la position de l’élément par rapport à la fenêtre.
                            // rec.width / 2 et rec.height / 2 : Ces valeurs sont utilisées pour centrer le blob au milieu du curseur de la souris, plutôt qu’au coin supérieur gauche.
                            {
                                duration: 100,
                                fill: "forwards", // Pour que le blob reste à son dernier emplacement
                            }
                        );
                    });

                    isAnimating = false;
                });
            }
        });
    })
    .catch(error => {
        // Capture et affiche toute erreur survenue pendant le fetch ou l'analyse du JSON
        console.error('Il y a eu un problème avec l\'operation fetch:', error);
    });