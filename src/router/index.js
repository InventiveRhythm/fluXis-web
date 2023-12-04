import { createRouter, createWebHistory } from 'vue-router'
import { startLoading, stopLoading } from '../utils/Loading.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/maps/artists/:id',
      name: 'featured-artist',
      component: () => import('../views/fa/FeaturedArtist.vue')
    },
    {
      path: '/maps/artists',
      name: 'featured-artists',
      component: () => import('../views/fa/FeaturedArtistList.vue')
    },
    {
      path: '/maps',
      name: 'maps',
      component: () => import('../views/WorkInProgress.vue')
    },
    {
      path: '/rankings',
      name: 'rankings',
      component: () => import('../views/WorkInProgress.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/WorkInProgress.vue')
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: () => import('../views/wiki/WikiHome.vue')
    },
    {
      path: '/wiki/:path+',
      name: 'wiki-article',
      component: () => import('../views/wiki/WikiArticle.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/account/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/account/Logout.vue')
    },
    {
      path: '/reset-password',
      name: 'password-reset',
      component: () => import('../views/account/PasswordReset.vue')
    },
    {
      path: '/user/:id',
      name: 'user-details',
      component: () => import('../views/user/UserPage.vue')
    },
    {
      path: '/@:handle+',
      name: 'user-details-handle',
      component: () => import('../views/user/UserPage.vue')
    },
    {
      path: '/mapset/:id',
      name: 'mapset-details',
      component: () => import('../views/map/MapSetPage.vue')
    },
    {
      path: '/download',
      name: 'download',
      beforeEnter() {
        window.open('https://dl.flux.moe/fluXis/updater.zip', '_blank');
        window.location.back();
      }
    },
    {
      path: '/changelog',
      name: 'changelog',
      beforeEnter() {
        window.open('https://github.com/TeamFluXis/fluXis/releases', '_blank');
        window.location.back();
      }
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/team/TeamView.vue')
    },
    {
      path: '/stats/registrations',
      name: 'registration-stats',
      component: () => import('../views/stats/users/CreationStats.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  startLoading();
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length

  let transitionName = 'slide-right';
  if (toDepth < fromDepth && toDepth != fromDepth) {
    transitionName = 'slide-left';
  }
  to.meta.transition = transitionName;

  stopLoading();
})

export default router
