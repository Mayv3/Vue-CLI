<template>
  <div id="nav" class="nav-bar">
    <router-link to="/">Home</router-link>
    <router-link to="/">Favs</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
#nav {
  background-color: black;
  position: fixed;
  width: 100%;
  top: 0;
  color: #ffff;
}
</style>
