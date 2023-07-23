import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, fetchAllTodosAsync, selectAllTodos, selectTodosStatus, updateTodoAsync } from "../todoSlice";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import Loader from "../../common/Loader";
import { toast } from "react-toastify";

const TodoList = ({ selectedFilterOption, setSelectedFilterOption, currentTodos }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [todoId, setTodoId] = useState(-1);

  const todos = useSelector(selectAllTodos);

  const dispatch = useDispatch();
  const todosStatus = useSelector(selectTodosStatus);

  const handleEdit = (todo) => {
    setEditMode(true);
    setTodoId(todo.id);
    setEditedTitle(todo.title);
  };

  const handleSave = (todo) => {
    if (editedTitle.trim() !== "") {
      dispatch(updateTodoAsync({ id: todo.id, title: editedTitle, completed: todo.completed }))
        .then(() => {
          setEditMode(false);
          toast.success("👍todo updated successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleStatus = (todo) => {
    const updatedTodo = { ...todo, completed: true };
    dispatch(updateTodoAsync(updatedTodo))
      .then(() => {
        if (selectedFilterOption === "Active") {
          dispatch(fetchAllTodosAsync());
          setSelectedFilterOption("All");
        }
        toast.info("👍todo's status changed!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodoAsync(todo))
      .then(() => {
        toast.success("👍todo has been successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const chooseStyle = (status) => {
    switch (status) {
      case false:
        return "bg-amber-200 text-amber-600 border border-amber-600";
      case true:
        return "bg-green-200 text-green-600 border border-green-600";
      default:
        return "bg-amber-200 text-amber-600 border border-amber-600";
    }
  };

  return (
    <>
      {todosStatus === "loading" && <Loader />}
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {currentTodos?.map((todo) => (
          <div key={todo.id} className="group relative z-10 shadow-lg rounded-lg bg-gray-200 group-hover:opacity-75">
            <div className="w-full h-40 p-4 overflow-hidden flex flex-col justify-between">
              <div className=" flex flex-row justify-between gap-2">
                {todoId === todo.id && editMode ? (
                  <div className="relative w-full">
                    <textarea value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="w-full min-h-[100px] max-h-[100px] sm:max-h-[85px] md:max-h-[90px] lg:max-h-[95px] resize-none overflow-hidden px-2 pt-4 pb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Please enter task title..." />
                    <button onClick={handleCancel} className="absolute -top-1 -left-1 mx-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-500 sm:mx-0 " title="cancel">
                      <XMarkIcon className="h-4 w-4 text-gray-100" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <h3 className="text-sm text-gray-700 whitespace-normal break-words sm:max-w-[60%]">{todo.title}</h3>
                )}

                <span className={`${chooseStyle(todo.completed)} h-6  flex justify-center items-center text-center w-auto py-1 px-6 rounded-full text-xs font-semibold`}>{todo.completed ? "Done" : "Active"}</span>
              </div>

              <div className="w-full flex flex-row justify-end items-center">
                <div className="w-1/3 flex flex-row justify-end items-center gap-2">
                  {todoId === todo.id && editMode ? (
                    <button onClick={() => handleSave(todo)} className=" flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 " title="update">
                      <DocumentCheckIcon className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(todo)} className=" flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 " title="edit">
                      <PencilIcon className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                    </button>
                  )}

                  {todo.completed !== true && (
                    <button onClick={() => handleStatus(todo)} className=" flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 " title="done">
                      <CheckIcon className="h-4 w-4 text-green-400" aria-hidden="true" />
                    </button>
                  )}

                  <button onClick={() => handleDeleteTodo(todo)} className=" z-10 flex h-6 w-6   flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 " title="delete">
                    <TrashIcon className="h-4 w-4 text-red-600" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
