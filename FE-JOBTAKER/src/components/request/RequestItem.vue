<template>
  <li class="flex justify-between">
    <div>
      <label>{{ title }}</label>
      <p>{{ messages }}</p>
    </div>
    <strong
      :class="{
        'text-red-600': rejectedStyling,
        'text-green-500': acceptedStyling,
      }"
      >{{ status }}</strong
    >
  </li>
</template>

<script>
export default {
  props: ["title", "messages", "status"],
  computed: {
    rejectedStyling() {
      return this.status === "rejected";
    },
    acceptedStyling() {
      return this.status === "accepted";
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
