import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodoAsync, fetchActiveTodosAsync, fetchAllTodosAsync, fetchDoneTodosAsync } from "../todoSlice";
import { FunnelIcon } from "@heroicons/react/24/outline";
import Layout from "../../common/layout";
import { useForm, useController } from "react-hook-form";
import TodoList from "./TodoList";

const Todo = () => {
  const [openToFilter, setOpenToFiletr] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState("All");

  const dispatch = useDispatch();
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const newTaskController = useController({
    name: "title",
    control,
    rules: {
      required: "task title is required",
      pattern: { value: /^[a-zA-Z0-9\s.,!?'"-]+$/, message: "please enter valid task title" },
      minLength: {
        value: 4,
        message: "minimum length is 4 characters.",
      },
      maxLength: {
        value: 30,
        message: "maximum length is 30 characters.",
      },
    },
    defaultValue: "",
    shouldValidate: true, // Display error on every change
  });

  const onSubmit = (data) => {
    dispatch(createTodoAsync({ ...data, completed: false, id: data.id++ }));
    reset();
  };

  const handleActive = () => {
    dispatch(fetchActiveTodosAsync());
    setSelectedFilterOption("Active");
  };

  const handleDone = () => {
    dispatch(fetchDoneTodosAsync());
    setSelectedFilterOption("Done");
  };

  const handleAll = () => {
    dispatch(fetchAllTodosAsync());
    setSelectedFilterOption("All");
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <div className="flex justify-center items-center">
            <div className="mt:12 sm:mt-16 lg:mt-24  w-full lg:w-1/2 flex flex-row justify-center gap-2">
              <div className="w-full sm:max-w-lg sm:mx-auto">
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative">
                    <input {...newTaskController.field} type="text" className="block h-12 lg:h-full w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 shadow-lg" placeholder="add new task" />
                    <button type="submit" className="text-white px-4 flex items-center justify-center  absolute right-1 bottom-1 top-1 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs lg:text-sm  dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                      Add Task
                    </button>
                  </div>
                  {errors.title ? <span className="text-red-600">{errors.title.message}</span> : <span className="text-red-600">&nbsp;</span>}
                </form>
              </div>

              <button onClick={() => setOpenToFiletr(!openToFilter)} className="mx-auto relative shadow-lg flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0" title="filter">
                <FunnelIcon className="h-6 w-6 text-gray-800" aria-hidden="true" />
                {openToFilter ? (
                  <div className="absolute top-14 right-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li onClick={handleAll}>
                        <span className={`${selectedFilterOption === "All" && "bg-gray-700 text-white"} block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>ALL</span>
                      </li>
                      <li onClick={handleActive}>
                        <span className={`${selectedFilterOption === "Active" && "bg-gray-700 text-white"} block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>Active</span>
                      </li>
                      <li onClick={handleDone}>
                        <span className={`${selectedFilterOption === "Done" && "bg-gray-700 text-white"} block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>Done</span>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </button>
            </div>
          </div>

          <div className="lg:mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <TodoList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Todo;
