import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {DataPersistenceServices} from '../../services/data-persistence.services';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, AfterViewChecked {

  @ViewChild('login', { static: false }) login: LoginComponent;

  constructor(private data: DataPersistenceServices) { }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    if (!this.login.visible) {
      this.checkLogin();
    }
  }

  private  checkLogin() {
    if (this.data.get('userID') === undefined || this.data.get('userID') === null ) {
      this.login.open();
    }
  }

}
