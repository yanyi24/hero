import {Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {fromEvent} from 'rxjs';
import {concatAll, map, takeUntil, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-drag',
  template: `
      <p class="drag" #drag>
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
      -moz-user-select:none;
      -webkit-user-select:none;
      -ms-user-select:none;
      -khtml-user-select:none;
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
    const mouseDown = fromEvent(this.dragEl.nativeElement, 'mousedown');
    const mouseUp = fromEvent(document.body, 'mouseup');
    const mouseMove = fromEvent(document.body, 'mousemove');
    mouseDown.pipe(
      map(() => mouseMove.pipe(takeUntil(mouseUp))),
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
