<template>
  <div class="root-div">
    <div class="overlay" @click="decline"></div>
    <div class="modal">
      <h2 class="title">Login</h2>
      <div class="fields">
        <label class="field-label">
          <span>Username</span>
          <input type="text" v-model="username">
        </label>
        <label class="field-label">
          <span>Password</span>
          <input type="text" v-model="password">
        </label>
      </div>
      <div class="buttons">
        <button type="button" class="btn decline" @click="decline">Cancel</button>
        <button type="button" class="btn accept" @click="accept">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    async accept() {
      await this.$http.post("http://127.0.0.1:8000/api-token-auth/", {
        username: this.username,
        password: this.password
      })
          .then(r => this.$emit('loggedIn', r.data.token, r.data.username, r.data.is_superuser))
          .then(() => this.$emit('closeDialog'))
          .catch(e => console.log(e))
    },
    decline() {
      this.$emit('closeDialog');
    }
  }
}
</script>

<style scoped>
.root-div {

}

.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(15, 15, 15, 0.85);
  z-index: 9;
}

.modal {
  position: fixed;
  width: 50%;
  height: auto;
  top: 50%;
  left: 50%;
  background: darkblue;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 2px 2px black;
}

.title {
  text-align: center;
  color: white;
}

.fields {
  margin: 5px
}

.buttons {
  display: flex;
  align-items: center;

}

.field-label {
  color: #ffffff;
  display: flex;
  align-items: center;
  width: 100%;
}

.field-label span {
  width: 100px;
  flex: 0 0 100px;
}

.field-label input {
  width: 100%;
}

.btn {
  margin: 5px;
  border-radius: 5px;
  min-height: 36px;
  min-width: 72px;
}

.accept {
  background: green;
  color: #ffffff;
  margin-left: auto;
}

.decline {
  background: darkred;
  color: #c8c8c8
}
</style>