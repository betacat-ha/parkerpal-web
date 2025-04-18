const Layout = () => import("@/layout/index.vue");
export default {
  path: "/system",
  name: "System",
  component: Layout,
  redirect: "/system/setRole",
  meta: {
    icon: "ep:setting",
    title: "系统管理",
    rank: 99
  },
  children: [
    {
      path: "/system/setRole",
      name: "SetRole",
      component: () => import("@/views/system/setRole/index.vue"),
      meta: {
        title: "后台账号管理",
        roles: ["4", "3"]
      }
    }, {
      path: "/system/customerManagement",
      name: "CustomerManagement",
      component: () => import("@/views/system/customerManagement/index.vue"),
      meta: {
        title: "车主账号管理",
        roles: ["4", "3"]
      }
    //   path: "/system/wxManage",
    //   name: "WxManage",
    //   component: () => import("@/views/system/wxManage/index.vue"),
    //   meta: {
    //     title: "微信支付配置",
    //     roles: ["4", "3"]
    //   }
    },
  ]
} satisfies RouteConfigsTable;
