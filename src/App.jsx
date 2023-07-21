import { useEffect } from "react";
// import "./App.css";
import { useDispatch } from "react-redux";
import { fetchAllTodosAsync } from "./features/todo/todoSlice";
import Todo from "./features/todo/components/Todo";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTodosAsync());
  }, []);

  return (
    <>
      <Todo />
    </>
  );
}

export default App;
