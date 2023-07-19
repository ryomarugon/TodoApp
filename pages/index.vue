<template>
  <div class="container">
    <div class="header"><Header /></div>
    <div class="main_contents"><TodoApp /></div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import TodoApp from "@/components/TodoApp.vue";
import TaskList from "@/components/TaskList.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Header,
    TodoApp,
    TaskList,
    Modal,
  },
  data() {
    return {};
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  width: 100vw;
}

.main_contents {
  /* padding: 40px; */
  width: 100%;
  background-color: whitesmoke;
}

</style>
