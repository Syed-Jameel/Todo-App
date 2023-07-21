import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, selectAllTodos, selectTodosStatus, updateTodoAsync } from "../todoSlice";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import Loader from "../../common/Loader";

const TodoList = () => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [todoId, setTodoId] = useState(-1);

  const todos = useSelector(selectAllTodos);
  const decendingTodos = todos.slice().sort((a, b) => b.id - a.id);

  const dispatch = useDispatch();
  const todosStatus = useSelector(selectTodosStatus);

  const handleEdit = (todo) => {
    setEditMode(true);
    setTodoId(todo.id);
    setEditedTitle(todo.title);
  };

  const handleSave = (todo) => {
    if (editedTitle.trim() !== "") {
      dispatch(updateTodoAsync({ id: todo.id, title: editedTitle, completed: todo.completed }));
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleStatus = (todo) => {
    const updatedTodo = { ...todo, completed: true };
    console.log(updatedTodo);
    dispatch(updateTodoAsync(updatedTodo));
  };

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodoAsync(todo));
  };

  const chooseStyle = (status) => {
    switch (status) {
      case false:
        return "bg-yellow-200 text-yellow-600";
      case true:
        return "bg-green-200 text-green-600";
      default:
        return "bg-yellow-200 text-yellow-600";
    }
  };

  return (
    <>
      {todosStatus === "loading" && <Loader />}
      {decendingTodos?.map((todo) => (
        <div key={todo.id} className="group relative shadow-lg">
          <div className="w-full h-40 p-2 md:p-4 overflow-hidden flex flex-col justify-between rounded-md bg-gray-200 group-hover:opacity-75 ">
            <div className=" flex flex-col-reverse  sm:flex-row justify-end sm:justify-between gap-2">
              {todoId === todo.id && editMode ? (
                <div className="relative">
                  <textarea value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} rows="4" className="w-full px-2 pt-4 pb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="add new task" />
                  <button onClick={handleCancel} className="absolute top-0 right-0 mx-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 " title="cancel">
                    <XMarkIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <h3 className="text-sm text-gray-700 whitespace-normal break-words sm:max-w-[60%]">{todo.title}</h3>
              )}

              <span className={`${chooseStyle(todo.completed)} h-6 w-full text-center sm:w-auto py-1 sm:px-6 rounded-full text-xs font-semibold`}>{todo.completed ? "Done" : "Active"}</span>
            </div>

            <div className="w-full flex flex-row justify-end items-center">
              <div className="w-1/3 flex flex-row justify-end items-center gap-2">
                {todoId === todo.id && editMode ? (
                  <button onClick={() => handleSave(todo)} className="mx-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 " title="update">
                    <DocumentCheckIcon className="h-4 w-4 text-yellow-400" aria-hidden="true" />
                  </button>
                ) : (
                  <button onClick={() => handleEdit(todo)} className="mx-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 " title="edit">
                    <PencilIcon className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                  </button>
                )}

                {todo.completed !== true && (
                  <button onClick={() => handleStatus(todo)} className="mx-auto flex h-6 w-6   flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 " title="done">
                    <CheckIcon className="h-4 w-4 text-green-400" aria-hidden="true" />
                  </button>
                )}

                <button onClick={() => handleDeleteTodo(todo)} className="mx-auto z-10 flex h-6 w-6   flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 " title="delete">
                  <TrashIcon className="h-4 w-4 text-red-600" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
