import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchDeleteTodo } from "@/features/todo/actions";

const style = {
  pending: "text-yellow-600",
  in_progress: "text-blue-600",
  completed: "text-green-600",
};

function Todo({ tasks }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEdit = (todo) => {
    navigate(`/todos/${todo.id}`);
  };

  const handleDelete = (id) => {
    dispatch(fetchDeleteTodo(id));
  };

  return (
    <section className="w-full px-2 md:w-1/3">
      <header className="mb-4">
        <h3
          className={`text-center text-xl font-semibold ${style[tasks[0]?.status]}`}
        >
          {tasks[0]?.status === "pending" && "Pending"}
          {tasks[0]?.status === "in_progress" && "In Progress"}
          {tasks[0]?.status === "completed" && "Completed"}
        </h3>
      </header>
      <div className="max-h-[70vh] space-y-4 overflow-y-auto">
        {tasks.map((todo) => (
          <article
            key={todo.id}
            className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-md"
          >
            <h4 className="text-lg font-bold text-gray-800">{todo.title}</h4>
            <p
              className={`text-sm text-gray-600 ${todo.status === "in_progress" && "my-[1.6rem]"}`}
            >
              {todo.description}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Created at: {new Date(todo.createdAt).toLocaleString()}
            </p>

            <div className="mt-4 flex items-center justify-between gap-2">
              {todo.status !== "in_progress" && (
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="cursor-pointer rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                  Delete
                </button>
              )}

              {todo.status !== "completed" && (
                <button
                  onClick={() => handleEdit(todo)}
                  className={`cursor-pointer rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600 ${
                    todo.status === "in_progress" ? "ml-auto" : ""
                  }`}
                >
                  Edit
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export default Todo;
