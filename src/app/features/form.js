export function formAPI() {
    console.log(form);


    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        console.log("submit cliqué");

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
            }
        } catch {
            console.error('Failed');
        }
    });

}