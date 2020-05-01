import { Component, OnInit } from '@angular/core';
import {LoginRequestEntity} from '../../entity/login-request.entity';
import {ApiRequestServices} from '../../services/api-request.services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  registeredValidateForm: FormGroup;
  loginRequest: LoginRequestEntity = new LoginRequestEntity();
  isRegistered = false;

  constructor(
    private api: ApiRequestServices,
    private fb: FormBuilder,
    private message: NzMessageService,
    private data: DataPersistenceServices
  ) {}

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registeredValidateForm.controls.usrePassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userAccount: [null, [Validators.email, Validators.required]],
      usrePassword: [null, [Validators.required]]
    });

    this.registeredValidateForm = this.fb.group({
      userAccount: [null, [Validators.email, Validators.required]],
      userName: [null, [Validators.required]],
      usrePassword: [null, [Validators.required]],
      reUsrePassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  public open(): void {
    this.visible = true;
  }

  public close(): void {
    this.loginRequest = new LoginRequestEntity();
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

  openRegistered() {
    this.isRegistered = true;
  }

  closeRegistered() {
    this.loginRequest = new LoginRequestEntity();
    this.isRegistered = false;
  }

  registeredSubmitForm(): void {
    for (const i in this.registeredValidateForm.controls) {
      if (this.registeredValidateForm.controls.hasOwnProperty(i)) {
        this.registeredValidateForm.controls[i].markAsDirty();
        this.registeredValidateForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.registeredValidateForm.status === 'VALID') {
      this.loginRequest.userAccount = this.registeredValidateForm.value.userAccount;
      this.loginRequest.usrePassword = this.registeredValidateForm.value.usrePassword;
      this.loginRequest.userName = this.registeredValidateForm.value.userName;
      this.registered();
    }
  }

  registered() {
    this.api.registered(this.loginRequest).subscribe((response: any) => {
      if (response.success) {
        this.message.create('success', `注册成功`);
        this.closeRegistered();
      } else {
        this.message.create('error', `邮箱已被注册`);
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }
}
