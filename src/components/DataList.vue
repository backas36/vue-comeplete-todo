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
        <tr v-for="list in visibleLists" :key="list.id">
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
    <nav aria-label="Page navigation ">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="currentPage === 0 ? 'disabled' : ''"
          @click="prePage"
        >
          <span class="page-link">Previous</span>
        </li>
        <li
          v-for="i in pageNumbers"
          :key="i + 'id'"
          class="page-item"
          :class="i === currentPage + 1 ? 'active' : ''"
          @click="page(i)"
        >
          <span class="page-link">{{ i }}</span>
        </li>

        <li
          class="page-item"
          :class="currentPage === pageNumbers - 1 ? 'disabled' : ''"
          @click="nextPage"
        >
          <span class="page-link">Next</span>
        </li>
      </ul>
    </nav>
  </section>
</template>
<script>
export default {
  props: {
    dataSource: Array,
    editedTodoId: String,
    avaliableStatuses: Array,
  },
  data() {
    return {
      lists: this.dataSource,
      totalPages: [],
      pageSize: 2,
      pageNumbers: 1,
      currentPage: 0,
      visibleLists: [],
    };
  },
  watch: {
    dataSource: {
      handler(newValue) {
        this.lists = newValue;
        this.pageNumbers = Math.ceil(this.lists.length / this.pageSize) || 1;
        for (let i = 0; i < this.pageNumbers; i++) {
          this.totalPages[i] = this.lists.slice(
            this.pageSize * i,
            this.pageSize * (i + 1)
          );
        }
        this.setVisibleLists();
      },
      deep: true,
    },
  },
  created() {
    this.setVisibleLists();
  },
  methods: {
    nextPage() {
      if (this.currentPage === this.pageNumbers - 1) return;
      this.visibleLists = this.totalPages[++this.currentPage];
    },
    prePage() {
      if (this.currentPage === 0) return;
      this.visibleLists = this.totalPages[++this.currentPage];
    },
    page(num) {
      this.currentPage = num - 1;
      this.visibleLists = this.totalPages[num - 1];
    },
    setVisibleLists() {
      this.currentPage = 0;
      this.visibleLists = this.totalPages[this.currentPage];
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
