import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styles: [
  ]
})
export class ViewChildComponent implements OnInit, AfterViewInit {
  // 定义私有属性boxEl，是ElementRef类型。
  @ViewChild('box') private boxEl: ElementRef;
  constructor() { 
    console.log('constructor', this.boxEl);
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.boxEl);
  }
  ngOnInit(): void {
    console.log('ngOnInit', this.boxEl);
  }

}
