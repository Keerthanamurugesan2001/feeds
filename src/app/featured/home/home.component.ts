import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentDetails } from 'src/app/core/models/CommentDetails';
import { UserDetailsDTO } from 'src/app/core/models/UserDetailsDTO';
import { UserCommentService } from 'src/app/core/services/api/user-comment.service';
import { UserContentService } from 'src/app/core/services/api/user-content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public borderBottom = "border-bottom"
  public is_global = true
  public is_not_global = false
  public enableReadMore: boolean = false;
  toogleVal: string = 'Read More';
  readMoreIndex: number = -1;
  commentIndex: number = -1;
  commentForm = this.fb.group({
    comment: this.fb.control('', [Validators.required]),
  });

  constructor(private userContentService: UserContentService, private fb: FormBuilder,
    private userCommentService: UserCommentService) {}

  ngOnInit(): void {
    this.initPosts();
  }

  public user = {
    username: 'keerthu',
    email: 'keerthuofficial2001@gmail.com',
    password: 'keerthu2001',
    created_at: '2022-01-09',
    updated_at: '2022-01-09',
  }
   
  public posts: UserDetailsDTO[] = [];
  public tags = ['welcome', 'hi', 'hello', 'jion', 'sdfjl']

  yourfeeds(){
    this.is_not_global = true
    this.is_global = false
  }
  globalfeeds(){
    this.is_global = true
    this.is_not_global = false
  }

  toggleReadMore(i: number): void {
    this.enableReadMore = !this.enableReadMore;
    this.readMoreIndex = i;
    if(this.enableReadMore == true) {
      this.toogleVal = 'Read Less'
    }
    else {
      this.toogleVal = 'Read More'
    }
  }
  tags_search(): void{

  }

  get comment() {
    return this.commentForm.get('comment');
  }


  addComment(i: number): void {
    this.commentIndex = i;
    this.comment?.setValue('');
  }

  toggleComment(): void {
    this.commentIndex = -1;
    this.comment?.setValue('');
  }

  postComment(pid: number, cid: number, postId: number | undefined): void {
    let commentDetails: CommentDetails = {
        postUserId: pid,
        commentUserId: cid,
        postId: postId as number,
        content: this.commentForm.value.comment as string,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    this.userCommentService.postUserComment(commentDetails).subscribe(
      (response) => {
        console.log(response);
        this.commentIndex = -1;
        this.initPosts();
      }
    );
  }

  initPosts(): void {
    this.userContentService.getUserContent().subscribe(
      (response: any) => {
       response.forEach((ud : any) => {
         let userDetails: UserDetailsDTO = {
           id: ud.Id,
           title: ud.title,
           body: ud.body,
           userId: ud.userId,
           isGlobal: ud.isGlobal,
           isComment: ud.isComment,
           tag: ud.tag.split(','),
           createdAt: ud.createdAt,
           updatedAt: ud.updatedAt,
         };
         if(userDetails.isComment) {
          this.userCommentService.getAllCommentsForPost(ud.Id).subscribe(
            (res: CommentDetails[]) => userDetails.comments = res
          );
         }
         this.posts.push(userDetails);
       }
     
   );
       });
  }

}
