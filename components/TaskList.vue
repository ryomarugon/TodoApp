<template>
  <div class="task-list">
    <h2>
      {{ status }}<span class="task-count">{{ tasks.length }}</span>
    </h2>
    <div class="card-columns">
      <draggable
        :list="tasks"
        item-key="no"
        @update:list="tasks = $event"
        :animation="700"
        group="taskGroup"
        class="tasks-box"
      >
        <template #item="{ element }">
          <div class="task-item">
            <div>
              <p>{{ element.name }}</p>
              <ul class="tag-list">
                <li v-for="tagItem in element.tags" :key="tagItem">
                  {{ tagItem }}
                </li>
              </ul>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
// import TaskItem from "./TaskItem.vue";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
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
};
</script>
<style scoped>
.task-list {
  background-color: white;
  padding: 15px;
  width: 250px;
  height: 75vh;
  overflow: auto;
}
.task-count {
  border-radius: 35%;
  width: 45px;
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  text-align: center;
  height: 25px;
  background-color: #d9d9d9;
}
.card-columns {
  height: 90%;
}
.tasks-box{
  height:100%;
}
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
li {
  background-color: olive;
  color: white;
  margin-right: 5px;
}
p,
ul {
  font-size: 14px;
}
</style>
