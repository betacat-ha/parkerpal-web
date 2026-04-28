const Layout = () => import("@/layout/index.vue");
export default {
  path: "/management",
  name: "Management",
  component: Layout,
  redirect: "/management/feeRules",
  meta: {
    icon: "ep:wallet",
    title: "menu.costManagement",
    rank: 5
  },
  children: [
    {
      path: "/management/feeRules",
      name: "FeeRules",
      component: () => import("@/views/costManagement/feeRules/index.vue"),
      meta: {
        title: "menu.feeRules",
        roles: ["4", "3"]
      }
    },
    {
      path: "/management/record",
      name: "Record",
      component: () => import("@/views/costManagement/record/index.vue"),
      meta: {
        title: "menu.record",
        roles: ["4", "3"]
      }
    },
    {
      path: "/management/reconciliation",
      name: "Reconciliation",
      component: () =>
        import("@/views/costManagement/reconciliation/index.vue"),
      meta: {
        title: "menu.reconciliation",
        roles: ["4", "3"]
      }
    }
  ]
} satisfies RouteConfigsTable;
