<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #4E71FF;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 0.5rem;
  display: inline-block;

  &:hover,
  &:active {
    background-color: #1900ff;
    border-color: #1900ff;
  }
}

.flat {
  background-color: transparent;
  color: #4E71FF;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #1900ff;
  color: #1900ff;
}

.flat,
.outline {
  &:hover,
  &:active {
    background-color: #edd2ff;
  }
}
</style>