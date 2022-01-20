<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="currentPage === 0 ? 'disabled' : ''"
        @click="prePage"
      >
        <span class="page-link">Previous</span>
      </li>
      <li
        v-for="page in pageNumbers"
        :key="page"
        class="page-item"
        :class="page - 1 === currentPage ? 'active' : ''"
        @click="page(page)"
      >
        <span class="page-link">{{ page }}</span>
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
</template>
<script>
export default {
  props: {
    dataSource: Array,
  },
  data() {
    return {
      data: this.dataSource,
      totalPages: [],
      pageSize: 2,
      pageNumbers: 1,
      dataShow: [],
      currentPage: 0,
    };
  },
  watch: {
    dataSource: {
      handler(newValue) {
        this.data = newValue;
      },
    },
  },
  created() {
    console.log(this.data);
    this.pageNumbers = Math.ceil(this.data.length / this.pageSize) || 1;
    for (let i = 0; i < this.pageNumbers; i++) {
      this.totalPages[i] = this.data.slice(
        this.pageSize * i,
        this.pageSize * (i + 1)
      );
    }
    this.dataShow = this.totalPages[this.currentPage];
  },
  methods: {
    nextPage() {
      if (this.currentPage === this.pageNumbers - 1) return;
      this.dataShow = this.totalPages[++this.currentPage];
    },
    prePage() {
      if (this.currentPage === 0) return;
      this.dataShow = this.totalPages[--this.currentPage];
    },
    page(num) {
      this.currentPage = num;
      console.log(this.currentPage);
      this.dataShow = this.totalPages[num - 1];
    },
  },
};
</script>
