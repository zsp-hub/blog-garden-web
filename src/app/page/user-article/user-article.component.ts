import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ArticleRequestEntity} from '../../entity/article-request.entity';
import {ApiRequestServices} from '../../services/api-request.services';
import {NzMessageService} from 'ng-zorro-antd';
import {DataPersistenceServices} from '../../services/data-persistence.services';
import * as qiniu from 'qiniu-js';
import {ApiBaseServices} from '../../services/api-base.services';


@Component({
  selector: 'app-user-article',
  templateUrl: './user-article.component.html',
  styleUrls: ['./user-article.component.css']
})
export class UserArticleComponent implements OnInit {

  private static keys = '';

  @Output()
  clearArticle = new EventEmitter<boolean>();

  @Input()
  visible: boolean;

  articleID: number;
  title: string;
  articleRequest: ArticleRequestEntity = new ArticleRequestEntity();

  // 富文本编辑器
  editorConfig = {
    apiKey: '',
    // base_url: '/tinymce',
    // theme: 'silver',
    menubar: false,
    // tslint:disable-next-line:max-line-length
    plugins: 'searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave',
    // tslint:disable-next-line:max-line-length
    toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image charmap emoticons hr pagebreak insertdatetime | fullscreen',
    height: 500,
    images_upload_handler(blobInfo, success, failure) {
      // tslint:disable-next-line:one-variable-per-declaration
      let xhr, formData;

      xhr = new XMLHttpRequest();

      xhr.open('POST', ApiBaseServices.API_ENDPOINT + 'img');

      // tslint:disable-next-line:only-arrow-functions
      xhr.onload = function() {
        let json;

        if (xhr.status !== 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }

        json = JSON.parse(xhr.responseText);

        if ( UserArticleComponent.keys === undefined || UserArticleComponent.keys === null || UserArticleComponent.keys === '') {
          UserArticleComponent.keys += json.key;
        } else {
          if (UserArticleComponent.keys.indexOf(json.key) === -1 ) {
            UserArticleComponent.keys += '::' + json.key;
          }
        }

        success(json.path + '/' + json.key);
      };

      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    }
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
    this.clear(false);
  }

  handleOk() {
    this.articleRequest.pictureCatalog = UserArticleComponent.keys;
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
    UserArticleComponent.keys = '';
  }

  getArticle() {
    this.api.getArticle(this.articleID).subscribe((response: any) => {
      if (response.success) {
        this.articleRequest = response.article;
        UserArticleComponent.keys = this.articleRequest.pictureCatalog;
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
