<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
      <gallery :items="dataInput"/>
  </div>
</template>

<script>
import Gallery from './components/Gallery'

export default {
  name: 'App',
  components: {
    Gallery
  },
  data: function(){
    return{
      dataInput: [{name: 'test1', type: 'data'}, {name:'test2', type: 'data'}]

    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
