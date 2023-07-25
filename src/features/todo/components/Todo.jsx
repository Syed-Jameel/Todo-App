import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoAsync, fetchActiveTodosAsync, fetchAllTodosAsync, fetchDoneTodosAsync, selectAllTodos } from "../todoSlice";
import { FunnelIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Layout from "../../common/Layout";
import { useForm, useController } from "react-hook-form";
import TodoList from "./TodoList";
import Pagination from "../../common/Pagination";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ScrollToTopButton from "../../common/ScrollToTopButton";

const Todo = () => {
  const [openToFilter, setOpenToFiletr] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
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
    const newTodo = { ...data, completed: false };
    dispatch(createTodoAsync(newTodo))
      .then(() => {
        toast.success("👍todo added successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
    if (selectedFilterOption === "Done") {
      setSelectedFilterOption("All");
      dispatch(fetchAllTodosAsync());
    }
    reset();
  };

  const handleActive = () => {
    dispatch(fetchActiveTodosAsync());
    setSelectedFilterOption("Active");
    setCurrentPage(1);
  };

  const handleDone = () => {
    dispatch(fetchDoneTodosAsync());
    setSelectedFilterOption("Done");
    setCurrentPage(1);
  };

  const handleAll = () => {
    dispatch(fetchAllTodosAsync());
    setSelectedFilterOption("All");
    setCurrentPage(1);
  };

  //pagination
  const todos = useSelector(selectAllTodos);
  const decendingTodos = todos.slice().sort((a, b) => b.id - a.id);
  const todosPerPage = 8;
  const totalTodos = todos.length;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Calculating the index of the first and last Todo item to display on the current page
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = decendingTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="mx-auto max-w-2xl px-4 pt-12 pb-24 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            <div className="flex justify-center items-center">
              <div className="scale-75 sm:scale-100 z-20 mt-6 sm:mt-16 lg:mt-24  w-full lg:w-1/2 flex flex-row justify-between lg:justify-center gap-2">
                <div className="w-full sm:max-w-lg ">
                  <form noValidate onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="relative">
                      <input {...newTaskController.field} type="text" className="block h-12  lg:h-full w-full pl-4 py-4 pr-20 sm:pr-28 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 shadow-lg" placeholder="add new task" />
                      <div className="hidden sm:block">
                        <button type="submit" className="text-white px-4 flex items-center justify-center  absolute right-1 bottom-1 top-1 bg-[#051937] hover:bg-gray-200 hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-xs lg:text-sm  dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                          Add Task
                        </button>
                      </div>

                      <div className="block sm:hidden">
                        <button className=" text-white  flex items-center justify-center  absolute right-1 bottom-1 top-1 bg-[#051937] hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-xs lg:text-sm  dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                          <PlusCircleIcon className="h-10 w-10 text-gray-100" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="ml-4">{errors.title ? <span className="text-red-600 text-xs sm:text-sm">{errors.title.message}</span> : <span className="text-red-600">&nbsp;</span>}</div>
                  </form>
                </div>

                <button onClick={() => setOpenToFiletr(!openToFilter)} className="mx-auto relative shadow-lg flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0" title="filter">
                  <FunnelIcon className="h-6 w-6 text-gray-800" aria-hidden="true" />
                  {openToFilter ? (
                    <div className="absolute top-14 right-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li onClick={handleAll}>
                          <span className={`${selectedFilterOption === "All" && "bg-[#051937] text-white"} block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white`}>ALL</span>
                        </li>
                        <li onClick={handleActive}>
                          <span className={`${selectedFilterOption === "Active" && "bg-[#051937] text-white"} block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white`}>Active</span>
                        </li>
                        <li onClick={handleDone}>
                          <span className={`${selectedFilterOption === "Done" && "bg-[#051937] text-white"} block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white`}>Done</span>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </button>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 lg:mt-14 min-h-[60vh] flex flex-col justify-between rounded-lg">
            <TodoList selectedFilterOption={selectedFilterOption} setSelectedFilterOption={setSelectedFilterOption} currentTodos={currentTodos} />
            <Pagination handlePageChange={handlePageChange} currentPage={currentPage} totalTodos={totalTodos} todosPerPage={todosPerPage} indexOfFirstTodo={indexOfFirstTodo} indexOfLastTodo={indexOfLastTodo} />
          </div>
        </div>
        <ScrollToTopButton />
      </div>
    </Layout>
  );
};

export default Todo;
