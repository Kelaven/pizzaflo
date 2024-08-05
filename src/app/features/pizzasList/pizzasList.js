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
            // Crée un élément div pour la carte de la pizza
            const card = document.createElement('div');
            card.classList.add('pizzasList__cards--resize', 'flex', 'flex-col', 'bg-break-black', 'shadow-sm', 'rounded-md', 'm-4');


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

            // Assemble la carte
            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardDescription);
            card.appendChild(cardContent);

            // Ajoute la carte aux conteneurs de cartes
            switch (pizza.catégorie) {
                case "Pizzas traditionnelles":
                    tradContainer.appendChild(card);
                    break;
                case "Pizzas aux fromages":
                    cheeseContainer.appendChild(card);
                    break;
                case "Pizzas base crème fraîche":
                    creamContainer.appendChild(card);
                    break;
                case "Pizzas aux poissons":
                    fishContainer.appendChild(card);
                    break;
                case "Pizzas originales":
                    originalsContainer.appendChild(card);
                    break;
                default:
                    console.log("Data error");
                    break;
            }
        });
    })
    .catch(error => {
        // Capture et affiche toute erreur survenue pendant le fetch ou l'analyse du JSON
        console.error('Il y a eu un problème avec l\'operation fetch:', error);
    });