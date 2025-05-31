<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occured, please try again"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section
      class="relative min-h-[400px] w-full flex items-center justify-center bg-blue-600/40"
    >
      <div class="absolute inset-0 -z-10">
        <img
          src="/JobWallpaper.jpg"
          alt="Background"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="container max-w-7xl text-center mb-20">
        <h1 class="text-4xl font-bold text-white mb-4">
          JOB TAKER: Looking For your Dream Job? Job Taker is the Solution!
        </h1>
        <p class="text-lg text-white">Available Desired Job Vacancy!</p>
        <base-card
          class="text-white  placeholder-white flex gap-x-5 mt-5 justify-center min-w-[50rem]"
        >
        <job-filter @change-filter="applyFilters"></job-filter>
        <job-search @change-filter="applyFilters"></job-search>
        </base-card>
        <!-- <section>
    </section> -->
      </div>
    </section>
    <base-card class="min-w-[70rem]">
      <div class="controls">
        <base-button mode="outline" @click="loadJobs(true)"
          >Refresh</base-button
        >
        <base-button v-if="!isJob && isEmployer && !isLoading" link to="/add"
          >Add Job</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        v-else-if="hasJobs"
      >
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
import { mapGetters } from "vuex/dist/vuex";
import JobFilter from "../../components/jobs/JobFilter.vue";
import JobItem from "../../components/jobs/JobItem.vue";
import JobSearch from '../../components/jobs/JobSearch.vue';
export default {
  components: {
    JobItem,
    JobFilter,
    JobSearch,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        search: '',
        skills: []
      }
    };
  },
  computed: {
    ...mapGetters(["isEmployer"]),
    isJob() {
      return this.$store.getters["jobs/isJob"];
    },
    filteredJobs() {
      const jobs = this.$store.getters["jobs/jobs"];
      return jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(this.activeFilters.search);
        
        // Filter berdasarkan skills
        let matchesSkills = true;
        if (this.activeFilters.skills.length > 0) {
          matchesSkills = this.activeFilters.skills.some(skill => 
            job.skills.includes(skill)
          );
        }
        
        return matchesSearch && matchesSkills;
      });
    },
    hasJobs() {
      return !this.isLoading && this.$store.getters["jobs/hasJobs"];
    },
  },
  created() {
    this.loadJobs();
  },
  methods: {
    applyFilters(filters) {
      this.activeFilters = filters;
    },
    async loadJobs(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("jobs/loadJobs", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
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
