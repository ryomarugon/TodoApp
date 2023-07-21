<template>
  <div class="task_list" v-if="isFiltering">
    <div class="add_task_btn">
      <button @click="openModal(status,index)">
        +<span class="text-success">課題の追加</span>
      </button>
    </div>
    <div class="card_columns">
      
      <div v-for="task in filteredTasks" :key="task.id">
        <div class="task_item">
          <div>
            <p class="task_name">{{ task.name }}</p>
            <ul class="tag_list">
              <li v-for="tagItem in task.tags" :key="tagItem">
                {{ tagItem }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="task_list">
    <div class="add_task_btn">
      <button @click="openModal(status,index)">
        +<span class="text-success">課題の追加</span>
      </button>
    </div>
    <div class="card_columns">
      <draggable
        :list="tasks"
        @@updateTasks="updateTasks"
        item-key="no"
        :animation="700"
        group="taskGroup"
        class="tasks-box"
      >
        <template #item="{ element }">
          <div class="task_item">
            <div>
              <p class="task_name">{{ element.name }}</p>
              <ul class="tag_list">
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
    isFiltering: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    openModal(status,index) {
      console.log(status);
      this.$emit("openModal",status,index )
    },
    updateTasks(newList) {
      this.$emit("update:tasks", newList.slice());
    },
  },
};
</script>
<style scoped>
.task_list {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  gap: 15px;
  width: 230px;
  height: 554px;
  overflow: auto;
}
button {
  background: none;
  border: none;
}
.text-success {
  color: green;
}
.card_columns {
  height: 90%;
}
.tasks-box {
  height: 100%;
}
.task_item {
  background-color: white;
  min-height: 75px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
  word-wrap: break-word;
}
.tag_list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}
li {
  background-color: #A1AF2F;
  color: white;
  margin: 5px 5px 0 0;
  white-space: nowrap;
}

</style>
