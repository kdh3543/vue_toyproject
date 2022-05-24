<template>
  <div class="container">
    <div class="head mt-3">
      <h3>Board Register</h3>
    </div>
    <hr>
    <div class="mb-3 error" v-if="error">
      please input all information
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Title: </span>
      <input type="text" placeholder="input title" class="form-control" v-model="title">
    </div>
    <div>
      <label class="form-label">Contents</label>
      <textarea class="form-control" style="resize:none" rows="15" v-model="contents"></textarea>
    </div>
    <div class="mt-2 btns">
      <button class="m-2 btn btn-primary" @click="onSubmit">SUBMIT</button>
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
import { useRouter } from 'vue-router'

export default {
  setup() {
    const title = ref('')
    const contents = ref('')
    const time = new Date()
    const store = useStore()
    const router = useRouter()
    const error = ref(false)
    const onSubmit = () => {
      if(!title.value||!contents.value){
        error.value = true
        return false
      }else{
        error.value = false
        const data = {
          title: title.value,
          contents: contents.value,
          userId: store.state.member.user,
          updatedAt: time.toISOString()
        }
        store.dispatch('board/register',data).then((res)=>{
          alert("success")
          router.push({
            name: 'Board'
          })
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
    return {
      title,
      contents,
      onSubmit,
      error
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