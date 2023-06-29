import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

export const Reply = ({ comment, onSubmit, onCancel, visible, refProp }) => {
  if (localStorage.getItem("username") === null) {
    localStorage.setItem("username", "Anonymous");
  }
  const [reply, setReply] = useState({
    votes: 0,
    body: "",
    author: localStorage.getItem("username"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reply);
    setReply({ ...reply, title: "", body: "" });
    reply.date = new Date().toJSON();
    onSubmit?.(comment, reply);
  };

  const handleChange = (e) => {
    setReply({ ...reply, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setReply({ ...reply, author: localStorage.getItem("username") });
  }, [visible]);

  return (
    <div
      className={`${
        visible ? "visible max-h-96 opacity-100" : "invisible max-h-0 opacity-0"
      } transition-all duration-500	`}>
      <div className={`pt-4`}>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full flex-col gap-4 overflow-visible rounded-lg bg-white p-4 align-middle shadow transition-all">
          <div>
            <textarea
              ref={refProp}
              value={reply.body}
              onChange={handleChange}
              id="body"
              name="body"
              rows="3"
              className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"></textarea>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => {
                onCancel(comment, reply);
              }}
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Cancel
            </button>
            <div className="group flex items-baseline gap-1 self-end overflow-clip rounded-md bg-indigo-500 pl-1 text-sm text-white shadow-sm ">
              <input
                value={reply.author}
                onChange={(e) => {
                  localStorage.setItem("username", e.target.value);
                  handleChange(e);
                }}
                placeholder="Username"
                type="text"
                name="author"
                id="author"
                className="ring-none w-28 rounded p-0 py-1 text-center text-gray-900 outline-none placeholder:text-gray-400 "
              />
              <button
                type="submit"
                className="px-8 py-2 font-semibold hover:bg-indigo-400 ">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
