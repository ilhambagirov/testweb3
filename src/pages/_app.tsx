import Layout from "@/components/layout/layout";
import type { AppProps } from "next/app";
import "../app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { observer } from "mobx-react-lite";
import { Router } from "next/router";
import { useStoreContext } from "@/core/root-store";
import SafeModule from "@/components/safe/safe-modal";
export default observer(function App({ Component, pageProps }: AppProps) {

  const { safeStore } = useStoreContext()

  return (
    <Layout>
      <Component {...pageProps} />
      {
        safeStore.modalState &&
        <SafeModule />
      }
    </Layout>
  );
});
