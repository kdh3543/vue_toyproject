<template>
  <div class="container">
    <div class="mt-3 d-flex">
      <h2 class="mx-auto">Board</h2>
    </div>
    
    <div class="head mt-3 d-flex" v-if="$store.state.user">
        
      <span class="span">
        <button class="btn btn-primary btn-sm register" @click="toRegister">Register</button>
      </span>
    </div>
    <hr>
    <div class="d-flex boardTitle" v-if="$store.state.user">
      <div class="col-2">SEQ</div>
      <div class="col-2">ID</div>
      <div class="col-3">TITLE</div>
      <div class="col-3">UPDATEDAT</div>
      <div class="col-2">VIEWS</div>
    </div>
    <hr>
    <div v-if="$store.state.user">
      <div class="card mt-2" v-for="(list,index) in boards" :key="index" @click="boardInfor(index)">
        <div class="d-flex boardTitle card-body p-2">
          <div class="col-2">{{list.id}}</div>
          <div class="col-2">{{list.userId}}</div>
          <div class="col-3">{{list.title}}</div>
          <div class="col-3">{{list.updatedAt}}</div>
          <div class="col-2">{{list.views}}</div>
        </div>
      </div>
    </div>
    <div v-else>

    </div>
    <div class="d-flex mt-2 " v-if="$store.state.user">
      <Pagination
        class="mx-auto"
        :currentPage="currentPage"
        :initOrder="initOrder"
        :totalPages="totalPages()"
        @move-page="boardList"
      />
      <Select @choice="choice" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Select from '@/components/Pagination/Select.vue'

export default {
  components:{
    Pagination,
    Select
  },
  setup(){
    const initOrder = ref('ASC')
    const totalBoards = ref(0)
    const limit = 10
    const currentPage = ref(1)
    const router = useRouter()
    const store = useStore()
    const boards = ref([])
    const totalPages = () => {
      return Math.ceil(totalBoards.value/limit)
    }
    const toRegister = () => {
      router.push({
        name: 'Register'
      })
    }
    const boardList = (
      page = currentPage.value,
      order = initOrder.value
    ) => {
      currentPage.value = page
      const data = {
        page: page,
        order: order,
        limit: limit
      }
      store.dispatch('getBoardList',data).then((res)=>{
        boards.value = res.data
        totalBoards.value = res.headers['x-total-count']
      })
    }
    boardList()
    const choice = (e) => {
      initOrder.value = e.target.value
      store.dispatch('getBoardList',{
        order: e.target.value,
        page: currentPage.value,
        limit: limit
      }).then((res)=>{
        boards.value = res.data
        totalBoards.value = res.headers['x-total-count']
      })
    }
    const boardInfor = (index) => {
      const id = boards.value[index].id
      const views = boards.value[index].views
      const data = {
        id: id,
        views: views
      }
      store.dispatch('plusViews',data)
      router.push({
        name: 'BoardInfor',
        query: {
          id: id,
        }
      })
    }
    return {
      toRegister,
      boardList,
      boards,
      boardInfor,
      totalPages,
      initOrder,
      currentPage,
      totalBoards,
      choice
    }
  }
}
</script>

<style scoped>
.head {
  text-align: center;
}
.span {
  display: flex;
  align-items: center;
}
.register {
  background-color: rgb(0, 0, 0, 0.7);
  border: none;
}
.register:hover {
  background-color: black;
}
.boardTitle {
  text-align: center;
}
.card {
  border-radius: 1rem;
}
.card:hover {
  cursor: pointer;
}
</style>