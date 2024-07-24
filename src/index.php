<?php
header('Content-Type: application/json');

require_once __DIR__ . '/config/regex.php';



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $error = [];
    $data = [];

    // Nettoyage et validation du nom
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    if (empty($name)) {
        $error['name'] = 'Le nom n\'est pas renseigné';
    } else {
        $isNameOk = filter_var($name, FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => '/' . REGEX_NAME . '/')));
        if (!$isNameOk) {
            $error['name'] = 'Le nom doit contenir entre 2 et 60 caractères.';
        } else {
            $data['name'] = $name;
        }
    }

    // Nettoyage et validation de l'email
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    if (empty($email)) {
        $error['email'] = 'L\'email n\'est pas renseigné';
    } else {
        $isEmailOk = filter_var($email, FILTER_VALIDATE_EMAIL);
        if (!$isEmailOk) {
            $error['email'] = 'Le format de votre adresse mail n\'est pas valide';
        } else {
            $data['email'] = $email;
        }
    }

    // Nettoyage et validation du téléphone
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_NUMBER_INT);
    if (empty($phone)) {
        $error['phone'] = 'Le téléphone n\'est pas renseigné';
    } else {
        $isPhoneOk = filter_var($phone, FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => '/' . REGEX_MOBILE . '/')));
        if (!$isPhoneOk) {
            $error['phone'] = 'Le téléphone doit contenir 10 chiffres.';
        } else {
            $data['phone'] = $phone;
        }
    }

    // Nettoyage et validation de la localisation
    $location = filter_input(INPUT_POST, 'location', FILTER_SANITIZE_SPECIAL_CHARS);
    if (!empty($location)) {
        $isLocationOk = filter_var($location, FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => '/' . REGEX_LOCATION . '/')));
        if (!$isLocationOk) {
            $error['location'] = 'La localisation doit contenir entre 2 et 60 caractères.';
        } else {
            $data['location'] = $location;
        }
    }

    // Nettoyage et validation de la date
    $date = htmlspecialchars($_POST['date'], ENT_QUOTES, 'UTF-8');
    if (!empty($date)) {
        $regexDate = '/^\d{2}\/\d{2}\/\d{4}$/';
        if (!preg_match($regexDate, $date)) {
            $error['date'] = 'La date doit être au format jj/mm/aaaa.';
        } else {
            $data['date'] = $date;
        }
    }

    // Nettoyage et validation du nombre d'invités
    $guests = filter_input(INPUT_POST, 'guests', FILTER_SANITIZE_NUMBER_INT);
    if (!empty($guests)) {
        $guests = filter_var($guests, FILTER_VALIDATE_INT, array("options" => array("min_range" => 1, "max_range" => 1000)));
        if (!$guests) {
            $error['guests'] = 'Le nombre d\'invités doit être un nombre entier entre 1 et 1000.';
        } else {
            $data['guests'] = $guests;
        }
    }

    // Nettoyage et validation du message
    $message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS));
    if (empty($message)) {
        $error['message'] = 'Le message n\'est pas renseigné';
    } else {
        $isMessageOk = filter_var($message, FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => '/' . REGEX_MESSAGE . '/')));
        if (!$isMessageOk) {
            $error['message'] = 'Le message doit contenir entre 5 et 1200 caractères.';
        } else {
            $data['message'] = $message;
        }
    }

    // Validation des termes
    $terms = filter_input(INPUT_POST, 'terms', FILTER_SANITIZE_SPECIAL_CHARS);
    if (empty($terms)) {
        $error['terms'] = 'La case n\'est pas cochée';
    } else {
        $data['terms'] = $terms;
    }


    if (empty($error)) {
        // TODO : Traitement des données (envoyer le mail)




        echo json_encode(["success" => true, "message" => "Data received and processed"]);
    } else {
        echo json_encode(["success" => false, "message" => "Validation errors", "errors" => $error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
