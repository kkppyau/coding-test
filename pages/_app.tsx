import type { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

const TITLE = 'WeMake App Coding Test';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>{TITLE}</title>
			</Head>
			<header>
				<h1>{TITLE}</h1>
			</header>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
