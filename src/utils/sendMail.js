const SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send";
const SENDGRID_API_KEY = process.env.EMAIL_SERVER_PASSWORD;

const sendMail = async (to, name, subject, message) => {
  const sgResponse = await fetch(SENDGRID_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: to,
            },
          ],
          subject: subject,
        },
      ],
      from: {
        email: "osho.ved@hotmail.com",
        name: name,
      },
      content: [
        {
          type: "text/html",
          value: message,
        },
      ],
    }),
  });
  return sgResponse;
};

export default sendMail;
