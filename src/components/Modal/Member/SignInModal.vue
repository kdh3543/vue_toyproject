<template>
  <div class="signModal">
    <div class="col-3 mx-auto box p-3">
      <form @submit.prevent="onSignIn">
        <div class="d-flex title">
          <h2>SIGN IN</h2>
          <span class="btn btn-close btn-close-white close" @click="closeModal"></span>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">ID: </span>
          <input type="text" placeholder="input your id" class="form-control" v-model="id">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">PW: </span>
          <input type="password" placeholder="input your pw" class="form-control" v-model="pw">
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

export default {
  emits:['onSignIn','closeSignIn'],
  setup(props,{emit}){
    const id = ref('')
    const pw = ref('')
    const repw = ref('')
    const name = ref('')
    const onSignIn = async () => {
      const data = {
        id: id.value,
        pw: pw.value
      }
      emit('onSignIn', data)
    }
    const closeModal = () => {
      emit('closeSignIn')
    }
    return {
      id,
      pw,
      repw,
      name,
      onSignIn,
      closeModal
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