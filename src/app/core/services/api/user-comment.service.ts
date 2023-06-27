import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDetails } from '../../models/CommentDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCommentService {

  constructor(private http: HttpClient) {}

  postUserComment(commentDetails: CommentDetails): Observable<CommentDetails> {
    return this.http.post<CommentDetails>('comment/insert', commentDetails);
  }

  getAllCommentsForPost(postId: number): Observable<CommentDetails[]> {
    return this.http.get<CommentDetails[]>('comment/get?id=' + postId);
  }

}
