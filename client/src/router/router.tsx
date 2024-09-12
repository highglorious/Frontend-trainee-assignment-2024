import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../pages/layout";

import Orders, { ordersLoader } from "../pages/orders";

import Items, { itemsLoader } from "../pages/items";
import Item, { itemLoader } from "../pages/item";
import { itemsAction } from "../pages/items/action";
import ErrorPage from "../pages/error";
import { itemAction } from "../pages/item/action";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/adverts" replace={true} />,
          },
          {
            path: "adverts",
            element: <Items />,
            loader: itemsLoader,
            action: itemsAction,
          },
          {
            path: "orders",
            element: <Orders />,
            loader: ordersLoader,
          },
          {
            path: "adverts/:itemId",
            element: <Item />,
            loader: itemLoader,
            action: itemAction,
          },
        ],
      },
    ],
  },
]);
