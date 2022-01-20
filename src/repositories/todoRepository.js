const defaultValue = [];
let data = [...defaultValue];
const itemKey = "todos";
export const loadData = () => {
  data = JSON.parse(localStorage.getItem(itemKey || [...defaultValue]));
};

export const saveData = () => {
  localStorage.setItem(itemKey, JSON.stringify(data));
};

export const listTodos = () => {
  let result = [...data];
  return result;
};
export const updateTodo = (todo) => {
  const index = data.findIndex((td) => td.id === todo.id);
  data[index] = Object.assign({}, data[index], todo);
};
export const addTodo = (todo) => {
  data.push(todo);
};

export const deleteTodo = (id) => {
  data = data.filter((td) => td.id !== id);
};
