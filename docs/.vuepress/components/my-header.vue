<template>
  <div>
      <h1>Below values are auto generated. SideBar and  NavBar entries included. Add an entry and restart server to reflect changes.</h1>
      <ul>
        <li v-for="item in data">
        <a v-bind:href="item.docLink">{{item.title}}</a>
        </li>
      </ul>
  </div>
</template>
<script>
  
  const { sideBarData } = require('./../../sideBar');
  console.log(sideBarData);
  export default {
        data () {
            return {
                data: sideBarData.map(i => ({...i, docLink: `/${i.title}/Introduction.html`})),
                number: 0
            }
        },
    }
</script>
<style scoped>

</style>
