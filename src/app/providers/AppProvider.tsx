import {BrowserRouter} from 'react-router-dom';
import {RouterProvider} from './RouterProvider.tsx';
import {QueryClientProvider} from './QueryClientProvider.tsx';

export function AppProvider() {
	return (
		<QueryClientProvider>
			<BrowserRouter>
				<RouterProvider />
			</BrowserRouter>
		</QueryClientProvider>
	);
}
