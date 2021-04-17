import orderBy from 'lodash/orderBy';
import puppeteer from 'puppeteer';
import { NewsOrderType, NewsType } from '../../../interfaces';

export const resolvers = {
	Query: {
		getNews: async (_: any, { order }: NewsOrderType) => {
			try {
				const baseUrl = 'https://news.ycombinator.com/';
				const path = 'news';
				const browser = await puppeteer.launch();
				const page = await browser.newPage();
				await page.goto(baseUrl + path);

				const news = await page.evaluate((baseUrl) => {
					const arr = document.querySelectorAll(
						'#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr'
					);

					let results = [];
					for (let i = 0; i < arr.length; i += 3) {
						results.push([arr[i], arr[i + 1]]);
					}

					return results.map((result) => {
						const mainElement = result[0].querySelector('td:nth-child(3)');
						const subElement = result[1].querySelector('td:nth-child(2)');
						return {
							title: mainElement?.querySelector('a[class=storylink]')?.innerHTML,
							link: mainElement?.querySelector('a[class=storylink]')?.getAttribute('href'),
							extra: {
								value: mainElement?.querySelector('.sitebit > a > span[class=sitestr]')?.innerHTML,
								link: baseUrl + mainElement?.querySelector('.sitebit > a')?.getAttribute('href'),
							},
							subtext: {
								score: subElement?.querySelector('span[class=score]')?.innerHTML,
								author: {
									value: subElement?.querySelector('a[class=hnuser]')?.innerHTML,
									link: baseUrl + subElement?.querySelector('a[class=hnuser]')?.getAttribute('href'),
								},
								age: {
									value: subElement?.querySelector('.age > a')?.innerHTML,
									link: baseUrl + subElement?.querySelector('.age > a')?.getAttribute('href'),
								},
								hide: {
									value: subElement?.querySelector('a:nth-last-child(2):not(.age > a)')?.textContent,
									link:
										baseUrl +
										subElement
											?.querySelector('a:nth-last-child(2):not(.age > a)')
											?.getAttribute('href'),
								},
								comment: {
									value: subElement?.querySelector('a:last-child:not(.age > a)')?.textContent,
									link:
										baseUrl +
										subElement?.querySelector('a:last-child:not(.age > a)')?.getAttribute('href'),
								},
							},
						};
					});
				}, baseUrl);
				await browser.close();
				return orderBy(
					news,
					[(o: NewsType) => parseInt(o.subtext.comment.value?.replace(/\D/g, '')) || 0],
					[order]
				);
			} catch (error) {
				throw error;
			}
		},
	},
};
