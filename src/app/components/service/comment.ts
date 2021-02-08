import { InjectionToken } from "@angular/core";
// 定义接口
export interface CommentT {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
// 导出 括号里面的参数是该令牌的一个描述，可选
export const CommentType = new InjectionToken<CommentT>('comment type');
