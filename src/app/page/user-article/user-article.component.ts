import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ArticleRequestEntity} from '../../entity/article-request.entity';
import {ApiRequestServices} from '../../services/api-request.services';
import {NzMessageService} from 'ng-zorro-antd';
import {DataPersistenceServices} from '../../services/data-persistence.services';

@Component({
  selector: 'app-user-article',
  templateUrl: './user-article.component.html',
  styleUrls: ['./user-article.component.css']
})
export class UserArticleComponent implements OnInit {
  @Output()
  clearArticle = new EventEmitter<boolean>();

  @Input()
  visible: boolean;

  articleID: number;
  title: string;
  articleRequest: ArticleRequestEntity = new ArticleRequestEntity();

  // 富文本编辑器
  editorConfig = {
    base_url: '/tinymce',
    theme: 'silver',
    menubar: false,
    // tslint:disable-next-line:max-line-length
    plugins: 'searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave',
    // tslint:disable-next-line:max-line-length
    toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image charmap emoticons hr pagebreak insertdatetime | fullscreen',
    height: 500,
    images_upload_handler(blobInfo, success, failure) {}
  };

  constructor(
    private api: ApiRequestServices,
    private message: NzMessageService,
    private data: DataPersistenceServices
  ) { }

  ngOnInit() {
  }

  openAddArticle() {
    this.title = '添加文章';
  }

  openEditArticle(articleID: number) {
    this.articleID = articleID;
    this.title = '修改文章';
    this.getArticle();
  }

  handleCancel() {
    if (this.articleID === undefined) {
      // 新增处理
    }
    this.clear(false);
  }

  handleOk() {
    if (this.articleID === undefined) {
      this.articleRequest.userID = this.data.get('userID');
      this.addArticle();
    } else {
      this.updateArticle();
    }
    this.clear(true);
  }

  clear(callback: boolean) {
    this.clearArticle.emit(callback);
    this.articleID = undefined;
    this.title = '';
    this.articleRequest = new ArticleRequestEntity();
  }
  getArticle() {
    this.api.getArticle(this.articleID).subscribe((response: any) => {
      if (response.success) {
        this.articleRequest = response.article;
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

  addArticle() {
    this.api.addArticle(this.articleRequest).subscribe((response: any) => {
      if (response.success) {
        this.message.create('success', '文章添加成功');
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

  updateArticle() {
    this.api.updateArticle(this.articleRequest).subscribe((response: any) => {
      if (response.success) {
        this.message.create('success', '文章修改成功');
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }
}
