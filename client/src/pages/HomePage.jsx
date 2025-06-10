import { Outlet, useLocation } from "react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Home/Hero";
import KeyFeatures from "@/components/Home/KeyFeatures";

function HomePage() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-gray-50 px-4 py-10 sm:px-8 md:px-20 lg:px-28">
        {location.pathname === "/" ? (
          <section className="flex flex-col items-center gap-16">
            <Hero />
            <KeyFeatures />
          </section>
        ) : (
          <section className="w-full">
            <Outlet />
          </section>
        )}
      </main>
    </>
  );
}

export default HomePage;
