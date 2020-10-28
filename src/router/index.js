import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import StoreProfile from "../views/StoreProfile.vue";
import Search from "../views/Search.vue";
import SearchDelivery from "../views/SearchDelivery.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import SuccessfulOrder from "../views/SuccessfulOrder.vue";

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
    path: "/storeprofile/:id",
    name: "StoreProfile",
    component: StoreProfile
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/searchDelivery",
    name: "SearchDelivery",
    component: SearchDelivery
  },
  {
    path: "/shoppingCart",
    name: "ShoppingCart",
    component: ShoppingCart
  },
  {
    path: "/successfulOrder",
    name: "SuccessfulOrder",
    component: SuccessfulOrder
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
  const publicPages = ["/", "/storeprofile"]; //insert all public pages
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user"); // -> Check content as well -> Security

  if (authRequired && !loggedIn) {
    return next("/");
  }

  next();
});

export default router;