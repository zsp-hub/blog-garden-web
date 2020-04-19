import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-article',
  templateUrl: './user-article.component.html',
  styleUrls: ['./user-article.component.css']
})
export class UserArticleComponent implements OnInit {

  visible = false;
  title = 'add';

  constructor() { }

  ngOnInit() {
  }

}
