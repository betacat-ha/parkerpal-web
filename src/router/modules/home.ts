const Layout = () => import("@/layout/index.vue");
export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "ep:house",
    title: "menu.home",
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: "menu.home"
      }
    }
  ]
} satisfies RouteConfigsTable;
