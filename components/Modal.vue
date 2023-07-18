<template>
  <div class="modal">
    <div class="modal-wrap" ref="modalWrap">
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
        <div class="input_contents add_tag">
          タグ<button @click="addTag($event)" class="add_tag_button">
            {{ addTagButtonText }}</button
          ><br />
        </div>
        <div v-if="inputTagForm" class="input_contents input_tag">
          <div
            class="select_tag"
            v-if="selectTagList"
            :value="selectedTags"
            size="4"
            name="tag"
            multiple
          >
            <div
              v-for="option in addTagHistory"
              :value="option"
              :key="option"
              @click="toggleAddTag(option)"
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
          <p class="error_same_tag">{{ sameTagError }}</p>
        </div>
        <div class="input_contents">
          <button @click="closeModal">キャンセル</button>
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
    status: {
      type: String,
      required: true,
    },
    tagHistory: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    showModal: {
      type: Boolean,
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
      newTag: "", // Data property for restore new tag
      selectedTags: [],
      TagHistory_exceptUnselected: [],
      addTagButtonText: "+",
      sameTagError: "",
    };
  },
  computed: {
    addTagHistory() {
      return this.tagHistory.filter((tag) => tag !== "未選択");
    },
  },
  mounted() {
    // Add addEventListener to outside elements of modal-wrap
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    // クリックイベントリスナーを解除
    document.removeEventListener("click", this.handleOutsideClick);
  },
  watch: {
    tagHistory: {
      handler(newVal) {
        this.selectTagList = newVal.length > 0;
      },
      immediate: true,
    },
  },

  methods: {
    addTag($event) {
      $event.preventDefault();
      this.addTagButtonText = this.addTagButtonText === "+" ? "−" : "+"; // Switch button text + and -
      this.inputTagForm = !this.inputTagForm;
      // Switch display and hiden inputTagform element(including select box and input tag to create newTag)
      // if (this.tagHistory.length > 0) {
      //   this.selectTagList = true;
      // }
    },
    createTag($event) {
      $event.preventDefault();
      if (!this.tagHistory.includes(this.newTag)) {
        this.tagHistory.push(this.newTag);
        console.log(this.tagHistory);
        this.newTag = ""; // Reset the value of newTag input field
        this.sameTagError = "";
        this.selectTagList = true;
      } else {
        this.sameTagError = "既に登録されているタグです";
        this.newTag = "";
      }
    },
    toggleAddTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      console.log(index);
      if (index !== -1) {
        this.selectedTags.splice(index, 1); // Remove checked tags from selectTags Array
      } else {
        this.selectedTags.push(tag); // Add checked tags to selectTags Array
      }
    },
    isSelected(tag) {
      if (this.inputTagForm === true) {
        return this.selectedTags.includes(tag);
      }
    },

    handleSubmit() {
      const formData = {
        name: this.form.task,
        tags: this.selectedTags,
      };

      // it means name of formData(input name:task) is required element
      if (formData.name !== "") {
        this.$emit("addTask", formData, this.index);
        this.$emit("closeModal");
      }
    },

    // If user clicks modal oudside modal-wrap, closeModal function will be called
    handleOutsideClick(event) {
      if (
        this.showModal == true &&
        !this.$refs.modalWrap.contains(event.target)
      ) {
        this.closeModal();
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
  z-index: 2;
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
  margin-bottom: 10px;
}
.select_tag {
  width: 150px;
  height: 75px;
  border: 1px solid black;
  overflow: auto;
}

.error_same_tag {
  color: red;
}

.add_tag_button {
  width: 25px;
  text-align: center;
  border: none;
  border-radius: 35%;
  outline: none;
  background: transparent;
  background-color: #d9d9d9;
  margin-left: 10px;
}
.add_tag_button:active {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
