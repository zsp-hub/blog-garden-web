import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { DataPersistenceServices} from '../../services/data-persistence.services';
import { QueryComponent } from '../guery/query.component';
import { Router} from '@angular/router';
import {ApiRequestServices} from '../../services/api-request.services';
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-navigazione',
  templateUrl: './navigazione.component.html',
  styleUrls: ['./navigazione.component.css']
})
export class NavigazioneComponent implements OnInit, OnDestroy {
  private userID = 0;
  @ViewChild('query', { static: false }) query: QueryComponent;
  visible = false;

  noticeList = [];
  count = 0;

  interval: any;
  private $interval: any;

  constructor(
    private api: ApiRequestServices,
    private message: NzMessageService,
    private data: DataPersistenceServices,
    private route: Router
  ) { }

  ngOnInit() {
    this.userID = this.data.get('userID');

    this.interval = setInterval(i => this.getNotice(), 1000 * 10);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  public logOut() {
    this.data.remove('userID');
    this.data.remove('userName');
    this.route.navigateByUrl('/blog/home');
  }

  public openQuery() {
    this.query.open();
  }

  public openNotice() {
    this.visible = true;
  }

  public clearNotice(event) {
    this.visible = false;
    if (event) {
      this.deleteNotice();
    } else {
      this.updateNotice();
    }
  }

  public getNotice() {
    this.api.getNotice(this.userID).subscribe((response: any) => {
      if (response.success) {
        this.noticeList = response.result;
        this.count = this.noticeList.filter( n => n.noticeStatus === 'NV').length;
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

  public updateNotice() {
    this.api.updateNotice({userID: this.userID}).subscribe((response: any) => {
      if (response.success) {
        this.getNotice();
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

  public deleteNotice() {
    this.api.deleteNotice(this.userID).subscribe((response: any) => {
      if (response.success) {
        this.getNotice();
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

}
