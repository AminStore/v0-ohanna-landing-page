import { Router } from "express";
import { randomUUID } from "crypto";

const router = Router();

const contacts: any[] = [];
const orders: any[] = [];

router.post("/checkout", async (req, res) => {
  try {
    const { items, successUrl, cancelUrl } = req.body as {
      items: any[];
      successUrl: string;
      cancelUrl: string;
    };

    if (!items?.length) {
      res.status(400).json({ error: "Cart is empty" });
      return;
    }

    const stripeKey = process.env["STRIPE_SECRET_KEY"];
    if (stripeKey && stripeKey.startsWith("sk_")) {
      try {
        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(stripeKey, { apiVersion: "2025-04-30.basil" as any });

        const lineItems = items.map((item: any) => ({
          price_data: {
            currency: "egp",
            product_data: {
              name: item.product.name,
              description: item.product.description?.slice(0, 200),
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: successUrl,
          cancel_url: cancelUrl,
          metadata: { source: "ohanna" },
        });

        res.json({ url: session.url, sessionId: session.id });
        return;
      } catch (stripeErr: unknown) {
        console.error("Stripe error:", stripeErr);
      }
    }

    const orderId = `OHN-${Date.now()}`;
    const total = items.reduce((s: number, i: any) => s + i.product.price * i.quantity, 0);

    orders.push({
      id: orderId,
      items,
      total,
      status: "confirmed",
      created_at: new Date().toISOString(),
    });

    const mockUrl = `${successUrl.replace("{CHECKOUT_SESSION_ID}", orderId)}&order_id=${orderId}&total=${total}`;
    res.json({ url: mockUrl, sessionId: orderId });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Checkout failed" });
  }
});

router.post("/contact", (req, res) => {
  try {
    const { name, email, subject, message } = req.body as {
      name: string; email: string; subject?: string; message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      res.status(400).json({ error: "Name, email, and message are required." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email address." });
      return;
    }

    contacts.push({
      id: randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject ?? "").trim(),
      message: message.trim(),
      created_at: new Date().toISOString(),
    });

    res.json({ success: true, message: "Message received. We'll reply within 24 hours." });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ error: "Failed to save message." });
  }
});

router.get("/track-order", (req, res) => {
  const id = (req.query["id"] as string)?.trim();
  const email = (req.query["email"] as string)?.trim().toLowerCase();

  if (!id || !email) {
    res.status(400).json({ error: "Order ID and email are required." });
    return;
  }

  const order = orders.find(
    (o) => o.id === id && (!o.customer_email || o.customer_email === email),
  );

  if (!order) {
    res.status(404).json({ error: "Order not found." });
    return;
  }

  res.json({ order });
});

router.get("/products", (_req, res) => {
  res.json({ products: [] });
});

router.get("/setup", (_req, res) => {
  res.json({ status: "ok", message: "OHANNA API ready" });
});

export default router;
