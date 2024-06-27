// Variable
const dateInput = document.querySelector("#date");

// Fonctions
const changeTypeToDate = () => {
    dateInput.type = 'date';
    dateInput.placeholder = ''; // Supprimer le placeholder
    console.log('Type changé en date:', dateInput, dateInput.value);
}
const changeTypeToText = () => {
    dateInput.type = 'text';
    dateInput.placeholder = '01/01/2024'; // Supprimer le placeholder
    console.log('Type changé en text:', dateInput);
}

// Evenement
export const eventDatePlaceholder = () => {

    dateInput.addEventListener("focus", changeTypeToDate); // focus fonctionne quand on entre dans l'input

    dateInput.addEventListener("change", () => { // change fonctionne quand on change la valeur
        if (dateInput.value) {
            changeTypeToDate();
        } else {
            changeTypeToText();
        }
    });

    dateInput.addEventListener("blur", () => { // change fonctionne quand on perd le focus

        if (dateInput.value === '') {
            changeTypeToText();
        } else {
            changeTypeToDate();
        }
    });

    // Vérification front à la validation du formulaire
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        if (dateInput.type === 'text') {
            e.preventDefault();
            alert("Veuillez entrer une date valide.");
        }
    });
    console.log(dateInput);
};

// Comments
    // Lorsqu’un utilisateur focalise le champ, il devient un champ de type date et le placeholder est supprimé.
    // Lorsque la valeur du champ change, le type reste date si une valeur est présente, sinon il repasse en text avec le placeholder.
    // Lorsque l’utilisateur perd le focus et que le champ est vide, il redevient un champ de type text avec le placeholder initial, sinon il reste un champ de type date.
    // Avant de soumettre le formulaire, le code vérifie si le champ de date est toujours de type text. Si c’est le cas, le formulaire ne sera pas soumis et un message d’alerte s’affichera.