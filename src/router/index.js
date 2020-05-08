import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/imprint',
    name: 'Impressum',
    component: () => import(/* webpackChunkName: "imprint" */ '../views/Imprint.vue'),
  },
  {
    path: '/menu',
    name: 'Menü',
    component: () => import(/* webpackChunkName: "menu" */ '../views/Menu.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Vue-Router history mode workaround for github pages
router.beforeEach((to, from, next) => {
  // todo: will not work in incognito-mode
  const redirectPath = sessionStorage?.redirectPath;

  if (to.path === '/' && redirectPath) {
    delete sessionStorage.redirectPath;

    if (redirectPath !== this.props.location.pathname) {
      this.props.history.replaceState(null, null, redirectPath);
    }

    next(redirectPath);
  } else {
    next();
  }
});

export default router;
