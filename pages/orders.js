import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {TbFileInvoice} from 'react-icons/tb';

function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    });

    let res = await a.json();
    setOrders(res.orders);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      fetchOrders();
    }
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            My Orders
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Banh mi cornhole echo park skateboard authentic crucifix neutra
            tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon
            twee
          </p>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  ID
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Total
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Date
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-bold">{order._id}</td>
                    <td className="px-4 py-3">${order.amount}</td>
                    <td className="px-4 py-3">{order.status}</td>
                    <td className="px-4 py-3">{order.createdAt}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/order?id=${order._id}`}
                        className="flex items-center justify-center text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs"
                        legacyBehavior>
                        <TbFileInvoice className="text-lg" />
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Orders;
