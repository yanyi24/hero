import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TransferItem} from './components/transfer/types';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  sourceData: TransferItem[] = [];
  showUnless = false;
  show = true;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(events => events instanceof NavigationStart))
      .subscribe((event: NavigationStart) => console.log(event));
  }
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
