import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({
  children,
  title = 'WeatherWizard - Weather Forecast App',
  description = 'Get real-time weather information and forecasts for any city in the world',
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="d-flex flex-column min-vh-100">
        <header>
          <Navbar />
        </header>

        <main className="flex-grow-1 container py-4" id="main-content">
          {children}
        </main>

        <footer className="bg-light py-3 text-center">
          <div className="container">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} WeatherWizard. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
