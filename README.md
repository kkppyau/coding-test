# WeMakeApp Coding Test

## Setup

Install dependencies

```sh
npm i
```

Start the application

```sh
npm run build
npm run start
```

Visit `http://localhost:3000/` to view the application.

## Data structure of the extracted data

```
[
    {
        title,
        link,
        extra: {
            value,
            link
        },
        subtext: {
            score,
            author: {
                value,
                link
            },
            age: {
                value,
                link
            },
            hide: {
                value,
                link
            },
            comment: {
                value,
                link
            }
        }
    }
]
```

## Query used to get data

```
query {
	getNews (order: desc) {
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
```

## Known issue(s)

1. News that has no author, time, etc. will display wrong details since some of the elements hav no classes or id to select.
   So using the :nth-child selector may get the wrong data.

## Future improvement(s)

1. Show more than one page of data like adding "show more" button or scroll to the bottom to fetch data from other pages
1. Add reloading button or function to get the latest news data by creating manual reload button, SWR, etc.
1. Add filtering to Graphql if we want to search for specific news by keywords
1. Add pagination to Graphql if we want to get more than one page of data
1. Seperate styles to different files to be more manageable
1. Connect the application with Graphql using Apollo and wrap the application with HOC
1. Use absolute imports to have better management of the import file path and avoid getting disturb by the "../../../"
