import { useEffect, useState } from "react";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";

function StartPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/posts?_sort=date&_order=desc");
      const data = await response.json();
      setPosts(data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (post) => {
    try {
      let response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      let data = await response.json();
      console.log(data);

      response = await fetch("/api/posts?_sort=date&_order=desc");
      data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVote = async (post, diff) => {
    try {
      post.votes += diff;

      let response = await fetch("/api/posts/" + post._id, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes: post.votes }),
      });
      let data = await response.json();
      console.log(data);

      setPosts([...posts]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 pb-10 transition-all">
      <CreatePost onSubmit={handleSubmit} />
      {posts.map((p) => (
        <Post key={p._id} post={p} isPreview={true} onVote={handleVote} />
      ))}
    </div>
  );
}

export default StartPage;
