// export const cookies = () => {
const cookiesBanners = document.querySelectorAll(".cookies-banner");
const acceptCookiesButtons = document.querySelectorAll(".accept-cookies");
const refuseCookiesButtons = document.querySelectorAll(".refuse-cookies");

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
    disableGoogleAnalytics(); // Si l'utilisateur n'a pas encore donné de consentement, désactiver Google Analytics
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
    // gtag('consent', 'update', {
    //     'ad_user_data': 'granted',
    //     'ad_personalization': 'granted',
    //     'ad_storage': 'granted',
    //     'analytics_storage': 'granted'
    // });

    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-087ZJCRGKH';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    // Met à jour les consentements après l'acceptation
    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_personalization': 'granted',
        'ad_user_data': 'granted'
    });

    // Config Google Analytics
    gtag('config', 'G-087ZJCRGKH');
}

// Fonction pour désactiver Google Analytics
function disableGoogleAnalytics() {
    // gtag('consent', 'default', {
    //     'ad_storage': 'denied',
    //     'ad_user_data': 'denied',
    //     'ad_personalization': 'denied',
    //     'analytics_storage': 'denied'
    // });

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }

    // Paramètres de désactivation avec consentement par défaut
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_personalization': 'denied',
        'ad_user_data': 'denied'
    });
}
// };