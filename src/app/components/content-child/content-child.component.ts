import { AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, OnInit, QueryList } from '@angular/core';
import { ContentChildPanelComponent } from './content-child-panel/content-child-panel.component';

@Component({
  selector: 'app-content-child',
  templateUrl: './content-child.component.html',
  styles: [
  ]
})
export class ContentChildComponent implements OnInit, AfterViewInit {
  // 这样是获取不到元素的
  @ContentChild('.head', {static: true}) private headEl: ElementRef<HTMLSpanElement>;
  @ContentChild('other', {static: true}) private otherEl: ElementRef<HTMLDivElement>;

  @ContentChildren(ContentChildPanelComponent, {descendants: true}) private panels: QueryList<ContentChildPanelComponent>;
  constructor() { }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // console.log(this.headEl); // undefined
    // console.log(this.otherEl.nativeElement); // <div _ngcontent-teu-c17="">其他内容</div>
    console.log(this.panels);
    
  }
}
