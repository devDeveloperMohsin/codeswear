import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import mongoose from "mongoose";
import OrderModel from "../models/Order";

function Order({order, clearCart }) {
  const router = useRouter();
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    if (router.query["clear-cart"]) {
      clearCart();
    }
  }, [router]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              codeswear.com
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order ID: #{order._id}
            </h1>
            <p className="mb-2">We have received your order.</p>
            <p className="mb-4 bg-indigo-200 inline-block py-1 px-2 rounded-md">
              <span className="font-bold text-indigo-700">Status:</span> {order.status}</p>
            <span className="block font-bold">Summery:</span>

            {Object.keys(order.products).map((productName, index) => (
              <div className="flex border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">{productName}</span>
                <span className="ml-auto text-gray-900">Qty: {order.products[productName].qty}</span>
                <span className="ml-auto text-gray-900">$ {order.products[productName].qty * order.products[productName].price}</span>
              </div>
            ))}

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                $ {order.amount}
              </span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <Image
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="/order-confirmation.jpg"
            height={200}
            width={500}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await OrderModel.findById(context.query.id);
  if (order) {
    delete order.stripe_checkout_session_id;
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default Order;
