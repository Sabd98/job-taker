import { createStore } from 'vuex';
import jobsModule from './modules/jobs/index';
import requestModule from './modules/requests/index';
import authModule from "./modules/auth/index";

const store = createStore({
  modules: {
    jobs: jobsModule,
    requests: requestModule,
    auth: authModule,
  }
});

export default store;
