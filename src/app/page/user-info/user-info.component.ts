import { Component, OnInit } from '@angular/core';
import {ApiRequestServices} from '../../services/api-request.services';
import {NzMessageService} from 'ng-zorro-antd';
import {DataPersistenceServices} from '../../services/data-persistence.services';
import {UserInfoRequestEntity} from '../../entity/user-info-request.entity';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userID: number;
  userIntro: string = null;
  userInfoRequest: UserInfoRequestEntity = new UserInfoRequestEntity();
  userIssue = 0;
  userRead = 0;

  constructor(
    private api: ApiRequestServices,
    private message: NzMessageService,
    private data: DataPersistenceServices
  ) { }

  ngOnInit() {
    this.userID = this.data.get('userID');
    this.getUserInfo(this.userID);
  }

  getUserInfo(userID: number) {
    this.api.getUserInfo(userID).subscribe((response: any) => {
      if (response.success) {
        this.userIntro = response.userIntro;
        this.userIssue = response.userIssue;
        this.userRead = response.userRead;
      }
    }, (error: any) => {
      this.message.create('error', error.toString());
    });
  }

  updateUserInfo() {
    this.userInfoRequest.userIntro = this.userIntro;
    this.userInfoRequest.userID = this.userID;
    this.api.updateUserInfo(this.userInfoRequest).subscribe((response: any) => {
      if (response.success) {
        this.message.create('success', '修改成功');
        this.getUserInfo(this.userID);
      }
    }, (error: any) => {
      this.message.create('error', error.toString());
    });
  }
}
