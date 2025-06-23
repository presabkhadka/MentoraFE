import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/view/Home";
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import X from "./pages/view/X";
import Youtube from "./pages/view/Youtube";

export default function App() {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          { path: "/", element: <Login /> },
          { path: "/signup", element: <Signup /> },
          {
            path: "/user",
            element: <AuthGuard />,
            children: [
              { path: "/user/home", element: <Home /> },
              { path: "/user/x", element: <X /> },
              { path: "/user/youtube", element: <Youtube /> },
            ],
          },
        ])}
      ></RouterProvider>
      <Toaster position="bottom-right" />
    </>
  );
}
