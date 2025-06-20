import { Navigate, Outlet } from "react-router-dom";

let isAuthenticated = () => {
  return !!localStorage.getItem("Authorization");
};

export default function AuthGuard() {
  return isAuthenticated() ? <Outlet /> : <Navigate to={"/user/login"} />;
}
