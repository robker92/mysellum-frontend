import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import StoreProfile from "../views/StoreProfile.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import( /* webpackChunkName: "about" */ '../views/About.vue')
    component: About
  },
  {
    path: "/storeprofile",
    name: "StoreProfile",
    component: StoreProfile
  },
  // otherwise redirect to home
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // redirect to home page if not logged in and trying to access a restricted page
  const publicPages = ["/", "/about"]; //insert all public pages
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user"); // -> Check content as well -> Security

  if (authRequired && !loggedIn) {
    return next("/");
  }

  next();
});

export default router;