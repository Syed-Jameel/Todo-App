import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllTodos, fetchActiveTodos, fetchDoneTodos, createTodo, updateTodo, deleteTodo } from "./todoApi";

const initialState = {
  todos: [],
  status: "idle",
};

export const fetchAllTodosAsync = createAsyncThunk("todo/fetchAllTodos", async () => {
  const response = await fetchAllTodos();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const fetchActiveTodosAsync = createAsyncThunk("todo/fetchActiveTodos", async () => {
  const response = await fetchActiveTodos();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const fetchDoneTodosAsync = createAsyncThunk("todo/fetchDoneTodos", async () => {
  const response = await fetchDoneTodos();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const createTodoAsync = createAsyncThunk("todo/createTodo", async (newTodo) => {
  const response = await createTodo(newTodo);
  // The value we return becomes the `fulfilled` action payload
  console.log(response);
  return response.data;
});

export const updateTodoAsync = createAsyncThunk("todo/updateTodo", async (updatedTodo) => {
  const response = await updateTodo(updatedTodo);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const deleteTodoAsync = createAsyncThunk("todo/deleteTodo", async (todo) => {
  const response = await deleteTodo(todo);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTodosAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(fetchActiveTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActiveTodosAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(fetchDoneTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoneTodosAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(createTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos.push(action.payload);
      })
      .addCase(updateTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        state.todos[index] = action.payload;
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        state.todos.splice(index, 1);
      });
  },
});

export const selectAllTodos = (state) => state.todo.todos;
export const selectTodosStatus = (state) => state.todo.status;
export const selectTodoCreated = (state) => state.todo.todoCreated;

export default todoSlice.reducer;
