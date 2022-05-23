<template>
  <div>
    <nav aria-label="Page navigation example" class="pagination my">
      <ul class="pagination my">
        <li class="page-item" v-if="currentPage !== 1">
          <a
            class="page-link"
            @click="movePage(currentPage - 1, initOrder)"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
          v-for="page in totalPages"
          :key="page"
        >
          <a class="page-link" @click="movePage(page, initOrder)">{{ page }}</a>
        </li>
        <li class="page-item" v-if="currentPage !== totalPages">
          <a
            class="page-link"
            @click="movePage(currentPage + 1, initOrder)"
            aria-label="Next"
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
      types: Number,
      required: true,
    },
    currentPage: {
      types: Number,
      required: true,
    },
    initOrder: {
      types: String,
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
