<template>
  <div class="signModal">
    <div class="col-3 mx-auto box p-3">
      <form @submit.prevent="onSignIn">
        <div class="d-flex title">
          <h2>SIGN IN</h2>
          <span
            class="btn btn-close btn-close-white close"
            @click="closeModal"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">ID: </span>
          <input
            v-model="id"
            type="text"
            placeholder="input your id"
            class="form-control"
          >
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">PW: </span>
          <input
            v-model="pw"
            type="password"
            placeholder="input your pw"
            class="form-control"
          >
        </div>
        <div class="input-group">
          <button class="btn btn-primary submit btn-sm mx-auto">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits:['on-sign-in','close-sign-in'],
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
      emit('on-sign-in', data)
    }
    const closeModal = () => {
      emit('close-sign-in')
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