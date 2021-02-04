import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sizer',
  templateUrl: './sizer.component.html',
  styleUrls: ['./sizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizerComponent implements OnInit {
  // 创建输入属性size，为number或字符串类型
  @Input() size: number | string;
  // 创建自定义事件onSizeChange
  @Output() sizeChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  dec() {
    this.resize(-1);
  }
  inc() {
    this.resize(1);
  }
  resize(step: number) {
    // 设置字体大小为12～40之间的值
    this.size = Math.min(40, Math.max(12, +this.size + step));
    this.sizeChange.emit(this.size);
  }

}
