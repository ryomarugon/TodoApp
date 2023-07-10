<template>
  <div class="task-item">
    <p>{{ task }}</p>
    <ul class="tag-list">
      <li v-for="tagItem in tag" :key="tagItem">{{ tagItem }}</li>
    </ul>
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
      type: Array,
      required: true,
    }
  },
};
</script>

<style scoped>
.task-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.tag-list {
  display: flex;
  /* flex-direction: column; */
  /* align-content: flex-start; */
  list-style: none;
  margin: 0;
  padding: 0;
}
li{
  background-color:olive ;
  color: white;
  margin-right: 5px;
}
p,ul{
  font-size: 14px;
}

</style>
