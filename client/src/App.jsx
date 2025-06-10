import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import router from "./router";
import store from "./store";
import Loader from "@/components/Loader";
import { fetchMe } from "@/features/auth/actions";

function App() {
  useEffect(() => {
    if (
      localStorage.getItem("isLoggedIn") === "true" &&
      !localStorage.getItem("user")
    ) {
    }
    store.dispatch(fetchMe());
  }, []);

  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster />
    </Provider>
  );
}

export default App;
