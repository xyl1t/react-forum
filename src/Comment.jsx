import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import { useState } from "react";

export const Comment = ({ comment, onVote, onReply }) => {
  const storageKey = `comment_vote_${comment?._id}`;
  const [vote, setVote] = useState(
    parseInt(localStorage.getItem(storageKey) ?? 0)
  );

  const handleUpVote = () => {
    if (vote === 1) {
      setVote(0);
      localStorage.setItem(storageKey, 0);
      onVote(comment, -1);
    } else {
      setVote(1);
      localStorage.setItem(storageKey, 1);
      onVote(comment, vote === -1 ? 2 : 1);
    }
  };
  const handleDownVote = () => {
    if (vote === -1) {
      setVote(0);
      localStorage.setItem(storageKey, 0);
      onVote(comment, 1);
    } else {
      setVote(-1);
      localStorage.setItem(storageKey, -1);
      onVote(comment, vote === 1 ? -2 : -1);
    }
  };

  return (
    <div className="pt-4 transition-all">
      <div className="group/comment relative mx-auto flex rounded-lg bg-white align-middle shadow">
        <div className="box-content flex w-8 shrink-0 flex-col items-center gap-1 rounded-l-lg bg-slate-50 p-2">
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
          {comment?.votes}
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

        <div className="relative flex w-full flex-col gap-2 overflow-clip rounded-r-lg p-3">
          <div className="flex justify-between">
            <div className="text-sm text-slate-500">
              Commented by {comment?.author}
            </div>
            <div className="text-sm text-slate-500">
              {moment(comment?.date).fromNow()}
            </div>
          </div>
          <p className={"whitespace-pre-line break-words"}>{comment?.body}</p>
        </div>

        <div className="absolute -right-0 -top-0 scale-50 opacity-0 transition-all group-hover/comment:scale-100 group-hover/comment:opacity-100">
          <button
            onClick={() => {onReply?.(comment)}}
            className="group/button absolute -right-3 -top-3 rounded-full border-4 border-blue-50 transition-all hover:scale-110 active:scale-100">
            <ArrowUturnLeftIcon className="h-6 w-6 rounded-full bg-white p-1 text-slate-700 shadow-sm transition-all group-hover/button:shadow-md" />
          </button>
        </div>
      </div>
    </div>
  );
};
