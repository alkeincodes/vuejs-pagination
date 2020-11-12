<template>
  <div id="app">
    <div style="margin-top: 100px;">
      <pagination style="margin-top: 30px;" :pages="20" :current-page="1" :pre-page-size="5" />
    </div>
  </div>
</template>

<script>
import Pagination from './components/Pagination'

export default {
  name: 'App',
  components: {
    Pagination
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
