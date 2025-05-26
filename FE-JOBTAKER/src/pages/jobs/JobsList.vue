<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occured, please try again"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <!-- <section>
      <job-filter @change-filter="setFilters"></job-filter>
    </section> -->
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadJobs(true)"
          >Refresh</base-button
        >
        <base-button v-if="!isJob && isEmployer && !isLoading" link to="/add"
          >Add as Job</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasJobs">
        <job-item
          v-for="job in filteredJobs"
          :key="job?.id"
          :id="job?.id"
          :title="job?.title"
          :company="job?.company"
          :location="job?.location"
          :salary="job?.salary"
          :skills="job?.skills"
        ></job-item>
      </ul>
      <h3 v-else>No Jobs found.</h3>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex/dist/vuex';
import JobFilter from '../../components/jobs/JobFilter.vue';
import JobItem from '../../components/jobs/JobItem.vue';

export default {
  components: {
    JobItem,
    JobFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        html: true,
        css: true,
        javascript: true,
      },
    };
  },
  computed: {
    ...mapGetters( [
      'isEmployer',
    ]),
    isJob() {
      return this.$store.getters['jobs/isJob'];
    },
    filteredJobs() {
      const jobs = this.$store.getters['jobs/jobs'];
      return jobs.filter((job) => {
        if (this.activeFilters.html && job?.skills.includes('html')) {
          return true;
        }
        if (this.activeFilters.css && job?.skills.includes('css')) {
          return true;
        }
        if (this.activeFilters.javascript && job?.skills.includes('javascript')) {
          return true;
        }
        return false;
      });
    },
    hasJobs() {
      return !this.isLoading && this.$store.getters['jobs/hasJobs'];
    },
  },
  created() {
    this.loadJobs();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadJobs(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('jobs/loadJobs', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
