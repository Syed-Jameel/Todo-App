import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchAllTodosAsync } from "./features/todo/todoSlice";
import Todo from "./features/todo/components/Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTodosAsync());
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Todo />
    </>
  );
}

export default App;
