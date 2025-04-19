import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = "Weather App" }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Weather app with forecast and favorites"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container py-4">{children}</main>
      <footer className="text-center py-4 border-top mt-4">
        <p className="text-muted">
          Weather App © {new Date().getFullYear()} | Powered by OpenWeatherMap
        </p>
      </footer>
    </>
  );
};

export default Layout;
