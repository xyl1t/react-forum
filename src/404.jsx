import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-green-700">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Seite nicht gefunden
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Es tut uns leid, wir haben die gewünschte Seite leider nicht
            gefunden.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-green-700 px-3.5 py-2.5 text-sm font-semibold text-white no-underline shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Zurück Nachhause
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function oldErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
