import { Injectable } from '@angular/core';
import {COMMENTS} from '../data/data';

@Injectable()
export class FirstCommentService {
  constructor() { }
  getComments() {
    return COMMENTS[0];
  }
}
