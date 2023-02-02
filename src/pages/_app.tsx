import Layout from "@/components/layout/layout";
import type { AppProps } from "next/app";
import "../app/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
