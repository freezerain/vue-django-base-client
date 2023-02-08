<template>
  <div class="root-div">
    <div class="overlay" @click="closeDialog"></div>
    <div class="modal">
      <h2 class="title">Edit</h2>
      <div class="fields">
        <label class="field-label">
          <span>Title</span>
          <input type="text" v-model="localEvent.title">
        </label>
        <label class="field-label">
          <span>Description</span>
          <input type="text" v-model="localEvent.description">
        </label>
        <label class="field-label">
          <span>Location</span>
          <input type="text" v-model="localEvent.location">
        </label>
        <label class="field-label">
          <span>Date</span>
          <input type="datetime-local" v-model="localEvent.date">
        </label>
        <label class="field-label">
          <span>Status</span>
          <select v-model="localEvent.status">
            <option v-for="option in options" :key="option">
              {{ option }}
            </option>
          </select>
        </label>
        <label class="field-label">
          <span>Owner</span>
          <input type="text" v-model="localEvent.owner">
        </label>
      </div>
      <div class="buttons">
        <button type="button" class="btn decline" @click="closeDialog">Cancel</button>
        <button type="button" class="btn accept" @click="saveDialog">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditDialog",
  props: ['myEvent', 'user'],
  data() {
    return {
      localEvent: {},
      options: ["DRAFT", "PRIVATE", "PUBLIC", "REMOVED", "UNDEFINED"]
    }
  },
  methods: {
    closeDialog() {
      this.$emit('cancelEditDialog')
    },
    async accept() {
      await this.$http.post("http://127.0.0.1:8000/register/", {
        username: this.username,
        password: this.password
      }).then(r => this.$http.post("http://127.0.0.1:8000/api-token-auth/", {
        username: this.username,
        password: this.password
      }))
          .then(r => this.$emit('loggedIn', r.data.token, r.data.username, r.data.is_superuser))
          .then(() => this.$emit('closeDialog'))
          .catch(e => console.log(e))
    },
    async saveDialog() {
      await this.$http.put(this.localEvent.url, {/*good trick again*/...this.localEvent}, {
        headers: {Authorization: `Token ${localStorage.getItem('token')}`}
      })
          .then(r => this.$emit('requestRefresh'))
          .then(() => this.$emit('cancelEditDialog'))
          .catch(e => console.log(e))
    }
  },
  created() {
    Object.assign(this.localEvent, this.myEvent) //Please tell me how to do this better
  },
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
  background: orangered;
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
  text-shadow: 2px 2px 2px black;
}

.field-label input, .field-label select {
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