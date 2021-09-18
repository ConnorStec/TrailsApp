<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(255,173,188);
  background: linear-gradient(170deg, rgba(255,173,188,1) 0%, rgba(255,255,255,1) 63%, rgba(124,153,247,1) 100%);
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>