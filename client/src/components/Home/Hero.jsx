import image from "@/assets/img/kanban-img.webp";

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
      <article className="order-1 flex flex-col gap-6 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Kanban Board
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-700 md:mx-0">
          Kanban Board is a simple and intuitive web application designed to
          help you organize tasks, track progress, and boost productivity using
          a visual board system.
        </p>
      </article>

      <figure className="order-2 flex justify-center">
        <img
          src={image}
          alt="Illustration of a kanban board"
          loading="lazy"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </figure>
    </section>
  );
}

export default Hero;
