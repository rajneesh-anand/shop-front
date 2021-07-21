import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const { email, subject, message, fname } = req.body  
  const msg = {
    to: 'osho.ved@hotmail.com',
    from: 'osho.ved@hotmail.com',
    subject,
    name: fname,
    text: message,
  
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' })
  }
}