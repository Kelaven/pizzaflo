<?php



define('REGEX_NAME', "^[A-Za-z\s-]{2,60}$");
define('REGEX_MOBILE', "^[0-9]{10}$");
define('REGEX_LOCATION', "^[A-Za-z0-9\s\-\(\),.]{2,60}$"); // permet les lettres majuscules et minuscules, les chiffres, les espaces, les tirets, les parenthèses, les virgules et les points
define('REGEX_MESSAGE', "^.{5,1200}$");
define('REGEX_DATE', "^(\d{2}[\/\-]\d{2}[\/\-]\d{4}|\d{4}[\/\-]\d{2}[\/\-]\d{2})$"); // jj/mm/aaaa, jj-mm-aaaa, aaaa/mm/jj, aaaa-mm-jj
define('REGEX_GUESTS', "^(?:[1-9][0-9]{0,2}|1000)$");
