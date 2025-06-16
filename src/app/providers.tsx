"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import ScrollToTop from "./components/ScrollToTop";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <ScrollToTop />
    </Provider>
  );
}
