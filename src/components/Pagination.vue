<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled" @click="prePage">
        <span class="page-link">Previous</span>
      </li>
      <li class="page-item" v-for="i in pageNumbers" @click="page(i)" :key="i">
        <span class="page-link">{{ i }}</span>
      </li>

      <li class="page-item" @click="nextPage">
        <span class="page-link">Next</span>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      totalPages: [],
      pageSize: 2,
      pageNumbers: 5,
      dataShow: [],
      currentPage: 0,
    };
  },
  create() {
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
