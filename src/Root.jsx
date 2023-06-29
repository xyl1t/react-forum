import { Outlet, ScrollRestoration } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-blue-50">
      <a
        className="mx-auto my-6 w-32 text-center text-3xl font-semibold tracking-wider text-blue-800"
        href="/">
        Forum
      </a>
      <div className="mx-auto flex flex-col gap-4 pb-10 w-full">
        <Outlet />
        <ScrollRestoration/>
      </div>
    </div>
  );
}
