import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "start" */ "./views/Start.vue"),
      children: [
        {
          path: "login",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "login" */ "./views/security/Login.vue"
            ),
        },
        {
          path: "apps",
          component: () =>
            import(/* webpackChunkName: "apps" */ "./views/apps/Selector.vue"),
          children: [
            {
              path: "modeler",
              component: () =>
                import(
                  /* webpackChunkName: "modeler" */ "./views/apps/Modeler.vue"
                ),
            },
            {
              path: "bpmanager",
              component: () =>
                import(
                  /* webpackChunkName: "bpmanager" */ "./views/apps/BpManager.vue"
                ),
            },
            {
              path: "tasklist",
              component: () =>
                import(
                  /* webpackChunkName: "tasklist" */ "./views/apps/Tasklist.vue"
                ),
            },
          ],
        },
      ],
    },
    {
      path: "/*",
      redirect: "/",
    },
  ],
})
