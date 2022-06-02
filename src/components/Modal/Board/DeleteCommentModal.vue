<template>
  <div class="signModal">
    <div class="col-3 mx-auto box p-3">
      <div class="d-flex title">
        <span
          class="btn btn-close btn-close-white close"
          @click="closeModal"
        />
      </div>
      <div class="mt-2 confirmMsg">
        <span>Are you sure you want to delete comment?</span>
      </div>
      <div class="btns mt-3">
        <button
          class="btn btn-primary submit btn-sm me-2"
          @click="onDelete(index)"
        >
          DELETE
        </button>
        <button
          class="btn btn-primary submit btn-sm"
          @click="closeModal"
        >
          CANCEL
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  emits:['close-delete','on-delete'],
  setup(props,{emit}){
    const closeModal = () => {
      emit('close-delete')
    }
    const onDelete = (index) => {
      emit('on-delete',index)
    }
    return {
      closeModal,
      onDelete
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
.confirmMsg {
  text-align: center;
}
</style>