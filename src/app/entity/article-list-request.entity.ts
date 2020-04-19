export class ArticleListRequestEntity {
  userName: string;
  articleTitle: string;
  userID: number;
  pageInfo: PageInfo = new PageInfo();
}

export class PageInfo {
  orderBy: string;
  pageNum: number;
  pageSize: number;
}
