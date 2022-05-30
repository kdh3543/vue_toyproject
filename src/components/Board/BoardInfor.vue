<template>
  <div class="container">
    <div class="head mt-3">
      <h3>Board Infor</h3>
    </div>
    <hr>
    <div class="mb-3 error" v-if="error">
      please input all information
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Title: </span>
      <input type="text" placeholder="input title" class="form-control" v-model="title"
       :disabled="$store.state.member.user!=userId ? true : false">
    </div>
    <div>
      <label class="form-label">Contents</label>
      <textarea class="form-control" style="resize:none" rows="15" v-model="contents" :disabled="$store.state.member.user!=userId ? true : false"></textarea>
    </div>
    <div class="mt-2 btns">
      <button class="m-2 btn btn-primary" @click="modify" :disabled="$store.state.member.user!=userId ? true : false">MODIFY</button>
      <router-link :to="{name:'Board'}">
        <button class="m-2 btn btn-primary">
          CANCEL
        </button>
      </router-link>
    </div>
    <div class="mt-4">
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 120px; resize:none" v-model="toComment"></textarea>
        <label for="floatingTextarea2">Comments</label>
      </div>
      <div class="register">
        <button class="mt-2 btn btn-secondary" @click="registerComment">register</button>
      </div>
      <div v-if="comments">
        <div class="commentBox d-flex mt-2" v-for="list in comments" :key="list" >
          <div class="col-10">
            <div class="id p-1">
              {{ list.userId }}
            </div>
            <div class="time p-1">
              {{ list.time }}
            </div>
            <div class="contents p-1">
              {{ list.comment }}
            </div>
          </div>
          
          <div class="col-2 commentBtns">
            <button class="m-1">수정</button>
            <button class="m-1">삭제</button>
          </div>
        </div>
      </div>
      
      <hr>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter,useRoute } from 'vue-router'
import dayjs from 'dayjs'

export default {
  setup() {
    const title = ref('')
    const contents = ref('')
    const store = useStore()
    const router = useRouter()
    const error = ref(false)
    const route = useRoute()
    const id = route.query.id
    const userId = ref('')
    const toComment = ref('')
    const commentExist = ref(false)
    const comments = ref([])
      
    const getInfor = () => {
      store.dispatch('board/getBoardInfor',id).then((res)=>{
        title.value = res.data[0].title
        contents.value = res.data[0].contents
        userId.value = res.data[0].userId
      })
    }
    getInfor()

    const modify = () => {
      error.value = false
      const data = {
        id: id,
        title: title.value,
        contents: contents.value,
      }
      store.dispatch('board/modify',data).then((res)=>{
        alert("success")
        router.push({
          name: 'Board'
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    const registerComment = () => {
      const data = {
        id: id,
        userId: store.state.member.user,
        comment: toComment.value,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      store.dispatch('board/comment',data)
    }
    const getComment = () => {
      store.dispatch('board/getComment',id).then((res)=> {
        console.log(res)
        comments.value = res.data
      })
    }
    getComment()
    return {
      error,
      modify,
      getInfor,
      title,
      contents,
      userId,
      toComment,
      commentExist,
      registerComment,
      getComment,
      comments
    }
  }
}
</script>

<style scoped>
.head {
  text-align: center;
}

.btns button {
  background-color: dimgrey;
  border: none;
}
.btns button:hover {
  background-color: black;
}
.error {
  color: salmon;
}
.register {
  text-align: right;
}
.commentBox {
  width: 100%;
  height: 150px;
  border: 1px solid gray;
  border-radius: 10px;
  position: relative;
}
.commentBtns {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.commentBtns > button {
  border: none;
  background: none;
}
.commentBtns > button:hover {
  transform: scale(1.1);
}
</style>