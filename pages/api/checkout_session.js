const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";
import pincodes from '../../pincodes.json';

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Check if Pincode is Service-able
      if(!Object.keys(pincodes).includes(req.body.pincode)) {
        res.redirect(303, `${req.headers.origin}/checkout?error-pincode=true`);
      }
      
      const cart = JSON.parse(req.body.cart);
      if (!cart) {
        res.redirect(303, `${req.headers.origin}/checkout?canceled=true`);
      }

      let lineItems = [];
      let cartTotal = 0;

      for (let itemName in cart) {
        // Check the cart in DB
        let p = await Product.findOne({ slug: itemName });

        if (cart[itemName].price != p.price) {
          return res.status(409).send("Cart has been tempared");
        }

        if(cart[itemName].qty > p.availableQty){
          return res.redirect(302, `${process.env.NEXT_PUBLIC_HOST}/checkout?insufficient-quantity=${itemName}`);
        }

        cartTotal += cart[itemName].price * cart[itemName].qty;

        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: itemName,
              metadata: {
                size: cart[itemName].size,
                color: cart[itemName].variant,
              },
            },
            unit_amount: cart[itemName].price * 100,
          },
          quantity: cart[itemName].qty,
        });
      }

      if (cartTotal != req.body.subtotal) {
        return res.status(409).send("Cart has been tempared");
      }

      // Store Order in Database
      let order = new Order({
        email: req.body.email,
        address: req.body.address,
        amount: req.body.subtotal,
        products: cart,
      });

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/order?clear-cart=true&id=${order._id}`,
        cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      });

      order.stripe_checkout_session_id = session.id;

      await order.save();

      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default connectDb(handler);
