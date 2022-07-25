import sgMail from '@sendgrid/mail';

import emailFactory from './factories/emailFactory.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const senderEmail = process.env.SENDER_EMAIL;

async function sendEmail(recipientEmail: string, body: string) {
  try {
    const email = emailFactory.generateEmail(senderEmail, recipientEmail, body);

    await sgMail.send(email);
  } catch (error) {
    console.log(error);
  }
}

export default { sendEmail };
