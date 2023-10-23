<?php

namespace App\Service;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

class contactForm
{

    protected  $mail;
    public function __construct()
    {
        $mail = new PHPMailer(true);
        $this->mail = $mail;
    }

    public function handleFormInput()
    {

        $lastname = $_POST['lastname'];
        $firstname = $_POST['firstname'];
        $email = $_POST['email'];
        $userPhone = $_POST['phone'];
        $mailSubject = $_POST['subject'];
        $message = $_POST['message'];

        $errors = [];

        if (!preg_match("/^[a-zA-Z ]*$/", $_POST["firstname"])) {
            $errors[] = "Only letters and white space allowed in firstname\n";
        }

        if (!preg_match("/^[a-zA-Z ]*$/", $_POST["lastname"])) {
            $errors[] = "Only letters and white space allowed in lastname\n";
        }

        if (!preg_match("/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/", $_POST["phone"])) {
            $errors[] = "wrong phone number format\n";
        }

        if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Invalid mail adress";
        }

        if (empty(trim($_POST["subject"]))) {
            $errors[] = "Subject needed";
        }

        if (empty(trim($_POST["message"]))) {
            $errors[] = "Subject needed";
        }

        if (empty($errors)) {
            $this->sendContactForm($lastname, $firstname, $email, $userPhone, $mailSubject, $message);
        }
            return $errors;
    }


    public function sendContactForm($lastname, $firstname, $email, $userPhone, $mailSubject, $message)
    {
        try {
            //Server settings
            $this->mail->SMTPDebug = 0;
            $this->mail->isSMTP();
            $this->mail->Host      = 'smtp.gmail.com';
            $this->mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $this->mail->Username   = APP_MAIL;                     //SMTP username
            $this->mail->Password   = APP_MAIL_PWD;                               //SMTP password
            $this->mail->SMTPSecure = 'tls';
            $this->mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $this->mail->setFrom(APP_MAIL_FROM);
            $this->mail->addAddress(APP_MAIL); // Add recipient email address

            //Content
            $this->mail->isHTML(true);                                  //Set email format to HTML
            $this->mail->Subject = $mailSubject;
            $this->mail->Body    = "<h2>$firstname $lastname</h2><br> 
            Email : $email<br>
            Tel : $userPhone<br> 
            $message";

            $this->mail->send();
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$this->mail->ErrorInfo}";
        }
    }
};
