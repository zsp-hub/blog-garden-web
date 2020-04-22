import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgZorroAntdModule, NZ_I18N, NZ_ICONS, NzAvatarModule, NzCommentModule, NzFormModule, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HomeComponent } from './page/home/home.component';
import { Page404Component } from './page/page404/page404.component';
import { NavigazioneComponent } from './page/navigazione/navigazione.component';
import { BlogComponent } from './page/blog/blog.component';
import { QueryComponent } from './page/guery/query.component';
import { LoginComponent } from './page/login/login.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline, HistoryOutline , ReadOutline, FileOutline, BellOutline} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { ListComponent } from './page/list/list.component';
import { AutherInfoComponent } from './page/auther-info/auther-info.component';
import { ArticleComponent } from './page/article/article.component';
import { UserComponent } from './page/user/user.component';
import { UserMenuComponent } from './page/user-menu/user-menu.component';
import { UserTableComponent } from './page/user-table/user-table.component';
import { UserInfoComponent } from './page/user-info/user-info.component';
import { UserArticleComponent } from './page/user-article/user-article.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {ApiRequestServices} from './services/api-request.services';
import { NoticeComponent } from './page/notice/notice.component';

const icons: IconDefinition[] = [ UserOutline, LockOutline , HistoryOutline, ReadOutline, FileOutline, BellOutline];

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component,
    NavigazioneComponent,
    BlogComponent,
    QueryComponent,
    LoginComponent,
    ListComponent,
    AutherInfoComponent,
    ArticleComponent,
    UserComponent,
    UserMenuComponent,
    UserTableComponent,
    UserInfoComponent,
    UserArticleComponent,
    NoticeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    NzAvatarModule,
    NzCommentModule,
    EditorModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons },
    ApiRequestServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
