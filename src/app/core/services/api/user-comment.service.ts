import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDetails } from '../../models/CommentDetails';
import { Observable } from 'rxjs';

const baseURL: string = 'http://localhost:3000/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class UserCommentService {

  constructor(private http: HttpClient) {}

  postUserComment(commentDetails: CommentDetails): Observable<CommentDetails> {
    return this.http.post<CommentDetails>(baseURL + 'comment/insert', commentDetails);
  }

  getAllCommentsForPost(postId: number): Observable<CommentDetails[]> {
    return this.http.get<CommentDetails[]>(baseURL + 'comment/get?id=' + postId);
  }

}
