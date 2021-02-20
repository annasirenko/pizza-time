<?php 

$pizza = $_POST['pizza'];
$price = $_POST['price'];
$size = $_POST['size'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$address = $_POST['address'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'example@gmail.com';                 // Наш логин
$mail->Password = 'qwerrty';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('example@gmail.com', 'Pizza Day');   // От кого письмо 
$mail->addAddress('wacigav870@edultry.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заказ';
$mail->Body    = '
		Клиент оставил данные <br> 
	Пицца: ' . $pizza . ' <br>
	Цена: ' . $price . '<br>
	Размер: ' . $size . '<br>
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	Адрес: ' . $address . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>