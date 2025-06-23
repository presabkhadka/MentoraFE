import axiosInstace from "@/api/axiosInstance";
import Sidebar from "@/components/Sidebar";
import { Link, LoaderIcon, Notebook, Share, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function X() {
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
  let [loading, setLoading] = useState<boolean>(false);
  let [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let fetchContent = async () => {
      try {
        let response = await axiosInstace.get("/user/x-content");
        setContent(response.data.content);
      } catch (error) {
        toast.error("Something went wrong while fetching the contents");
      } finally {
      }
    };
    fetchContent();
    let interval = setInterval(fetchContent, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  let handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axiosInstace.delete(`/user/delete-content/${id}`);
      toast.success(
        "Content deleted successfully, Wait for changes to be applied"
      );
    } catch (error) {
      toast.error("Something went wrong while deleting the content");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen overflow-hidden">
      <div className="col-span-2 h-full">
        <Sidebar />
      </div>
      <div className="col-span-10 p-6 flex flex-col gap-12 h-full overflow-hidden">
        <p className="text-2xl font-bold text-center">
          All your URL based Contents
        </p>
        {content.length === 0 ? (
          <div className="flex  flex-col justify-center items-center h-full">
            <Link size={100} color="gray" />
            <h1 className="text-4xl text-slate-500 flex gap-2 items-center">
              Loading contents{" "}
              <LoaderIcon className="animate-spin transition-all" />
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-scroll">
            {content.map((cnt) => (
              <div
                key={cnt._id}
                className="flex flex-col gap-6 border border-slate-300 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Notebook color="gray" />
                    <p className="font-semibold text-xl">Contents</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="hover:cursor-pointer">
                      <Share color="gray" />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(cnt._id);
                      }}
                      className="hover:cursor-pointer"
                      key={cnt._id}
                    >
                      {deletingId === cnt._id ? (
                        <LoaderIcon className="animate-spin transition-all" />
                      ) : (
                        <Trash color="gray" />
                      )}
                    </button>
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{cnt.title}</h2>

                {cnt.type === "x" && (
                  <a
                    href={cnt.link}
                    target="_blank"
                    className="text-2xl text-blue-500 underline h-[315px] flex justify-center items-center"
                  >
                    Go to link
                  </a>
                )}

                <p className="bg-blue-100 text-purple-500 w-fit py-1 px-2 rounded-xl">
                  #{cnt.tags.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
