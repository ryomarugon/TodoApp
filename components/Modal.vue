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
        <div class="input_contents input_tag">
          タグ<button @click="addTag($event)">+</button><br />
        </div>
        <div v-if="inputTagForm" class="input_contents input_tag">
          <select
            class="select_tag"
            v-if="selectTag"
            v-model="form.tag"
            size="4"
            name="tag"
            multiple
          >
            <option v-for="option in form.tag" :value="option" :key="option">
              {{ option }}
            </option>
          </select><br>
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
  },

  data() {
    return {
      form: {
        task: "",
        tag: [],
        status: this.status,
      },
      inputTagForm: false,
      selectTag: false,
      newTag: "", // 新しいタグを保持するデータプロパティ
    };
  },

  methods: {
    addTag($event) {
      $event.preventDefault();
      this.inputTagForm = true;
    },
    createTag($event) {
      $event.preventDefault();
      if (this.newTag) {
        this.form.tag.push(this.newTag);
        this.newTag = ""; // 新しいタグの入力フィールドをリセット
        this.selectTag = true;
      }
    },
    handleSubmit() {
      const formData = {
        task: this.form.task,
        tag: this.form.tag,
        status: this.status,
      };
      console.log(formData.status);
      // console.log(this.status.UNSUPPORTED);
      // console.log(formData.status === "UNSUPPORTED");
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
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  .input_contents{
    margin-bottom: 20px;
  }
  .select_tag {
    width: 150px;
  }
}
</style>
