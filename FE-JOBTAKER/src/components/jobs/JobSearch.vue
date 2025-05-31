<template>
  <section class="min-w-[30rem]">
    <v-text-field
      v-model="searchTerm"
      label="Search by job title"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-magnify"
      hide-details
      @input="applyFilters"
    ></v-text-field>
  </section>
</template>

<script>
import { mixinFiltering } from "../../mixins/filtering";

export default {
  mixins: [mixinFiltering],
};
</script>

<!-- <template>
    <base-card>
      <h2>Let&apos;s Apply your passionate Jobs!</h2>
      <section>
        
      </section>
    </base-card>
  </template>
  
  <script>
  export default {
    emits: ['change-filter'],
    data() {
      return {
        filters: {
          frontend: true,
          backend: true,
          career: true,
        },
      };
    },
    methods: {
      setFilter(e) {
        const inputId = e.target.id;
        const isActive = e.target.checked;
        const updatedFilters = {
          ...this.filters,
          [inputId]: isActive,
        };
        this.filters = updatedFilters;
        this.$emit('change-filter', updatedFilters);
      },
    },
  };
  </script> -->

<style scoped>
.base-card {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.v-text-field {
  background-color: #f8f9fa;
  border-radius: 4px;
  color: black;
}
</style>
