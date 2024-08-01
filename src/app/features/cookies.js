export const cookies = () => {
    const cookiesBanner = document.querySelector("#cookies-banner");
    const acceptCookies = document.querySelector("#accept-cookies");
    const refuseCookies = document.querySelector("#refuse-cookies");


    // Vérifier les préférences stockées dans le localStorage à chaque chargement de la page (si l’utilisateur a déjà accepté ou refusé les cookies, la bannière est masquée et les préférences sont appliquées en conséquence) :
    const cookiesStorage = localStorage.getItem('cookiesAccepted');

    if (cookiesStorage !== null) {
        if (cookiesStorage === 'true') {
            cookiesBanner.classList.add("hide-fast");
            loadGoogleAnalytics();
        } else if (cookiesStorage === 'false') { // condition obligatoire car si l'utilisateur arrive pour la toute 1ere fois sur le site et ne clique pas encore sur accepter/refuser, alors cookiesStorage renvoie NULL
            cookiesBanner.classList.add("hide-fast");
            disableGoogleAnalytics();
        }
    } else {
        disableGoogleAnalytics();
    }



    // L'utilisateur click sur Accepter : 
    acceptCookies.addEventListener("click", () => {
        cookiesBanner.classList.add("hide");
        localStorage.setItem('cookiesAccepted', 'true'); // localStorage pour garantir que les choix de l’utilisateur soient mémorisés même après qu’il quitte la page ou ferme le navigateur (évite d’afficher la bannière de cookies à chaque fois)
        loadGoogleAnalytics(); // Charge Google Analytics après acceptation des cookies
    })
    // L'utilisateur click sur Refuser : 
    refuseCookies.addEventListener("click", () => {
        cookiesBanner.classList.add("hide");
        localStorage.setItem('cookiesAccepted', 'false');
        disableGoogleAnalytics();
    })



    // Fonction pour charger Google Analytics dynamiquement
    function loadGoogleAnalytics() {
        gtag('consent', 'update', {
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'ad_storage': 'granted',
            'analytics_storage': 'granted'
        });
    }

    // Fonction pour désactiver Google Analytics
    function disableGoogleAnalytics() {
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        });
    }

}