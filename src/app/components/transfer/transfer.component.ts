import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import {Direction, TransferItem} from './types';
import cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements OnInit, OnChanges {
  @Input() sourceData: TransferItem[] = [];
  @Input() search = false;
  @Input() customTpl: TemplateRef<any>;
  @Input() leftLabel: TemplateRef<any>;
  @Input() rightLabel: TemplateRef<any>;
  leftFilterStr = '';
  rightFilterStr = '';
  leftShowData: TransferItem[] = [];
  rightShowData: TransferItem[] = [];
  leftSourceData: TransferItem[] = [];
  rightSourceData: TransferItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    const {sourceData} = changes;
    if (sourceData && sourceData.currentValue) {
      sourceData.currentValue.map(item => {
        if (!item.direction || item.direction === 'left') {
          this.leftShowData.push(item);
          this.leftSourceData.push(item);
        } else {
          this.rightShowData.push(item);
          this.rightSourceData.push(item);
        }
      });
    }
  }
  onSelect(index: number, direction: Direction) {
    this[direction+'ShowData'][index].checked = !this[direction+'ShowData'][index].checked;
    this[direction+'ShowData'] = this[direction+'ShowData'].slice();
  }
  onFilte(str: string, direction: Direction) {
    this[direction+'FilterStr'] = str;
    this.filter(direction);
  }
  btnDisabled(direction: Direction) {
    return !this[direction+'ShowData'].some(item => item.checked);
  }
  to(direction: Direction) {
    if(direction === 'left'){
      this.move('left', 'right');
    } else {
      this.move('right', 'left');
    }
  }
  private filter(direction: Direction) {
    const str = direction === 'left' ? this.leftFilterStr : this.rightFilterStr;
    this[direction+'ShowData'] = this[direction+'SourceData'].filter(item => item.value.includes(str));
  }
  private move(from: Direction, to: Direction) {
    const target = cloneDeep(this[from+'ShowData'])
    .filter(item => item.checked)
    .map(item => {
      item.checked = false;return item;
    });
    this[to+'ShowData'] = target.concat(this[to+'ShowData']);
    this[to+'SourceData'] = target.concat(this[to+'SourceData']);

    this[from+'ShowData'] = this[from+'ShowData'].filter(item => !item.checked);
    this[from+'SourceData'] = this[from+'SourceData'].filter(item => {
      return !target.some(sItem => item.value === sItem.value);
    });
    this.filter(to);
  }
}
