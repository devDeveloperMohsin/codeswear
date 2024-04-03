import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

function Checkout({ cart, addToCart, removeFromCart, subTotal, toast }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [checkoutDisabled, setCheckoutDisabled] = useState(true);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    if (router.query["insufficient-quantity"]) {
      toast.error(
        `Product: ${router.query["insufficient-quantity"]} is low in stock. Please try again by lower its quantity`,
        { autoClose: false }
      );
    }

    if (router.query["error-pincode"]) {
      toast.error(
        `Your Pincode is not service-able`,
        { autoClose: false }
      );
    }

    if (router.query.canceled) {
      toast.error(
        "Order canceled -- continue to shop around and checkout when you’re ready.",
        { autoClose: 2000 }
      );
    }
  }, [router]);

  useEffect(() => {
    // Enable/Disable Checkout Button
    if (
      name &&
      email &&
      address &&
      phone &&
      city &&
      state &&
      pincode &&
      cart &&
      Object.keys(cart).length
    ) {
      setCheckoutDisabled(false);
    } else {
      setCheckoutDisabled(true);
    }
    // End Enable/Disable Checkout Button
  }, [name, email, address, phone, city, state, pincode, cart]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const handlePinChange = async (e) => {
    let pin = e.target.value;
    if (pin.length == 5) {
      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      let pinJson = await pins.json();
      console.log(pins);

      if (Object.keys(pinJson).includes(pin)) {
        setCity(pinJson[pin][0]);
        setState(pinJson[pin][1]);
      }
    } else {
      setCity("");
      setState("");
    }

    setPincode(pin);
  };

  return (
    <>
      <form action="/api/checkout_session" method="POST">
        {/* htmlForm */}
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 pt-16 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Fill Address & Confirm Order
              </h1>
            </div>
            <div className="md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="address"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="city"
                      className="leading-7 text-sm text-gray-600"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out read-only:bg-gray-200"
                      value={city}
                      readOnly
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="state"
                      className="leading-7 text-sm text-gray-600"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out read-only:bg-gray-200"
                      value={state}
                      readOnly
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="pincode"
                      className="leading-7 text-sm text-gray-600"
                    >
                      PinCode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={pincode}
                      onChange={handlePinChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End htmlForm */}
        {/* Cart */}
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="max-w-screen-lg px-4 md:px-8 mx-auto">
            <div className="flex flex-col sm:border-t sm:border-b sm:divide-y mb-5 sm:mb-8">
              {Object.keys(cart).map((k) => (
                <div className="py-5 sm:py-8" key={k}>
                  <div className="flex flex-wrap gap-4 lg:gap-6 sm:py-2.5">
                    <div className="sm:-my-2.5">
                      <a
                        href="#"
                        className="group w-24 sm:w-40 h-40 sm:h-56 block bg-gray-100 rounded-lg overflow-hidden relative"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1612681621979-fffe5920dbe8?auto=htmlFormat&q=75&fit=crop&w=200"
                          loading="lazy"
                          alt="Photo by Thái An"
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200"
                        />
                      </a>
                    </div>

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <a
                          href="#"
                          className="inline-block text-gray-800 hover:text-gray-500 text-lg lg:text-xl font-bold transition duration-100 mb-1"
                        >
                          {cart[k].name}
                        </a>

                        <span className="block text-gray-500">
                          Size: {cart[k].size}
                        </span>
                        <span className="block text-gray-500">
                          Color: {cart[k].variant}
                        </span>
                      </div>

                      <div>
                        <span className="block text-gray-800 md:text-lg font-bold mb-1">
                          $ {cart[k].price}
                        </span>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex justify-between border-t sm:border-none pt-4 sm:pt-0">
                      <div className="flex flex-col items-start gap-2">
                        <div className="w-32 h-12 flex border rounded overflow-hidden">
                          <input
                            type="number"
                            value={cart[k].qty}
                            readOnly
                            className="w-full focus:ring ring-inset ring-indigo-300 outline-none transition duration-100 px-4 py-2"
                          />

                          <div className="flex flex-col border-l divide-y">
                            <button
                              type="button"
                              onClick={() =>
                                addToCart(
                                  k,
                                  1,
                                  10,
                                  "Wear the code",
                                  "XL",
                                  "red"
                                )
                              }
                              className="w-6 flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(k, 1)}
                              className="w-6 flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100"
                            >
                              -
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(k, cart[k].qty + 1)}
                          className="flex items-center text-red-500 hover:text-red-600 active:text-red-700 text-sm font-semibold select-none transition duration-100"
                        >
                          <BsFillTrashFill /> Remove
                        </button>
                      </div>

                      <div className="pt-3 sm:pt-2 ml-4 md:ml-8 lg:ml-16">
                        <span className="block text-gray-800 md:text-lg font-bold">
                          $ {cart[k].price * cart[k].qty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-end gap-4">
              <div className="w-full sm:max-w-xs bg-gray-100 rounded-lg p-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-gray-500 gap-4">
                    <span>Subtotal</span>
                    <span>$ {subTotal}</span>
                  </div>

                  <div className="flex justify-between text-gray-500 gap-4">
                    <span>Shipping</span>
                    <span>$0</span>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-start text-gray-800 gap-4">
                    <span className="text-lg font-bold">Total</span>

                    <span className="flex flex-col items-end">
                      <span className="text-lg font-bold">
                        $ {subTotal} USD
                      </span>
                      <span className="text-gray-500 text-sm">
                        including VAT
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <input type="hidden" name="cart" value={JSON.stringify(cart)} />
              <input type="hidden" name="subtotal" value={subTotal} />
              <button
                type="submit"
                disabled={checkoutDisabled}
                className="disabled:bg-indigo-300 disabled:cursor-not-allowed inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
        {/* End Cart */}
      </form>
    </>
  );
}

export default Checkout;
