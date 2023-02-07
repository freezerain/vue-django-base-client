<template>
  <header>
    <div class="cat_logo">
      <img src="..//assets/cat_logo.svg" alt=""/>
      <h3 class="title_text">Cats event manager</h3>
    </div>
    <AuthComponent/>
  </header>
</template>

<script>
import AuthComponent from "./AuthComponent.vue";

export default {
  name: "Header",
  components: {
    AuthComponent,
  },
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  background: rgb(183, 28, 28);
  border-radius: 0 0 10px 10px;
  padding: 5px;
}
.title_text {
  text-shadow: 1px 1px #000000;
  color: #ffffff
}
.cat_logo {
  display: flex;
  margin-right: auto;
  filter: contrast(200%) drop-shadow(1px 1px #000000);
  align-items: center;

}

.cat_logo img {
  height:50px;
  object-fit: fill;
}

AuthComponent {
  margin-left: auto;
}
</style>