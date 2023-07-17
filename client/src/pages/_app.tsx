import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import * as React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateContextProvider } from "@/context";
import { CookiesProvider } from "react-cookie";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <ToastContainer />
      </StateContextProvider>
    </QueryClientProvider>
  );
}
