<?php
header('Content-Type: application/json');

require_once __DIR__ . '/config/regex.php';

require_once __DIR__ . '/../vendor/autoload.php'; // for php mailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données JSON du flux d'entrée brut
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Vérifier si les données JSON sont correctement décodées
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["success" => false, "message" => "Invalid JSON data"]);
        exit;
    }

    $error = [];


    // Nettoyage et validation du nom
    // var_dump($data['name']);
    $name = filter_var($data['name'], FILTER_SANITIZE_SPECIAL_CHARS);
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
    // var_dump($error);
    // var_dump($data['name']);
    // exit;

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
    var_dump($location);
    exit;
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
        // Envoi de l'email avec PHPMailer
        $mailer = new PHPMailer(true);
        try {
            // Configuration du serveur
            //TODO: vérifier l’hôte, le port, le nom d’utilisateur et le mot de passe 
            $mailer->setLanguage('fr');
            $mailer->isSMTP();
            $mailer->SMTPAuth   = true;
            $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mailer->Port       = 587;
            $mailer->Host       = 'smtp.gmail.com';
            // * $mailer->Username   = 'jclavenant@pizza-flo.com';
            $mailer->Username   = 'kevin.lavenant.photographies@gmail.com';
            $mailer->Password   = '';

            // Configuration du mode debug
            $mailer->SMTPDebug  = 2; // Affiche les informations détaillées (débuggage)
            $mailer->Debugoutput = 'html'; // Affiche les informations de debug sous forme de HTML

            // Expéditeur et Destinataire
            $mailer->setFrom($data['email'], $data['name']);
            // * $mailer->addAddress('jclavenant@pizza-flo.com', 'Pizza Flo');
            $mailer->addAddress('kevin.lavenant.photographies@gmail.com');

            // Contenu
            $mailer->Subject = 'Nouvelle demande de contact';
            $mailer->Body    = "Nom: {$data['name']}\nEmail: {$data['email']}\nTéléphone: {$data['phone']}\nLocalisation: {$data['location']}\nDate: {$data['date']}\nNombre d'invités: {$data['guests']}\nMessage: {$data['message']}";
            $mailer->AltBody = "Nom: {$data['name']}\nEmail: {$data['email']}\nTéléphone: {$data['phone']}\nLocalisation: {$data['location']}\nDate: {$data['date']}\nNombre d'invités: {$data['guests']}\nMessage: {$data['message']}";

            $mailer->send();

            echo json_encode(["success" => true, "message" => "Votre demande a bien été envoyée !"]);
        } catch (Exception $e) {
            echo json_encode(["success" => false, "message" => "Le message n'a pas pu être envoyé. Erreur: {$mailer->ErrorInfo}"]);
        }
        echo json_encode(["success" => true, "message" => "Data received and processed"]); // ? à suppr plus tard
    } else {
        echo json_encode(["success" => false, "message" => "Validation errors", "errors" => $error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
