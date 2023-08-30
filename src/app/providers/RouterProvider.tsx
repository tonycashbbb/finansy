import {ElementType, lazy, Suspense} from 'react';
import {Navigate, Outlet, useRoutes} from 'react-router-dom';
import {AuthGuard} from '@entities/session';
import {APP_ROUTER} from '@shared/lib/constants';
import {AppLayout} from '@app/ui/app-layout';

const LoginPage = Loadable(lazy(() => import('@pages/login')));
const RegisterPage = Loadable(lazy(() => import('@pages/register')));
const Page404 = Loadable(lazy(() => import('@pages/page-404')));
const HomePage = Loadable(lazy(() => import('@pages/home')));

export function RouterProvider() {
	return useRoutes([
		{
			element: <AppLayout RouteElement={<Outlet />} />,
			children: [
				{
					path: APP_ROUTER.root,
					element: <HomePage />,
				},
				{
					path: APP_ROUTER.login,
					element: (
						<AuthGuard>
							<LoginPage />
						</AuthGuard>
					),
				},
				{
					path: APP_ROUTER.register,
					element: (
						<AuthGuard>
							<RegisterPage />
						</AuthGuard>
					),
				},
				{path: APP_ROUTER.moduleInWork, element: <div>Module in work</div>},
			],
		},
		{path: APP_ROUTER.pageNotFound, element: <Page404 />},
		{path: '*', element: <Navigate to={APP_ROUTER.pageNotFound} replace />},
	]);
}

function Loadable(Page: ElementType) {
	return (props: any) => (
		<Suspense fallback={<div>React.Suspense loading...</div>}>
			<Page {...props} />
		</Suspense>
	);
}
