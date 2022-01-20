<template>
  <section>
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">Updated_at</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="list in lists" :key="list.id">
          <td
            :class="{
              finished: list.status === 2,
              active: editedTodoId === list.id,
            }"
          >
            {{ list.content }}
          </td>
          <td class="fixed-width">
            <div class="dropdown">
              <button
                class="btn btn-sm btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
              >
                {{ avaliableStatuses[list.status] }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li
                  v-for="(avaliableStatus, index) in avaliableStatuses"
                  :key="index"
                  @click="$emit('change-todo-status', list, index)"
                >
                  <a
                    class="dropdown-item"
                    :class="{ active: list.status === index }"
                    href="#"
                    >{{ avaliableStatus }}</a
                  >
                </li>
              </ul>
            </div>
          </td>
          <td>
            {{ new Date(list.updated_at) }}
          </td>
          <td>
            <div
              class="text-center pointer"
              @click="$emit('edit-todo', list.id)"
            >
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div
              class="text-center pointer"
              @click="$emit('delete-todo', list.id)"
            >
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :data-source="dataSource" />
  </section>
</template>
<script>
import Pagination from "./Pagination.vue";
export default {
  components: {
    Pagination,
  },
  props: {
    dataSource: Array,
    editedTodoId: String,
    avaliableStatuses: Array,
  },
  data() {
    return {
      lists: this.dataSource,
    };
  },
  watch: {
    dataSource: {
      handler(newValue) {
        this.lists = newValue;
      },
      deep: true,
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.fixed-width {
  width: 120px;
}
.finished {
  text-decoration: line-through;
}
.active {
  color: red;
}
</style>
