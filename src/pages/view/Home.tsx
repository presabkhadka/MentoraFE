import {
  LoaderIcon,
  Notebook,
  NotebookTabs,
  Plus,
  Share,
  Trash,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import React, { useEffect, useState } from "react";
import axiosInstace from "../../api/axiosInstance";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  type Type = "youtube" | "x" | "article";

  let [content, setContent] = useState<Content[]>([]);
  let [title, setTitle] = useState<string>("");
  let [types, setTypes] = useState<Type | null>(null);
  let [link, setLink] = useState<string>("");
  let [tags, setTags] = useState<string>("");
  let [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  let [loading, setLoading] = useState<boolean>(false);
  let [deletingId, setDeletingId] = useState<string | null>(null);

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
    let interval = setInterval(fetchContent, 10000);
    return () => clearInterval(interval);
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

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstace.post("/user/add-content", {
        title,
        link,
        tags,
        type: types,
      });
      setIsDialogOpen(false);
      setTitle("");
      setLink("");
      setTags("");
      setTypes(null);
      toast.success(
        "Content added successfully, Wait for changes to be applied"
      );
    } catch (error) {
      toast.error("Something went wrong while adding the content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 overflow-hidden">
      <div className="col-span-1 md:col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-1 md:col-span-10 p-4 md:p-6 flex flex-col gap-8 md:gap-12 overflow-hidden">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">All Contents</h1>
          <div className="flex flex-wrap gap-2 items-center">
            <Dialog>
              <DialogTrigger className="px-4 py-2 rounded-lg bg-blue-100 text-purple-500 flex gap-2 items-center text-base hover:cursor-pointer">
                <Share /> Share Contents
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto px-2 md:px-4">
                <DialogHeader>
                  <DialogTitle>Share your contents with others</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger
                className="px-4 py-2 rounded-lg bg-blue-600 text-white flex gap-2 items-center text-base hover:cursor-pointer"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <Plus /> Add Content
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto px-2 md:px-4">
                <DialogHeader>
                  <DialogTitle className="text-xl md:text-2xl mb-4">
                    Add new contents!
                  </DialogTitle>
                  <DialogDescription>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-base text-black">
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="Enter title of the content"
                          className="p-2 border border-slate-300 rounded-lg focus:border-slate-400 w-full text-sm md:text-base"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="type" className="text-base text-black">
                          Type
                        </label>
                        <select
                          name="type"
                          id="type"
                          className="p-2 border border-slate-300 w-full rounded-lg text-sm md:text-base"
                          value={types ?? ""}
                          onChange={(e) => {
                            const value = e.target.value as Type;
                            setTypes(value);
                          }}
                        >
                          <option value="" disabled>
                            Select your content type
                          </option>
                          <option value="youtube">Youtube</option>
                          <option value="x">Links</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="link" className="text-base text-black">
                          Link
                        </label>
                        <input
                          type="text"
                          placeholder="Enter link of the content"
                          className="p-2 border border-slate-300 rounded-lg focus:border-slate-400 w-full text-sm md:text-base"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="tags" className="text-base text-black">
                          Tags
                        </label>
                        <input
                          type="text"
                          placeholder="Enter tags of the content"
                          className="p-2 border border-slate-300 rounded-lg focus:border-slate-400 w-full text-sm md:text-base"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        />
                      </div>
                      <button
                        className={`border border-slate-300 rounded-lg px-4 py-2 w-fit self-end text-white font-bold text-sm md:text-base ${
                          loading
                            ? "cursor-not-allowed opacity-45 bg-green-500"
                            : "bg-green-500 hover:bg-green-400 hover:scale-105 hover:cursor-pointer"
                        }`}
                        disabled={loading}
                      >
                        {loading ? (
                          <LoaderIcon className="animate-spin" />
                        ) : (
                          "Add Content"
                        )}
                      </button>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {content.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full py-8">
            <NotebookTabs size={80} color="gray" />
            <h1 className="text-xl md:text-2xl text-slate-500 flex gap-2 items-center mt-4">
              Loading Contents
              <LoaderIcon className="animate-spin transition-all" />
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-scroll max-h-[85vh]">
            {content.map((cnt) => (
              <div
                key={cnt._id}
                className="flex flex-col gap-6 border border-slate-300 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Notebook color="gray" />
                    <p className="font-semibold text-base md:text-xl">
                      Contents
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="hover:cursor-pointer">
                      <Share color="gray" />
                    </button>
                    <button
                      onClick={() => handleDelete(cnt._id)}
                      className="hover:cursor-pointer"
                    >
                      {deletingId === cnt._id ? (
                        <LoaderIcon className="animate-spin transition-all" />
                      ) : (
                        <Trash color="gray" />
                      )}
                    </button>
                  </div>
                </div>
                <h2 className="text-lg md:text-2xl font-bold">{cnt.title}</h2>
                {cnt.type === "youtube" && (
                  <iframe
                    width="100%"
                    height="215"
                    className="rounded-lg"
                    src={cnt.link.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}

                {cnt.type === "x" && (
                  <a
                    href={cnt.link}
                    target="_blank"
                    className="text-base md:text-xl text-blue-500 underline h-[215px] flex justify-center items-center"
                  >
                    Go to link
                  </a>
                )}

                <p className="bg-blue-100 text-purple-500 w-fit py-1 px-2 rounded-xl text-sm md:text-base">
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
