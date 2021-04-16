enum Sort {
	asc,
	desc,
}

type DetailType = {
	value: string;
	link: string;
};

type SubtextType = {
	score: string;
	author: DetailType;
	age: DetailType;
	hide: DetailType;
	comment: DetailType;
};

export type NewsOrderType = {
	order: Sort;
};

export type NewsType = {
	title: string;
	link: string;
	extra: DetailType;
	subtext: SubtextType;
};
