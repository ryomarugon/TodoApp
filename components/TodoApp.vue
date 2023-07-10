<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button @click="openModal('UNSUPPORTED')">
          +<span class="text-success">課題の追加</span>
        </button>
        <TaskList :status="status.UNSUPPORTED" :tasks="tasks_unsupported" />
      </div>
      <div class="col">
        <button @click="openModal('IN_PROGRESS')">
          +<span class="text-success">課題の追加</span>
        </button>
        <TaskList :status="status.IN_PROGRESS" :tasks="tasks_in_progress" />
      </div>
      <div class="col">
        <button @click="openModal('IN_REVIEW')">
          +<span class="text-success">課題の追加</span>
        </button>
        <TaskList :status="status.IN_REVIEW" :tasks="tasks_in_review" />
      </div>
      <div class="col">
        <button @click="openModal('COMPLETED')">
          +<span class="text-success">課題の追加</span>
        </button>
        <TaskList :status="status.COMPLETED" :tasks="tasks_completed" />
      </div>
    </div>
  </div>
  <Modal
    @closeModal="closeModal"
    v-if="showModal"
    :status="selectedStatus"
    :tasks="tasks"
    :tagHistory="tagHistory"
    @addTaskUnsupported="addTaskUnsupported"
    @addTaskInProgress="addTaskInProgress"
    @addTaskInReview="addTaskInReview"
    @addTaskCompleted="addTaskCompleted"
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
      status: {
        UNSUPPORTED: "未対応",
        IN_PROGRESS: "処理中",
        IN_REVIEW: "レビュー中",
        COMPLETED: "完了",
      },
      showModal: false,
      tasks: [],
      tasks_unsupported: [],
      tasks_in_progress: [],
      tasks_in_review: [],
      tasks_completed: [],
      selectedStatus: false,
      tagHistory: [],
      // newTaskObj_unsupported: {
      //   id: this.tasks_unsupported.length + 1,
      //   value: this.tasks_unsupported,
      // },
      // newTaskObj_in_progress: {
      //   id: this.tasks_in_progress.length + 1,
      //   value: this.tasks_in_progress,
      // },
      // newTaskObj_in_review: {
      //   id: this.tasks_in_review.length + 1,
      //   value: this.tasks_in_review,
      // },
      // newTaskObj_completed: {
      //   id: this.tasks_completed.length + 1,
      //   value: this.tasks_completed,
      // },
    };
  },
  methods: {
    openModal(status) {
      // let selectedStatus = true; // 定義されたメソッド内でしか使えない
      // console.log(this.selectedStatus); // false
      // console.log(selectedStatus); // true
      this.selectedStatus = status;
      this.showModal = true;
    },
    addTaskUnsupported(task) {
      this.tasks_unsupported.push(task);
      // this.tasks_unsupported.push(this.newTaskObj_unsupported)
      console.log(this.tasks_unsupported.length);
    },
    addTaskInProgress(task) {
      this.tasks_in_progress.push(task);
      // this.tasks_in_progress.push(this.newTaskObj_in_progress);
      console.log(this.tasks_in_progress);
    },
    addTaskInReview(task) {
      this.tasks_in_review.push(task);
      // this.tasks_in_review.push(this.newTaskObj);
      console.log(task);
      console.log(this.tasks_in_review);
    },
    addTaskCompleted(task) {
      this.tasks_completed.push(task);
      // this.tasks_completed.push(this.newTaskObj);
      console.log(task);
      console.log(this.tasks_completed);
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
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: whitesmoke;
}
.row {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-grow: 1;
}
</style>
