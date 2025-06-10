function KeyFeatures() {
  return (
    <section
      aria-labelledby="key-features-heading"
      className="mx-auto w-full max-w-4xl rounded-lg border-2 bg-white p-6 shadow-md sm:p-8"
    >
      <header>
        <h2
          id="key-features-heading"
          className="mb-8 text-center text-3xl font-extrabold text-gray-900 underline decoration-blue-500"
        >
          Key Features
        </h2>
      </header>

      <div className="grid gap-8 text-lg text-gray-700 sm:grid-cols-2">
        <ul className="flex list-none flex-col gap-4">
          <li>🔑 Register</li>
          <li>📝 Create Task</li>
          <li>❌ Delete Task</li>
        </ul>
        <ul className="flex list-none flex-col gap-4">
          <li>🔐 Login</li>
          <li>✏️ Update Task</li>
          <li>📋 Drag and Drop Task</li>
        </ul>
      </div>
    </section>
  );
}

export default KeyFeatures;
