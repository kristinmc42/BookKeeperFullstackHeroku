import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./context/AuthContext";

//pages
import Books from "./pages/Books";
import UpdateBook from "./pages/UpdateBook";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBooks from "./pages/SearchBooks";
import SingleSearchBook from "./pages/SingleSearchBook";
import SingleDbBook from "./pages/SingleDbBook";
import AddBook from "./pages/AddBook";

//layouts
import RootLayout from "./layouts/RootLayout";

// styles
import "./App.css";
import "react-day-picker/dist/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { theme } from "./styles/Theme";
import { GlobalStyles } from "./styles/Global";
import ErrorPage from "./pages/ErrorPage";

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hrs
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:bookId" element={<SingleDbBook />} />
        <Route path="search" element={<SearchBooks />} />
        <Route path="search/:bookId" element={<SingleSearchBook />} />
        <Route path="add" element={<AddBook />} />
        <Route path="update" element={<UpdateBook />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <GlobalStyles />
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
