import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiBaseServices} from './api-base.services';
import {LoginRequestEntity} from '../entity/login-request.entity';
import {ArticleListRequestEntity} from '../entity/article-list-request.entity';
import {CommentRequestEntity} from '../entity/comment-request.entity';
import {AddReadRequestEntity} from '../entity/add-read-request.entity';
import {UserInfoRequestEntity} from '../entity/user-info-request.entity';
import {ArticleRequestEntity} from '../entity/article-request.entity';
import {NoticeRequestEntity} from '../entity/notice-request.entity';


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

  registered(loginRequest: LoginRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'register';
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

  addArticle(articleRequest: ArticleRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'article';
    return this.http.post(api, articleRequest);
  }

  updateArticle(articleRequest: ArticleRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'article';
    return this.http.put(api, articleRequest);
  }

  deleteArticle(articleID: number, userID: number) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'article';
    return this.http.delete(api + '?articleID=' + articleID + '&userID=' + userID);
  }

  getComment(articleID: number) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'comment';
    return this.http.get(api + '?articleID=' + articleID);
  }

  addComment(commentRequest: CommentRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'comment';
    return this.http.post(api, commentRequest);
  }

  getNotice(userID: number) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'notice';
    return this.http.get(api + '?userID=' + userID);
  }

  addNotice(noticeRequest: NoticeRequestEntity) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'notice';
    return this.http.post(api, noticeRequest);
  }

  updateNotice(noticeRequest: { userID: number }) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'notice';
    return this.http.put(api, noticeRequest);
  }

  deleteNotice(userID: number) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'notice';
    return this.http.delete(api + '?userID=' + userID);
  }

  uploadImg(file: any) {
    const api: string = ApiBaseServices.API_ENDPOINT + 'img';
    return this.http.post(api, file);
  }

}
