import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/myComponents/NavBar";

export default function Home() {
  return (
    <>
      <nav role="banner" aria-label="Site navigation">
        <Navbar />
      </nav>
      <main
        className="min-h-screen flex flex-col justify-center items-center bg-stone-100 text-stone-800 p-6"
        role="main"
        aria-label="Homepage main content"
      >
        <header>
          <h1
            className="text-3xl font-bold mb-6 max-[390px]:text-center"
            role="heading"
            aria-level="1"
          >
            Welcome to Your Task Manager
          </h1>
        </header>

        <section
          className="text-center max-w-full sm:max-w-md mx-auto mb-6"
          role="region"
          aria-label="App description"
        >
          <p>
            Get started by fetching sample todos from the JSONPlaceholder API to
            stay organized and productive. The app lets you view all todos,
            fetch a todo by ID, search by title, and filter by completion
            status.
          </p>
        </section>

        <section role="region" aria-label="Call to action section">
          <Link to="/todos">
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              aria-label="Go to todos page to fetch and manage tasks"
            >
              Fetch Todos
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
}
