<template>
  <header>
    <div class="cat_logo">
      <img src="..//assets/cat_logo.svg" alt=""/>
      <span>My title</span>
    </div>
    <div class="auth_block" :class="{authorize: isAuth}">
      <span class="username" v-if="isAuth">Username</span>
      <button type="button" class="btn login" v-if="!isAuth" @click='login'>Login</button>
      <button type="button" class="btn logout" v-if="isAuth" @click="logout">Logout</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      isAuth : true,

    }
  },
  methods: {
    login() {
      this.isAuth = !this.isAuth
    },
    logout() {
      this.isAuth = !this.isAuth

    }
  }

}
</script>


<style scoped>
header{
  display:flex;
  align-items:center;
  width:100%;
  background: rgba(255, 0, 0, 0.84);
}
.cat_logo {
  display:flex;
  align-items:center;
  margin-right:auto;
}
.cat_logo img{
  max-width:50px;
}
.auth_block{
  margin-left:auto;

}
.authorize{
 /* TODO mutate after*/
}
.btn{
  margin:0 10px
}
.login{

}
.logout{

}
</style>