<template>
  <div class="signModal">
    <div class="col-3 mx-auto box p-3">
      <form @submit.prevent="onSignUp">
        <div class="d-flex title">
          <h2>SIGN UP</h2>
          <span class="btn btn-close btn-close-white close" @click="closeModal"></span>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">ID: </span>
          <input type="text" placeholder="input your id" class="form-control" v-model="id" required>
        </div>
        <div class="input-group mb-3 boolInfor" v-if="existId">
          이미 존재하는 아이디입니다.
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">PW: </span>
          <input type="password" placeholder="input your pw" class="form-control" v-model="pw" minlength="8" maxlength="20" required>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">REPW: </span>
          <input type="password" placeholder="input your repw" class="form-control" v-model="repw" minlength="8" maxlength="20" required>
        </div>
        <div class="input-group mb-3 boolInfor" v-if="samePw">
          비밀번호가 일치하지 않습니다.
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">NAME: </span>
          <input type="text" placeholder="input your name" class="form-control" v-model="name" required>
        </div>
        <div class="input-group">
          <button class="btn btn-primary submit btn-sm mx-auto">SUBMIT</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  emits:['onSignUp','closeSignUp'],
  setup(props,{emit}){
    const id = ref('')
    const pw = ref('')
    const repw = ref('')
    const name = ref('')
    const store = useStore()
    const existId = ref(false)
    const samePw = ref(false)
    const onSignUp = async () => {
      store.dispatch('idExist',id.value).then((res)=>{
        if(res.length>0){
          existId.value = true
          return false
        }else{
          existId.value = false
          const data = {
            id: id.value,
            pw: pw.value,
            name: name.value
          }
          if(pw.value!=repw.value){
            samePw.value = true
            return false
          }else{
            samePw.value = false
            emit('onSignUp',data)  
          }
        }
      })
    }
    const closeModal = () => {
      emit('closeSignUp')
    }
    return {
      id,
      pw,
      repw,
      name,
      onSignUp,
      closeModal,
      existId,
      samePw
    }
  }
}
</script>

<style scoped>
.close {
  margin-left: auto;
  display: table-cell;
  vertical-align: middle;
}

.box {
  border: 1px solid black;
  background-color: black;
  color: white;
}
.boolInfor {
  color: salmon;
}
.submit {
  border-radius: 1rem;
  background-color: gray;
  border: none;
}
.submit:hover {
  background-color: rgb(128, 128, 128, 0.5);
}
</style>