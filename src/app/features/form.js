export function formAPI() {


    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        console.log("submit cliqué");


        // Effacer les anciens messages d'erreur
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(errorElement => errorElement.textContent = '');

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const location = document.getElementById('location').value;
        const date = document.getElementById('date').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;
        const terms = document.getElementById('terms').checked;

        try {
            const response = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ name, email, phone, location, date, guests, message, terms }),
            });
            const result = await response.json();
            if (result.success) {
                console.log(result);
            } else { // afficher les msgs d'erreur sur le site
                if (result.errors) {
                    if (result.errors.name) {
                        document.getElementById('nameError').textContent = result.errors.name;
                    }
                    if (result.errors.email) {
                        document.getElementById('emailError').textContent = result.errors.email;
                    }
                    if (result.errors.phone) {
                        document.getElementById('phoneError').textContent = result.errors.phone;
                    }
                    if (result.errors.location) {
                        document.getElementById('locationError').textContent = result.errors.location;
                    }
                    if (result.errors.date) {
                        document.getElementById('dateError').textContent = result.errors.date;
                    }
                    if (result.errors.guests) {
                        document.getElementById('guestsError').textContent = result.errors.guests;
                    }
                    if (result.errors.message) {
                        document.getElementById('messageError').textContent = result.errors.message;
                    }
                    if (result.errors.terms) {
                        document.getElementById('termsError').textContent = result.errors.terms;
                    }
                } else {
                    document.getElementById('termsError').textContent = "Il y a une erreur dans le formulaire.";
                }

            }
        } catch (error) {
            console.error(error);
        }
    });

}