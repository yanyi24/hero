import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UsersComponent} from './users.component';
import {UserComponent} from './user.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './user.service';


@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  providers: [UserService]
})
export class UserModule { }
