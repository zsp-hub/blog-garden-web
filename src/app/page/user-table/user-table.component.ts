import { Component, OnInit } from '@angular/core';
import {ApiRequestServices} from '../../services/api-request.services';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleListRequestEntity} from '../../entity/article-list-request.entity';
import {DataPersistenceServices} from '../../services/data-persistence.services';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  articleListRequest: ArticleListRequestEntity = new ArticleListRequestEntity();
  userID: number = null;
  listData = [];

  pageIndex: number = null;
  pageSize: number = null;
  total: number = null;
  orderBy = 'articleID desc';

  constructor(
    private api: ApiRequestServices,
    private message: NzMessageService,
    private data: DataPersistenceServices
  ) { }

  ngOnInit() {
    this.userID = this.data.get('userID');
    this.articleListRequest.userID = this.userID;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.getListData();
  }

  addArticle() {

  }

  sort(sort: { key: string; value: string }): void {
    this.orderBy = null;
    if (sort.value != null) {
      this.orderBy  = sort.key;
    }
    if (sort.value === 'descend') {
      this.orderBy = this.orderBy + ' desc';
    }
    this.getListData();
  }

  getListData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.articleListRequest.pageInfo.pageNum = this.pageIndex;
    this.articleListRequest.pageInfo.pageSize = this.pageSize;
    this.articleListRequest.pageInfo.orderBy = this.orderBy;
    this.api.query(this.articleListRequest).subscribe((response: any) => {
      if (response.success) {
        this.pageIndex = response.pageInfo.pageNum;
        this.pageSize = response.pageInfo.pageSize;
        this.listData = response.result;
      }
    }, (error: any) => {
      this.message.create('error', error.toString());
    });
  }

  deleteArticle(articleID: number) {
    this.api.deleteArticle(articleID).subscribe((response: any) => {
      if (response.success) {
        this.message.create('success', '删除成功');
        this.getListData(true);
      } else {
        this.message.create('error', response.message);
      }
    }, (error: any) => {
      this.message.create('error', error.toString());
    });
  }
}
