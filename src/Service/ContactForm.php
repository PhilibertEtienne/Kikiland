<?php

namespace App\Service;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

class contactForm
{

    protected  $mail;
    protected string $mailUserLastName = '';
    protected string $mailUserFirstName = '';
    protected string $mailUserPhone = '';
    protected string $mailMessage = '';
    protected string $mailSubject = '';

    public function __construct()
    {
        $mail = new PHPMailer(true);
        $this->mail = $mail;
    }

    public function handleFormInput()
    {

        echo "pizza";
        // if (!preg_match("/^[a-zA-Z ]*$/",$_POST["lastName"])) {
        //     $errors[] = "Only letters and white space allowed\n"; 
        //   }


        //   if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        //     $errors[] = "Format mail invalide"; 
        //   }

        // $firstname = $_POST['lastname'];
        // $userPhone = $_POST['phone'];
        // $email = filter_var($_POST['email'],FILTER_SANITIZE_EMAIL);
        // $message = $_POST['message'];
    }


    public function sendContactForm($mailUser, $mailMessage, $mailSubject)
    {
        try {
            //Server settings
            $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $this->mail->isSMTP();
            $this->mail->Host      = 'smtp.gmail.com';
            $this->mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $this->mail->Username   = 'emmachevassu@gmail.com';                     //SMTP username
            $this->mail->Password   = 'secret';                               //SMTP password
            $this->mail->SMTPSecure = 'ssl';
            $this->mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $this->mail->setFrom('emmachevassu@gmail.com');
            $this->mail->addAddress($mailUser);     //Add a recipient

            //Content
            $this->mail->isHTML(true);                                  //Set email format to HTML
            $this->mail->Subject = $mailSubject;
            $this->mail->Body    = $mailMessage;

            $this->mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$this->mail->ErrorInfo}";
        }
    }
};
