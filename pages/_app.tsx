import type { AppProps } from "next/app";
import { useEffect } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  // Add Bootstrap JS when component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
