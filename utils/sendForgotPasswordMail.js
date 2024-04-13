import { mailTransporter } from './mailTransporter.js';

const sendForgotPasswordMail = (name, email, tempToken, role) => {
  const transporter = mailTransporter();

  let mailDetails = {
    from: 'adhithyanalan@gmail.com',
    to: email,
    subject: 'Forgot your account',
    html: `<p>Hello ${name} 👋</p> 
    <p>Please below the temporary password and below link to reset your new password.</p>
    <p>Temporary Password:- ${tempToken}</p>
    <a href="${process.env.Client_URL}/${role}/new-password/${tempToken}" target="_blank">Reset your password</a>`,
  };

  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log('Error in sending forgot password mail');
    } else {
      console.log('Forgot password email sent successfully');
    }
  });
};

export { sendForgotPasswordMail };
