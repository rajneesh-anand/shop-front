import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, address, email, amount } = req.body;
    console.log(req.body);
    // const amt = JSON.parse(amount);
    // console.log(amt);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        description: "Kokeliko Shop Payment",
        shipping: {
          name: name,
          address: {
            line1: address.line1,
            postal_code: address.postal_code,
            city: address.city,
            state: address.state,
            country: address.country,
          },
        },
        amount: amount * 100,
        currency: "usd",
        payment_method_types: ["card"],
      });
      console.log(paymentIntent.client_secret);
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
