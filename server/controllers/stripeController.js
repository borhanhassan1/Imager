import Stripe from "stripe";
import userModel from "../models/userModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = "whsec_dBQbrYYjeOR4w3TGv1kd3GpbSVTGUdTK";

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.client_reference_id;
    const creditsToAdd = parseInt(session.metadata?.credits || "0");

    try {
      const user = await userModel.findById(userId);
      if (!user) {
        console.error("❌ User not found for ID:", userId);
        return res.status(404).json({ error: "User not found" });
      }

      user.creditBalance += creditsToAdd;
      await user.save();

      console.log(`✅ ${creditsToAdd} credits added to user ${user.email}`);
    } catch (err) {
      console.error("❌ Error updating user credits:", err);
      return res.status(500).json({ error: "Database update failed" });
    }
  }

  res.json({ received: true });
};

const stripeCheckout = async (req, res) => {
  try {
    const { plan, userId } = req.body;

    const plans = {
      Basic: { amount: 1000, credits: 100, name: "Basic Plan" },
      Advanced: { amount: 5000, credits: 500, name: "Advanced Plan" },
      Business: { amount: 25000, credits: 5000, name: "Business Plan" },
    };

    const selected = plans[plan];
    if (!selected)
      return res.status(400).json({ error: "Invalid plan selected." });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: selected.name },
            unit_amount: selected.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://imager1.vercel.app",
      cancel_url: "https://imager1.vercel.app/result",
      client_reference_id: userId,
      metadata: { credits: selected.credits },
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { stripeWebHook, stripeCheckout };
