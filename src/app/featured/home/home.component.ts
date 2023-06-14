import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentDetails } from 'src/app/core/models/CommentDetails';
import { UserCommentService } from 'src/app/core/services/api/user-comment.service';
import { UserContentService } from 'src/app/core/services/api/user-content.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Page } from 'src/app/core/models/Page';
import { UserService } from 'src/app/core/services/api/user.service';
import { BasicUserDetails } from 'src/app/core/models/BasicUserDetails';
import { PostDetailsDTO } from 'src/app/core/models/PostDetailsDTO';

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
  totalPages: number[] = [];
  activePage: number = 0;
  perPage: number = 5;

  constructor(private userContentService: UserContentService, private fb: FormBuilder,
    private userCommentService: UserCommentService, private loaderService: LoaderService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.initPosts()
    setTimeout(() => {
      this.loaderService.hide();
    }, 300);
  }

  // public user = {
  //   username: 'keerthu',
  //   email: 'keerthuofficial2001@gmail.com',
  //   password: 'keerthu2001',
  //   created_at: '2022-01-09',
  //   updated_at: '2022-01-09',
  // }

  public currentUser: BasicUserDetails | null = this.userService.getUserDetails();
   
  public posts: PostDetailsDTO[] = [];
  public tags = ['welcome', 'hi', 'hello', 'jion', 'sdfjl']

  yourfeeds(){
    console.log(this.perPage);
    
    this.is_not_global = true
    this.is_global = false
    this.posts = [];
    let localPageInfo: Page = {
      userId: this.currentUser?.userId,
      take: this.perPage,
      page: 1,
    };
    this.userContentService.getUserLocalContent(localPageInfo).subscribe(
      (response: any) => {
        this.totalPages = Array(Math.ceil(response.count / this.perPage)).fill(0).map((x, i) => (i + 1));
        this.activePage = 1;
       response.data.forEach((ud : any) => {
         let userDetails: PostDetailsDTO = {
           id: ud.Id,
           title: ud.title,
           body: ud.body,
           userId: ud.userId,
           isGlobal: false,
           isComment: ud.isComment,
           tag: ud.tag.split(','),
           createdAt: ud.createdAt,
           updatedAt: ud.updatedAt,
         };
         if(userDetails.isComment) {
          let comments: CommentDetails[] = [];
          this.userCommentService.getAllCommentsForPost(ud.Id).subscribe(
            (res: any) => {
              res.forEach((cd: any) => {
                let commentDetails: CommentDetails = {
                  postUserId: cd.postUserId,
                  commentUserId: cd.commentUserId,
                  postId: cd.postId,
                  content: cd.content,
                  createdAt: cd.createdAt,
                  updatedAt: cd.updatedAt,
                };
                comments.push(commentDetails);
              });
              userDetails.comments = comments;
            }
          );
         }
         this.posts.push(userDetails);
       }  
      );
    });
  }
  globalfeeds(){
    this.is_global = true
    this.is_not_global = false
    this.initPosts();
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
        this.loaderService.show();
        this.initPosts();
        setTimeout(() => {
          this.loaderService.hide();
        }, 300);
      }
    );
  }




  getNextPage(): void {
    this.posts = [];
    this.activePage++;
    this.getFeedsByPage(this.activePage);
  }




  getPreviousPage(): void {
    this.posts = [];
    this.activePage--;
    this.getFeedsByPage(this.activePage);
  }


  getFeedsByPage(pageNo: number): void {
    let pageInfo: Page = {
      userId: this.currentUser?.userId,
      take: this.perPage,
      page: pageNo,
    };
    if(this.is_global == true) {
      this.userContentService.getUserGlobalContent(pageInfo).subscribe(
        (response: any) => {
         response.data.forEach((ud : any) => {
           let userDetails: PostDetailsDTO = {
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
            let comments: CommentDetails[] = [];
            this.userCommentService.getAllCommentsForPost(ud.Id).subscribe(
              (res: any) => {
                res.forEach((cd: any) => {
                  let commentDetails: CommentDetails = {
                    postUserId: cd.postUserId,
                    commentUserId: cd.commentUserId,
                    postId: cd.postId,
                    content: cd.content,
                    createdAt: cd.createdAt,
                    updatedAt: cd.updatedAt,
                  };
                  comments.push(commentDetails);
                });
                userDetails.comments = comments;
              }
            );
           }
           this.posts.push(userDetails);
         }  
        );
      });
    }

    else {
      this.userContentService.getUserLocalContent(pageInfo).subscribe(
        (response: any) => {
         response.data.forEach((ud : any) => {
           let userDetails: PostDetailsDTO = {
             id: ud.Id,
             title: ud.title,
             body: ud.body,
             userId: ud.userId,
             isGlobal: false,
             isComment: ud.isComment,
             tag: ud.tag.split(','),
             createdAt: ud.createdAt,
             updatedAt: ud.updatedAt,
           };
           if(userDetails.isComment) {
            let comments: CommentDetails[] = [];
            this.userCommentService.getAllCommentsForPost(ud.Id).subscribe(
              (res: any) => {
                res.forEach((cd: any) => {
                  let commentDetails: CommentDetails = {
                    postUserId: cd.postUserId,
                    commentUserId: cd.commentUserId,
                    postId: cd.postId,
                    content: cd.content,
                    createdAt: cd.createdAt,
                    updatedAt: cd.updatedAt,
                  };
                  comments.push(commentDetails);
                });
                userDetails.comments = comments;
              }
            );
           }
           this.posts.push(userDetails);
         }  
        );
      });
    }
  }




  initPosts(): void {
    this.posts = [];
    let pageInfo: Page = {
        take: this.perPage,
        page: 1,
    };
    this.userContentService.getUserGlobalContent(pageInfo).subscribe(
      (response: any) => {
        this.totalPages = Array(Math.ceil(response.count / 5)).fill(0).map((x, i) => (i + 1));
        this.activePage = 1;
       response.data.forEach((ud : any) => {
         let userDetails: PostDetailsDTO = {
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
          let comments: CommentDetails[] = [];
          this.userCommentService.getAllCommentsForPost(ud.Id).subscribe(
            (res: any) => {
              res.forEach((cd: any) => {
                let commentDetails: CommentDetails = {
                  postUserId: cd.postUserId,
                  commentUserId: cd.commentUserId,
                  postId: cd.postId,
                  content: cd.content,
                  createdAt: cd.createdAt,
                  updatedAt: cd.updatedAt,
                };
                comments.push(commentDetails);
              });
              userDetails.comments = comments;
            }
          );
         }
         this.posts.push(userDetails);
       }  
      );
    });

  }

}
