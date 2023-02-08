<template>
  <div class="main-div" :class="{authorize: store.isAuth}">
    <h3 class="username">{{ store.isAuth? `Welcome, ${username}` : "Please register or login -> "}}</h3>
    <button type="button" class="btn register" v-if="!store.isAuth" @click='showRegisterDialog'>Register</button>
    <button type="button" class="btn login" v-if="!store.isAuth" @click='showLoginDialog'>Login</button>
    <button type="button" class="btn logout" v-if="store.isAuth" @click="logout">Logout</button>
  </div>
  <LoginForm v-if="isLoginDialog" @closeDialog="closeDialogs" @loggedIn="loginIntent"></LoginForm>
  <RegisterForm v-if="isRegisterDialog" @closeDialog="closeDialogs" @loggedIn="loginIntent"></RegisterForm>
</template>

<script>
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import { store } from '../globalStore.js';

export default {
  name: "AuthComponent",
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      store,
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
    showLoginDialog() {
      this.isLoginDialog = true
    },
    showRegisterDialog() {
      this.isRegisterDialog = true
    },
    loginIntent(token, username, isSuperuser) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('is_superuser', isSuperuser)
      this.loadLoginDataIntoStore()
    },
    logout() {
      localStorage.setItem('token', '');
      localStorage.setItem('username', '');
      localStorage.setItem('is_superuser', '');
      this.loadLoginDataIntoStore()
    },
    loadLoginDataIntoStore(){
      /* sync localStorage to global reactive store
      *  Simulating event main bus pattern
      *  We want to notify table when user login-in/out for refreshing
      * */
      if (localStorage.getItem('token')){
        this.store.isAuth = true;
        this.store.isSuperuser = localStorage.getItem('is_superuser') == 'true'
        this.username = localStorage.getItem('username')
      }else{
        this.username = ''
        this.store.isSuperuser = false
        this.store.isAuth = false
      }
    },
  },
  created() {
    this.loadLoginDataIntoStore();
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
  background: bisque;
  color: #000000;
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