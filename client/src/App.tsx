import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// styles
import "react-day-picker/dist/style.css"; 


//pages
import Books from "./pages/Books";
import UpdateBook from "./pages/UpdateBook";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBooks from "./pages/SearchBooks";
import SingleSearchBook from "./pages/SingleSearchBook";

//layouts
import RootLayout from "./layouts/RootLayout";

// styles
import "./App.css";

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hrs
    }
  }
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="search" element={<SearchBooks />} />
        <Route path="search/:bookId" element={<SingleSearchBook />} />
        <Route path="update" element={<UpdateBook />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
