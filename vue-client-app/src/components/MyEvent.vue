<template>
  <tr>
    <td>{{ myEvent.title }}</td>
    <td>{{ myEvent.description }}</td>
    <td>{{ myEvent.location }}</td>
    <td>{{ myEvent.date }}</td>
    <td>{{ myEvent.status }}</td>
    <td>{{ myEvent.owner }}</td>
    <td>
      <ul class="subscriber_list">
        <li v-for="subscriber in myEvent.subscribers">
          <span>{{ subscriber }}</span>
        </li>
      </ul>
    </td>
    <td class="actions">
      <button type="button" class="btn edit"
              v-if="isOwnerOrAdmin" @click='edit'>Edit</button>
      <button type="button" class="btn subscribe"
              v-if="isAuthorized && !isSubscribed" @click='subscribe'>
        Subscribe
      </button>
      <button type="button" class="btn unsubscribe"
              v-if="isAuthorized && isSubscribed" @click='unsubscribe'>
        Unsubscribe
      </button>
    </td>
  </tr>
  <EditDialog v-if="isEditMode" :myEvent="myEvent"
              @cancelEditDialog="cancelEdit"
              @requestRefresh="fetchEventData"/>
</template>

<script>
import EditDialog from "./EditDialog.vue";
import {store} from "../globalStore";

export default {
  props: ['myEvent'],
  data() {
    return {
      store,
      isEditMode: false
    }
  },
  components: {
    EditDialog,
  },
  methods: {
    subscribe() {
      this.subscriptionRequest(true)
    },
    unsubscribe() {
      this.subscriptionRequest(false)
    },
    async subscriptionRequest(isSubscribe) {
      await this.$http.post(this.myEvent.url + (isSubscribe ? "subscribe/" : "unsubscribe/"), {},
          {headers: {Authorization: `Token ${localStorage.getItem('token')}`}})
          .then(r => this.fetchEventData())
          .catch(e => console.log(e))
    },
    edit() {
      this.isEditMode = true
    },
    cancelEdit() {
      this.isEditMode = false;
    },
    async fetchEventData() {
      await this.$http.get(this.myEvent.url, this.store.isAuth ? {
        headers: {Authorization: `Token ${localStorage.getItem('token')}`}
      } : {})
          .then(r => Object.assign(this.myEvent, r.data)) //Trick here, ask me why
          .catch(e => console.log(e))
    }
  },
  computed: {
    isOwnerOrAdmin() {
      return store.isSuperuser || localStorage.getItem('username') == this.myEvent.owner
    },
    isSubscribed() {
      return this.myEvent.subscribers.includes(localStorage.getItem('username'))
    },
    isAuthorized() {
      return localStorage.getItem('token')
    }
  }
}
</script>

<style scoped>
tr:nth-child(even) {
  background-color: #2f2f2f;
}

tr td {
  padding: 5px;
  color: white;
}

.actions {
  text-align: right;
}

.btn {
  margin: 5px;
  border-radius: 5px;
  min-height: 26px;
  min-width: 46px;
}

.edit {
  background: orangered;
  color: white;
}

.subscribe {
  background: green;
  color: white;
}

.unsubscribe {
  background: darkred;
  color: #c8c8c8
}
</style>

