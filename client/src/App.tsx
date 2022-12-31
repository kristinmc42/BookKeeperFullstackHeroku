import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

//pages
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBooks from "./pages/SearchBooks";

//layouts
import RootLayout from "./layouts/RootLayout";

// styles
import "./App.css";

const queryClient:QueryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="search" element={<SearchBooks />} />
        <Route path="add" element={<AddBook />} />
        <Route path="update/:id" element={<UpdateBook />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
