import {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {sessionModel} from '@entities/session';
import {APP_ROUTER, APP_TEXT} from '@shared/lib/constants';

export function AuthGuard({children}: {children: ReactNode}) {
	const isAuth = sessionModel.useAuth();

	if (!isAuth) {
		return (
			<div className='bg-red-300'>
				<h1>{APP_TEXT.dontHaveAccess}</h1>
				<div>
					<Link to={APP_ROUTER.root}>{APP_TEXT.goBackHome}</Link>
				</div>
			</div>
		);
	}

	return <> {children} </>;
}
