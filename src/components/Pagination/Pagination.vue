<template>
  <div>
    <nav
      aria-label="Page navigation example"
      class="pagination my"
    >
      <ul class="pagination my">
        <li
          v-if="currentPage !== 1"
          class="page-item"
        >
          <a
            class="page-link"
            aria-label="Previous"
            @click="movePage(currentPage - 1, initOrder)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a
            class="page-link"
            @click="movePage(page, initOrder)"
          >{{ page }}</a>
        </li>
        <li
          v-if="currentPage !== totalPages"
          class="page-item"
        >
          <a
            class="page-link"
            aria-label="Next"
            @click="movePage(currentPage + 1, initOrder)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    initOrder: {
      type: String,
      required: true,
    },
  },
  emits: ['move-page'],
  setup(props, { emit }) {
    const movePage = (page, initOrder) => {
      emit('move-page', page, initOrder)
    }
    return {
      movePage,
    }
  },
}
</script>

<style scoped>
.pagination {
  margin: auto;
}
a {
  cursor: pointer;
}

.page-link {
  background: none;
  outline: 0;
  border: 0;
  color: gray;
}
.my.pagination > .active > a, 
.my.pagination > .active > span, 
.my.pagination > .active > a:hover, 
.my.pagination > .active > span:hover, 
.my.pagination > .active > a:focus, 
.my.pagination > .active > span:focus {
  background: none;
  color: gray;
  transform: scale(1.2);
  font-weight: bolder;
}
</style>
