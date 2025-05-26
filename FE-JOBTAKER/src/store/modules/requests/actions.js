export default {
  async applyJob(context, payload) {
    const newRequest = {
      jobId: payload.jobId,
      userId: payload.userId,
      message: payload.message,
    };

    const response = await fetch(
      `http://localhost:3000/request/${payload.jobId}`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.rootState.auth.token}`,
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.jobId = payload.jobId;
    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) {
    console.log(context, "isi payload");

    const jobId = context.rootGetters.userId;
    const response = await fetch(`http://localhost:3000/request/${jobId}`, {
      headers: {
        Authorization: `Bearer ${context.rootState.auth.token}`,
      },
    });
    const responseData = await response.json();
    console.log(responseData, "data respon");
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        jobId: jobId,
        message: responseData[key].message,
        status: responseData[key].status,
        title: responseData[key].Job?.title,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
