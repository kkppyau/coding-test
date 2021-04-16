import puppeteer from 'puppeteer';

export const resolvers = {
	Query: {
		getNews: async () => {
			try {
				const url = 'https://news.ycombinator.com/news';
				const browser = await puppeteer.launch();
				const page = await browser.newPage();
				await page.goto(url);

				const news = await page.evaluate(() => {
					const arr = document.querySelectorAll(
						'#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr'
					);

					let results = [];
					for (let i = 0; i < arr.length; i += 3) {
						results.push([arr[i], arr[i + 1]]);
					}

					return results.map((result) => {
						const mainElement = result[0].querySelector('td:nth-child(3)');
						const mainElementAnchor = mainElement?.querySelectorAll('a');
						const subElement = result[1].querySelector('td:nth-child(2)');
						const subElementAnchor = subElement?.querySelectorAll('a');
						return {
							title: mainElementAnchor?.[0]?.text,
							link: mainElementAnchor?.[0]?.href,
							extra: {
								value: mainElementAnchor?.[1]?.text,
								link: mainElementAnchor?.[1]?.href,
							},
							subtext: {
								score: subElement?.querySelector('span[class=score]')?.textContent,
								author: {
									value: subElementAnchor?.[0]?.text,
									link: subElementAnchor?.[0]?.href,
								},
								age: {
									value: subElementAnchor?.[1]?.text,
									link: subElementAnchor?.[1]?.href,
								},
								hide: {
									value: subElementAnchor?.[2]?.text,
									link: subElementAnchor?.[2]?.href,
								},
								comment: {
									value: subElementAnchor?.[3]?.text,
									link: subElementAnchor?.[3]?.href,
								},
							},
						};
					});
				});
				await browser.close();

				return news;
			} catch (error) {
				throw error;
			}
		},
	},
};
