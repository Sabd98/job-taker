export default {
  async addJob(context, data) {
    const userId = context.rootGetters.userId;
    const jobData = {
      id: context.rootGetters.userId,
      title: data.title,
      company: data.company,
      location: data.location,
      desc: data.desc,
      category: data.category,
      salary: data.salary,
      minimumExperience: data.minimumExperience,
      minimumEducation: data.minimumEducation,
      skills: data.skills,
    };

    const response = await fetch(`http://localhost:3000/job`, {
      method: "POST",
      body: JSON.stringify(jobData),
    });
    if (!response.ok) {
      throw new Error(response.message || "Failed to post!");
      
    }
    context.commit("addJob", { ...jobData, id: userId });
  },
  async loadJobs(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(`http://localhost:3000/job`);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }
    context.commit("setJobs", responseData);
    context.commit("setFetchTimestamp");
  },
  async loadSelectedJob({ commit, rootState }, payload) {
    try {
      console.log("[Vuex] Action dipanggil dengan payload:", payload);

      const response = await fetch(
        `http://localhost:3000/job/${payload.jobId}`,
        {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`,
          },
        }
      );


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      commit("setSelectedJob", data);
    } catch (error) {
      console.error("[Vuex] Error dalam action:", error);
      throw error; 
    }
  },
};
