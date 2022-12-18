import { init as initAOS } from "aos";
import "aos/dist/aos.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignUpContextProvider } from "../features/authentication";
import "../styles/utilities.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <>
      {/* Bootstrap JS */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
        crossOrigin="anonymous"
      />

      <SignUpContextProvider>
        <Component {...pageProps} />
      </SignUpContextProvider>

      <ToastContainer />
    </>
  );
}
