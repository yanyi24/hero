import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-router-study',
  template: `
    <div class="container">
      <h2>router study page</h2>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <a class="nav-link" routerLink="users" routerLinkActive="active">Users</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/comments" routerLinkActive="active">Comments</a>
        </li>
        <li class="nav-item">
          <a class="nav-link"  (click)="goTips()">to tips</a>
<!--          <a class="nav-link"  [routerLink]="[{outlets: {tip: ['tips']}}]" routerLinkActive="active">to tips</a>-->
        </li>
      </ul>
      <router-outlet></router-outlet>
      <router-outlet name="tip"></router-outlet>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouterStudyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goTips(): void {
    this.router.navigate([{outlets: {tip: ['tips']}}]);
  }
}
