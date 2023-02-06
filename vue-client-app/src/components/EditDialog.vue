<template>
  <div class="root-div">

    <div class="overlay" @click="$emit('cancelEditDialog')">

    </div>
    <div class="modal">
      <label><input type="text" v-model="localEvent.title"> </label>
      <label><input type="text" v-model="localEvent.description"> </label>
      <label><input type="text" v-model="localEvent.location"> </label>
      <label><input type="text" v-model="localEvent.date"> </label>
      <label><input type="text" v-model="localEvent.status"> </label>
      <label><input type="text" v-model="localEvent.owner"> </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditDialog",
  props: ['myEvent', 'user'],
  data(){
    return{
      localEvent : {},
    }
  },
  created(){//TODO Pass by ref
    this.localEvent.title = this.myEvent.title;
    this.localEvent.description = this.myEvent.description;
    this.localEvent.location = this.myEvent.location;
    this.localEvent.date = this.myEvent.date;
    this.localEvent.status = this.myEvent.status;
    this.localEvent.owner = this.myEvent.owner;
  }
}
</script>

<style scoped>
.root-div{

}
.overlay{
  position:fixed;
  width:100vw;
  height:100vh;
  top:0;
  left:0;
  background: rgba(111, 128, 69, 0.45);
  z-index:9;
}
.modal{
  position:fixed;
  width:50%;
  height:auto;
  top:50%;
  left:50%;
  background: #fff;
  transform:translate(-50%,-50%);
  z-index:10;
}


</style>