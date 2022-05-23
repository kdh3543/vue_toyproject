<template>
  <span class="d-flex">
    <select class="form-select me-2 choice" @change="choice($event)">
      <option>ASC</option>
      <option>DESC</option>
    </select>
  </span>
</template>

<script>
export default {
  emits: ['choice'],
  setup(props, { emit }) {
    const choice = (e) => {
      emit('choice', e)
    }
    return {
      choice,
    }
  },
}
</script>

<style scoped>
.choice {
  background-color: rgb(128, 128, 128, 0.3);
  border: none;
}
</style>
