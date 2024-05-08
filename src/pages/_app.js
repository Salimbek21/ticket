import Layout from "@/components/layout";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
			<ToastContainer />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
