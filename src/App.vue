<template>
  <div id="app">
    <MainPage/>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue';
export default {
  name: 'App',
  components: {MainPage}
}
</script>

<style>
body {
  color:white;
  margin: 0;
  padding: 0;
  font-family: 'Axiforma', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url("./assets/background1.png") no-repeat center center;
  background-size: cover;

}

#app {
  min-height: 100vh;
  overflow: hidden;
}
</style>
