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
        <header role="heading" aria-level={1} className="text-center mb-6">
          <h1 className="text-3xl font-bold max-[390px]:text-center">
            Welcome to Your Task Manager
          </h1>
        </header>

        <section
          className="text-center max-w-full sm:max-w-md mx-auto mb-6"
          role="region"
          aria-label="App overview"
          id="app-description"
        >
          <p className="text-base text-stone-700">
            Effortlessly manage tasks — fetch, search, filter, and add todos to stay organized.
          </p>
        </section>

        <Link to="/todos">
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            aria-label="Navigate to todos page to fetch, filter, and create tasks"
            aria-describedby="app-description"
          >
            Fetch Todos
          </Button>
        </Link>
      </main>
    </>
  );
}
