import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewChildComponent implements OnInit, AfterViewInit {
  // 定义私有属性boxEl，是ElementRef类型。
  @ViewChild('box', {static: true}) private boxEl: ElementRef;
  @ViewChild(PanelComponent, {static: true}) private panelInstance: PanelComponent;
  @ViewChild('panel', {static: true}) private panelInstance2: PanelComponent;

  @ViewChildren('box') private boxEls: QueryList<ElementRef>;
  constructor() { 
    // console.log('constructor', this.boxEl);
  }
  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit', this.boxEl);
    // console.log(this.panelInstance.name);
    // console.log(this.panelInstance2.name);
    // console.log(this.panelInstance.el.nativeElement);
    console.log(this.boxEls);
    
  }
  ngOnInit(): void {
    // console.log('ngOnInit', this.boxEl);
  }

}
