import confetti from 'canvas-confetti';

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
        const recaptchaResponse = grecaptcha.getResponse(); // envoyer la réponse captcha au back

        try {
            // const response = await fetch("/api", { // pour l’environnement de développement local
            const response = await fetch("https://test.kevin-lavenant.fr/indexForm.php", { // pour la mise en ligne
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ name, email, phone, location, date, guests, message, terms, 'g-recaptcha-response': recaptchaResponse }),
            });
            const result = await response.json();
            if (result.success) {

                confetti({
                    particleCount: 200,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                document.getElementById('formError').classList.add('success-text');
                document.getElementById('formError').textContent = "Votre email a bien été envoyé !";

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
                    document.getElementById('formError').textContent = "Une erreur s'est produite lors de la soumission du formulaire. Le mail n'a pas été envoyé.";
                }
            }
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire: ", error);
            document.getElementById('formError').textContent = "Une erreur s'est produite lors de la soumission du formulaire. Le mail n'a pas été envoyé.";
        }
    });

}