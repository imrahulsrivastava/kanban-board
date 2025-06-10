import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateTodo } from "@/features/todo/actions";

function EditTodo() {
  const { id } = useParams();
  const todos = useSelector((state) => state.todo.data);
  const todo = todos.find((item) => item.id === id);

  const dispatch = useDispatch();

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [statusInput, setStatusInput] = useState(todo.status);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const updatedTodo = {
      id: todo.id,
      title,
      description,
      status: statusInput,
    };

    dispatch(fetchUpdateTodo(updatedTodo));
    navigate("/dashboard");
  };

  return (
    <section className="mx-auto mb-8 max-w-4xl rounded-lg bg-white p-4 shadow-md">
      <form
        onSubmit={handleSubmit}
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
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
              className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-gray-700 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="pending">🕓 Pending</option>
              <option value="in_progress">🔧 In Progress</option>
              <option value="completed">✅ Completed</option>
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
            Edit
          </button>
        </div>
      </form>
    </section>
  );
}
export default EditTodo;
