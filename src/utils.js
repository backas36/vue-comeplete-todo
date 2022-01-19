export function setVisableTodos(todosStatus, todos, searchFilter, sortStatus) {
  const todosBySortStatus = (sortStatus) => {
    console.log("sort");
    if (sortStatus === 1) {
      return todos.sort((a, b) => {
        let x = a.content.toLowerCase();
        let y = b.content.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
    } else if (sortStatus === 2) {
      return todos.sort((a, b) => a.status - b.status);
    } else {
      return todos.sort(
        (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)
      );
    }
  };

  todosBySortStatus(sortStatus);
  if (todosStatus === "all") {
    return todos.filter((todo) => todo.content.includes(searchFilter));
  } else {
    return todos.filter((todo) => todo.status === Number(todosStatus));
  }
}

export function saveTodosToLocal(todos) {
  todos.forEach((todo) => new Date(todo.updated_at).toISOString());
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function getTodosFromLocal() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}
