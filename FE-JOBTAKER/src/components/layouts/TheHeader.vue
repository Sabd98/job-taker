<template>
  <header class="bg-blue-700">
    <nav
      class="items-center text-center text-white flex justify-between rounded-lg p-2 shadow-sm"
    >
      <ul class="flex items-center gap-x-2">
        <h1 class="text-4xl font-bold">
          <router-link to="/">JOB TAKER</router-link>
        </h1>
        <li>
          <router-link to="/jobs">All Jobs</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/request">Apply History</router-link>
        </li>
      </ul>

      <ul class="m-2">
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  props: ["title"],
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;

  a {
    text-decoration: none;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;

    &:active,
    &:hover,
    &.router-link-active {
      border: 1px solid #19e4ff;
    }
  }
}

h1 {
  margin: 0;
}

h1 a {
  &:hover,
  &:active,
  &.router-link-active {
    border-color: transparent;
  }
}
</style>
