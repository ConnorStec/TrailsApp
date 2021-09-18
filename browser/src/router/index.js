import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  ['', 'Home'],
  // ['contact', 'About Us', 'AboutUs'],
].map(([pathSlug, name, componentOverride]) => {
  return {
    path: `/${pathSlug}`,
    name,
    component: () => import(`../views/${componentOverride || name}.vue`),
  }
});

const router = new VueRouter({
  routes
})

export default router
