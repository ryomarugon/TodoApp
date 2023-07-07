<template>
  <div class="modal">
    <div class="modal-wrap">
      <p class="text-lg">タスクの追加</p>
      <form @submit.prevent="handleSubmit">
        <input
          class="form-control form-control-lg"
          v-model="form.task"
          type="text"
          name="task"
          placeholder="タスクを入力..."
          required
        /><br />
        <div class="input_tag">
          タグ<button @click="createTag($event)">+</button><br />
        </div>
        <div v-if="inputTagForm" class="input_tag">
          <input
            v-model="form.tag"
            type="text"
            name="tag"
            placeholder="新しいタグを入力"
          />
          <button>作成</button>
        </div>
        <button @click="$emit('closeModal')">キャンセル</button>
        <button type="submit">追加</button>
      </form>
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
        tag: "",
        status: this.status,
      },
      inputTagForm: false,
    };
  },

  methods: {
    createTag($event) {
      $event.preventDefault();
      this.inputTagForm = true;
    },
    handleSubmit() {
      const formData = {
        task: this.form.task,
        tag: this.form.tag,
        status: this.status,
      };
      console.log(formData.status);
      switch (formData.status) {
        case this.status.UNSUPPORTED:
          this.$emit("addTaskUnsupported", formData);
          break;
        case this.status.IN_PROGRESS:
          this.$emit("addTaskInProgress", formData);
          break;
        case this.status.IN_REVIEW:
          this.$emit("addTaskInReview", formData);
          break;
        case this.status.COMPLETED:
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
    position: absolute;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 40vh;
    width: 50vw;
  }
}
</style>
