<?php
$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);
$to = "fregire@mail.ru";
$subject = "Заявка с сайта js_practise.su";

$headers = "From: xxccvv33as@mail.ru" . "\r\n" .
			"Reply-to: xxccvv33as@mail.ru" . "\r\n" .
			"X-Mailer: PHP/" . phpversion();
$message = "Имя: $name \nEmail: $email \nТелефон: $phone";
mail($to, $subject, $message, $headers);
?>