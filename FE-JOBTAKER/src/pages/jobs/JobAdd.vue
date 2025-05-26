<template>
  <div>
    <base-card>
      <h2>Add Available Job!</h2>
      <job-form @save-data="saveData"></job-form>
    </base-card>
  </div>
</template>

<script>
import JobForm from '../../components/jobs/JobForm.vue';

export default {
  components: {
    JobForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('jobs/addJob', data);
      this.$router.replace('/jobs');
    },
  },
};
</script>
