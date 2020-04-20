import { Component, OnInit } from '@angular/core';
import {LoginRequestEntity} from '../../entity/login-request.entity';
import {ApiRequestServices} from '../../services/api-request.services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {DataPersistenceServices} from '../../services/data-persistence.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  visible = false;
  validateForm: FormGroup;
  loginRequest: LoginRequestEntity = new LoginRequestEntity();

  constructor(
    private api: ApiRequestServices,
    private fb: FormBuilder,
    private message: NzMessageService,
    private data: DataPersistenceServices
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userAccount: [null, [Validators.required]],
      usrePassword: [null, [Validators.required]]
    });
  }

  public open(): void {
    this.visible = true;
  }

  public close(): void {
    this.visible = false;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.validateForm.status === 'VALID') {
      this.loginRequest.userAccount = this.validateForm.value.userAccount;
      this.loginRequest.usrePassword = this.validateForm.value.usrePassword;
      this.login();
    }
  }

  login() {
    this.api.login(this.loginRequest).subscribe((response: any) => {
      if (response.success) {
        this.data.set('userID', response.userID);
        this.data.set('userName', response.userName);
        this.message.create('success', `登录成功`);
        this.close();
      } else {
        this.message.create('error', `密码错误，请重试`);
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }
}
