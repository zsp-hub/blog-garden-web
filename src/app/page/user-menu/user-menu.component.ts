import { Component, OnInit } from '@angular/core';
import {DataPersistenceServices} from '../../services/data-persistence.services';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  userID = 0;

  constructor(private data: DataPersistenceServices) { }

  ngOnInit() {
    this.userID = this.data.get('userID');
    this.userID = 1;
  }

}
