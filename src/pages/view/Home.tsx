import { Notebook, Plus, Share, Trash } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstace from "../../api/axiosInstance";
import toast from "react-hot-toast";

export default function Home() {
  interface Content {
    _id: string;
    link: string;
    type: string;
    title: string;
    tags: {
      _id: string;
      title: string;
    };
    userId: string;
  }

  let [content, setContent] = useState<Content[]>([]);

  useEffect(() => {
    let fetchContent = async () => {
      try {
        let response = await axiosInstace.get("/user/content");
        setContent(response.data.contents);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };
    fetchContent();
  }, []);

  let handleDelete = async (id: string) => {
    try {
      await axiosInstace.delete(`/user/delete-content/${id}`);
      toast.success("Content delted successfully");
    } catch (error) {
      toast.error("Something went wrong while deleting the content");
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10 p-6 flex flex-col gap-12">
        <div className="flex justify-between items-center ">
          <h1 className="text-3xl font-bold">All Notes</h1>
          <div className="flex gap-2 items-center">
            <button className="px-4 py-2 rounded-lg bg-blue-100 text-purple-500 flex gap-2 items-center text-lg">
              <Share /> Share Brain
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white flex gap-2 items-center text-lg">
              <Plus /> Add Content
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {content.map((cnt) => (
            <div
              key={cnt._id}
              className="flex flex-col gap-6 border border-slate-300 p-4 rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Notebook color="gray" />
                  <p className="font-semibold text-xl">Project Ideas</p>
                </div>
                <div className="flex gap-2">
                  <button>
                    <Share color="gray" />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(cnt._id);
                    }}
                  >
                    <Trash color="gray" />
                  </button>
                </div>
              </div>
              <h2 className="text-2xl font-bold">{cnt.title}</h2>
              <p>{cnt.link}</p>
              <p className="bg-blue-100 text-purple-500 w-fit py-1 px-2 rounded-xl">
                #{cnt.tags.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
