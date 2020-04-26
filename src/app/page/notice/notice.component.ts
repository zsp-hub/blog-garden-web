import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  @Input()
  visible: boolean;

  @Input()
  dataList: any;

  @Output()
  clearNotice = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  handleOk() {
    this.clearNotice.emit(true);
  }

  handleCancel() {
    this.clearNotice.emit(false);
  }
}
