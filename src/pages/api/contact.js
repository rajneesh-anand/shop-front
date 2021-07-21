import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  "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"
);

export default async (req, res) => {
  const { email, subject, message, name } = req.body;
  console.log(req.body);

  const msg = {
    to: email,
    from: "osho.ved@hotmail.com",
    subject: subject,
    text: "and easy to do anywhere, even with Node.js",
    html: message,
  };

  try {
    const response = await sgMail.send(msg);
    const result = response[0].statusCode;
    if (result === 202) {
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed" });
  }
};
