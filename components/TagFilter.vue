<template>
  <div class="container">
    <p>タグ</p>
    <div class="filtering_box">
      <div
        class="selected_tags"
        @click="showFilterTags($event)"
        ref="selectedTags"
      >
        <p class="">▼</p>
      </div>
      <div
        v-if="showFilteringEl"
        class="show_filtering_el"
        :style="{ width: getWidth }"
      >
        <div class="filtering_tags">
          <input
            type="text"
            class="searching_tag"
            placeholder="タグを検索…"
            @input="handleTagSearch"
          />
          <!-- <div>未選択</div> -->
          <div
            class="tag_list"
            v-for="option in tagHistory"
            :value="option"
            :key="option"
            @click="toggleFilterTag(option)"
            v-show="isTagVisible(option)"
          >
            {{ option }}
            <span v-if="isSelected(option)">✔︎</span>
          </div>
        </div>
        <div class="filtering_btn" @click="filterTags(option)">絞り込む</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["filterTags"],
  data() {
    return {
      showFilteringEl: false,
      searchText: "",
      filteredTags: [],
    };
  },
  props: {
    tagHistory: {
      type: Array,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    getWidth() {
      const selectedTagsWidth = this.$refs.selectedTags.clientWidth;
      return selectedTagsWidth ? `${selectedTagsWidth}px` : "100%";
    },
  },
  methods: {
    showFilterTags($event) {
      $event.preventDefault();
      if (!this.tagHistory.includes("未選択")) {
        this.tagHistory.unshift("未選択");
      }
      this.showFilteringEl = !this.showFilteringEl;
      if (!this.showFilteringEl) {
        this.searchText = "";
      }
    },
    handleTagSearch(event) {
      this.searchText = event.target.value;
    },
    isTagVisible(tag) {
      if (this.searchText == "") {
        return true; //if the text typed in searching filed was none, display all option
      } else {
        if (tag.includes(this.searchText)) {
          return true; //if the text typed in searching filed was included in tagHistory, display the tags
        }
      }
    },
    toggleFilterTag(tag) {
      //If selected tag is "未選択（unselected）" is clicked
      if (tag === "未選択") {
        if (!this.filteredTags.includes(tag)) {
          this.filteredTags = [tag]; //If "未選択（unselected）" was not included in selected tags and it was clicked, the content of tagHistory is only "未選択（unselected）"
        } else {
          this.filteredTags = []; //If "未選択（unselected）" was included in selected tags and it was clicked, the content of tagHistory is none"
        }
      } else {
        //If other than "未選択（unselected）" is clicked
        if (this.filteredTags.includes(tag)) {
          this.filteredTags.splice(this.filteredTags.indexOf(tag), 1); //If the option was included in selected tags, it is cleared
        } else {
          if (this.filteredTags.includes("未選択")) {
            this.filteredTags.splice(this.filteredTags.indexOf("未選択"), 1); //If the option wasn't included and "未選択（unselected）" was included in selected tags, "未選択（unselected）" is cleared
          }
          this.filteredTags.push(tag);
        }
      }
    },
    isSelected(tag) {
      if (this.showFilteringEl === true) {
        const isSelected = this.filteredTags.includes(tag);
        return isSelected;
      }
    },
    filterTags() {
      // if (this.selectedTags === [] || this.selectedTags.includes("未選択")) {
      this.$emit("filterTags", this.filteredTags);
      this.showFilteringEl = !this.showFilteringEl;

      // console.log(this.tasks);
      // } else {
      //   // console.log(this.tasks);
      // const filteredTasks = this.tasks.filter((task) => {
      //   console.log(task);
      //   console.log(task.tags);
      //   for (let i = 0; i < this.selectedTags.length; i++) {
      //     if (!task.tags.includes(this.selectedTags[i])) {
      //       return false;
      //     }
      //   }
      //   return true;
      // });
      //   console.log(filteredTasks);
      //   this.$emit("filterTags", filteredTasks);
    },
  },
  // watch: {
  //   filteredTags: {
  //     handler() {
  //       console.log("entered");
  //       this.$emit("filterTags", this.filteredTags);
  //     },
  //     immediate: true,
  //   },
  // },
};
</script>
<style scoped>
.container {
  width: 100%;
  /* height: 150px; */
}

.filtering_box {
  width: 100%;
  cursor: pointer;
}

.selected_tags {
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 15px;
  width: 100%;
  padding: 5px;
  border: 1px solid black;
}
.show_filtering_el {
  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  height: 135px;
  width: 100%;
  border: 1px solid black;
  overflow: auto;
}
.filtering_tags {
  margin: 5px 5px 25px 5px;
  height: 100%;
}

.searching_tag {
  width: 90%;
  height: 15px;
  padding: 5px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.filtering_btn {
  color: white;
  background-color: black;
  text-align: center;
  position: sticky;
  bottom: 0;
}
</style>
