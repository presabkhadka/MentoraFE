import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/view/Home";
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import X from "./pages/view/X";
import Youtube from "./pages/view/Youtube";
import Try from "./pages/view/Try";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createBrowserRouter([
            { path: "/", element: <Login /> },
            { path: "/try", element: <Try /> },
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
      </QueryClientProvider>
    </>
  );
}
