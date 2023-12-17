<?php

namespace App\Service;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

class ContactForm
{

    protected  $mail;
    public function __construct()
    {
        $mail = new PHPMailer(true);
        $this->mail = $mail;
    }

    public function handleFormInput()
    {
        $firstname = $_POST['firstname'];
        $pronouns = $_POST['pronouns'];
        $email = $_POST['email'];
        $mailSubject = isset($_POST['subject']) ? $_POST['subject'] : 'Coucou mail';
        $userPhone = isset($_POST['phone']) ? $_POST['phone'] : '';
        $message = $_POST['message'];

        $errors = [];

        // Common form input handling 
        if (!preg_match("/^[a-zA-Z ]*$/", $_POST["firstname"])) {
            $errors[] = "Only letters and white space allowed in firstname\n";
        }
        if (!preg_match("/^[a-zA-Z ]*$/", $_POST["pronouns"])) {
            $errors[] = "Only letters and white space allowed in pronouns\n";
        }

        if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Invalid mail adress";
        }

        // Specific form input handling 
        if (isset($_POST['form_rdv_submit'])) {
            if (empty(trim($_POST["subject"]))) {
                $errors[] = "Subject needed";
            }
            // TODO : phone validation
            if (!preg_match("/^(0|\+33|0033)[1-9](\d{8}|\d{1}(\s|-)\d{2}(\s|-)\d{2}(\s|-)\d{2}|\d{1}(\.\d{2}){4}|\d{2}(\s|-)\d{2}(\s|-)\d{2}(\s|-)\d{2}|\d{2}(\.\d{2}){3}\d{2})$/", $_POST["phone"])) {
                $errors[] = "invalid phone number format";
            }
        }

        if (empty(trim($_POST["message"]))) {
            $errors[] = "Subject needed";
        }

        if (empty($errors)) {
            $this->sendContactForm($firstname, $pronouns, $email, $mailSubject, $message, $userPhone);
        }
        return $errors;
    }


    public function sendContactForm($firstname, $pronouns, $email, $mailSubject, $message, $userPhone)
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
            $this->mail->Body    = "<h2>$firstname $pronouns ($</h2><br> 
            Email : $email<br>
            Tel : $userPhone<br> 
            $message";

            $this->mail->send();
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$this->mail->ErrorInfo}";
        }
    }
};
