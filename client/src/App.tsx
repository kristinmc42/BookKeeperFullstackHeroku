import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//pages
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

//layouts
import RootLayout from "./layouts/RootLayout";

// styles
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="add" element={<AddBook />} />
        <Route path="update/:id" element={<UpdateBook />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
