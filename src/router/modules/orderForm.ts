const Layout = () => import("@/layout/index.vue");
export default {
  path: "/orderForm",
  name: "OrderForm",
  component: Layout,
  redirect: "/orderForm/outboundOrder",
  meta: {
    icon: "ep:tickets",
    title: "menu.orderForm",
    rank: 2
  },
  children: [
    {
      path: "/orderForm/outboundOrder",
      name: "OutboundOrder",
      component: () => import("@/views/orderForm/outboundOrder/index.vue"),
      meta: {
        title: "menu.outboundOrder"
      }
    }
  ]
} satisfies RouteConfigsTable;
