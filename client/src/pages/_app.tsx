import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import * as React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}
