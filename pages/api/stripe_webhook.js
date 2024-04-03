import getRawBody from 'raw-body';
import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (request, response) => {
  if (request.method == "POST") {
    const payload = await getRawBody(request);
    const sig = request.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status === 'paid') {
        // Fulfill the Order
        let o = await Order.findOne({ stripe_checkout_session_id: session.id });
        o.status = 'Payment Success';
        await o.save();

        // Reduce Qty of Product from Stock
        for (let itemName in o.products) {
          let p = await Product.findOne({ slug: itemName });
          p.availableQty -= o.products[itemName].qty;
          p.save();
        }
      }
    }

    response.status(200).json({success: true});
  } else {
    response.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);

export const config = {
  api: {
    bodyParser: false,
  },
}
