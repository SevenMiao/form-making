import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    path: "/home",
    name: "首页",
    component: () => import("@/views/home/Home.vue")
  },
  {
    path: "/form-making/:name/:page",
    name: "表单制作器",
    component: () => import("@/views/container/index.vue")
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/404",
    name: "页面不存在",
    component: () => import("@/views/error/404.vue")
  }
  ]
});
