import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAddTodo } from "@/features/todo/actions";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newTodo = {
      title,
      description,
    };

    dispatch(fetchAddTodo(newTodo));
    setTitle("");
    setDescription("");
  };
  return (
    <section className="mx-auto mb-8 max-w-4xl rounded-lg bg-white p-4 shadow-md">
      <form
        onSubmit={handleAddTodo}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        <input
          type="text"
          placeholder="Title"
          className="col-span-1 rounded border px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="col-span-1 rounded border px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <select
              defaultValue={"pending"}
              className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-gray-700 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="pending">🕓 Pending</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg
                className="h-6 w-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddTodo;
