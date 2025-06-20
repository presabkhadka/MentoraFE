import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/view/Home";
import Landing from "./pages/view/Landing";
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/", element: <Landing /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        {
          path: "/user",
          element: <AuthGuard />,
          children: [{ path: "/user/home", element: <Home /> }],
        },
      ])}
    ></RouterProvider>
  );
}
