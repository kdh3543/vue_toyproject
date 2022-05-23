<template>
  <div class="signModal">
    <div class="col-3 mx-auto box p-3">
      <div class="d-flex title">
        <h2>LOGOUT</h2>
        <span class="btn btn-close btn-close-white close" @click="closeModal"></span>
      </div>
      <div class="btns">
        <button class="btn btn-primary submit btn-sm me-2" @click="logout">LOGOUT</button>
        <button class="btn btn-primary submit btn-sm" @click="closeModal">CANCEL</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  emits:['closeLogout','onLogout'],
  setup(props,{emit}){
    const closeModal = () => {
      emit('closeLogout')
    }
    const logout = () => {
      emit('onLogout')
    }
    return {
      closeModal,
      logout
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
.submit {
  border-radius: 1rem;
  background-color: gray;
  border: none;
}
.submit:hover {
  background-color: rgb(128, 128, 128, 0.5);
}
.btns {
  text-align: center;
}
</style>