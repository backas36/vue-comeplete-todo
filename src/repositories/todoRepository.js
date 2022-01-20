const defaultValue = [];
let data = [...defaultValue];
const itemKey = "todos";
export const loadData = () => {
  data = JSON.parse(localStorage.getItem(itemKey || [...defaultValue]));
};

export const saveData = () => {
  localStorage.setItem(itemKey, JSON.stringify(data));
};

export const listTodos = (filter, sort) => {
  let result = [...data];
  if (search) {
    result = result.filter((todo) => todo.content.includes(search));
  }
  if (filter) {
    if (filter.status !== "3") {
      result = result.filter((todo) => todo.status === Number(filter.status));
    }

    if (filter.updated_at && filter.updated_at.start && filter.updated_at.end) {
      result = result.filter(
        (todo) =>
          Date.parse(todo.updated_at) >= Date.parse(filter.updated_at.start) &&
          Date.parse(todo.updated_at) <= Date.parse(filter.updated_at.end)
      );
    }
  }

  if (sort === 0) {
    result.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
  }

  if (sort === 1) {
    result.sort((a, b) => {
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
  }

  if (sort === 2) {
    result.sort((a, b) => a.status - b.status);
  }
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
