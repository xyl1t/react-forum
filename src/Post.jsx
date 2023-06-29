import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Link } from "react-router-dom";
import { getCommentCount } from "./utils";
import { useEffect, useState } from "react";

const LinkOrDiv = (props) => {
  return props?.isPreview ? (
    <Link to={props.to} className={props.className} children={props.children} />
  ) : (
    <div className={props.className} children={props.children} />
  );
};

export const Post = ({ post, isPreview, onVote, onReply }) => {
  const storageKey = `post_vote_${post?._id}`;
  const [commentCount, setCommentCount] = useState(0);
  const [vote, setVote] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const commentCount = await getCommentCount(post?.commentIds);
      setCommentCount(commentCount);
    };
    fetchData();

    setVote(parseInt(localStorage.getItem(storageKey) ?? 0));
  }, [post]);

  const handleUpVote = () => {
    if (vote === 1) {
      setVote(0);
      localStorage.setItem(storageKey, 0);
      onVote(post, -1);
    } else {
      setVote(1);
      localStorage.setItem(storageKey, 1);
      onVote(post, vote === -1 ? 2 : 1);
    }
  };
  const handleDownVote = () => {
    if (vote === -1) {
      setVote(0);
      localStorage.setItem(storageKey, 0);
      onVote(post, 1);
    } else {
      setVote(-1);
      localStorage.setItem(storageKey, -1);
      onVote(post, vote === 1 ? -2 : -1);
    }
  };

  return (
    <div
      className={`mx-auto flex ${
        isPreview ? "max-h-64 hover:shadow-lg" : ""
      } group/comment relative w-full rounded-lg bg-white align-middle shadow transition-all `}>
      <div className="flex flex-col items-center justify-between gap-2 rounded-l-lg bg-slate-50 p-2">
        <div className="flex w-8 shrink-0 flex-col items-center gap-0">
          <button
            onClick={handleUpVote}
            className={`flex w-full justify-center transition-all hover:scale-125 hover:text-green-600 active:scale-100 active:text-green-700 ${
              vote === 1 ? "text-green-600" : "text-slate-500 "
            }`}>
            <ChevronUpIcon
              className={`box-content h-6 w-6 rounded-full p-0.5 ${
                vote === 1 ? "bg-green-50" : ""
              }`}
            />
          </button>
          {post?.votes}
          <button
            onClick={handleDownVote}
            className={`flex w-full justify-center transition-all hover:scale-125 hover:text-red-600 active:scale-100 active:text-red-700 ${
              vote === -1 ? "text-red-600" : "text-slate-500 "
            }`}>
            <ChevronDownIcon
              className={`box-content h-6 w-6 rounded-full p-0.5 ${
                vote === -1 ? "bg-red-50" : ""
              }`}
            />
          </button>
        </div>
        <div className="relative text-slate-400">
          <ChatBubbleLeftIcon className="h-7 w-7 text-slate-400" />
          <div className="absolute left-0 top-1 w-full text-center text-xs font-bold">
            {commentCount}
          </div>
        </div>
      </div>

      <LinkOrDiv
        isPreview={isPreview ? true : false}
        to={`/posts/${post?._id}`}
        className="relative flex w-full flex-col gap-2 overflow-clip rounded-r-lg p-3">
        <div className="flex justify-between">
          <div className="text-sm text-slate-500">Posted by {post?.author}</div>
          <div className="text-sm text-slate-500">
            {moment(post?.date).fromNow()}
          </div>
        </div>
        <h3 className="text-xl text-blue-800">{post?.title}</h3>
        {/* <p className="whitespace-pre-line break-words">{post?.body}</p> */}
        <p className={`${isPreview ? "" : "whitespace-pre-line"} break-words`}>
          {post?.body}
        </p>
        {isPreview && post?.body.length > 200 ? (
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-white" />
        ) : null}
        {/* <div className="absolute bottom-3 inset-x-0 w-full text-center z-100">Read more &gt;</div> */}
      </LinkOrDiv>

      <div className="absolute -right-0 -top-0 scale-50 opacity-0 transition-all group-hover/comment:scale-100 group-hover/comment:opacity-100">
        <button
          onClick={() => {onReply?.(post)}}
          className="group/button absolute -right-3 -top-3 rounded-full border-4 border-blue-50 transition-all hover:scale-110 active:scale-100">
          <ArrowUturnLeftIcon className="h-6 w-6 rounded-full bg-white p-1 text-slate-700 shadow-sm transition-all group-hover/button:shadow-md" />
        </button>
      </div>
    </div>
  );
};
