import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Options } from "./pages/Options";
import { AppContextProvider } from "./context/AppContext";
import { Quiz } from "./pages/Quiz";
import { Stats } from "./pages/Stats";
import { Admin } from "./pages/Admin/Admin";
import { ListQuestions } from "./pages/Admin/ListQuestions";
import { NewQuestion } from "./pages/Admin/NewQuestion";
import { Auth } from "./pages/Admin/Auth/Auth";
import { AdminAuthContextProvider } from "./context/AdminAuthContext";
import { Stats as StatsDetailed } from "./pages/Admin/Stats";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/admin/auth",
    element: <Auth />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <ListQuestions />,
      },
      {
        path: "new",
        element: <NewQuestion />,
      },
      {
        path: "stats",
        element: <StatsDetailed />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Quiz />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/options",
        element: <Options />,
      },
    ],
  },
]);

root.render(
  <AppContextProvider>
    <AdminAuthContextProvider>
      <RouterProvider router={router} />
    </AdminAuthContextProvider>
  </AppContextProvider>
);
