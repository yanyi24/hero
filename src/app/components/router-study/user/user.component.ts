import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {User} from '../../../data/data.type';
import {UserService} from './user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DialogService} from './dialog.service';

@Component({
  selector: 'app-user',
  template: `
    <div *ngIf="user">
      <h4>{{user.name}}</h4>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-1 col-form-label">Email:</label>
        <div class="col-sm-10">
          <input type="text" class="" id="staticEmail" [(ngModel)]="editEmail" placeholder="email...">
        </div>
      </div>
      <div class="btn btn-group">
        <button class="btn btn-secondary" (click)="save()">保存</button>
        <button class="btn btn-danger" (click)="cancel()">取消</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  user: User; // 这里不使用Observable
  editEmail: string; // 保存初始email值
  constructor(
    private userServe: UserService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    console.log(this.route.data);
    this.route.data
      .subscribe((data: { user: User }) => {
        this.user = data.user;
        this.editEmail = data.user.email;
        this.cdr.markForCheck();
      });
    // this.route.params.pipe(
    //   switchMap(params => this.userServe.getUser(params.id))
    // ).subscribe(res => {
    //   this.user = res;
    //   this.editEmail = res.email;
    //   // 标记需要被变更检测
    //   this.cdr.markForCheck();
    // });
  }
  save(): void {
    this.user.email = this.editEmail;
    this.goBack();
  }
  cancel(): void {
    this.goBack();
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (!this.user || this.user.email === this.editEmail) {
      return true;
    }
    return this.dialogService.confirm('放弃保存？');
  }
  private goBack(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
