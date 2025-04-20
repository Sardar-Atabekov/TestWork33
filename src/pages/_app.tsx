import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Layout from '@shared/ui/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@shared/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
