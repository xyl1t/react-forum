import { useEffect, useState, Fragment, useRef } from "react";
import { getCommentCount } from "./utils";
import { Comment } from "./Comment";
import { CommentArea } from "./CommentArea";
import { Reply } from "./Reply";
import { comment } from "postcss";

export const CommentBlock = ({ commentIds, children }) => {
  const [comments, setComments] = useState(undefined);
  const [replying, setReplying] = useState({});

  const replyRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!Array.isArray(commentIds)) return;

      const arr = [];
      for (const cId of commentIds) {
        const resp = await fetch(`/api/comments/${cId}?_sort=date&_order=desc`);
        const data = await resp.json();

        arr.push(data);
      }
      setComments(arr);
      const rep = arr.reduce((p, v) => ({ ...p, [v._id]: false }), {});
      setReplying(rep);
    };
    fetchData();
  }, [commentIds]);

  const handleVote = async (comment, diff) => {
    try {
      comment.votes += diff;

      let response = await fetch("/api/comments/" + comment._id, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes: comment.votes }),
      });
      let data = await response.json();
      console.log(data);

      const arr = [];
      for (const cId of commentIds) {
        const resp = await fetch("/api/comments/" + cId);
        const data = await resp.json();

        arr.push(data);
      }
      setComments(arr);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReply = (comment) => {
    replying[comment._id] = !replying[comment._id];
    setReplying({ ...replying });
    if (replying[comment._id]) {
      replyRef.current.scrollIntoView({ behavior: "smooth" });
      replyRef.current.focus();
    }
  };

  const handleSubmit = async (comment, reply) => {
    console.log(reply);

    try {
      let response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reply),
      });
      let newComment = await response.json();

      const idx = comments.findIndex((c) => c._id === comment._id);

      if (!Array.isArray(comments[idx].commentIds)) {
        comments[idx].commentIds = [];
      }

      const newCommentIds = [...comments[idx].commentIds, newComment._id];
      console.log("newCommentIds", comments[idx]);

      await fetch(`/api/comments/${comment?._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentIds: newCommentIds,
        }),
      });

      comments[idx].commentIds = newCommentIds;
      console.log(comments[idx]);

      setComments([...comments]);
    } catch (err) {
      console.error(err);
    }

    replying[comment._id] = !replying[comment._id];
    setReplying({ ...replying });
  };

  return (
    <div className="ml-3 border-l-2 border-slate-300 pl-3 transition-all">
      {comments?.map((c) => (
        <Fragment key={c._id}>
          <Comment comment={c} onVote={handleVote} onReply={handleReply} />
          <CommentBlock commentIds={c.commentIds}>
            <Reply
              refProp={replyRef}
              comment={c}
              visible={replying[c._id]}
              onSubmit={handleSubmit}
              onCancel={() => {
                replying[c._id] = !replying[c._id];
                setReplying({ ...replying });
              }}
            />
          </CommentBlock>
        </Fragment>
      ))}
      {children}
    </div>
  );
};
