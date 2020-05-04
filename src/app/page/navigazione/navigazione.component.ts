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
  @ViewChild('query', { static: false }) query: QueryComponent;
  visible = false;

  noticeList = [];
  count = 0;

  userID = this.data.get('userID');

  interval: any;
  private $interval: any;

  constructor(
    private api: ApiRequestServices,
    private message: NzMessageService,
    private data: DataPersistenceServices,
    private route: Router
  ) { }

  ngOnInit() {
    this.getNotice();
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
    if (this.data.get('userID')) {
      this.api.getNotice(this.data.get('userID')).subscribe((response: any) => {
        if (response.success) {
          this.noticeList = response.result;
          this.noticeList.forEach(n => {
            const notice = n.notice.split('|::|');
            n._notice = notice[0];
            n._articleID = notice[1];
          });
          this.count = this.noticeList.filter( n => n.noticeStatus === 'NV').length;
        }
      }, (error: any) => {
        this.message.create('error', error.error.message);
      });
    }
  }

  public updateNotice() {
    this.api.updateNotice({userID: this.data.get('userID')}).subscribe((response: any) => {
      if (response.success) {
        this.getNotice();
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

  public deleteNotice() {
    this.api.deleteNotice(this.data.get('userID')).subscribe((response: any) => {
      if (response.success) {
        this.getNotice();
      }
    }, (error: any) => {
      this.message.create('error', error.error.message);
    });
  }

}
