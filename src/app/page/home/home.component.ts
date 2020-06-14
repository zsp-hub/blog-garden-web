import { Component, OnInit } from '@angular/core';
import {ApiRequestServices} from '../../services/api-request.services';
import {ArticleListRequestEntity} from '../../entity/article-list-request.entity';
import {NzMessageService} from 'ng-zorro-antd';
import {DataPersistenceServices} from '../../services/data-persistence.services';
import {ApiBaseServices} from '../../services/api-base.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  array = [
    ApiBaseServices.DOMAI_NAME + '轮播图1',
    ApiBaseServices.DOMAI_NAME + '轮播图2',
    ApiBaseServices.DOMAI_NAME + '轮播图3'
  ];

  articleListRequest: ArticleListRequestEntity = new ArticleListRequestEntity();
  listData: any = [];

  constructor(
    private api: ApiRequestServices,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.articleListRequest.pageInfo.pageNum = 1;
    this.articleListRequest.pageInfo.pageSize = 10;
    this.newArticleList();
  }

  newArticleList() {
    this.articleListRequest.pageInfo.orderBy = 'articleIssueTime desc';
    this.getListData();
  }

  hotspotArticleList() {
    this.articleListRequest.pageInfo.orderBy = 'articleRead desc';
    this.getListData();
  }

  getListData() {
    this.api.query(this.articleListRequest).subscribe((response: any) => {
      if (response.success) {
        this.listData = response.result;
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

}
