<template>
  <table>
    <thead>
    <td :class="{ascsort:currentSortingColumn=='title', descsort:!isAscending}" @click="sort('title')">Title</td>
    <td :class="{ascsort:currentSortingColumn=='description', descsort:!isAscending}" @click="sort('description')">
      Descriptionm
    </td>
    <td :class="{ascsort:currentSortingColumn=='location', descsort:!isAscending}" @click="sort('location')">Location
    </td>
    <td :class="{ascsort:currentSortingColumn=='date', descsort:!isAscending}" @click="sort('date')">Date</td>
    <td :class="{ascsort:currentSortingColumn=='status', descsort:!isAscending}" @click="sort('status')">Status</td>
    <td :class="{ascsort:currentSortingColumn=='owner', descsort:!isAscending}" @click="sort('owner')">Owner</td>
    <td>Subs</td>
    <td class="action-column">Actions</td>
    </thead>
    <tbody>
    <MyEvent v-for="event in filterTable" :key="event.url" :myEvent="event"/>
    </tbody>

  </table>
  <div class="btn_div">
    <button type="button" class="btn" v-if="store.isAuth" @click='showNewEvent'>
      + Add new event
    </button>
  </div>
  <NewEvent v-if="isShowNewEventDialog"
            @closeDialog="closeNewEvent"
            @requestFetchNewEvent="fetchNewEvent"></NewEvent>
</template>

<script>
import MyEvent from "./MyEvent.vue";
import {store} from "../globalStore.js";
import {watch} from "vue";
import NewEvent from "./NewEvent.vue";

export default {
  name: "MainTable",
  components: {
    MyEvent,
    NewEvent,
  },
  data() {
    return {
      store,
      data: [],
      isAscending: true,
      currentSortingColumn: 'title',
      isShowNewEventDialog: false
    }
  },
  methods: {
    sort(colName) { //TODO BUG !!! not strings cannot be sorted
      if (this.currentSortingColumn == colName) {
        this.isAscending = !this.isAscending
      } else {
        this.isAscending = true;
        this.currentSortingColumn = colName;
      }
      this.data = this.data.sort((a, b) => {
        const aLower = a[colName].toString().toLowerCase();
        const bLower = b[colName].toString().toLowerCase();
        const sorted = aLower > bLower ? 1 : aLower < bLower ? -1 : 0;
        return this.isAscending ? sorted : (sorted * -1);
      });
    },
    async fetchData() {
      await this.$http.get('http://127.0.0.1:8000/events/',
          store.isAuth ? {headers: {Authorization: `Token ${localStorage.getItem('token')}`}} : {})
          .then(r => this.data = r.data.results)
          .catch(e => console.log(e));
    },
    refreshUserAccess() {
      this.data = []
      this.fetchData()
    },
    showNewEvent() {
      this.isShowNewEventDialog = true
    },
    closeNewEvent() {
      this.isShowNewEventDialog = false
    },
    async fetchNewEvent(eventUrl) {
      console.log("fetching")
      console.log(eventUrl)
      const response = await this.$http.get(eventUrl, this.store.isAuth ? {
        headers: {Authorization: `Token ${localStorage.getItem('token')}`}
      } : {})
          .then(r => this.data.push(r.data))
          .then(()=> this.store.filterQuery='')//Triggering rerendering because it is what it is
          .catch(e => console.log(e))
      console.log(response)

    }
  },
  computed: {
    filterTable() {
      return this.data.filter((a) => JSON.stringify(a).toLowerCase().includes(this.store.filterQuery))
    },
  },
  created() {//TODO Start fetching on start fool
    this.fetchData()
    this.$watch(
        () => store.isAuth,
        () => {
          this.refreshUserAccess()
        },
        {deep: true},
    )

  }
}
</script>

<style scoped>
.btn_div {
  text-align: center;
}

.btn {
  border-radius: 5px;
  min-height: 36px;
  min-width: 72px;
  background: blanchedalmond;
  padding: 10px
}

table {
  width: 100%;
  table-layout: auto;
  padding: 10px;
}

.ascsort::before {
  content: '↑';
  display: inline-block;
  transition: 300ms;
}

.descsort::before {
  transform: rotateZ(180deg);
}

.action-column {

}

.edit {

}
</style>