import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function Try() {
  interface ContentInterface {
    title: string;
    tag: string;
    link: string;
    _id: string;
    type: {
      _id: string;
      title: string;
    };
  }

  let queryClient = new QueryClient();
  let { data, isLoading, error } = useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      let response = await axios.get("http://localhost:7272/user/try");
      return response.data.content;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      {data.map((ctx: ContentInterface) => (
        <div key={ctx._id}>
          <h1>{ctx.title}</h1>
          <p>{ctx.link}</p>
        </div>
      ))}
    </div>
  );
}
