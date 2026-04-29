export default {
  path: "/error",
  redirect: "/error/403",
  meta: {
    icon: "ri:information-line",
    showLink: false,
    title: "error.title",
    rank: 9,
  },
  children: [
    {
      path: "/error/403",
      name: "403",
      component: () => import("@/views/error/403.vue"),
      meta: {
        title: "error.403",
        hiddenTag:true

      }
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: "error.404",
        showParent:false,
        hiddenTag:true
      }
    },
    {
      path: "/error/500",
      name: "500",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: "error.500"
      }
    }
  ]
} satisfies RouteConfigsTable;
