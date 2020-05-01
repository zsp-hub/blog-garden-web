import { Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiRequestServices} from '../../services/api-request.services';
import {NzMessageService} from 'ng-zorro-antd';
import {CommentRequestEntity} from '../../entity/comment-request.entity';
import {DataPersistenceServices} from '../../services/data-persistence.services';
import {AddReadRequestEntity} from '../../entity/add-read-request.entity';
import {Subscription, timer} from 'rxjs';
import {NoticeRequestEntity} from '../../entity/notice-request.entity';


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

  $timer = timer(60000);
  timerSub: Subscription;

  userID = this.data.get('userID');

  editorConfig = {
    base_url: '/tinymce',
    theme: 'silver',
    toolbar: false,
    menubar: false,
    height: 700
  };

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

    this.addReadRequest.userID = this.userID;
    this.addReadRequest.articleID = this.articleID;

    this.timerSub = this.$timer.subscribe(n => this.addRead());
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
      this.message.create('error', error.error.message);
    });
  }

  addRead() {
    this.api.addRead(this.addReadRequest).subscribe((response: any) => {
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

  getComment() {
    this.api.getComment(this.articleID).subscribe((response: any) => {
      if (response.success) {
        this.comment = response.result;
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

  reply(item: any) {
    item.reply = true;
  }

  unfold(item: any) {
    item.unfold = true;
  }

  replyClose(item: any) {
    item.reply = false;
    this.replyValue = null;
  }

  replySubmit(item: any) {
    this.commentRequest.articleID = this.articleID;
    this.commentRequest.commentSerialNumber = item.commentID;
    this.commentRequest.userID = this.userID;
    this.commentRequest.commentContent = this.replyValue;
    this.addComment();
  }

  commentSubmit() {
    this.commentRequest.articleID = this.articleID;
    this.commentRequest.commentSerialNumber = null;
    this.commentRequest.userID = this.userID;
    this.commentRequest.commentContent = this.commentValue;
    this.addComment();
  }

  addComment() {
    this.api.addComment(this.commentRequest).subscribe((response: any) => {
      if (response.success) {
        this.replyValue = null;
        this.commentValue = null;
        this.getComment();
        this.addNotice();
        this.message.create('success', '评论添加成功');
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

  addNotice() {
    if (this.article.userID !== this.userID) {
      const noticeReques = new NoticeRequestEntity();
      noticeReques.userID = this.article.userID;
      noticeReques.notice = this.data.get('userName') + '在文章：' + this.article.articleTitle + '中评论了你 |::|' + this.article.articleID;
      this.api.addNotice(noticeReques).subscribe((response: any) => {
      }, (error: any) => {
        this.message.create('error', error.error.message);
      });
    }
  }
}
