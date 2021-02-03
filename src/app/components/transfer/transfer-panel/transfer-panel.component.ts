import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { TransferComponent } from '../transfer.component';
import { TransferItem } from '../types';

@Component({
  selector: 'app-transfer-panel',
  templateUrl: './transfer-panel.component.html',
  styleUrls: ['./transfer-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferPanelComponent implements OnInit, OnChanges {
  @Input() list: TransferItem[];
  @Input() search = false;
  @Output() select = new EventEmitter<number>();
  @Output() filtered = new EventEmitter<string>();

  selecteds: TransferItem[];
  constructor(readonly parent: TransferComponent) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    const {list} = changes;
    if (list && list.currentValue) {
      this.selecteds = list.currentValue.filter(item => item.checked);
    }
  }
  itemClick(index: number) {
    this.select.emit(index);
  }
  onInput(event: Event){
    const {value} = (event.target as HTMLInputElement);
    this.filtered.emit(value);
  }

}
