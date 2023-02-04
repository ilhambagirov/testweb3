import Layout from "@/components/layout/layout";
import type { AppProps } from "next/app";
import "../app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react-lite";
import { Router } from "next/router";
export default observer(function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
});
