export default {
  addJob(state, payload) {
    state.jobs.push(payload);
  },
  setJobs(state, payload) {
    state.jobs = payload;
  },
  setSelectedJob(state, payload) {
    state.selectedJob = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};