import {APP_ICON, Icon, IconButton, TabConfig, Tabs} from '@shared/ui';
import {useNavigate} from 'react-router-dom';
import {APP_ROUTER} from '@shared/lib/constants';

const tabConfigs = [
	{label: 'Capital', path: APP_ROUTER.root},
	{label: 'Goals', path: APP_ROUTER.moduleInWork},
	{label: 'Tracker', path: APP_ROUTER.moduleInWork},
];

export function AppHeader() {
	const navigate = useNavigate();

	function handleTabChange(tabConfig: TabConfig) {
		if (tabConfig?.path) navigate(tabConfig.path);
	}

	return (
		<>
			<header className='flex min-w-full items-center justify-between'>
				<div className='text-4xl font-bold'>Home</div>
				<IconButton handleClick={() => console.log('click user icon')}>
					<Icon name={APP_ICON.USER} />
				</IconButton>
			</header>
			<Tabs tabConfigs={tabConfigs} handleChange={handleTabChange} className='my-8 min-w-full' isOutsideCard />
		</>
	);
}
