import { mailTransporter } from './mailTransporter.js';

const sendCredentialMail = (name, email, tempToken, role) => {
  const transporter = mailTransporter();

  let mailDetails = {
    from: 'adhithyanalan@gmail.com',
    to: email,
    subject: 'Your login Credentials',
    html: `<p>Hello ${name} 👋</p> 
    <p>Please use the below login credentials link to set your new password.</p>
    <p>Temporary Password:- ${tempToken}</p>
    <a href="${process.env.Client_URL}/${role}/new-password/${tempToken}" target="_blank">Reset your password</a>`,
  };

  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log('Error in sending credentials mail');
    } else {
      console.log('Credentials email sent successfully');
    }
  });
};

export { sendCredentialMail };
