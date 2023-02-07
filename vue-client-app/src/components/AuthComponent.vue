<template>
  <div class="main-div" :class="{authorize: isAuth}">
    <h3 class="username">{{ username }}</h3>
    <button type="button" class="btn register" v-if="!isAuth" @click='showRegisterDialog'>Register</button>
    <button type="button" class="btn login" v-if="!isAuth" @click='showLoginDialog'>Login</button>
    <button type="button" class="btn logout" v-if="isAuth" @click="logout">Logout</button>
  </div>
  <LoginForm v-if="isLoginDialog" @closeDialog="closeDialogs" @loggedIn="loginIntent"></LoginForm>
  <RegisterForm v-if="isRegisterDialog" @closeDialog="closeDialogs" @loggedIn="loginIntent"></RegisterForm>

</template>

<script>
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

export default {
  name: "AuthComponent",
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      isAuth: true,
      username: "",
      isLoginDialog: false,
      isRegisterDialog: false,
    }
  },
  methods: {
    closeDialogs() {
      this.isLoginDialog = false;
      this.isRegisterDialog = false;
    },
    loginIntent(token, username) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      this.loadLoginData()
    },
    showLoginDialog() {
      this.isLoginDialog = true
    },
    showRegisterDialog() {
      this.isRegisterDialog = true
    },
    logout() {
      localStorage.setItem('token', '');
      this.loadLoginData()
    },
    loadLoginData(){
      if (localStorage.getItem('token')){
        this.isAuth = true;
        this.username = localStorage.getItem('username')
      }else{
        this.username = 'Please login -> '
        this.isAuth = false
      }
    },
  },
  created() {
    this.loadLoginData();
  },
}
</script>

<style scoped>
.main-div {
  display: flex;
  align-items: center;

}

.authorize {

}

.btn {
  margin: 0 10px;
  border-radius: 5px;
  min-height: 36px;
  min-width: 72px;
}
.register{
  background: green;
  color: #ffffff
}
.login {
  background: green;
  color: #ffffff
}

.logout {
  background: darkblue;
  color: #c8c8c8
}

.username {
  text-shadow: 1px 1px #000000;
  color: #ffffff
}
</style>