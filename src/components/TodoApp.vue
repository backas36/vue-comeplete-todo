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
            :value="index"
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
        <tr v-for="todo in visableTodos" :key="todo.id">
          <td
            :class="{
              finished: todo.status === 2,
              isEditing: editedTodoId === todo.id,
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
            <div class="text-center pointer" @click="editTodo(todo.id)">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center pointer" @click="deleteTodo(todo.id)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DateTimeSelector from "./DateTimeSelector.vue";
export default {
  data() {
    return {
      todo: "",
      editedTodoId: null,
      avaliableStatuses: ["to-do", "in-progress", "finished"],
      todos: [],
      currentFilter: "all",
    };
  },
  watch: {
    todos: {
      handler() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true,
    },
    currentFilter() {},
  },
  computed: {
    visableTodos() {
      if (this.currentFilter === "all") {
        return this.todos;
      } else {
        return this.todos.filter(
          (todo) => todo.status === Number(this.currentFilter)
        );
      }
    },
  },
  mounted() {
    if (localStorage.getItem("todos"))
      this.todos = JSON.parse(localStorage.getItem("todos"));
  },
  methods: {
    submitTodo() {
      if (this.todo.length === 0) return;
      if (this.editedTodoId === null) {
        const now = new Date();
        this.todos.push({
          id: Math.random().toString(),
          content: this.todo,
          status: 0,
          created_at: now,
          updated_at: now,
        });
      } else {
        this.todos.find((todo) => todo.id === this.editedTodoId).content =
          this.todo;
        this.editedTodoId = null;
      }
      this.todo = "";
    },
    deleteTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },
    changeTodoStatus(selectedTodo, selectedStatusIndex) {
      selectedTodo.status = selectedStatusIndex;
    },
    editTodo(todoId) {
      this.todo = this.todos.find((todo) => todo.id === todoId).content;
      this.editedTodoId = todoId;
    },
    selectFilter(event) {
      this.currentFilter = event.target.value;
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
