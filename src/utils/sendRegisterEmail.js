var nodemailer = require('nodemailer');

module.exports = function sendRegisterEmail(id, email, name) {

    const message = `Olá ${name}, \n Seu ID de acesso é: ${id} \n Esta é uma mensagem automática, favor não responder`;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'betheheromailer@gmail.com',
            pass: '6c6fbedd-c14e-4fca-a306-33fa9e7c3518'
        }
    });

    var mailOptions = {
        from: 'betheheromailer@gmail.com',
        to: email,
        subject: 'Be The Hero - Obrigado por se juntar ao Be The Hero!',
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return error;
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}