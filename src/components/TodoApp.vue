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
    <div class="d-flex mt-3">
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
    <date-time-selector
      :selectedDateTime="selectedDateTime"
      @setSelectedDateTimeToTodo="getSelectedDateTime"
    ></date-time-selector>
    <div class="d-flex mt-3 col-12">
      <h5 class="col-3">Search task content</h5>
      <form class="col-8">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="searchContent"
        />
      </form>
    </div>
    <div class="d-flex mt-3 col-12">
      <h5 class="col-3">task sort by</h5>
      <select
        class="form-select form-select-sm"
        aria-label=".form-select-sm example"
        v-model="selectedSort"
      >
        <option
          v-for="(sortOption, index) in sortOptions"
          :key="sortOption"
          :value="index"
          :selected="index === selectedSort"
        >
          Sort by {{ sortOption }}
        </option>
      </select>
    </div>
    <!-- todo list table -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">Created_At</th>
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
            {{ new Date(todo.updated_at) }}
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
    <Pagination />
    <hr />
    <DataList
      :data-source="todos"
      :edited-todo-id="editedTodoId"
      :avaliable-statuses="avaliableStatuses"
      @change-todo-status="changeTodoStatus"
      @edit-todo="editTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import DateTimeSelector from "./DateTimeSelector.vue";
import Pagination from "./pagination/Pagination.vue";
import DataList from "./DataList.vue";

const now = new Date().toISOString();

const setVisableTodos = (todosStatus, todos, searchFilter, sortStatus) => {
  const todosBySortStatus = (sortStatus) => {
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
};

export default {
  components: {
    DateTimeSelector,
    Pagination,
    DataList,
  },
  data() {
    return {
      todo: "",
      editedTodoId: null,
      avaliableStatuses: ["to-do", "in-progress", "finished"],
      sortOptions: ["time(default)", "content", "status"],
      selectedSort: 0,
      todos: [],
      currentFilter: "all",
      selectedDateTime: null,
      searchContent: "",
    };
  },
  watch: {
    todos: {
      handler() {
        this.todos.forEach((todo) => new Date(todo.updated_at).toISOString());
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true,
    },
  },
  computed: {
    visableTodos() {
      if (!this.selectedDateTime) {
        return setVisableTodos(
          this.currentFilter,
          this.todos,
          this.searchContent,
          this.selectedSort
        );
      } else {
        const { startDate, endDate } = this.selectedDateTime;

        const tempTodos = this.todos.filter(
          (todo) =>
            Date.parse(todo.updated_at) >= Date.parse(startDate) &&
            Date.parse(todo.updated_at) <= Date.parse(endDate)
        );
        return setVisableTodos(
          this.currentFilter,
          tempTodos,
          this.searchContent,
          this.selectedSort
        );
      }
    },
  },
  mounted() {
    if (localStorage.getItem("todos")) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
    }
  },
  methods: {
    submitTodo() {
      if (this.todo.length === 0) return;
      if (this.editedTodoId === null) {
        this.todos.push({
          id: Math.random().toString(),
          content: this.todo,
          status: 0,
          created_at: now,
          updated_at: now,
        });
      } else {
        const currentSelectedTodo = this.todos.find(
          (todo) => todo.id === this.editedTodoId
        );
        currentSelectedTodo.content = this.todo;
        currentSelectedTodo.updated_at = now;
        this.editedTodoId = null;
      }
      this.todo = "";
    },
    deleteTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },
    changeTodoStatus(selectedTodo, selectedStatusIndex) {
      selectedTodo.status = selectedStatusIndex;
      selectedTodo.updated_at = now;
    },
    editTodo(todoId) {
      this.todo = this.todos.find((todo) => todo.id === todoId).content;
      this.editedTodoId = todoId;
    },
    selectFilter(event) {
      this.currentFilter = event.target.value;
    },
    getSelectedDateTime(startEndDateTime) {
      this.selectedDateTime = startEndDateTime;
    },
  },
};
</script>
