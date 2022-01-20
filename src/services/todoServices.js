import {
  addTodo,
  deleteTodo,
  listTodos,
  loadData,
  saveData,
  updateTodo,
} from "../repositories/todoRepository";

export const initialize = () => {
  loadData();
};
export const saveState = () => saveData();

export const listTodoItems = () => listTodos();

export const getTodoById = (id) => getTodo(id);

export const insertTodo = (todo) => addTodo(todo);

export const updateTodoById = (id, todo) => {
  updateTodo(
    Object.assign({}, todo, {
      id,
    })
  );
};

export const deleteToDoById = (id) => deleteTodo(id);
