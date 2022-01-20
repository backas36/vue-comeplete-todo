<template>
  <div id="app" class="container">
    <div class="container">
      <h2>Assignment - Todo App with Vue</h2>

      <div class="d-flex">
        <input
          type="text"
          placeholder="Enter task"
          class="form-control"
          v-model="todoContent"
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
              id="exampleRadios2"
              value="0"
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
      <!--<div class="d-flex mt-3 col-12">
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
      </div>-->

      <div class="d-flex mt-3 col-12">
        <h5 class="col-3">task sort by</h5>
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="selectedSort"
          @change="onChangeSort"
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
        :data-source="todos"
        :edited-todo-id="editedTodoId"
        :avaliable-statuses="avaliableStatuses"
        @change-todo-status="changeTodoStatus"
        @edit-todo="selectTodo"
        @delete-todo="deleteTodo"
      />
    </div>
  </div>
</template>
<script>
import DateTimeSelector from "./components/DateTimeSelector.vue";
import DataList from "./components/DataList.vue";
import {
  deleteToDoById,
  insertTodo,
  listTodoItems,
  saveState,
  updateTodoById,
} from "../src/services/todoServices";
export default {
  components: { DataList, DateTimeSelector },
  data() {
    return {
      todoContent: null,
      editedTodoId: null,
      todos: [],
      avaliableStatuses: ["to-do", "in-progress", "finished"],
      currentFilter: 0,
      filter: { status: 0 },
      sortOptions: ["time(default)", "content", "status"],
      selectedDateTime: null,
      selectedSort: 0,
    };
  },
  computed: {},
  mounted() {
    this.listTodos();
  },
  methods: {
    getSelectedDateTime(startEndDateTime) {
      this.selectedDateTime = startEndDateTime;
      this.filter = {
        status: this.currentFilter,
        updated_at: {
          start: this.selectedDateTime.startDate,
          end: this.selectedDateTime.endDate,
        },
      };
      this.listTodos();
    },
    onChangeSort() {
      this.listTodos();
    },
    selectFilter(event) {
      this.currentFilter = event.target.value;
      this.filter = { status: this.currentFilter };
      this.listTodos();
    },
    submitTodo() {
      if (this.todoContent.length === 0) return;
      const todoValue = this.todoContent;
      if (this.editedTodoId === null) {
        this.addTodo({
          id: `id-${Math.random().toString()}`,
          content: todoValue,
          status: 0,
          created_at: new Date(),
          updated_at: new Date(),
        });
      } else {
        this.updateTodo(this.editedTodoId, {
          content: todoValue,
          updated_at: new Date(),
        });
      }
      this.listTodos();
      this.todoContent = "";
    },
    changeTodoStatus(selectedTodo, selectedStatusIndex) {
      this.updateTodo(selectedTodo.id, {
        status: selectedStatusIndex,
        updated_at: new Date(),
      });
      this.listTodos();
    },
    selectTodo(todoId) {
      this.todoContent = this.todos.find((todo) => todo.id === todoId).content;
      this.editedTodoId = todoId;
    },
    listTodos() {
      this.todos = listTodoItems(this.filter, this.selectedSort);
      this.editedTodoId = null;
    },
    addTodo(todo) {
      insertTodo(todo);
      this.saveTodos();
    },
    updateTodo(id, todo) {
      updateTodoById(id, todo);
      this.saveTodos();
    },
    deleteTodo(todoId) {
      deleteToDoById(todoId);
      this.saveTodos();
      this.listTodos();
    },
    saveTodos() {
      saveState();
    },
  },
};
</script>
<style></style>
