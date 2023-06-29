import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "./Post";
import { CommentArea } from "./CommentArea";
import { CommentBlock } from "./CommentBlock";

export const PostDetail = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const postResponse = await fetch(`/api/posts/${postId}`);
      const postData = await postResponse.json();

      if (postData?.commentIds) {
        const commentsData = [];
        for (const id of postData?.commentIds) {
          const commentResp = await fetch(`/api/comments/${id}`);
          const commentData = await commentResp.json();
          commentsData.push(commentData);
        }

        postData.comments = commentsData;
      }

      setPost(postData);
    };

    fetchData();
  }, []);

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

      setPost(post);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (comment) => {
    try {
      let response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      let newComment = await response.json();

      if (!Array.isArray(post.commentIds)) {
        post.commentIds = [];
      }

      post.commentIds = [...post.commentIds, newComment._id];
      setPost(structuredClone(post));

      await fetch(`/api/posts/${post?._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentIds: post.commentIds }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const commentRef = useRef(null);

  return (
    <div className="mx-auto w-full max-w-4xl pb-10 transition-all">
      <div className="mb-8 w-full transition-all">
        <Post
          post={post}
          onVote={handleVote}
          onReply={() => {
            console.log(commentRef)
            commentRef.current.scrollIntoView({ behavior: 'smooth' });
            commentRef.current.focus();
          }}
        />
        {post?.commentIds ? (
          <CommentBlock commentIds={post.commentIds} />
        ) : null}
      </div>
      <CommentArea onSubmit={handleSubmit} refProp={commentRef} />
    </div>
  );
};
