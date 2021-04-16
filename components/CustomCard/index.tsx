import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NewsType } from '../../interfaces';

const CustomCard = ({
	title,
	link,
	subtext: {
		score,
		author: { value: name },
		age: { value: time },
		comment: { value: count },
	},
}: NewsType) => {
	return (
		<Link href={link || ''}>
			<a target='_blank'>
				<Card>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{title}
						</Typography>
						<Typography variant='body2' component='p'>
							Author: {name}
							<br />
							Points: {score}
							<br />
							Time: {time}
							<br />
							Comments: {count}
						</Typography>
					</CardContent>
				</Card>
			</a>
		</Link>
	);
};

export default CustomCard;
