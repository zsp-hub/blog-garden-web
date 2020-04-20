import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-article',
  templateUrl: './user-article.component.html',
  styleUrls: ['./user-article.component.css']
})
export class UserArticleComponent implements OnInit {

  visible = false;
  title: string;
  article: any;

  constructor() { }

  ngOnInit() {
  }

  addArticle() {
    this.visible = true;
    this.title = '添加文章';
  }

  editArticle(item: any) {
    this.visible = true;
    this.title = '修改文章';
  }

  handleOk() {
    this.visible = false;
  }
}
