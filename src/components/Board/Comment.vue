<template>
  <div>
    <div
      v-for="(list,index) in comments"
      :key="index"
      class="commentBox d-flex mt-2"
    >
      <div class="col-10">
        <div class="id p-2">
          {{ list.userId }} <span style="font-size:12px">{{ list.time }}</span>
        </div>
        <div class="time p-2">
          {{ list.time }}
        </div>
        <div class="contents">
          <input
            v-model="list.comment"
            type="text"
            class="form-control"
            style="overflow:auto"
            :style="list.modify ? '' : 'background:none; border:none;'"
            :disabled="list.modify ? false : true"
          >
        </div>
      </div>
      <div
        v-if="$store.state.member.user==list.userId"
        class="col-2 commentBtns"
      >
        <button
          v-if="list.modify"
          class="m-1"
          @click="modComment(list.id,index)"
        >
          수정완료
        </button>
        <button
          v-if="!list.modify"
          class="m-1"
          @click="modifyComment(index)"
        >
          수정
        </button>
        <button
          v-if="!list.modify"
          class="m-1"
          @click="delComment(list.id)"
        >
          삭제
        </button>
        <button
          v-if="list.modify"
          class="m-1"
          @click="cancelComment(index)"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    comments: {
      type: Array,
      required: true
    }
  },
  emits:['mod-comment','del-comment'],
  setup(props,{emit}) {
    const modifyComment = (index) => {
      // eslint-disable-next-line vue/no-mutating-props
      props.comments[index].modify = true
    }
    const modComment = (id,index) => {
      const data = {
        id: id,
        modifiedComment: props.comments[index].comment
      }
      emit('mod-comment', data)
      // eslint-disable-next-line vue/no-mutating-props
      props.comments[index].modify = false
    }
    const delComment = (id) => {
      emit('del-comment',id)
    }
    const cancelComment = (index) => {
      // eslint-disable-next-line vue/no-mutating-props
      props.comments[index].modify = false
    }
    return {
      modComment,
      delComment,
      modifyComment,
      cancelComment
    }
  }
}
</script>

<style scoped>
.commentBox {
  width: 100%;
  height: 140px;
  border: 1px solid gray;
  border-radius: 10px;
  position: relative;
}
.commentBtns {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.commentBtns > button {
  border: none;
  background: none;
}
.commentBtns > button:hover {
  transform: scale(1.1);
}
</style>