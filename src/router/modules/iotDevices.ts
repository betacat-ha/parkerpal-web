const Layout = () => import("@/layout/index.vue");
export default {
  path: "/iot-deivces",
  name: "Iot",
  component: Layout,
  redirect: "/iot-deivces/device-dashboard",
  meta: {
    icon: "ep:cpu",
    title: "IOT设备",
    rank: 6
  },
  children: [
    {
      path: "/iot-deivces/device-dashboard",
      name: "DeviceDashboard",
      component: () => import("@/views/iotDevice/deviceManagement/index.vue"),
      meta: {
        title: "数据大屏",
        roles: ["4", "3"]
      }
    }, {
      path: "/iot-deivces/device-management",
      name: "DeviceManagement",
      component: () => import("@/views/iotDevice/deviceManagement/index.vue"),
      meta: {
        title: "设备管理",
        roles: ["4", "3"]
      }
    }
  ]
} satisfies RouteConfigsTable;
