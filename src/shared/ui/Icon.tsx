//@ts-ignore
import userLogo from '@shared/assets/user.svg';
import {ReactElement} from 'react';

export const APP_ICON = {
	USER: 'user',
};
const iconMap = {
	[APP_ICON.USER]: () => <img src={userLogo} alt='user icon' />,
} as any;

type IconProps = {
	name: string;
	className?: string;
};

export const Icon = ({name, className}: IconProps) => {
	const AppIcon = iconMap[name];

	return <AppIcon {...{className}} />;
};

type IconButtonProps = {
	children: ReactElement;
	handleClick: () => void;
};

export function IconButton({children, handleClick}: IconButtonProps) {
	return (
		<button
			className='bg-secondary-violet flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl'
			onClick={handleClick}
		>
			<div className='h-5 w-5'>{children}</div>
		</button>
	);
}
