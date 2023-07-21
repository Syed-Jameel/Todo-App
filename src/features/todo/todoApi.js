export function fetchAllTodos() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1/todos");
    const data = await response.json();

    // Remove the "userId" property from each todo object
    const todosWithoutUserId = data.map((todo) => {
      const { userId, ...todoWithoutUserId } = todo;
      return todoWithoutUserId;
    });

    resolve({ data: todosWithoutUserId });
  });
}

export function fetchActiveTodos() {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/1/todos?completed=false`);
    const data = await response.json();
    // Remove the "userId" property from each todo object
    const todosWithoutUserId = data.map((todo) => {
      const { userId, ...todoWithoutUserId } = todo;
      return todoWithoutUserId;
    });

    resolve({ data: todosWithoutUserId });
  });
}

export function fetchDoneTodos() {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/1/todos?completed=true`);
    const data = await response.json();
    // Remove the "userId" property from each todo object
    const todosWithoutUserId = data.map((todo) => {
      const { userId, ...todoWithoutUserId } = todo;
      return todoWithoutUserId;
    });
    resolve({ data: todosWithoutUserId });
  });
}

export function createTodo(newTodo) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/1/todos`, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const newData = { id: data.id, title: data.title, completed: data.completed };
    resolve({ data: newData });
  });
}

export function updateTodo(updatedTodo) {
  return new Promise(async (resolve) => {
    console.log(updatedTodo.id);
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${+updatedTodo.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedTodo),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const updatedData = { id: data.id, title: data.title, completed: data.completed };
    resolve({ data: updatedData });
  });
}

export function deleteTodo(todo) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/1/todos/${todo.id}`, {
      method: "DELETE",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const deletedData = { id: data.id, title: data.title, completed: data.completed };
    resolve({ data: deletedData });
  });
}
