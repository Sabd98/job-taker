import { createRouter, createWebHistory } from "vue-router";
import JobsList from "./pages/jobs/JobsList.vue";
import JobAdd from "./pages/jobs/JobAdd.vue";
import JobDetail from "./pages/jobs/JobDetail.vue";
import ApplyJob from "./pages/request/ApplyJob.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import store from "./store/index.js";
import RequestReceived from "./pages/request/RequestReceived.vue";
import NotFound from "./pages/NotFound.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/jobs" },

    { path: "/jobs", component: JobsList },

    {
      path: "/jobs/:id",
      component: JobDetail,
      props: true,
      children: [{ path: "apply", component: ApplyJob }],
    },

    {
      path: "/add",
      component: JobAdd,
      meta: {
        requiresAuth: true,
        requiresEmployer: true,
      },
    },

    { path: "/request", component: RequestReceived },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },

    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const isEmployer = store.getters["auth/isEmployer"];

  // Route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login?redirect=" + to.path);
  }

  // Route requires employer role
  if (to.meta.requiresEmployer && !isEmployer) {
    return next("/forbidden");
  }

  next();
  if (to.meta.requiresAuth && !store.getters.token) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.token) {
    next("/jobs");
  } else {
    next();
  }
});