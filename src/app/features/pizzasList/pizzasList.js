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
            cardWrapper.classList.add('break-black-20', 'p-1', 'm-2', 'rounded-md', 'relative', 'z-0', 'overflow-hidden');

            // Crée un élément div pour la card de la pizza
            const card = document.createElement('div');
            card.classList.add('pizzasList__cards--resize', 'h-full', 'flex', 'flex-col', 'bg-break-black', 'shadow-sm', 'rounded-md');


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

            // Ajoute la carte aux conteneurs de cartes
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
        window.addEventListener("mousemove", () => {
            allCards.forEach((e) => {
                const blob = e.querySelector(".blob"); // Pour chaque carte, on récupère son élément enfant avec la classe .blob afin d'intéragir avec lui. On le sélectionne uniquement avec querySelector et non pas querySelectorAll car on ne cible qu'un seul élément par carte. Cela évite de manipuler par erreur plusieurs éléments et engendrer des bugs. 
                console.log(blob);
                const fblob = e.querySelector(".fake-blob");
                console.log(fblob);
            });
        });
    })
    .catch(error => {
        // Capture et affiche toute erreur survenue pendant le fetch ou l'analyse du JSON
        console.error('Il y a eu un problème avec l\'operation fetch:', error);
    });