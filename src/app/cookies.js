// export const cookies = () => {
const cookiesBanners = document.querySelectorAll(".cookies-banner");
const acceptCookiesButtons = document.querySelectorAll(".accept-cookies");
const refuseCookiesButtons = document.querySelectorAll(".refuse-cookies");
console.log(refuseCookiesButtons);

// Vérifier les préférences stockées dans le localStorage à chaque chargement de la page
const cookiesStorage = localStorage.getItem('cookiesAccepted');

if (cookiesStorage !== null) {
    cookiesBanners.forEach(cookiesBanner => {
        if (cookiesStorage === 'true') {
            cookiesBanner.classList.add("hide-fast");
            loadGoogleAnalytics();
        } else if (cookiesStorage === 'false') {
            cookiesBanner.classList.add("hide-fast");
            disableGoogleAnalytics();
        }
    });
} else {
    disableGoogleAnalytics();
}

// L'utilisateur clique sur Accepter
acceptCookiesButtons.forEach(acceptButton => {
    acceptButton.addEventListener("click", () => {
        cookiesBanners.forEach(cookiesBanner => {
            cookiesBanner.classList.add("hide");
        });
        localStorage.setItem('cookiesAccepted', 'true');
        loadGoogleAnalytics();
    });
});

// L'utilisateur clique sur Refuser
refuseCookiesButtons.forEach(refuseButton => {
    refuseButton.addEventListener("click", () => {
        cookiesBanners.forEach(cookiesBanner => {
            cookiesBanner.classList.add("hide");
        });
        localStorage.setItem('cookiesAccepted', 'false');
        disableGoogleAnalytics();
    });
});

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
// };