import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdRemoveShoppingCart, MdAccountCircle } from "react-icons/md";
import { RiAlertFill } from "react-icons/ri";

function Navbar({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  user,
  logout,
}) {
  const [showUserDropdown, setShowUserDropDown] = useState(false);
  const sidebarRef = useRef();
  const toggleCart = () => {
    if (sidebarRef.current.classList.contains("translate-x-full")) {
      sidebarRef.current.classList.remove("translate-x-full");
      sidebarRef.current.classList.add("translate-x-0");
    } else {
      sidebarRef.current.classList.remove("translate-x-0");
      sidebarRef.current.classList.add("translate-x-full");
    }
  };

  // const

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-lg sticky top-0 z-10 bg-white">
      <div className="logo mx-5">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Fashirt</span>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold text-sm">
          <li>
            <Link href={"/tshirts"}>Tshirts</Link>{" "}
          </li>
          <li>
            <Link href={"/hoodies"}>Hoodies</Link>{" "}
          </li>
          <li>
            <Link href={"/stickers"}>Sticker</Link>{" "}
          </li>
          <li>
            <Link href={"/mugs"}>Mugs</Link>{" "}
          </li>
        </ul>
      </div>
      <div className="cart flex absolute right-0 top-4 mx-5">
        {user.value && (
          <div
            className="relative"
            onMouseEnter={() => setShowUserDropDown(true)}
            onMouseLeave={() => setShowUserDropDown(false)}
          >
            <MdAccountCircle className="text-xl md:text-2xl cursor-pointer mr-2" />
            <div
              style={{ display: showUserDropdown ? "block" : "none" }}
              className="bg-gray-100 border border-gray-200 w-[150px] p-3 rounded-md absolute right-0"
            >
              <ul>
                <li>
                  <Link href="/account" className="hover:text-indigo-500">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="hover:text-indigo-500">
                    Orders
                  </Link>
                </li>
                <li>
                  <a onClick={logout} className="hover:text-indigo-500 cursor-pointer">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}

        {!user.value && (
          <Link
            href="/login"
            className="flex items-center text-white bg-indigo-500 border-0 py-1 px-3 mr-2 focus:outline-none hover:bg-indigo-600 rounded text-xs"
          >
            Login
          </Link>
        )}

        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-2xl cursor-pointer"
        />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidecart  w-80 z-10 fixed border-l border-l-indigo-200 top-0 right-0 bg-indigo-50 h-full p-5 pl-10 transform transition-transform ${
          Object.keys(cart).length != 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <AiFillCloseCircle
          onClick={toggleCart}
          className="cursor-pointer absolute top-2 right-2 text-xl text-indigo-500"
        />

        {Object.keys(cart).length == 0 && (
          <p className="text-red-500 py-5 flex items-center font-bold ju">
            <RiAlertFill className="mr-2 text-xl" /> Your cart is Empty
          </p>
        )}
        <ul className="list-decimal">
          {Object.keys(cart).map((key) => (
            <li key={key}>
              <div className="flex my-2">
                <div className="w-2/3">
                  {cart[key].name}{" "}
                  <span className="capitalize">
                    ({cart[key].size}/{cart[key].variant})
                  </span>
                </div>
                <div className="flex justify-center items-center w-1/3 text-right">
                  <AiFillMinusCircle
                    onClick={() => removeFromCart(key, 1)}
                    className="cursor-pointer text-indigo-500"
                  />
                  <span className="mx-2">{cart[key].qty}</span>
                  <AiFillPlusCircle
                    onClick={() =>
                      addToCart(key, 1, 10, "Wear the code", "XL", "red")
                    }
                    className="cursor-pointer text-indigo-500"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="font-bold my-2">SubTotal: ${subTotal}</div>
        <div className="flex justify-between border-t pt-3">
          <Link
            href={"/checkout"}
            className="flex items-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-sm"
            legacyBehavior>
            <React.Fragment><BsFillBagCheckFill className="mr-2" /> Checkout</React.Fragment>
          </Link>

          <button
            onClick={clearCart}
            className="flex items-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-sm"
          >
            <MdRemoveShoppingCart className="mr-2" /> Clear
          </button>
        </div>
      </div>
      {/* End Sidebar */}
    </div>
  );
}

export default Navbar;
