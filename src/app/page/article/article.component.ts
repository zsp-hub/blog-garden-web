import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiRequestServices} from '../../services/api-request.services';
import {NzMessageService} from 'ng-zorro-antd';
import {CommentRequestEntity} from '../../entity/comment-request.entity';
import {DataPersistenceServices} from '../../services/data-persistence.services';
import {AddReadRequestEntity} from '../../entity/add-read-request.entity';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  articleID: any = null;
  replyValue: string = null;
  commentValue: string = null;
  article: any = {};
  comment: any = [];
  commentRequest: CommentRequestEntity = new  CommentRequestEntity();
  addReadRequest: AddReadRequestEntity = new  AddReadRequestEntity();

  timer$ = timer(60000);
  timerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private api: ApiRequestServices,
    private message: NzMessageService,
    private data: DataPersistenceServices
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.articleID = params.get('articleID');
    });
    this.getArticle();
    this.getComment();

    this.addReadRequest.userID = this.data.get('userID');
    this.addReadRequest.articleID = this.articleID;

    this.timerSub = this.timer$.subscribe(n => this.addRead());

  }

  ngOnDestroy() {
    this.timerSub.unsubscribe();
  }


  getArticle() {
    this.api.getArticle(this.articleID).subscribe((response: any) => {
      if (response.success) {
        this.article = response.article;
      }
    }, (error: any) => {
      this.message.create('error', error.toString());
    });
  }

  addRead() {
    this.api.addRead(this.addReadRequest).subscribe((response: any) => {
    }, (error: any) => {
      this.message.create('error', error.toString());
    });
  }

  getComment() {
    this.api.getComment(this.articleID).subscribe((response: any) => {
      if (response.success) {
        this.comment = response.result;
      }
    }, (error: any) => {
      this.message.create('error', error.toString());
    });
  }

  reply(item: any) {
    item.reply = true;
  }

  replyClose(item: any) {
    item.reply = false;
    this.replyValue = null;
  }

  replySubmit(item: any) {
    this.commentRequest.articleID = this.articleID;
    this.commentRequest.commentSerialNumber = item.commentID;
    this.commentRequest.commentTitle = this.data.get('userName');
    this.commentRequest.commentContent = this.replyValue;
    this.addComment();
  }

  commentSubmit() {
    this.commentRequest.articleID = this.articleID;
    this.commentRequest.commentSerialNumber = null;
    this.commentRequest.commentTitle = this.data.get('userName');
    this.commentRequest.commentContent = this.commentValue;
    this.addComment();
  }

  addComment() {
    this.api.addComment(this.commentRequest).subscribe((response: any) => {
      if (response.success) {
        this.replyValue = null;
        this.commentValue = null;
        this.getComment();
        this.message.create('success', '评论添加成功');
      }
    }, (error: any) => {
      this.message.create('error', error.toString());
    });
  }
}
