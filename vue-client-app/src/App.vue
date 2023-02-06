<script setup>
import Header from './components/Header.vue';
import MainTable from "./components/MainTable.vue";
</script>

<script>
export default {
  components: {
    Header,
    MainTable,
  },
};
</script>

<template>
  <div class="main-style">
    <Header/>
    <MainTable/>
  </div>
</template>

<style scoped>

</style>
