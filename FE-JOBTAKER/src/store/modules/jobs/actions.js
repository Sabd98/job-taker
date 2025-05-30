import axios from "axios";

export default {
  async addJob(context, data) {

    const response = await axios.post(`http://localhost:3000/job`, 
      {
        title: data.title,
        company: data.company,
        location: data.location,
        desc: data.desc,
        category: data.category,
        salary: data.salary,
        minimumExperience: data.minimumExperience,
        minimumEducation: data.minimumEducation,
        skills: data.skills,
      },
    {  headers: {
        Authorization: `Bearer ${context.rootState.auth.token}`,
      }}
    );
    const responseData = await response.data;
    if (response.status !== 201) {
      throw new Error(response.message || "Failed to post!");
      
    }
    context.commit("addJob", { ...responseData });
  },
  async loadJobs(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await axios.get(`http://localhost:3000/job`);
    const responseData = await response.data;
    if (response.status !== 200) {
      const error = new Error(response.message || "Failed to fetch!");
      throw error;
    }

    context.commit("setJobs", responseData);
    context.commit("setFetchTimestamp");
  },
  async loadSelectedJob({ commit, rootState }, payload) {
    try {

      const response = await axios.get(
        `http://localhost:3000/job/${payload.jobId}`,
        {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`,
          },
        }
      );


      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.data;

      commit("setSelectedJob", data);
    } catch (error) {
      console.error("[Vuex] Error dalam action:", error);
      throw error; 
    }
  },
};
