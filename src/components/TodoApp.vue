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
    <DataList
      :data-source="visableTodos"
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
import DataList from "./DataList.vue";
import { setVisableTodos, saveTodosToLocal, getTodosFromLocal } from "../utils";

const now = new Date().toISOString();

export default {
  components: {
    DateTimeSelector,
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
        console.log("watch");
        saveTodosToLocal(this.todos);
      },
      deep: true,
    },
  },
  computed: {
    visableTodos() {
      console.log("computed");
      const tempTodos = this.todos;
      if (this.selectedDateTime) {
        tempTodos.filter(
          (todo) =>
            Date.parse(todo.updated_at) >= Date.parse(startDate) &&
            Date.parse(todo.updated_at) <= Date.parse(endDate)
        );
      }

      return setVisableTodos(
        this.currentFilter,
        tempTodos,
        this.searchContent,
        this.selectedSort
      );
    },
  },
  mounted() {
    this.todos = getTodosFromLocal();
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
