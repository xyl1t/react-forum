import { useState } from "react";

export const CommentArea = ({onSubmit, refProp}) => {
  if (localStorage.getItem("username") === null) {
    localStorage.setItem("username", "Anonymous");
  }
  const [comment, setComment] = useState({
    body: "",
    votes: 0,
    author: localStorage.getItem("username"),
  });
  const handleSearch = (e) => {
    e.preventDefault();

    comment.date = new Date().toJSON();
    onSubmit(comment);

    setComment({ ...comment, title: "", body: "" });
  };

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto flex w-full flex-col gap-4 overflow-clip rounded-lg bg-white p-4 align-middle shadow transition-all">
      <div>
        <label
          htmlFor="body"
          className="mb-2 block font-medium leading-6 text-gray-900">
          Comment
        </label>
        <textarea
          ref={refProp}
          value={comment.body}
          onChange={handleChange}
          id="body"
          name="body"
          rows="3"
          className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"></textarea>
      </div>

      <div className="group flex items-baseline gap-1 self-end overflow-clip rounded-md bg-indigo-500 pl-1 text-sm text-white shadow-sm ">
        <input
          value={comment.author}
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
    </form>
  );
};
