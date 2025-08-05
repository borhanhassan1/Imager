// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeCheckout = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name: "Sample Product" },
//             unit_amount: 1000, // $20.00 (amount in cents)
//           },
//           quantity: 100,

//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:5173/",
//       cancel_url: "http://localhost:5173/result",

//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
