import { Component, OnInit } from '@angular/core';
import {ApiRequestServices} from '../../services/api-request.services';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleListRequestEntity} from '../../entity/article-list-request.entity';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  visible = false;
  value = '';
  radioValue = 0;
  options = [
    { label: '标题', value: 0 },
    { label: '作者', value: 1 }
  ];
  listData: any = [];
  articleListRequest: ArticleListRequestEntity = new ArticleListRequestEntity();

  constructor(
    private api: ApiRequestServices,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.articleListRequest.pageInfo.orderBy = 'articleID desc';
  }

  public open(): void {
    this.visible = true;
  }

  public close(): void {
    this.visible = false;
  }

  search() {
    if (this.radioValue === 0) {
      this.articleListRequest.userName = null;
      this.articleListRequest.articleTitle = this.value;
    } else {
      this.articleListRequest.userName = this.value;
      this.articleListRequest.articleTitle = null;
    }

    this.api.query(this.articleListRequest).subscribe((response: any) => {
      if (response.success) {
        this.listData = response.result;
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }
}
