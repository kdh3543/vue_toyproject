<template>
  <div>
    <div class="reserveBox">
      <div class="d-flex">
        <h4 class="p-2 mx-auto">
          RESERVATION
        </h4>
      </div>
      <button
        class="btn btn-close close"
        @click="closeReserve"
      />
      <div class="input-group">
        <span class="input-group-text">Seat Num: </span>
        
        <input
          type="text"
          class="date form-control"
          disabled
          :value="index"
        >
      </div>
      <div class="mt-2 input-group">
        <span class="input-group-text">Date: </span>
        <input
          v-model="date"
          type="date"
          class="date form-control"
        >
      </div>
      <div class="mt-2 input-group">
        <span class="input-group-text">Name: </span>
        <input
          v-model="name"
          type="text"
          class="form-control name"
        >
      </div>
      <div
        v-if="error"
        class="error"
      >
        All information must be entered.
      </div>
      <div
        v-if="loginError"
        class="error"
      >
        Please login and then go reserve
      </div>
      <div class="mt-2">
        <button
          class="btn btn-sm reserveBtn"
          @click="reserveSuccess(sendId)"
        >
          RESERVE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
// import ReservedList from '@/components/Modal/Reserve/ReservedListModal.vue'
import { useStore } from 'vuex'

export default {
  props:{
    index:{
      type: Number,
      required: true
    },
    sendId:{
      type: Number,
      required: true
    }
  },
  // components: {
  //   ReservedList
  // },
  emits:['close-reserve','reserve-success'],
  setup(props,{emit}){
    const store = useStore()
    const date = ref('')
    const name = ref('')
    const error = ref(false)
    const loginError = ref(false)
    const closeReserve = () => {
      emit('close-reserve')
    }
    const reserveSuccess = (index) => {
      console.log(index)
      if(store.state.member.user == ''){
        loginError.value = true
      }else{
        loginError.value = false
        if(!date.value||!name.value){
          error.value = true
          return false
        }else{
          error.value = false
          emit('reserve-success',{
            id: index,
            date: date.value,
            name: name.value
          })  
        }
      }
    }
    return {
      date,
      name,
      closeReserve,
      reserveSuccess,
      error,
      loginError,
    }
  }
}
</script>

<style scoped>
.reserveBox {
  margin: auto;
  width: 20%;
  background-color: white;
  border: 10px solid black;
  position: relative;
  border-radius: 2rem;
  padding: 10px;
}
.date {
  background: none;
}
.name {
  background: none;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
}
.input-group-text {
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
}
.reserveBtn {
  background-color: rgb(138, 43, 226, 0.3);
}
.reserveBtn:hover {
  background-color: rgb(138, 43, 226);
}
.error {
  color: salmon;
}
.select {
  background: none;
  border: 1px solid white;
}
</style>