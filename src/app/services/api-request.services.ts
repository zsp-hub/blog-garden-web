import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiBaseServices} from './api-base.services';
import {LoginRequestEntity} from '../entity/login-request.entity';
import {ArticleListRequestEntity} from '../entity/article-list-request.entity';
import {CommentRequestEntity} from '../entity/comment-request.entity';
import {AddReadRequestEntity} from '../entity/add-read-request.entity';
import {UserInfoRequestEntity} from '../entity/user-info-request.entity';


@Injectable({
  providedIn: 'root'
})

export class ApiRequestServices {
  constructor(private http: HttpClient) {
  }

  login(loginRequest: LoginRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'login';
    return this.http.post(api, loginRequest);
  }

  query(articleListRequest: ArticleListRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'query';
    return this.http.post(api, articleListRequest);
  }

  getUserInfo(userID: number) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'user-info';
    return this.http.get(api + '?userID=' + userID);
  }

  updateUserInfo(userInfoRequest: UserInfoRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'user-info';
    return this.http.put(api, userInfoRequest);
  }

  addRead(addReadRequest: AddReadRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'add-read';
    return this.http.post(api, addReadRequest);
  }

  getArticle(articleID: number) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'article';
    return this.http.get(api + '?articleID=' + articleID);
  }

  // addArticle() {
  //   const api: string = ApiBaseServices.API_ENDPOINT + 'article';
  //   return this.http.post(api);
  // }

  // updateArticle() {
  //   const api: string = ApiBaseServices.API_ENDPOINT + 'article';
  //   return this.http.put(api);
  // }

  deleteArticle(articleID: number) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'article';
    return this.http.delete(api + '?articleID=' + articleID);
  }

  getComment(articleID: number) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'comment';
    return this.http.get(api + '?articleID=' + articleID);
  }

  addComment(commentRequest: CommentRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'comment';
    return this.http.post(api, commentRequest);
  }
}
