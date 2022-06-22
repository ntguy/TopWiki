export interface IArticleInfoDefault {
  article: string,
  views: number,
  rank: number,
}

export interface IArticleInfoByCountry {
  article: string,
  views_ceil: number,
  rank: number,
}

export interface IArticleInfo {
  name: string,
  views: number,
  rank: number
}

//returns article info object with name, views and rank regardless of if using default or by country search
export const formatArticleInfo = (articleInfo: IArticleInfoDefault | IArticleInfoByCountry): IArticleInfo => {
  const isDefaultRequest = 'views' in articleInfo;
  if (isDefaultRequest) {
    return ({
      name: articleInfo.article,
      views: articleInfo.views,
      rank: articleInfo.rank
    });
  }
  return ({
    name: articleInfo.article,
    views: articleInfo.views_ceil,
    rank: articleInfo.rank
  });
};