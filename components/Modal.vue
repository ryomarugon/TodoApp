<template>
  <div class="modal">
    <div class="modal-wrap">
      <h3 class="text-lg">タスクの追加</h3>
      <div>
        <input
          class="input_contents input_task"
          v-model="form.task"
          type="text"
          name="task"
          placeholder="タスクを入力..."
          required
        /><br />
        <div class="input_contents add_tag_button">
          タグ<button @click="addTag($event)">+</button><br />
        </div>
        <div v-if="inputTagForm" class="input_contents input_tag">
          <div
            class="select_tag"
            v-if="selectTagList"
            :value="selectedTags"
            size="4"
            name="tag"
            multiple
            @change="handleTagChange"
          >
            <div
              v-for="option in tagHistory"
              :value="option"
              :key="option"
              @click="toggleTag(option)"
            >
              {{ option }}
              <span v-if="isSelected(option)">✔︎</span>
            </div>
          </div>
          <br />
          <input
            type="text"
            v-model="newTag"
            name="tag"
            placeholder="新しいタグを入力"
          />
          <button @click="createTag($event)">作成</button>
        </div>
        <div class="input_contents">
          <button @click="$emit('closeModal')">キャンセル</button>
          <button @click="handleSubmit">追加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from "./TaskList.vue";

export default {
  components: {
    TaskList,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    tagHistory: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      form: {
        task: "",
        tag: [],
        status: this.status,
      },
      inputTagForm: false,
      selectTagList: false,
      showCheckTags: false,
      newTag: "", // 新しいタグを保持するデータプロパティ
      selectedTags: [],
    };
  },

  methods: {
    addTag($event) {
      $event.preventDefault();
      this.inputTagForm = true;
      if (this.tagHistory.length > 0) {
        this.selectTagList = true;
      }
    },
    createTag($event) {
      $event.preventDefault();
      if (this.newTag) {
        // const newTagObj = {
        //   id: this.tagHistory.length + 1,
        //   value: this.newTag,
        // };
        // this.tagHistory.push(newTagObj);
        this.tagHistory.push(this.newTag);
        console.log(this.tagHistory);
        this.newTag = ""; // 新しいタグの入力フィールドをリセット
        this.selectTagList = true;
      }
    },
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index !== -1) {
        this.selectedTags.splice(index, 1); // タグを削除
      } else {
        this.selectedTags.push(tag); // タグを追加
      }
    },
    isSelected(tag) {
      return this.selectedTags.includes(tag);
    },
    handleSubmit() {
      const formData = {
        task: this.form.task,
        tag: this.selectedTags,
        status: this.status,
      };
      if (this.form.task !== "") {
        switch (formData.status) {
          case "UNSUPPORTED":
            this.$emit("addTaskUnsupported", formData);
            break;
          case "IN_PROGRESS":
            this.$emit("addTaskInProgress", formData);
            break;
          case "IN_REVIEW":
            this.$emit("addTaskInReview", formData);
            break;
          case "COMPLETED":
            this.$emit("addTaskCompleted", formData);
            break;
          default:
            break;
        }
        this.$emit("closeModal");
      }
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-wrap {
  padding: 20px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input_contents {
  margin-bottom: 20px;
}
.select_tag {
  width: 150px;
  height: 75px;
  border: 1px solid black;
  overflow: auto;
}
</style>
