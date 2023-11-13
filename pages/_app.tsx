// Node Modules
import type { AppProps } from 'next/app';

// Project Files
import '@/styles/globals.css';
import UserContextProvider from '@/state/UserContextProvider';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<Component {...pageProps} />;
		</UserContextProvider>
	);
}
