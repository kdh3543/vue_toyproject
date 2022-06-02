<template>
  <div class="container">
    <div class="pt-3 d-flex">
      <h2 class="mx-auto">
        Board
      </h2>
    </div>
    
    <div
      v-if="$store.state.member.user"
      class="head mt-3 d-flex"
    >
      <span class="span">
        <button
          class="btn btn-primary btn-sm register"
          @click="toRegister"
        >Register</button>
      </span>
    </div>
    <hr>
    <div
      v-if="$store.state.member.user"
      class="d-flex boardTitle"
    >
      <div class="col-1">
        SEQ
      </div>
      <div class="col-2">
        ID
      </div>
      <div class="col-3">
        TITLE
      </div>
      <div class="col-3">
        UPDATEDAT
      </div>
      <div class="col-2">
        DELETE
      </div>
      <div class="col-1">
        VIEWS
      </div>
    </div>
    <hr>
    <div v-if="$store.state.member.user">
      <div
        v-for="(list,index) in boards"
        :key="index"
        class="card mt-2"
        @click="boardInfor(index)"
      >
        <div class="d-flex align-items-center boardTitle card-body p-1">
          <div class="col-1">
            {{ list.id }}
          </div>
          <div class="col-2">
            {{ list.userId }}
          </div>
          <div class="col-3">
            {{ list.title }}
          </div>
          <div class="col-3">
            {{ list.updatedAt }}
          </div>
          <div class="col-2">
            <b-button
              class="btn btn-sm delete"
              :class="list.userId==$store.state.member.user ? '' : 'disabled'"
              @click.stop="deleteBoard(list.id)"
            >
              Delete
            </b-button>
          </div>
          <div class="col-1">
            {{ list.views }}
          </div>
        </div>
      </div>
    </div>
    <div v-else />
    <div
      v-if="$store.state.user"
      class="d-flex mt-2 "
    >
      <Pagination
        class="mx-auto"
        :current-page="currentPage"
        :init-order="initOrder"
        :total-pages="totalPages()"
        @move-page="boardList"
      />
      <Select @choice="choice" />
    </div>
    <BoardDeleteModal
      v-if="openDelete"
      :index="sendIndex"
      @close-delete="closeDelete"
      @on-delete="onDelete"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Select from '@/components/Pagination/Select.vue'
import BoardDeleteModal from '@/components/Modal/Board/DeleteBoardModal.vue'

export default {
  components:{
    Pagination,
    Select,
    BoardDeleteModal
  },
  setup(){
    const initOrder = ref('DESC')
    const totalBoards = ref(0)
    const limit = 10
    const currentPage = ref(1)
    const router = useRouter()
    const store = useStore()
    const boards = ref([])
    const openDelete = ref(false)
    const sendIndex = ref(null)
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
      store.dispatch('board/getBoardList',data).then((res)=>{
        console.log(res)
        boards.value = res.data
        totalBoards.value = res.headers['x-total-count']
      })
    }
    boardList()
    const choice = (e) => {
      initOrder.value = e.target.value
      store.dispatch('board/getBoardList',{
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
      store.dispatch('board/plusViews',data)
      router.push({
        name: 'BoardInfor',
        query: {
          id: id,
        }
      })
    }
    const deleteBoard = (index) => {
      sendIndex.value=index
      console.log(sendIndex.value)
      openDelete.value = true
    }
    const closeDelete = () => {
      openDelete.value = false
    }
    const onDelete = (index) => {
      store.dispatch('board/deleteBoard',index).then(()=>{
        openDelete.value = false
        boardList()
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
      choice,
      deleteBoard,
      openDelete,
      closeDelete,
      onDelete,
      sendIndex
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
  background-color: rgb(245, 222, 179, 0.5);
}
.delete {
  border-radius: 1rem;
  border: none;
  background-color: rgb(220, 20, 60, 0.8);
}
.delete:hover {
  cursor: default;
  background-color: crimson;
}
</style>