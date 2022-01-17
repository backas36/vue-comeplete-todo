<template>
  <div class="container">
    <h2>Assignment - Todo App with Vue</h2>

    <!-- input -->
    <div class="d-flex">
      <input
        type="text"
        placeholder="Enter task"
        class="form-control"
        v-model="todo"
      />
      <button class="btn btn-primary rounded-0" @click="submitTodo">
        Submit
      </button>
    </div>
    <div class="d-flex mt-5">
      <div
        class="form-check form-check-inline"
        v-for="(avaliableStatus, index) in avaliableStatuses"
        :key="index"
      >
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            :value="avaliableStatus"
            checked
            @click="selectFilter"
          />
          {{ avaliableStatus }}
        </label>
      </div>
      <div class="form-check form-check-inline">
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="all"
            checked
            @click="selectFilter"
          />
          All
        </label>
      </div>
    </div>
    <!-- todo list table -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(todo, index) in todos" :key="index">
          <td
            :class="{
              finished: todo.status === 2,
              isEditing: editedTodoIndex === index,
            }"
          >
            {{ todo.content }}
          </td>
          <td class="fixed-width">
            <div class="dropdown">
              <button
                class="btn btn-sm btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
              >
                {{ avaliableStatuses[todo.status] }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li
                  v-for="(avaliableStatus, index) in avaliableStatuses"
                  :key="index"
                  @click="changeTodoStatus(todo, index)"
                >
                  <a
                    class="dropdown-item"
                    :class="{ active: todo.status === index }"
                    href="#"
                    >{{ avaliableStatus }}</a
                  >
                </li>
              </ul>
            </div>
          </td>
          <td>
            <div class="text-center pointer" @click="editTodo(index)">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center pointer" @click="deleteTodo(index)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: "",
      editedTodoIndex: null,
      avaliableStatuses: ["to-do", "in-progress", "finished"],
      todos: [],
    };
  },
  watch: {
    todos: {
      handler() {
        console.log("watch handler");
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true,
    },
  },
  mounted() {
    console.log("mounted");
    console.log(localStorage.getItem("todos"));
    if (localStorage.getItem("todos"))
      this.todos = JSON.parse(localStorage.getItem("todos"));
  },
  methods: {
    submitTodo() {
      if (this.todo.length === 0) return;
      if (this.editedTodoIndex === null) {
        this.todos.push({
          content: this.todo,
          status: 0,
        });
      } else {
        this.todos[this.editedTodoIndex].content = this.todo;
        this.editedTodoIndex = null;
      }
      this.todo = "";
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    changeTodoStatus(selectedTodo, selectedStatusIndex) {
      selectedTodo.status = selectedStatusIndex;
    },
    editTodo(index) {
      this.todo = this.todos[index].content;
      this.editedTodoIndex = index;
    },
    selectFilter(event) {
      console.log(event.target.value);
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.fixed-width {
  width: 120px;
}
.finished {
  text-decoration: line-through;
}
.isEditing {
  color: red;
}
</style>
