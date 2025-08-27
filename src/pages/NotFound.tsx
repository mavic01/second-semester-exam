import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      role="main"
      className="min-h-screen flex flex-col items-center justify-center bg-stone-100 text-center px-4"
      aria-label="404 Page Not Found"
    >
      <header role="banner">
        <h1
          className="text-4xl font-extrabold text-orange-600 mb-2"
          role="heading"
          aria-level={1}
        >
          404 - Page Not Found
        </h1>
        <p
          className="text-stone-700 text-lg mb-6"
          aria-label="Oops! Page not found emoji"
        >
          Oops! Page not found 👀
        </p>
      </header>

      <section role="region" aria-label="Go back home section">
        <Link
          to="/"
          aria-label="Navigate back to the homepage"
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 rounded"
        >
          <Button
            variant="outline"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2"
          >
            ← Back Home
          </Button>
        </Link>
      </section>
    </main>
  );
}
