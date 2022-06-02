<template>
  <div>
    <div class="reserveBox">
      <div class="d-flex">
        <h4 class="p-2 mx-auto">
          <slot name="head" />
        </h4>
      </div>
      <button
        class="btn btn-close close"
        @click="closeList"
      />
      <slot
        :id="reserveList.id"
        name="body"
        :index="index"
        :date="reserveList.date"
        :reserve-name="reserveList.name"
      />
      
      <slot
        :id="reserveList.id"
        name="foot"
        :member-id="reserveList.memberId"
      />
    </div>
  </div>
</template>

<script>

export default {

  props:{
    reserveList:{
      type: Array,
      required: true
    },
    index:{
      type: Number,
      required: true
    }
  },
  emits:['close-list'],
  setup(props,{emit}){
    const closeList = () => {
      emit('close-list')
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