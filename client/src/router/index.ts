import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Home/index.vue"),
    children: [
      {
        path: "/",
        name: "Users",
        component: () =>
          import(/* webpackChunkName: "Users" */ "../views/Users/index.vue"),
      },
      {
        path: "/new",
        name: "NewUser",
        component: () =>
          import(
            /* webpackChunkName: "NewUser" */ "../views/NewUser/index.vue"
          ),
      },
      {
        path: "/user/:id",
        name: "EditUser",
        component: () =>
          import(
            /* webpackChunkName: "NewUser" */ "../views/NewUser/index.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
