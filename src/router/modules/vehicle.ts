const Layout = () => import("@/layout/index.vue");
export default {
  path: "/vehicle",
  name: "Vehicle",
  component: Layout,
  redirect: "/system/outboundOrder",
  meta: {
    icon: "ep:van",
    title: "menu.vehicle",
    rank: 2
  },
  children: [
    // {
    //   path: "/vehicle/equipment",
    //   name: "Equipment",
    //   component: () => import("@/views/vehicle/equipment/index.vue"),
    //   meta: {
    //     title: "设备管理",
    //     roles: ["4", "3"]
    //   }
    // },

    {
      path: "/vehicle/carRentalSpace",
      name: "CarRentalSpace",
      component: () => import("@/views/vehicle/carRentalSpace/index.vue"),
      meta: {
        title: "menu.carRentalSpace",
        roles: ["4", "3"]
      }
    },
    {
      path: "/vehicle/vipCar",
      name: "VipCar",
      component: () => import("@/views/vehicle/vipCar/index.vue"),
      meta: {
        title: "menu.vipCar",
        roles: ["4", "3"]
      }
    },
    {
      path: "/vehicle/visitorCar",
      name: "VisitorCar",
      component: () => import("@/views/costManagement/visitorCar/index.vue"),
      meta: {
        title: "menu.visitorCar",
        roles: ["4", "3"]
      }
    },
    {
      path: "/vehicle/journal",
      name: "Journal",
      component: () => import("@/views/vehicle/journal/index.vue"),
      meta: {
        title: "menu.journal",
        roles: ["4", "3"]
      }
    },
    {
      path: "/vehicle/parking-space/management",
      name: "ParkingSpaceManagement",
      component: () => import("@/views/vehicle/parkingSpace/management/index.vue"),
      meta: {
        title: "menu.parkingSpaceManagement",
        roles: ["4", "3"]
      }
    },
    {
      path: "/vehicle/parking-space/reservation",
      name: "ParkingSpaceReservation",
      component: () => import("@/views/vehicle/parkingSpace/reservation/index.vue"),
      meta: {
        title: "menu.parkingSpaceReservation",
        roles: ["4", "3"]
      }
    }
  ]
} satisfies RouteConfigsTable;
