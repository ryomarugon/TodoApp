<template>
  <div class="task-item">
    <p>{{ task }}</p>
    <p>{{ tag }}</p>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.task-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
