import { Component, OnInit } from '@angular/core';
import {ApiRequestServices} from '../../services/api-request.services';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-auther-info',
  templateUrl: './auther-info.component.html',
  styleUrls: ['./auther-info.component.css']
})
export class AutherInfoComponent implements OnInit {

  visible = false;

  data: any = {
    userIntro: null,
    userRead: 11,
    userIssue: 11
  };

  userName: string = null;

  constructor(
    private api: ApiRequestServices,
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  public open(userID: number, userName: string): void {
    this.userName = this.data.get('userName');
    this.getUserInfo(userID);
    this.visible = true;
  }

  public close(): void {
    this.visible = false;
  }

  getUserInfo(userID: number) {
    this.api.getUserInfo(userID).subscribe((response: any) => {
      if (response.success) {
        this.data = response;
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }
}
