import {Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {fromEvent} from 'rxjs';
import {concatAll, map, takeUntil, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-drag',
  template: `
      <p class="drag" id="drag" #drag>
        drag me
      </p>
  `,
  styles: [`
    .drag{
      width: 100px;
      height: 100px;
      border: 1px solid #afafaf;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
      cursor: pointer;
      position: absolute;
      -moz-user-select:none;/*火狐*/
      -webkit-user-select:none;/*webkit浏览器*/
      -ms-user-select:none;/*IE10*/
      -khtml-user-select:none;/*早期浏览器*/
      user-select:none;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragComponent implements OnInit, AfterViewInit {
  @ViewChild('drag', {static: true}) dragEl: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const mouseDown = fromEvent(document.body, 'mousedown');
    const mouseUp = fromEvent(document.body, 'mouseup');
    const mouseMove = fromEvent(this.dragEl.nativeElement, 'mousemove');
    mouseUp.subscribe(() => console.log('up'));
    mouseDown.pipe(
      map(e => mouseMove.pipe(takeUntil(mouseUp))),
      concatAll(),
      withLatestFrom(mouseDown, (move: MouseEvent, down: MouseEvent) => {
        const {width, height} = (down.target as HTMLElement).getBoundingClientRect();
        return {
          x: this.getValue(move.clientX - down.offsetX, window.innerWidth - width, 0),
          y: this.getValue(move.clientY - down.offsetY, window.innerHeight - height, 0)
        };
      })
    ).subscribe(res => {
      this.dragEl.nativeElement.style.left = res.x  + 'px';
      this.dragEl.nativeElement.style.top = res.y + 'px';
    });

  }
  getValue(value, max, min): number {
    return Math.min(Math.max(value, min), max);
  }

}
