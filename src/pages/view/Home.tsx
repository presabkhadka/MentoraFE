import { Notebook, NotebookTabs, Plus, Share, Trash } from "lucide-react";
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

  type Type = "youtube" | "x";

  let [content, setContent] = useState<Content[]>([]);
  let [title, setTitle] = useState<string>("");
  let [types, setTypes] = useState<Type | null>(null);
  let [link, setLink] = useState<string>("");
  let [tags, setTags] = useState<string>("");
  let [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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
    try {
      await axiosInstace.delete(`/user/delete-content/${id}`);
      toast.success(
        "Content delted successfully, Wait for changes to be applied"
      );
    } catch (error) {
      toast.error("Something went wrong while deleting the content");
    }
  };

  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-12 overflow-hidden">
      <div className="col-span-2 h-full">
        <Sidebar />
      </div>
      <div className="col-span-10 p-6 flex flex-col gap-12 h-full overflow-hidden">
        <div className="flex justify-between items-center ">
          <h1 className="text-3xl font-bold">All Notes</h1>
          <div className="flex gap-2 items-center">
            <Dialog>
              <DialogTrigger className="px-4 py-2 rounded-lg bg-blue-100 text-purple-500 flex gap-2 items-center text-lg hover:cursor-pointer">
                <Share /> Share Brain
              </DialogTrigger>
              <DialogContent>
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
                className="px-4 py-2 rounded-lg bg-blue-600 text-white flex gap-2 items-center text-lg"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <Plus /> Add Content
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-4">
                    Add new contents!
                  </DialogTitle>
                  <DialogDescription>
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                          <label htmlFor="title" className="text-lg text-black">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="Enter title of the content"
                            className="p-2 border border-slate-300 rounded-lg focus:border-slate-400 w-full"
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex gap-2 items-center">
                          <label htmlFor="type" className="text-lg text-black">
                            Type
                          </label>
                          <select
                            name="type"
                            id="type"
                            className="p-2 border border-slate-300 w-full rounded-lg"
                            value={types ?? ""}
                            onChange={(e) => {
                              const value = e.target.value as Type;
                              setTypes(value);
                            }}
                          >
                            <option value="#">Select your content type</option>
                            <option value="youtube">youtube</option>
                            <option value="x">x</option>
                          </select>
                        </div>
                        <div className="flex gap-2 items-center">
                          <label htmlFor="link" className="text-lg text-black">
                            Link
                          </label>
                          <input
                            type="text"
                            placeholder="Enter link of the content"
                            className="p-2 border border-slate-300 rounded-lg focus:border-slate-400 w-full"
                            value={link}
                            onChange={(e) => {
                              setLink(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex gap-2 items-center">
                          <label htmlFor="tags" className="text-lg text-black">
                            Tags
                          </label>
                          <input
                            type="text"
                            placeholder="Enter tags of the content"
                            className="p-2 border border-slate-300 rounded-lg focus:border-slate-400 w-full"
                            value={tags}
                            onChange={(e) => {
                              setTags(e.target.value);
                            }}
                          />
                        </div>
                        <button className="border border-slate-300 rounded-lg px-4 py-2 w-fit self-end bg-green-500 text-white hover:cursor-pointer hover:bg-green-400 hover:scale-105 hover:font-bold">
                          Add Content
                        </button>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {content.length == 0 ? (
          <div className="flex  flex-col justify-center items-center h-full">
            <NotebookTabs size={100} color="gray" />
            <h1 className="text-4xl text-slate-500">
              No contents added as of now
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-scroll">
            {content.map((cnt) => (
              <div
                key={cnt._id}
                className="flex flex-col h-fit gap-6 border border-slate-300 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Notebook color="gray" />
                    <p className="font-semibold text-xl">Project Ideas</p>
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
                    >
                      <Trash color="gray" />
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

                {cnt.type === "x" && (
                  <div>
                    <blockquote className="twitter-tweet">
                      <a href={cnt.link}></a>
                    </blockquote>
                  </div>
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
