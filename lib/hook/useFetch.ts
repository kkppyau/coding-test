import axios from 'axios';
import { useEffect, useState } from 'react';

type FetchArgument = {
	query: string;
	url: string;
};

type Canceler = {
	(message?: string): void;
};

const useFetch = ({ query = '', url = '' }: FetchArgument) => {
	const [response, setResponse] = useState<null | { getNews: any }>(null);

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		let cancel: Canceler;

		(async () => {
			const {
				data: { data },
			} = await axios({
				cancelToken: new CancelToken((c) => (cancel = c)),
				data: query,
				method: 'POST',
				url,
			});
			setResponse(data || []);
		})();

		return () => cancel();
	}, [url]);

	return { loading: response === null, response };
};

export default useFetch;
