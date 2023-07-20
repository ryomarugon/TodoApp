<template>
  <div class="container">
    <div class="row">
      <div class="tag_filter">
        <TagFilter
          :tagHistory="tagHistory"
          :tasks="tasks_group"
          @filterTags="filterTags"
        />
      </div>
      <div class="task_list_row">
        <div class="col" v-for="(tasks, index) in tasks_group" :key="index">
          <div class="status_el">
            <div
              class="task_status_mark"
              :style="{ background: roundColor(index) }"
            >
              {{ tasks_status_mark[index] }}
            </div>
            <h2 v-if="isFiltering">
              {{ statusList[index] }}
              <span class="task_count">{{ filteredTasks[index].length }}</span>
            </h2>
            <h2 v-else>
              {{ statusList[index]
              }}<span class="task_count">{{ tasks.length }}</span>
            </h2>
          </div>

          <TaskList
            :status="statusList[index]"
            :tasks="tasks_group[index]"
            :filteredTasks="filteredTasks[index]"
            :isFiltering="isFiltering"
            @updateTasks="updateTasks(index, $event)"
            @openModal="openModal(statusList[index], index)"
          />
        </div>
      </div>
    </div>
    <div class="modal">
      <Modal
        @closeModal="closeModal"
        v-if="showModal"
        :status="selectedStatus"
        :index="taskIndex"
        :tagHistory="tagHistory"
        :showModal="true"
        @addTask="addTask"
      ></Modal>
    </div>
  </div>
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
      tasks_status_mark: [],
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
      isFiltering: false,
      filteredTags: [],
      filteredTasks: [],
      selectedStatus: "",
      tagHistory: ["tag1", "tag2", "tag3", "tag4"],
      modalTask: null,
    };
  },
  computed: {
    // Use a computed property to calculate the roundColor based on tasks_status_mark
    roundColor() {
      const taskStatusColors = ["#ED8077", "#4487C5", "#5EB5A6", "#A1AF2F"];
      return (index) => taskStatusColors[index];
    },
  },
  methods: {
    openModal(status, index) {
      this.taskIndex = index;
      this.selectedStatus = status;
      this.showModal = true;
      event.stopPropagation();
    },
    filterTags(filteredTags) {
      console.log("selected tags: ", filteredTags);
      if (filteredTags.length === 0 || filteredTags.includes("未選択")) {
        this.isFiltering = false;
        console.log(this.tasks_group);
        console.log(this.filteredTags);
        console.log(this.isFiltering);
      } else {
        this.isFiltering = true;
        console.log(this.isFiltering);
        this.filteredTasks = this.tasks_group.map((tasks) =>
          tasks.filter((task) => {
            return filteredTags.every((tag) => task.tags.includes(tag));
          })
        );
        console.log(this.filteredTasks);
      }
      this.filteredTags = filteredTags;
      if (this.showModal) {
        const index = this.taskIndex;
        this.addTask(this.filteredTags, index);
        this.closeModal();
      }
    },
    // There is $emit element in handleSubmit function of Modal component
    addTask(task, index) {
      // console.log(task.tags);
      this.tasks_group[index].unshift(task);
      console.log(this.filteredTags);
      if (this.filteredTags.every((tag) => task.tags.includes(tag))) {
        this.filteredTasks[index].unshift(task);
      }
      console.log(this.tasks_group);
    },
    closeModal() {
      this.showModal = false;
      this.selectedStatus = "";
    },
    updateTasks(index, newList) {
      this.$set(this.tasks_group, index, newList);
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
  width: 90%;
  margin: 0 auto;
}

.row {
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.tag_filter {
  width: 150px;
  gap: 0;
  z-index: 1;
}

.task_list_row {
  flex: 1;
  width: 100%;
  position: absolute;
  display: flex;
  margin-top: 100px;
  gap: 25px;
  z-index: 0;
  overflow: auto;
}

.col {
  flex: 0 0 250px;
  width: 250px;
  overflow: auto;
}
.status_el{
  display: flex;
  align-items: center;
  gap: 10px;
}

.task_status_mark {
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.task_count {
  border-radius: 35%;
  width: 45px;
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  text-align: center;
  height: 25px;
  background-color: #d9d9d9;
}
</style>
