import "../styles/globals.css";
import "../styles/style.css";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import "react-toastify/dist/ReactToastify.css";
import WebsiteLayout from "../components/WebsiteLayout";
import AdminLayout from "../components/AdminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [useAdminLayout, setUseAdminLayout] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => setProgress(100));
    router.events.on("routeChangeStart", () => setProgress(40));

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

  useEffect(() => {
    const routePath = router.pathname;
    if (routePath.search(/admin/) === 1) {
      setUseAdminLayout(true);
    } else {
      setUseAdminLayout(false);
    }
  })

  return (
    <>
      <LoadingBar
        color="#6366f1"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={400}
      />
      <ToastContainer />

      {useAdminLayout ? (
        <AdminLayout Component={Component} pageProps={pageProps} />
        ) : (
        <WebsiteLayout Component={Component} pageProps={pageProps} />
      )}

      {/* <Component
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          buyNow={buyNow}
          toast={toast}
          {...pageProps}
        /> */}
    </>
  );
}

export default MyApp;
