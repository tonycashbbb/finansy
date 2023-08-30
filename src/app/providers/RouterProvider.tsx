import {ElementType, lazy, Suspense} from 'react';
import {Navigate, Outlet, useNavigate, useRoutes} from 'react-router-dom';
import {APP_ICON, Icon, IconButton, Tabs} from '@shared/ui';
import {AuthGuard} from '@entities/session';
import {APP_ROUTER} from '@shared/lib/constants';
import type {TabConfig} from '@shared/ui';
import {cn} from '@shared/lib/helpers';

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
	const navigate = useNavigate();

	function handleTabChange(tabConfig: TabConfig) {
		if (tabConfig?.path) navigate(tabConfig.path);
	}

	const tabConfigs = [
		{label: 'Capital', path: APP_ROUTER.root},
		{label: 'Goals', path: APP_ROUTER.moduleInWork},
		{label: 'Tracker', path: APP_ROUTER.moduleInWork},
	];
	const sidebarConfigs = [
		{
			label: 'Home',
			path: APP_ROUTER.root,
			Icon: () => <Icon name={APP_ICON.APP_LOGO} />,
		},
		{
			label: 'Portfolio',
			path: APP_ROUTER.moduleInWork,
			Icon: () => <Icon name={APP_ICON.PORTFOLIO} />,
		},
	];

	return (
		<div className='relative flex h-screen justify-between bg-[#F7F7F7] px-6 py-8'>
			<div role='app-sidebar' className='w-52'>
				<div className='mb-4 text-2xl font-bold'>Finansy</div>
				<nav className='min-w-full'>
					{sidebarConfigs.map(({label, path, Icon}, index) => (
						<button
							className={cn(
								'hover:bg-secondary-grey flex min-w-full rounded-2xl px-4 py-3',
								index === 0 && 'hover:bg-white',
							)}
							key={label + path}
							onClick={() => navigate(path)}
						>
							<Icon />
							<div className={cn('text-primary-grey ml-4 font-medium', index === 0 && 'text-primary-violet')}>
								{label}
							</div>
						</button>
					))}
				</nav>
			</div>
			<div role='app-content' className='flex w-1/2 flex-col'>
				<header className='flex min-w-full items-center justify-between'>
					<div className='text-4xl font-bold'>Home</div>
					<IconButton handleClick={() => console.log('click user icon')}>
						<Icon name={APP_ICON.USER} />
					</IconButton>
				</header>
				<Tabs tabConfigs={tabConfigs} handleChange={handleTabChange} className='my-8 min-w-full' />
				<Outlet />
			</div>
			<div />
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
