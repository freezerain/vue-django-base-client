<template>
  <input type="text" class="search-box" v-model="filterQuery" placeholder="Search here">
  <table>
    <thead>
    <td :class="{ascsort:currentSortingColumn=='title', descsort:!isAscending}" @click="sort('title')">Title</td>
    <td :class="{ascsort:currentSortingColumn=='description', descsort:!isAscending}" @click="sort('description')">Descriptionm</td>
    <td :class="{ascsort:currentSortingColumn=='location', descsort:!isAscending}" @click="sort('location')">Location</td>
    <td :class="{ascsort:currentSortingColumn=='date', descsort:!isAscending}" @click="sort('date')">Date</td>
    <td :class="{ascsort:currentSortingColumn=='status', descsort:!isAscending}" @click="sort('status')">Status</td>
    <td :class="{ascsort:currentSortingColumn=='owner', descsort:!isAscending}" @click="sort('owner')">Owner</td>
    <td>Subs</td>
    <td class="action-column">Actions</td>
    </thead>
    <tbody>
    <MyEvent v-for="event in filterTable" :key="event.url"
             :myEvent="event"
             :user='{username:"http://127.0.0.1:8000/users/1/?format=json", isAdmin:false}'/>
    </tbody>
  </table>

</template>

<script>
import MyEvent from "./MyEvent.vue";

export default {
  name: "MainTable",
  data() {
    return {
      events: {
        "count": 4, "next": null, "previous": null, "results": [{
          "url": "http://127.0.0.1:8000/events/1/?format=json",
          "owner": "http://127.0.0.1:8000/users/1/?format=json",
          "title": "1My title",
          "description": "4",
          "location": "",
          "date": "2023-02-04T23:25:00Z",
          "status": "DRAFT",
          "subscribers":
              ["http://127.0.0.1:8000/users/1/?format=json"]
        },
          {
            "url": "http://127.0.0.1:8000/events/2/?format=json",
            "owner": "http://127.0.0.1:8000/users/1/?format=json",
            "title": "2My title 2",
            "description": "3",
            "location": "",
            "date": "2022-01-25T19:26:00Z",
            "status": "DRAFT",
            "subscribers": ["http://127.0.0.1:8000/users/1/?format=json"]
          },
          {
            "url": "http://127.0.0.1:8000/events/3/?format=json",
            "owner": "http://127.0.0.1:8000/users/2/?format=json",
            "title": "3Test owner",
            "description": "2",
            "location": "",
            "date": "2023-02-04T16:57:00Z",
            "status": "DRAFT",
            "subscribers": ["http://127.0.0.1:8000/users/2/?format=json"]
          }, {
            "url": "http://127.0.0.1:8000/events/4/?format=json",
            "owner": "http://127.0.0.1:8000/users/2/?format=json",
            "title": "4new event",
            "description": "1",
            "location": "",
            "date": "2023-02-04T18:21:00Z",
            "status": "DRAFT",
            "subscribers": ["http://127.0.0.1:8000/users/2/?format=json"]
          }]
      },
      filterQuery: '',
      user: '',
      isAscending: true,
      currentSortingColumn: 'title'
    }
  },
  components: {
    MyEvent,
  },
  methods: {
    sort(colName) { //TODO BUG !!! not strings cannot be sorted
      if(this.currentSortingColumn==colName) {
        this.isAscending = !this.isAscending
      }else {
        this.isAscending = true;
        this.currentSortingColumn = colName;
      }
      this.events.results = this.events.results.sort((a, b) => {
        const aLower = a[colName].toString().toLowerCase();
        const bLower = b[colName].toString().toLowerCase();
        const sorted = aLower > bLower ? 1 : aLower < bLower ? -1 : 0;
        return this.isAscending ? sorted : (sorted*-1);
      });
    },
    async fetchData() {
      try {
        const response = await this.$http.get('http://127.0.0.1:8000/events/');
        this.events.results = response.data.results;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    filterTable() {
      return this.events.results.filter((a) => JSON.stringify(a).toLowerCase().includes(this.filterQuery))
    }
  },
  created() {//TODO Start fetching on start fool
    //this.fetchData()
  }
}
</script>

<style scoped>
.btn {

}

table{
  width:100%;
  table-layout:auto;
}
.ascsort::before{
  content:'↑';
  display:inline-block;
  transition:300ms;
}
.descsort::before{
  transform:rotateZ(180deg);
}
.action-column{

}
.edit {

}
</style>