import { Eye, EyeClosed, LoaderIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  let [username, setUsername] = useState<string>("");
  let [email, setEmail] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [isVisible, setIsVisible] = useState<boolean>(false);
  let [loading, setLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  let toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!username || username.length < 3) {
      toast.error("Username must be at least 3 characters");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    try {
      let api = import.meta.env.VITE_BASE_URL;
      await axios.post(`${api}/user/signup`, {
        username,
        email,
        password,
      });

      toast.success("Signup successfull");
      navigate("/");
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
      <div className="col-span-5 flex flex-col md:flex-row items-center justify-center">
        <h3 className="text-3xl font-bold md:hidden text-center pt-6">
           Register an account ✅
          <br />
          <span className="text-5xl font-bold">Mentora</span>
        </h3>
        <div className="h-full flex items-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="username" className="text-slate-500">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter a username"
                  className="border border-slate-300 px-4 py-2 rounded-lg focus:outline-slate-400 text-slate-500"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-slate-500">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter a email"
                  className="border border-slate-300 px-4 py-2 rounded-lg focus:outline-slate-400 text-slate-500"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-slate-500">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="border border-slate-300 px-4 py-2 rounded-lg focus:outline-slate-400 text-slate-500"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button
                    className="absolute right-3 top-2"
                    type="button"
                    onClick={toggleVisibility}
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
                Already have an account?{" "}
                <span
                  className="text-blue-300 font-semibold underline hover:cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login
                </span>
              </p>
              <button
                className={`px-4 py-2 rounded-lg text-white font-bold flex justify-center ${
                  loading
                    ? "bg-blue-500 cursor-not-allowed opacity-45"
                    : "bg-blue-300 hover:cursor-pointer hover:bg-blue-400 hover:scale-105 transition-all"
                }`}
              >
                {loading ? (
                  <LoaderIcon className="animate-spin transition-all" />
                ) : (
                  "Signup"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden col-span-7 bg-gradient-to-r from-green-300 to to-blue-300 rounded-l-4xl md:flex justify-center items-center">
        <h3 className="text-4xl text-white font-bold">
          Register an account ✅
          <br />
          <span className="text-8xl">Mentora</span>
        </h3>
      </div>
    </div>
  );
}
