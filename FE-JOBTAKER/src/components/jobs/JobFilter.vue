<template>
    <section class="min-w-[15rem]">
      <v-select
        v-model="selectedSkills"
        :items="skillOptions"
        label="Filter by skills"
        variant="outlined"
        density="compact"
        multiple
        chips
        hide-details
        @update:modelValue="applyFilters"
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2">
            <span>{{ item.title }}</span>
          </v-chip>
          <span
            v-if="index === 2"
            class="text-grey text-caption align-self-center"
          >
            (+{{ selectedSkills.length - 2 }} others)
          </span>
        </template>
      </v-select>
    </section>
</template>

<script>
import { mixinFiltering } from "../../mixins/filtering";

export default {
  mixins: [mixinFiltering],
};
</script>

<style scoped>
.base-card {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.v-text-field,
.v-select {
  background-color: #f8f9fa;
  border-radius: 4px;
  color: black;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
