import { Bird, Brain, Link, Notebook, Tag, Video } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  let navOptions = [
    { title: "Tweets", icon: <Bird />, path: "/user/tweets" },
    { title: "Videos", icon: <Video />, path: "/user/videos" },
    { title: "Contents", icon: <Notebook />, path: "/user/contents" },
    { title: "Links", icon: <Link />, path: "/user/links" },
    { title: "Tags", icon: <Tag />, path: "/user/tags" },
  ];

  return (
    <div className="h-screen w-[64px] md:w-[200px] flex flex-col justify-between shadow-lg border-r p-4">
      <div className="flex gap-6 flex-col">
        <div className="flex items-center gap-2">
          <Brain size={32} color="blue"/>
          <p className="text-3xl font-medium text-blue-500">Mentora</p>
        </div>
        <div className="flex flex-col gap-4">
          {navOptions.map((menu, index) => (
            <div key={index}>
              <NavLink
                to={menu.path}
                className={({ isActive }) => (isActive ? "text-lg hover:bg-blue-400 active:text-green-500" : "text-lg hover:text-slate-500")}
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
      <button className="border px-4 py-2 rounded-lg">Logout</button>
    </div>
  );
}
