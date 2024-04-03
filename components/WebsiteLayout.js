import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Layout({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);

  useEffect(() => {
    try {
      let myCart = localStorage.getItem("cart");
      if (myCart) {
        setCart(JSON.parse(myCart));
        saveCart(JSON.parse(myCart));
      }

      const token = localStorage.getItem("token");
      if (token) {
        setUser({ value: token });
        setKey(Math.random());
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, [router.query]);

  // Add Item to Cart
  const addToCart = (itemCode, quantity, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty + quantity;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    saveCart(newCart);
  };

  // Save Cart to Local Storage
  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));

    let subT = 0;
    let keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      subT += cart[keys[i]].price * cart[keys[i]].qty;
    }

    setSubTotal(subT);
  };

  // Clear Cart
  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  // Remove from Cart
  const removeFromCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }

    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  };

  // Buy Now
  const buyNow = (itemCode, quantity, price, name, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: quantity, price, name, size, variant };

    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    router.push("/login");
  };
  return (
    <>
      <Navbar
        user={user}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
        logout={logout}
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
        toast={toast}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
