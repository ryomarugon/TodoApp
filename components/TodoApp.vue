<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="(tasks, index) in tasks_group" :key="index">
        <button @click="openModal(statusList[index], index)">
          +<span class="text-success">課題の追加</span>
        </button>
        <TaskList :status="statusList[index]" :tasks="tasks_group[index]" />
      </div>
    </div>
  </div>
  <Modal
    @closeModal="closeModal"
    v-if="showModal"
    :status="selectedStatus"
    :index="taskIndex"
    :tagHistory="tagHistory"
    :showModal="true"
    @addTask="addTask"
  ></Modal>
</template>

<script>
import TaskList from "./TaskList.vue";
import Modal from "./Modal.vue";

export default {
  components: {
    TaskList,
    Modal,
  },
  data() {
    return {
      status: "",
      taskIndex: "",
      statusList: ["未対応", "処理中", "レビュー中", "完了"],
      showModal: false,
      tasks_group: [
        // dummy data for demostrating draggable tags
        [
          { name: "test", tags: ["tag1", "tag2"] },
          { name: "test2", tags: ["tag3", "tag4"] },
        ],
        [
          { name: "test", tags: ["tag1", "tag2"] },
          { name: "test2", tags: ["tag3", "tag4"] },
        ],
        [
          { name: "test", tags: ["tag1", "tag2"] },
          { name: "test2", tags: ["tag3", "tag4"] },
        ],
        [
          { name: "test", tags: ["tag1", "tag2"] },
          { name: "test2", tags: ["tag3", "tag4"] },
        ],
      ],
      selectedStatus: "",
      tagHistory: ["tag1", "tag2", "tag3", "tag4"],
    };
  },
  methods: {
    openModal(status, index) {
      this.taskIndex = index;
      this.selectedStatus = status;
      this.showModal = true;
      console.log(status);
      event.stopPropagation();
    },
    // There is $emit element in handleSubmit function of Modal component
    addTask(task, index) {
      this.tasks_group[index].unshift(task);
    },
    closeModal() {
      this.showModal = false;
      this.selectedStatus = "";
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: whitesmoke;
}
.row {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-grow: 1;
  overflow: auto;
}
.col {
  width: 250px;
  overflow: auto;
}
</style>
