export default {
  userId: (state) =>state.userId,
  token: (state) => state.token,
  isAuthenticated: state => !!state.token,
  isEmployer: state => state.userRole === 'employer',
  currentUser: state => ({
    id: state.userId,
    role: state.userRole
  }),
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
