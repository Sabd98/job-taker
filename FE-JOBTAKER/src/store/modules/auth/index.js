import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      token: localStorage.getItem("token") || null,
      userId: localStorage.getItem("userId") || null,
      userRole: localStorage.getItem("userRole") || null,
    };
  },
  mutations,
  actions,
  getters,
};
