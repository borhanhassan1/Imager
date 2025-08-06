import Stripe from "stripe";
const stripe = new Stripe(
  "pk_test_51RsrD4JYOW6ad8gI5TdMSefK1hcFQ4WO8VvrxheC1jFJAqdhpwjfoweuJKX9QARrP6vF6sXxHih4qMEAAYRhkqdS00j4N0VW0i"
);
import bodyParser from "body-parser";

const stripeWebHook = async (req, res) => {
  bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      const endpointSecret = "whsec_dBQbrYYjeOR4w3TGv1kd3GpbSVTGUdTK";

      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        console.error("❌ Webhook Error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        console.log("✅ Payment succeeded for session:", session.id);
        console.log(session.amount_total);
      }

      res.json({ received: true });
    };
};

const stripeCheckout = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Sample Product" },
            unit_amount: 1000,
          },
          quantity: 100,
        },
      ],
      mode: "payment",
      success_url: "hhttps://imager1.vercel.app",
      cancel_url: "https://imager1.vercel.app/result",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { stripeWebHook, stripeCheckout };
