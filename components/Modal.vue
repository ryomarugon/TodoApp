<template>
  <div class="modal_el">
    <div class="modal_wrap" ref="modalWrap">
      <div class="modal_ttl">タスクの追加</div>
      <div class="add_task_el">
        <input
          class="input_contents input_task"
          v-model="form.task"
          type="text"
          name="task"
          placeholder="タスクを入力..."
          required
        />
        <div class="input_contents add_tag">
          タグ<button @click="addTag($event)" class="add_tag_button">
            {{ addTagButtonText }}</button
          ><br />
        </div>
        <ul class="checked_tags">
          <li v-for="tag in selectedTags" :key="tag">{{ tag }}</li>
        </ul>
        <div v-if="inputTagForm" class="input_contents input_tag">
          <div
            class="select_tag"
            v-if="selectTagList"
            :value="selectedTags"
            size="4"
            name="tag"
            multiple
          >
            <div class="all_tags">タグ一覧</div>
            <div
              v-for="option in addTagHistory"
              :value="option"
              :key="option"
              @click.stop="toggleAddTag(option)"
            >
              {{ option }}
              <span v-if="isSelected(option)">✔︎</span>
            </div>
          </div>
          <div class="create_tag_el">
            <input
              type="text"
              v-model="newTag"
              name="tag"
              placeholder="新しいタグを入力"
            />
            <button class="create_tag_btn" @click="createTag($event)">
              作成
            </button>
          </div>
          <p class="error_same_tag">{{ sameTagError }}</p>
        </div>
        <div class="input_contents btn_group">
          <button class="cancel_btn" @click="closeModal">キャンセル</button>
          <button class="add_task_btn" @click="handleSubmit">追加</button>
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
      addTagButtonText: "+",
      sameTagError: "",
    };
  },
  computed: {
    addTagHistory() {
      return this.tagHistory.filter((tag) => tag !== "未選択");
    },
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
      if(this.sameTagError){
        this.sameTagError="";
      }
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

    // If user clicks modal oudside modal_wrap, closeModal function will be called
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
  mounted() {
    // Add addEventListener to outside elements of modal_wrap
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    // クリックイベントリスナーを解除
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style scoped>
.modal_el {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.modal_wrap {
  max-width: 450px;
  max-height: 522px;
  min-height: 250px;
  min-width: 330px;
  padding: 40px 60px;
  background-color: white;
  position: relative;
}
.add_task_el {
  display: flex;
  flex-direction: column;
}

.modal_ttl {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.input_task {
  width: 100%;
  height: 51px;
  font-size: 20px;
}

.add_tag {
  font-size: 14px;
  margin-top: 10px;
}

.checked_tags {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}
li {
  background-color: #a1af2f;
  color: white;
  padding: 3px 10px;
  margin: 5px 5px 5px 0;
  white-space: nowrap;
  border-radius: 10px;
}
p,
ul {
  font-size: 14px;
}

.input_tag {
  height: 70%;
  margin-bottom: 40px;
}
.all_tags {
  text-align: center;
  color: white;
  background-color: black;
  position: sticky;
  top: 0;
}
.select_tag {
  width: 170px;
  height: 170px;
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
.btn_group {
  font-size: 14px;
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: 60px;
}
.create_tag_el {
  margin-top: 5px;
  display: flex;
  gap: 5px;
  position: relative;
}
.create_tag_btn,
.add_task_btn {
  color: white;
  background-color: black;
}
</style>
