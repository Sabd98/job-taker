
export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
  updateRequestStatus(state, payload) {
    const index = state.requests.findIndex((r) => r.id === payload.requestId);

    if (index !== -1) {
      // Buat array baru dengan perubahan
      const newRequests = [...state.requests];

      // Buat objek baru untuk item yang diubah
      newRequests[index] = {
        ...newRequests[index],
        status: payload.status,
      };

      state.requests = newRequests;

    }
  },
};