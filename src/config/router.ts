import {
	type RouteRecordRaw,
	createRouter,
	createWebHistory,
} from 'vue-router';
import Main from '@/page/Main.vue';
import NotFound from '@/page/NotFound.vue';

export const AppPath = {
	Main: '/',
	Top100: '/top-100',
	NotFound: '/not-found',
} as const;

const routes: readonly RouteRecordRaw[] = [
	{ name: 'Main', path: AppPath.Main, component: Main },
	{ name: 'NotFound', path: AppPath.NotFound, component: NotFound },
	{
		name: 'CatchAll',
		path: '/:catch_all(.*)',
		redirect: AppPath.NotFound,
	},
];

export const router = createRouter({
	history: createWebHistory(),
	strict: false,
	sensitive: false,
	routes,
});
