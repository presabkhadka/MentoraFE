import axios from "axios";
import { Eye, EyeClosed, LoaderIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [isVisible, setIsVisible] = useState<boolean>(false);
  let [email, setEmail] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [loading, setLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  let toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let api = import.meta.env.VITE_BASE_URL;
      let response = await axios.post(`${api}/user/login`, {
        email,
        password,
      });

      let token = response.data.msg;

      localStorage.setItem("Authorization", `Bearer ${token}`);

      toast.success("Login successfull");
      navigate("/user/home");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-5 flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-slate-500">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email."
                className="border border-slate-300 px-4 py-2 rounded-lg focus:outline-slate-400 text-slate-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-slate-500">
                Password
              </label>
              <div className="relative">
                <input
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password."
                  className="border border-slate-300 px-4 py-2 rounded-lg focus:outline-slate-400 text-slate-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={toggleVisibility}
                  type="button"
                  className="absolute top-2 right-3"
                >
                  {isVisible ? (
                    <Eye color="gray" />
                  ) : (
                    <EyeClosed color="gray" />
                  )}
                </button>
              </div>
            </div>
            <p className="italic text-slate-500 text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-300 font-semibold underline hover:cursor-pointer"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Resigter
              </span>
            </p>
            <button
              className={`border border-slate-300 flex justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-300 to-green-300 text-white hover:scale-105 hover:cursor-pointer transition-all duration-200 ${
                loading ? "opacity-45 cursor-not-allowed hover:scale-100" : ""
              }`}
              disabled={loading}
            >
              {loading ? <LoaderIcon className="animate-spin"/> : "Login"}
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-7 bg-gradient-to-r from-green-300 to-blue-300 rounded-l-4xl flex justify-center items-center">
        <h3 className="text-4xl text-white font-bold">
          Hi, Welcome back to 👋
          <br />
          <span className="text-8xl text-white font-bold">Mentora</span>
        </h3>
      </div>
    </div>
  );
}
