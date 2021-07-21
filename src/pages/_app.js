import { Provider } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import { CartProvider } from "../contexts/cart/use-cart";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// SCSS
import "../assets/scss/style.scss";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider session={pageProps.session}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Provider>
  );
};

export default App;
