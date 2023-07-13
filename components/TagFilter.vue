<template>
  <p>タグ</p>
  <div class="filtering_box">
    <div class="selected_tags" @click="showTags($event)">
      <p class="">▼</p>
    </div>
    <div v-if="showFilteringEl" class="showFilteringEl">
      <div class="filtering_tags">
        <input
          type="text"
          class="searching_tag"
          placeholder="タグを検索…"
          @change="handleTagSearch"
        />
        <div
          class="tag_list"
          v-for="option in tagHistory"
          :value="option"
          :key="option"
          @click="toggleTag(option)"
          v-show="isTagVisible(option)"
        >
          {{ option }}
          <span v-if="isSelected(option)">✔︎</span>
        </div>
      </div>
      <div class="filtering_btn">絞り込む</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilteringEl: false,
      selectedTags: [],
      searchText: "",
    };
  },
  props: {
    tagHistory: {
      type: Array,
      required: true,
    },
  },
  methods: {
    showTags($event) {
      $event.preventDefault();
      // Add "未選択（unselected）" to tagHistory only one time
      if (!this.tagHistory.includes("未選択")) {
        this.tagHistory.unshift("未選択");
      }
      this.showFilteringEl = !this.showFilteringEl;
      if(!this.showFilteringEl){
        this.searchText="";
      }
    },
    handleTagSearch(event) {
      this.searchText = event.target.value;
    },
    isTagVisible(tag) {
      if (this.searchText == "") {
        return true;
      } else {
        if (tag.includes(this.searchText)) {
            return true;
        }
      }
    },
    toggleTag(tag) {
      //If selected tag is "未選択（unselected）" is clicked
      if (tag === "未選択") {
        if (!this.selectedTags.includes(tag)) {
          this.selectedTags = [tag]; //If "未選択（unselected）" was not included in selected tags and it was clicked, the content of tagHistory is only "未選択（unselected）"
        } else {
          this.selectedTags = []; //If "未選択（unselected）" was included in selected tags and it was clicked, the content of tagHistory is none"
        }
      } else {
        //If other than "未選択（unselected）" is clicked
        if (this.selectedTags.includes(tag)) {
          this.selectedTags.splice(this.selectedTags.indexOf(tag), 1); //If the option was included in selected tags, it is cleared
        } else {
          if (this.selectedTags.includes("未選択")) {
            this.selectedTags.splice(this.selectedTags.indexOf("未選択"), 1); //If the option wasn't included and "未選択（unselected）" was included in selected tags, "未選択（unselected）" is cleared
          }
          this.selectedTags.push(tag);
        }
      }
    },
    isSelected(tag) {
      if (this.showFilteringEl === true) {
        return this.selectedTags.includes(tag);
      }
    },
  },
};
</script>
<style scoped>
.filtering_box {
  width: 150px;
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
.showFilteringEl {
  display: flex;
  flex-direction: column;
  height: 75px;
  width: 100%;
  border: 1px solid black;
  overflow: auto;
}
.filtering_tags {
  padding: 5px;
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
}
</style>
