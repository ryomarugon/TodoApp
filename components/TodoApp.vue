<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button @click="openModal('UNSUPPORTED')">
          +<span class="text-success">課題の追加</span>
        </button>
        <TaskList
          :status="status.UNSUPPORTED"
          :tasks="tasks_unsupported"
        />
      </div>
      <div class="col">
        <button @click="openModal('IN_PROGRESS')">
          +<span class="text-success">課題の追加</span>
        </button>
        <TaskList
          :status="status.IN_PROGRESS"
          :tasks="tasks_in_progress"
        />
      </div>
       <div class="col">
        <button @click="openModal('IN_REVIEW')">
          +<span class="text-success">課題の追加</span>
        </button>
        <TaskList
          :status="status.IN_REVIEW"
          :tasks="tasks_in_review"
        />
       </div>
      <div>
        <button @click="openModal('COMPLETED')">
          +<span class="text-success">課題の追加</span>
        </button>
        <TaskList
          :status="status.COMPLETED"
          :tasks="tasks_completed"
        />
      </div>
    </div>
    <Modal
      @closeModal="closeModal"
      v-if="showModal"
      :status="selectedStatus"
      :tasks="tasks"
      @addTaskUnsupported="addTaskUnsupported"
      @addTaskInProgress="addTaskInProgress"
      @addTaskInReview="addTaskInReview"
      @addTaskCompleted="addTaskCompleted"
    ></Modal>
  </div>
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
      tasks:[],
      tasks_unsupported: [],
      tasks_in_progress: [],
      tasks_in_review: [],
      tasks_completed: [],
      selectedStatus: "",
    };
  },
  methods: {
    openModal(status) {
      this.selectedStatus = status;
      this.showModal = true;
    },
    addTaskUnsupported(task) {
      this.tasks_unsupported.push(task);
      console.log(this.tasks_unsupported);
    },
    addTaskInProgress(task) {
      this.tasks_in_progress.push(task);
      console.log(this.tasks_in_progress);
    },
    addTaskInReview(task) {
      this.tasks_in_review.push(task);
      console.log(this.tasks_in_review);
    },
    addTaskCompleted(task) {
      this.tasks_completed.push(task);
      console.log(this.tasks_completed);
    },
    closeModal() {
      this.showModal = false;
      this.selectedStatus = "";
    },
  },
};
</script>
