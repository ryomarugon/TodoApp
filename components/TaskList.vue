<template>
  <div class="task-list">
    <h2>{{ status }}</h2>    
      <div class="card-columns" v-if="tasks.length > 0">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task.task"
          :tag="task.tag"
        />
      </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";


export default {
  components: {
    TaskItem,

  },
  props: {
    status: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {

  },
};
</script>
<style scoped>
.task-list {
  background-color: white;
  padding: 15px;
  width: 200px;
}
</style>
