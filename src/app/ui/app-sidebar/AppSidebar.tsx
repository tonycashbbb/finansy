import {cn} from '@shared/lib/helpers';
import {APP_ROUTER} from '@shared/lib/constants';
import {APP_ICON, Icon} from '@shared/ui';
import {useNavigate} from 'react-router-dom';

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

export function AppSidebar() {
	const navigate = useNavigate();

	return (
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
	);
}
