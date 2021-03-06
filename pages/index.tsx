import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import CustomCard from '../components/CustomCard';
import useFetch from '../lib/hook/useFetch';
import { NewsType } from '../interfaces';

const query = `
	query {
		getNews (order: desc){
			title
			link
			subtext {
				score
				author {
					value
				}
				age {
					value
				}
				comment {
					value
				}
			}
		}
	}
`;

const IndexPage = () => {
	const { loading, response } = useFetch({ query: JSON.stringify({ query }), url: '/api/graphql' });

	return (
		<div className='container'>
			<Grid container>
				<Grid item container justify='center' alignItems='center'>
					<Grid item xs={12} sm={10}>
						{loading ? (
							<CircularProgress color='secondary' />
						) : (
							<Grid container spacing={3}>
								{response!.getNews
									?.filter((x: NewsType) => x.subtext?.comment?.value !== 'More')
									.map((data: any, index: number) => (
										<Grid item xs={12} sm={6} lg={3} key={index + data.title}>
											<CustomCard {...data} />
										</Grid>
									))}
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

// export async function getServerSideProps() {
// 	const {
// 		data: { data },
// 	} = await axios({
// 		data: JSON.stringify({ query }),
// 		method: 'POST',
// 		url: 'http://localhost:3000/api/graphql',
// 	});

// 	return { props: { data } };
// }

export default IndexPage;
