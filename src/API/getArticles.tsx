import axios, { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { IArticleInfo, formatArticleInfo } from './article.model';

interface IGetArticlesProps {
  date: Date | null,
  numResults: number,
  countryCode: string | null,
}

//given a date and number of results to fetch, returns top wikipedia articles
//optional country code allows searching for top articles of specific country
export const getArticles = async ({ date, numResults, countryCode }: IGetArticlesProps) => {
  const formattedDate = date ? format(date, 'yyyy/MM/dd') : format(new Date(), 'yyyy/MM/dd');
  let response: AxiosResponse;

  if (countryCode) {
    response = await axios.get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${countryCode}/all-access/${formattedDate}`);
  } else {
    response = await axios.get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${formattedDate}`);
  }

  const articles = response?.data?.items?.[0]?.articles?.slice(0, numResults) ?? [];
  const formattedArticles: IArticleInfo[] = articles.map(formatArticleInfo);
  return formattedArticles;
};