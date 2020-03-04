import Vue from "vue";
import VueRouter from "vue-router";
import Architectures from "../views/Architectures.vue";
import Architecture from "../views/Architecture.vue";
import Architects from "../views/Architects.vue";
import API from "../views/API.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/", 
    redirect: "/architectures"//login
  },
  {
    path: "/architectures",
    name: "Architectures",
    component: Architectures
  },
  {
    path: "/architectures/:id",
    name: "Architecture",
    component: Architecture
  },
  {
    path: "/architects",
    name: "Architects",
    component: Architects
  },
  {
    path: "/api",
    name: "API",
    component: API
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  }, 
  {
    path: "*",
    redirect: '/'
  }
];

const router = new VueRouter({
  routes
});

export default router;
