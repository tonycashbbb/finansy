import {ElementType, lazy, Suspense} from 'react';
import {Navigate, Outlet, useNavigate, useRoutes} from 'react-router-dom';
import {APP_ICON, Icon, IconButton, Tabs} from '@shared/ui';
import {AuthGuard} from '@entities/session';
import {APP_ROUTER} from '@shared/lib/constants';
import type {TabConfig} from '@shared/ui';

const LoginPage = Loadable(lazy(() => import('@pages/login')));
const RegisterPage = Loadable(lazy(() => import('@pages/register')));
const Page404 = Loadable(lazy(() => import('@pages/page-404')));
const HomePage = Loadable(lazy(() => import('@pages/home')));

export function RouterProvider() {
	return useRoutes([
		{
			element: <AppWrapper />,
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

function AppWrapper() {
	const tabConfigs = [
		{label: 'Capital', path: APP_ROUTER.root},
		{label: 'Goals', path: APP_ROUTER.moduleInWork},
		{label: 'Tracker', path: APP_ROUTER.moduleInWork},
	];

	const navigate = useNavigate();

	function handleTabChange(tabConfig: TabConfig) {
		if (tabConfig?.path) navigate(tabConfig.path);
	}

	return (
		<div className='relative flex h-screen justify-between bg-[#F7F7F7] px-6 py-8'>
			<div className=''>Sidebar</div>
			<div className='flex w-1/2 flex-col'>
				<header className='flex min-w-full items-center justify-between'>
					<div className='text-4xl font-bold'>Home</div>
					<IconButton handleClick={() => console.log('click user icon')}>
						<Icon name={APP_ICON.USER} />
					</IconButton>
				</header>

				<div className='my-8 min-w-full'>
					<Tabs tabConfigs={tabConfigs} handleChange={handleTabChange} />
				</div>

				<Outlet />
			</div>
			<div></div>
		</div>
	);
}

function Loadable(Page: ElementType) {
	return (props: any) => (
		<Suspense fallback={<div>React.Suspense loading...</div>}>
			<Page {...props} />
		</Suspense>
	);
}
