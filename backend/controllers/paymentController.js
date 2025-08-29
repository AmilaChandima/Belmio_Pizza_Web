import Stripe from "stripe";
import Order from "../models/order.js"; // import order model

export const createCheckoutSession = async (req, res) => {
  try {
    const apiKey = process.env.STRIPE_SECRET_KEY || "";
    if (!apiKey) {
      return res.status(500).json({ error: "Stripe secret key not configured" });
    }
    const stripe = new Stripe(apiKey, { apiVersion: "2024-06-20" });

    const { items = [], customerEmail, phone, address, totalPrice } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    // **Save order in database as 'pending'**
    const order = new Order({
      email: customerEmail,
      phone,
      address,
      items,
      totalPrice,
      paymentMethod: "card",
      paymentStatus: "pending",
    });
    await order.save();

    // Stripe line items
    const line_items = items.map((it) => ({
      price_data: {
        currency: "lkr",
        product_data: { name: it.size ? `${it.name} (${it.size})` : it.name },
        unit_amount: Math.round(Number(it.price) * 100),
      },
      quantity: Number(it.quantity || 1),
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customerEmail,
      success_url: `http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}&orderId=${order._id}`,
      cancel_url: `http://localhost:3000/checkout/cancel?orderId=${order._id}`,
      metadata: { source: "belmio-demo" },
    });

    return res.json({ id: session.id, url: session.url, orderId: order._id });
  } catch (err) {
    console.error("Stripe session error:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
};
