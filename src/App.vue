<template>
  <nav id="nav" class="nav-bar">
    <ul>
      <li>
        <router-link to="/"><i class="fa-solid fa-house"></i> Home</router-link>
      </li>
      <li>
        <router-link to="/favorites">Favoritos</router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
#nav {
  background-color: transparent;
  position: fixed;
  background-color: var(--background-color);
  width: 100%;
  top: 0;
  padding: 1rem;
}
a {
  font-weight: 600;
  color: white;
}
ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
