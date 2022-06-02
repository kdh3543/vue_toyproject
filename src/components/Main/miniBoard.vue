<template>
  <div>
    <div class="title row">
      <h4
        class="col-6"
        style="font-weight:bolder;"
      >
        Board
      </h4>
      <span class="col-6 view">
        <router-link
          class="toBoard"
          :to="{name:'Board'}"
        >
          >> View All
        </router-link>
      </span>
    </div>
    <div
      v-for="(list,index) in boards"
      :key="index"
      class="p-1 boardBox row"
      @click="boardInfor(index)"
    >
      <div class="boardList col-10">
        {{ list.title }}
      </div>
      <div class="col-2 time">
        {{ list.updatedAt.substr(0,10) }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const limit = 10
    const initOrder = ref('DESC')
    const boards = ref([])
    const currentPage = ref(1)
    const boardList = (
      page = currentPage.value,
      order = initOrder.value
    ) => {
      currentPage.value = page
      const data = {
        page: 1,
        order: order,
        limit: limit
      }
      store.dispatch('board/getBoardList',data).then((res)=>{
        console.log(res)
        boards.value = res.data
      })
    }
    boardList()
    const boardInfor = (index) => {
      if(store.state.member.user){
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
      } else {
        alert('please login')
      }
    }
    return {
      limit,
      initOrder,
      boards,
      boardList,
      boardInfor
    }
  }
}
</script>

<style scoped>
.title {
  border-bottom: 1px solid rgb(128, 128, 128, 0.5);
}
.boardBox {
  border-bottom: 1px solid rgb(128, 128, 128, 0.5);
}
.boardList {
  font-size: 18px;
  overflow-x: hidden;
}
.boardBox:hover {
  background-color: rgb(128, 128, 128, 0.3);
  cursor: pointer;
}
.view {
  font-size: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-top: 10px;
}

.toBoard {
  text-decoration: none;
  color: black;
}
.time {
  font-size: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>