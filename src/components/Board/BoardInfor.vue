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
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter,useRoute } from 'vue-router'

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
    return {
      error,
      modify,
      getInfor,
      title,
      contents,
      userId
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
</style>