import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
	type DetailType {
		value: String
		link: String
	}

	type SubtextType {
		score: String
		author: DetailType
		age: DetailType
		hide: DetailType
		comment: DetailType
	}

	type NewsType {
		title: String
		link: String
		extra: DetailType
		subtext: SubtextType
	}

	type Query {
		getNews: [NewsType!]!
	}
`;
