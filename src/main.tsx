import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@/index.css";
import ErrorPage from "@/routes/error";

const router = createBrowserRouter([
  {
    lazy: () => import("@/routes/root.layout"),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        lazy: () => import("@/routes/index"),
      },
      {
        path: "meeting/",
        lazy: () => import("@/routes/meeting"),
      },
      {
        path: "consensus/",
        lazy: () => import("@/routes/consensus"),
      },
      {
        path: "wallet/:contractAddress/",
        lazy: () => import("@/routes/wallet"),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
  // <React.StrictMode>
  // </React.StrictMode>
);
