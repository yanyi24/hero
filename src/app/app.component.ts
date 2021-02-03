import { Component, OnInit } from '@angular/core';
import { TransferItem } from './components/transfer/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  sourceData: TransferItem[] = [];
  showUnless = false;
  show = true;

  ngOnInit(): void {
    this.setTransferData();
  }
  setTransferData() {
    const prefix = 'item' + Date.now().toString().slice(-2);
    for (let i = 0; i < 20; i++) {
      this.sourceData.push({
        key: prefix + '_' + i,
        value: `${prefix}${i + 1}`,
        checked: false
      })
      
    }
  }
}
