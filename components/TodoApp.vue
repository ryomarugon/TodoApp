<template>
  <div class="container">
    <div class="row">
      <div class="tag-filter">
        <!-- {{ filteredTasks }} -->
        <TagFilter
          :tagHistory="tagHistory"
          :tasks="tasks_group"
          @filterTags="filterTags"
        />
      </div>
      <div class="task-list-row">
        <div class="col" v-for="(tasks, index) in tasks_group" :key="index">
          <button @click="openModal(statusList[index], index)">
            +<span class="text-success">課題の追加</span>
          </button>
          <TaskList
            :status="statusList[index]"
            :tasks="tasks_group[index]"
            :filteredTasks="filteredTasks[index]"
          />
        </div>
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
import TagFilter from "./TagFilter.vue";
import TaskList from "./TaskList.vue";
import Modal from "./Modal.vue";

export default {
  components: {
    TagFilter,
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
        // dummy data for demonstrating draggable tags
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
      isFiltered: false, 
      selectedStatus: "",
      tagHistory: ["tag1", "tag2", "tag3", "tag4"],
    };
  },
  methods: {
    filterTags(filteredTags) {
      console.log("selected tags: ", filteredTags);
      if (filteredTags.length === 0 || filteredTags.includes("未選択")) {
        this.filteredTasks = this.tasks_group;
        console.log(this.filteredTasks);
      } else {
        this.filteredTasks = this.tasks_group.map((tasks) =>
          tasks.filter((task) => {
            return filteredTags.every((tag) => task.tags.includes(tag));
          })
        );
        console.log(this.filteredTasks);
      }
    },
    openModal(status, index) {
      this.taskIndex = index;
      this.selectedStatus = status;
      this.showModal = true;
      console.log(status);
      event.stopPropagation();
    },
    // There is $emit element in handleSubmit function of Modal component
    addTask(task, index) {
      console.log(task.tags);
      this.tasks_group[index].unshift(task);
      console.log(this.tasks_group);
    },
    closeModal() {
      this.showModal = false;
      this.selectedStatus = "";
    },
  },
  created() {
    //Set filteredTasks when it was reset
    this.filteredTasks = this.tasks_group.map((tasks) => tasks.slice());
    console.log(this.filteredTasks);
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  width: 100%;
  padding: 20px;
}

.row {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.tag-filter {
  width: 150px;
  position: absolute;
  gap: 0;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  z-index: 1;
}

.task-list-row {
  width: 100%;
  position: absolute;
  display: flex;
  /* justify-content: center; */
  margin-top: 170px;
  gap: 40px;
  z-index: 0;
}

.col {
  width: 250px;
  overflow: auto;
}
</style>
