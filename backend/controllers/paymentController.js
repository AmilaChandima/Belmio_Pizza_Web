import Stripe from "stripe";
import Order from "../models/order.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
    const { items = [], customerEmail, orderId } = req.body;

    if (!orderId) return res.status(400).json({ error: "Order ID is required" });

    const line_items = items.map(it => ({
      price_data: {
        currency: "lkr",
        product_data: { name: it.size ? `${it.name} (${it.size})` : it.name },
        unit_amount: Math.round(Number(it.price) * 100)
      },
      quantity: Number(it.quantity || 1)
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customerEmail,
      success_url: `http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
      cancel_url: "http://localhost:3000/checkout/cancel",
      metadata: { orderId }
    });

    // Immediately mark card payment as paid
    await Order.findByIdAndUpdate(orderId, { paymentStatus: "paid" });

    return res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
