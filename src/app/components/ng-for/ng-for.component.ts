import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
const Heros: Hero[] = [
  {id: 'hero_0', name: '盖伦'},
  {id: 'hero_1', name: '赵信'},
  {id: 'hero_2', name: '嘉文'},
  {id: 'hero_3', name: '易大师'},
];
interface Hero {
  id: string;
  name: string;
}

@Component({
  selector: '[app-ng-for]',
  template: `
    <button class="btn btn-primary" (click)="reset()">重置</button>
    <ul>
      <li *ngFor="let item of heros; trackBy: trackByHero ">
         {{ item.name }}
      </li>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgForComponent implements OnInit {
  heros: Hero[] = Heros;
  constructor() { }

  ngOnInit(): void {
  }
  reset() {
    this.heros = [
      {id: 'hero_0', name: '盖伦'},
      {id: 'hero_4', name: '赵信2'},
      {id: 'hero_2', name: '嘉文'},
      {id: 'hero_5', name: '易大师2'},
    ]
  }
  trackByHero(hero: Hero) {
    return hero.id;
  }
}
