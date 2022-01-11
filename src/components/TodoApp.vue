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
      <button class="btn btn-warning rounded-0" @click="submitTodo">
        Submit
      </button>
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
          <td>{{ todo.content }}</td>
          <td>{{ todo.status }}</td>
          <td>
            <div class="text-center">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center">
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
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      todo: "",
      todos: [
        {
          content: "Steal bananas",
          status: "to-do",
        },
        {
          content: "Steal bananas2",
          status: "in-progress",
        },
        {
          content: "Steal bananas3",
          status: "to-do",
        },
      ],
    };
  },
  methods: {
    submitTodo() {
      console.log(this.todo);
      if (this.todo.length === 0) return;
      this.todos.push({
        content: this.todo,
        status: "to-do",
      });
      this.todo = "";
    },
  },
};
</script>

<style scoped>
</style>
