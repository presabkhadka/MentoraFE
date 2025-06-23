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
    <div className="h-screen w-[64px] md:w-[100%] flex flex-col justify-between border-r border-r-slate-200 shadow-lg p-4">
      <div className="flex gap-6 flex-col">
        <div className="flex items-center gap-2">
          <Brain size={32} color="blue" />
          <p className="text-3xl font-medium text-blue-500">Mentora</p>
        </div>
        <div className="flex flex-col gap-4">
          {navOptions.map((menu, index) => (
            <div
              key={index}
              className="border border-slate-300 px-4 py-2 rounded-lg hover:border-slate-400"
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
                  <p>{menu.title}</p>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <button
        className="border border-slate-300 hover:border-slate-400 px-4 py-2 rounded-lg flex justify-between hover:cursor-pointer hover:text-red-500"
        onClick={() => {
          localStorage.removeItem("Authorization");
          navigate("/");
          toast.success("Logged out successfully");
        }}
      >
        Logout <LogOut color="red" />
      </button>
    </div>
  );
}
