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
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;

}

.main_contents {
  padding: 50px 0;
  flex: 1;
  width: 100%;
  min-height: 100vh;
  background-color: whitesmoke;
}

</style>
