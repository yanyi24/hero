import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {SelectivePreloadingStrategyService} from '../../../../services/selective-preloading-strategy.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {
  modules: string[];
  constructor(private preloadStrategy: SelectivePreloadingStrategyService) { }

  ngOnInit(): void {
    console.log(this.preloadStrategy.preloadedModules); // ["admin", "users"]
  }

}
