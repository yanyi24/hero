import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() show = true;
  @Input() title = '标题...';
  @Input() confirmText = '确定';
  @Input() cancelText = '取消';

  @Output() closed = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  onConfirm() {
    this.confirm.emit();
  }
  onClose() {
    this.closed.emit();
  }

}
