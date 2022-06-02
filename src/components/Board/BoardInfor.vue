<template>
  <div class="container">
    <div class="head mt-3">
      <h3>Board Infor</h3>
    </div>
    <hr>
    <div
      v-if="error"
      class="mb-3 error"
    >
      please input all information
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Title: </span>
      <input
        v-model="title"
        type="text"
        placeholder="input title"
        class="form-control"
        :disabled="$store.state.member.user!=userId ? true : false"
      >
    </div>
    <div>
      <label class="form-label">Contents</label>
      <textarea
        v-model="contents"
        class="form-control"
        style="resize:none"
        rows="15"
        :disabled="$store.state.member.user!=userId ? true : false"
      />
    </div>
    <div class="mt-2 btns">
      <button
        class="m-2 btn btn-primary"
        :disabled="$store.state.member.user!=userId ? true : false"
        @click="modify"
      >
        MODIFY
      </button>
      <router-link :to="{name:'Board'}">
        <button class="m-2 btn btn-primary">
          CANCEL
        </button>
      </router-link>
    </div>
    <div class="mt-4">
      <div class="form-floating">
        <textarea
          id="floatingTextarea2"
          v-model="toComment"
          class="form-control"
          placeholder="Leave a comment here"
          style="height: 120px; resize:none"
        />
        <label for="floatingTextarea2">Comments</label>
      </div>
      <div class="register">
        <button
          class="mt-2 btn btn-secondary"
          @click="registerComment"
        >
          register
        </button>
      </div>
      <div v-if="comments">
        <Comment
          :comments="comments"
          @mod-comment="modComment"
          @del-comment="delComment"
        />
      </div>
      <hr>
    </div>
    <DeleteCommentModal
      v-if="openDelete"
      :index="sendIndex"
      @close-delete="closeDelete"
      @on-delete="onDelete"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter,useRoute } from 'vue-router'
import dayjs from 'dayjs'
import DeleteCommentModal from '@/components/Modal/Board/DeleteCommentModal.vue'
import Comment from '@/components/Board/Comment.vue'

export default {
  components: {
    DeleteCommentModal,
    Comment
  },
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
    const openDelete = ref(false)
    const sendIndex = ref(null)
      
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
      store.dispatch('board/modify',data).then(()=>{
        alert("success")
        router.push({
          name: 'Board'
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    const registerComment = () => {
      if(toComment.value==''){
        alert('please input comment')
      }else {
        const data = {
          id: id,
          userId: store.state.member.user,
          comment: toComment.value,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          modify: false,
        }
        store.dispatch('board/comment',data).then((res)=>{
          comments.value.push(res.data)
          toComment.value = ''
        })
      }
      
    }
    const getComment = () => {
      store.dispatch('board/getComment',id).then((res)=> {
        comments.value = res.data
      })
    }
    getComment()
    const delComment = (index) => {
      console.log(index)
      sendIndex.value = index
      openDelete.value = true
      
    }
    const modComment = (data) => {
      console.log(data)
      store.dispatch('board/modComment',data).then((res)=>{
        console.log(res)
      })
    }
    const closeDelete = () => {
      openDelete.value = false
    }
    const onDelete = (index) => {
      store.dispatch('board/delComment',index).then(()=> {
        openDelete.value = false
        getComment()
      })
    }
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
      comments,
      delComment,
      modComment,
      openDelete,
      sendIndex,
      closeDelete,
      onDelete
    }
  }
}
</script>

<style scoped>
.head {
  text-align: center;
}
.btns {
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

</style>