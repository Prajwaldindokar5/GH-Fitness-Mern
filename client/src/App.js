import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Diet from "./pages/diet/Diet";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Signup from "./pages/signup/Signup";
import Strength from "./pages/strength/Strength";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import Exercise from "./pages/exercise/Exercise";

import "./App.css";

const App = () => {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/diet",
          element: <Diet />,
        },
        {
          path: "/forgotPassword",
          element: <ForgotPassword />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/resetPassword/:token",
          element: <ResetPassword />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/strength",
          element: <Strength />,
        },
        {
          path: "/updateProfile",
          element: <UpdateProfile />,
        },
        {
          path: "/strength/:name/",
          element: <Exercise />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
