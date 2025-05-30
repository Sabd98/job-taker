import axios from "axios";

export default {
  async applyJob(context, payload) {
    const response = await axios.post(
      `http://localhost:3000/request/${payload.jobId}`,
      {
        jobId: payload.jobId,
        userId: payload.userId,
        message: payload.message,
      },
      // body: JSON.stringify(newRequest),
      {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${context.rootState.auth.token}`,
        },
      }
    );
    const responseData = await response.data;

    if (response.status !== 200) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.jobId = payload.jobId;
    context.commit("addRequest", newRequest);
  },
  async fetchRequests({ commit, rootState }) {
    try {
      const response = await axios.get("http://localhost:3000/request", {
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      });
      commit("setRequests", response.data);
    } catch (error) {
      // error handling
    }
  },
  async updateRequestStatus({ commit, rootState }, payload) {
    try {
      commit("updateRequestStatus", payload);
      const response = await axios.put(
        `http://localhost:3000/request/${payload.requestId}`,

        { status: payload.status },
        {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`,
          },
        }
      );

     

      return response.data;
    } catch (error) {
      // Tambahkan log error lebih detail
      commit("updateRequestStatus", {
        requestId: payload.requestId,
        status:
          state.requests.find((r) => r.id === payload.requestId)?.status ||
          "pending",
      });
      throw error;
    }
  },
};
