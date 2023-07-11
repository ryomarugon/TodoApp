<template>
  <div class="container">
    <Header />
    <TodoApp />
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
    return {
    };
  },
};
</script>

<style>
body{
  padding: 0;
  margin: 0;
  width: 100vw;
  font-size: 14px ;
}
</style>
