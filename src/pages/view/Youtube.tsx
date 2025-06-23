import axiosInstace from "@/api/axiosInstance";
import Sidebar from "@/components/Sidebar";
import { LoaderIcon, Notebook, Share, Trash, Video } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Youtube() {
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
  let [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let fetchContent = async () => {
      try {
        let response = await axiosInstace.get("/user/yt-content");
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
    <div className="h-screen grid grid-cols-1 md:grid-cols-12 overflow-hidden">
      <div className="col-span-2 h-full">
        <Sidebar />
      </div>
      <div className="col-span-10 p-6 flex flex-col gap-12 h-full overflow-hidden">
        <p className="text-2xl font-bold text-center">
          All your youtube based Contents
        </p>
        {content.length === 0 ? (
          <div className="flex  flex-col justify-center items-center h-full">
            <Video size={100} color="gray" />
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

                {cnt.type === "youtube" && (
                  <iframe
                    width="100%"
                    height="315"
                    className="rounded-lg"
                    src={cnt.link.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
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
