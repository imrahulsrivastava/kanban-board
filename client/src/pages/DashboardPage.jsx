import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos } from "@/features/todo/actions";
import AddTodo from "@/components/Todo/AddTodo";
import ShowTodo from "@/components/Todo/ShowTodo";
import Footer from "@/components/Todo/Footer";
import { getTodos } from "@/features/todo/slice";

function DashboardPage() {
  const todos = useSelector((state) => state.todo.data);
  const status = useSelector((state) => state.todo.status);
  const error = useSelector((state) => state.todo.error);

  const dispatch = useDispatch();

  const pending = todos?.filter((todo) => todo.status === "pending") || [];
  const inProgress =
    todos?.filter((todo) => todo.status === "in_progress") || [];
  const completed = todos?.filter((todo) => todo.status === "completed") || [];

  useEffect(() => {
    dispatch(getTodos);
  }, [dispatch]);

  useEffect(() => {
    if (!todos) dispatch(fetchAllTodos());
  }, []);

  return (
    <section className="max-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h2 className="text-center text-3xl font-bold text-blue-800">
          Kanban Board
        </h2>
      </header>

      <AddTodo />

      <main className="flex flex-col gap-4 md:flex-row">
        {todos?.length === 0 ? (
          <div className="flex w-full items-center justify-center rounded-lg bg-white p-6 shadow-md">
            <p className="text-lg font-semibold text-gray-600">
              No todos found. Start by adding one!
            </p>
          </div>
        ) : (
          <>
            <ShowTodo key="pending" tasks={pending} />
            <ShowTodo key="in_progress" tasks={inProgress} />
            <ShowTodo key="completed" tasks={completed} />
          </>
        )}
      </main>

      <Footer status={status} error={error} />
    </section>
  );
}

export default DashboardPage;
