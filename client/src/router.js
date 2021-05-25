import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/invoice",
      name: "invoice",
      component: () => import("./views/Invoice.vue")
    },
    {
      path: "/invoice/:id",
      name: "invoice",
      component: () => import("./views/Invoice.vue")
    }
  ]
});
