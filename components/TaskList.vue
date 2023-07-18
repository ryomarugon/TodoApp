<template>
  <div
    class="task-list"
    v-if="filteredTasks === tasks || filteredTasks.includes('未選択')">
    <h2>
      {{ status }}<span class="task-count">{{ tasks.length }}</span>
    </h2>
    <div class="card-columns">
      <draggable
        :list="tasks"
        @update:list="tasks"
        item-key="no"
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
  <div v-else class="task-list">
    <h2>
      {{ status }}<span class="task-count">{{ filteredTasks.length }}</span>
    </h2>
    <div class="card-columns">
      <draggable
        :list="filteredTasks"
        @update:list="filteredTasks"
        item-key="no"
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
    filteredTasks: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
  height: 70vh;
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
.tasks-box {
  height: 100%;
}
.task-item {
  background-color: white;
  min-height: 75px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
  word-wrap: break-word;
}
.tag-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap; /* タグを折り返す */
}
li {
  background-color: olive;
  color: white;
  margin: 5px 5px 0 0;
  white-space: nowrap; /* テキストやタグが水平に並ぶようにする */
}
p,
ul {
  font-size: 14px;
}
</style>
