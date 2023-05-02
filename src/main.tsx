import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { color } from './const.ts';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            Button: {
              colorPrimary: color.Primary,
            },
          },
          token: {
            colorPrimary: color.Primary,
            fontFamily: "poppins",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
