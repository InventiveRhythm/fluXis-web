import { createRouter, createWebHistory } from 'vue-router';
import { StartLoading, StopLoading } from '@/utils/Loading';

import WorkInProgress from '../components/WorkInProgress.vue';

/*
  future page mapping:
  / - Home (for not logged in users)
  /artist/:id - Featured Artist
  /artists - Featured Artists
  /changelog - Changelog
  /download - Download
  /home - Home (logged in) (shows news, feed, etc.)
  /news - News
  /news/:id - News Post
  /maps - MapSet Search
  /ranking - Ranking
  /ranking/c/:code - Country Ranking
  /set/:id - MapSet
  /team - Team
  /u/:id - User
  /wiki/:path - Wiki Page
*/

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/artists',
            name: 'featured-artists',
            component: () => import('../views/fa/FeaturedArtistList.vue'),
        },
        {
            path: '/artist/:id',
            name: 'featured-artist',
            component: () => import('../views/fa/FeaturedArtist.vue'),
        },
        {
            path: '/changelog',
            name: 'changelog',
            beforeEnter() {
                window.open(
                    'https://github.com/InventiveRhythm/fluXis/releases',
                    '_blank');
                window.location.back();
            },
        },
        {
            path: '/club/:id',
            name: 'club-details',
            component: () => import('../views/club/ClubPage.vue'),
            children: [
                {
                    alias: '',
                    path: 'members',
                    name: 'club-details:members',
                    component: () => import('../views/club/subpages/ClubMembers.vue'),
                },
                {
                    path: 'scores',
                    name: 'club-details:scores',
                    component: () => import('../views/club/subpages/ClubScores.vue'),
                },
                {
                    path: 'claims',
                    name: 'club-details:claims',
                    component: () => import('../views/club/subpages/ClubClaims.vue'),
                },
            ],
        },
        {
            path: '/clubs',
            name: 'club-listing',
            component: () => import('@/views/clubs/ClubsList.vue'),
        },
        {
            path: '/download',
            name: 'download',
            beforeEnter() {
                window.open(
                    'https://github.com/InventiveRhythm/fluXis/releases/latest/download/install.exe',
                    '_blank');
                window.location.back();
            },
        },
        {
            path: '/invite/:code',
            name: 'accept-invite',
            component: () => import('../views/invite/InviteView.vue'),
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/account/Logout.vue'),
        },
        {
            path: '/news',
            name: 'news',
            component: WorkInProgress,
        },
        {
            path: '/news/:post',
            name: 'news-post',
            component: WorkInProgress,
        },
        {
            path: '/management',
            name: 'management',
            component: () => import('@/views/management/ManagementView.vue'),
            children: [
                {
                    path: '',
                    name: 'management:home',
                    component: () => import('@/views/management/subviews/home/ManagementHome.vue'),
                }, {
                    path: 'users',
                    name: 'management:users',
                    component: () => import('@/views/management/subviews/users/UserManagementView.vue'),
                }, {
                    path: 'artists',
                    name: 'management:artists',
                    component: () => import('@/views/management/subviews/artists/FeaturedArtistsManagement.vue'),
                }, {
                    path: 'artists/:id',
                    name: 'management:artist-edit',
                    component: () => import('@/views/management/subviews/artists/FeaturedArtistEdit.vue'),
                },
            ],
        },
        {
            path: '/maps',
            name: 'maps',
            component: () => import('@/views/map-browser/MapBrowser.vue'),
        },
        {
            path: '/oauth',
            name: 'oauth',
            component: () => import('../views/account/OAuth.vue'),
        },
        {
            path: '/rankings/overall',
            name: 'rankings',
            component: () => import('../views/rankings/OverallRating.vue'),
        },
        {
            path: '/rankings/:type+',
            name: 'rankings-extra',
            component: WorkInProgress,
        },
        {
            path: '/set/:id',
            alias: '/mapset/:id',
            name: 'mapset-details',
            component: () => import('../views/mapset/MapSetPage.vue'),
        },
        {
            path: '/stats/registrations',
            name: 'registration-stats',
            component: () => import('../views/stats/users/CreationStats.vue'),
        },
        {
            path: '/team',
            name: 'team',
            component: () => import('../views/team/TeamView.vue'),
        },
        {
            path: '/u/:id',
            alias: '/user/:id',
            name: 'user-details',
            component: () => import('../views/user/UserPage.vue'),
            children: [
                {
                    alias: '',
                    path: 'scores',
                    name: 'user-details:scores',
                    component: () => import('../views/user/subpages/UserScores.vue'),
                },
                {
                    path: 'maps',
                    name: 'user-details:maps',
                    component: () => import('../views/user/subpages/UserMaps.vue'),
                },
            ],
        },
        {
            path: '/wiki/:path+',
            alias: '/wiki',
            name: 'wiki-article',
            component: () => import('../views/wiki/WikiArticle.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/404.vue'),
        },
    ],
});

router.beforeEach((_, __) => StartLoading());
router.afterEach((_, __) => StopLoading());

export default router;
