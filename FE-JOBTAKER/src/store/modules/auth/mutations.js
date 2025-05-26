export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.userRole = payload.role;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
    state.token = null;
    state.userId = null;
    state.userRole = null;
  },
};
