import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dialogTile = "这是AppComponent传入的title";
  dialogShow = false;
  
  onDialogClosed() {
    console.log('onDialogClosed');
    this.dialogShow = false;
  }
  onDialogConfirm() {
    console.log('onDialogConfirm');
  }
  showDialog() {
    this.dialogShow = true;
  }
}
