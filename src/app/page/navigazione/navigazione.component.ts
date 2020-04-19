import { Component, OnInit, ViewChild } from '@angular/core';
import { DataPersistenceServices} from '../../services/data-persistence.services';
import { QueryComponent } from '../guery/query.component';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navigazione',
  templateUrl: './navigazione.component.html',
  styleUrls: ['./navigazione.component.css']
})
export class NavigazioneComponent implements OnInit {
  private userID = 0;
  @ViewChild('query', { static: false }) query: QueryComponent;

  constructor(
    private data: DataPersistenceServices,
    private route: Router
  ) { }

  ngOnInit() {
    this.userID = this.data.get('userID');
    this.userID = 1;
  }

  public logOut() {
    this.data.remove('userID');
    this.data.remove('userName');
    this.route.navigateByUrl('/blog/home');
  }

  public openQuery() {
    this.query.open();
  }

}
