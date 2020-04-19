import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './page/home/home.component';
import {Page404Component} from './page/page404/page404.component';
import {BlogComponent} from './page/blog/blog.component';
import {LoginComponent} from './page/login/login.component';
import {ArticleComponent} from './page/article/article.component';
import {UserComponent} from './page/user/user.component';
import {UserTableComponent} from './page/user-table/user-table.component';
import {UserInfoComponent} from './page/user-info/user-info.component';


const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'article/:articleID', component: ArticleComponent },
      {
        path: 'user/:userID',
        component: UserComponent,
        children: [
          { path: 'table', component: UserTableComponent },
          { path: 'info', component: UserInfoComponent }
        ]
      }
    ]
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
