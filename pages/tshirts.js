import Link from "next/link";
import React from "react";

import mongoose from "mongoose";
import Product from "../models/Product";

function Tshirts({ products }) {
  console.log(products);
  return (
    <div className="max-w-[1200px] mx-auto">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {Object.keys(products).length == 0 && (
              <p className="text-red-600 font-bold">
                Sorry! No products available in this category
              </p>
            )}
            {Object.keys(products).map((item, index) => (
              <Link
                href={`/product/${products[item].slug}`}
                className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg m-3 border border-indigo-50"
                key={index}
                legacyBehavior>
                <div>
                  <div className="block relative rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="h-[48vh] block mx-auto"
                      src={products[item].img}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">$ {products[item].price}</p>
                    <p className="mt-2">
                      {products[item].size.map((s) => (
                        <span key={s} className="mx-1 border px-1">
                          {s}
                        </span>
                      ))}
                    </p>
                    <div className="mt-2">
                      {products[item].color.map((c) => (
                        <button
                          key={c}
                          style={{ backgroundColor: c }}
                          className="border-2 border-gray-300 mx-1 rounded-full w-6 h-6 focus:outline-none"
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "tshirts" });

  let tshirts = {};

  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }

      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      // if (item.availableQty > 0) {
      //   tshirts[item.title].color = [item.color];
      //   tshirts[item.title].size = [item.size];
      // }
      tshirts[item.title].color = [item.color];
      tshirts[item.title].size = [item.size];
    }
  }

  return { props: { products: JSON.parse(JSON.stringify(tshirts)) } };
}

export default Tshirts;
