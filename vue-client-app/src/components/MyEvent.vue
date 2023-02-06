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
  <td>
    <button type="button" class="btn edit" v-if="isAllowedToEdit" @click='edit'>Edit</button>
    <button type="button" class="btn edit" v-if="isAllowedToSubscribe && !isSubscribed" @click='subscribe'>Subscribe</button>
    <button type="button" class="btn edit" v-if="isAllowedToSubscribe && isSubscribed" @click='unsubscribe'>Unsubscribe</button>
  </td>
  </tr>
  <EditDialog v-if="isEditMode" :myEvent="myEvent" @cancelEditDialog="()=>isEditMode=false"></EditDialog>
</template>

<script>
import EditDialog from "./EditDialog.vue";

export default {
  props: ['myEvent', 'user'],
  data() {
    return {
      isEditMode:false
    }
  },
  components:{
    EditDialog,
  },
  methods: {
    subscribe() {
      this.myEvent.subscribers.push(this.user.username)
    },
    unsubscribe() {
      this.myEvent.subscribers = this.myEvent.subscribers.filter(a=> a != this.user.username)
    },
    edit() {
      this.isEditMode = true
    },
  },
  created() {
    //this.fetchData()
  },
  computed:{
    isAllowedToEdit(){
      return this.user.isAdmin ||  this.user.username == this.myEvent.owner
    },
    isSubscribed(){
      return this.myEvent.subscribers.includes(this.user.username)
    },
    isAllowedToSubscribe(){
      return this.user
    }
  }
}

</script>

<style scoped>
tr:nth-child(even) {background-color: #7e7e7e;}

</style>

