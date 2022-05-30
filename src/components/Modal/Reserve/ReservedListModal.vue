<template>
  <div>
    <div class="reserveBox">
      <div class="d-flex">
        <h4 class="p-2 mx-auto">
          <slot name="head" />
        </h4>
      </div>
      <button class="btn btn-close close" @click="closeList"></button>
      <slot name="body" :index="index" :id="reserveList.id" :date="reserveList.date" :reserveName="reserveList.name"></slot>
      
      <slot name="foot" :memberId="reserveList.memberId" :id="reserveList.id" ></slot>
      
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ReservedList from '@/components/Modal/Reserve/ReservedListModal.vue'

export default {
  components: {
    ReservedList
  },
  emits:['closeList'],
  props:{
    reserveList:{
      types: Array,
      require: true
    },
    index:{
      types: Number,
      require: true
    }
  },
  setup(props,{emit}){
    const closeList = () => {
      emit('closeList')
    }
    return {
      closeList,
    }
  }
}
</script>

<style scoped>
.reserveBox {
  margin: auto;
  width: 300px;
  height: 300px;
  background-color: gray;
  border: 10px solid black;
  position: relative;
  border-radius: 2rem;
  padding: 10px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
}


.error {
  color: salmon;
}
</style>