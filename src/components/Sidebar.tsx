import { Brain, Link, LogOut, Notebook, Video } from "lucide-react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  let navOptions = [
    { title: "Contents", icon: <Notebook />, path: "/user/home" },
    { title: "URLs", icon: <Link />, path: "/user/x" },
    { title: "Videos", icon: <Video />, path: "/user/youtube" },
  ];
  let navigate = useNavigate();
  return (
    <div className="md:h-screen w-[100%] flex md:flex-col justify-between border-r border-r-slate-200 shadow-lg p-4">
      <div className="flex gap-6 md:flex-col">
        <div className="flex items-center gap-2">
          <p><Brain size={32} color="blue" /></p>
          <p className="text-3xl font-medium text-blue-500 hidden md:block">Mentora</p>
        </div>
        <div className="flex md:flex-col gap-4">
          {navOptions.map((menu, index) => (
            <div
              key={index}
              className="border border-slate-300 px-4 py-2 rounded-lg hover:border-slate-400 flex justify-center md:block"
            >
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-lg hover:bg-blue-400 text-green-500 hover:text-green-400"
                    : "text-lg hover:text-slate-500"
                }
              >
                <div className="flex gap-2 items-center">
                  <p>{menu.icon}</p>
                  <p className="hidden md:block">{menu.title}</p>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <button
        className="border border-slate-300 hover:border-slate-400 px-4 py-2 rounded-lg  justify-between hover:cursor-pointer hover:text-red-500 hidden md:flex"
        onClick={() => {
          localStorage.removeItem("Authorization");
          navigate("/");
          toast.success("Logged out successfully");
        }}
      >
        Logout <LogOut color="red" />
      </button>
      <button
        className="border border-slate-300 hover:border-slate-400 px-4 py-2 rounded-lg flex justify-center hover:cursor-pointer hover:text-red-500 md:hidden"
        onClick={() => {
          localStorage.removeItem("Authorization");
          navigate("/");
          toast.success("Logged out successfully");
        }}
      >
        <p>
          <LogOut color="red"/>
        </p>
      </button>
    </div>
  );
}
