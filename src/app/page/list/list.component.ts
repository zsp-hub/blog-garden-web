import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AutherInfoComponent} from '../auther-info/auther-info.component';
import {DataPersistenceServices} from '../../services/data-persistence.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() listData;

  @ViewChild('autherInfo', { static: false }) autherInfo: AutherInfoComponent;

  constructor(
    private data: DataPersistenceServices,
    private route: Router
  ) { }

  ngOnInit() {
  }

  openAutherInfo(item: any) {
    if (this.data.get('userID') === item.userID) {
      this.route.navigateByUrl('/blog/user/' + item.userID + '/table');
    } else {
      this.autherInfo.open(item.userID, item.userName);
    }
  }
}
