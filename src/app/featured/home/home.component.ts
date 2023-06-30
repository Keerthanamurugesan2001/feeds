import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentDetails } from 'src/app/core/models/CommentDetails';
import { UserCommentService } from 'src/app/core/services/api/user-comment.service';
import { UserContentService } from 'src/app/core/services/api/user-content.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Page } from 'src/app/core/models/Page';
import { UserService } from 'src/app/core/services/api/user.service';
import { BasicUserDetails } from 'src/app/core/models/BasicUserDetails';
import { PostDetailsDTO } from 'src/app/core/models/PostDetailsDTO';
import { Subject } from 'rxjs/internal/Subject';
import { ThemeServiceService } from 'src/app/core/services/theme/theme-service.service';
import { TranslatorService } from 'src/app/core/services/api/translator.service';
import { TranslateInterface } from 'src/app/core/models/translator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: Subject<boolean> = this.loaderService.loader;
  isNotLoading: Subject<boolean> = this.loaderService.not_loader;
  public borderBottom = "border-bottom"
  public is_global = true
  public currentUser: BasicUserDetails | null = this.userService.getUserDetails();
  public posts: PostDetailsDTO[] = [];
  public tags = ['welcome', 'hi', 'hello', 'jion', 'sdfjl']
  public enableReadMore: boolean = false;
  public fontColor!: string;
  public backgroundColor: string = '#4CAF50';
  public buttonBGColor: string = '#000000';
  public buttonColor: string = '#FFFFFF';
  toogleVal: string = 'Read More';
  commentIndex: number = -1;
  commentForm = this.fb.group({
    comment: this.fb.control('', [Validators.required]),
  });
  activePage: number = 1;
  perPage: number = 5;
  commentDisplayIndices: Set<number> = new Set<number>();
  readMoreIndices: Set<number> = new Set<number>();
  totalCount: number = -1;
  isLast: boolean = false;
  selectedCustomizeButton!: string;
  is_not_global: any;

  constructor(private userContentService: UserContentService, private fb: FormBuilder,
    private userCommentService: UserCommentService, private loaderService: LoaderService,
    private userService: UserService, private themeService: ThemeServiceService,
    private translateService: TranslatorService) {}

    @ViewChild('pBody') postBody!: ElementRef;

  ngOnInit(): void {
    this.selectedCustomizeButton = 'medium';
    this.loaderService.show();
    this.initPosts(false);
    setTimeout(() => {
      this.loaderService.hide();
    }, 500);

    this.themeService.selectedColor$.subscribe((value: string) => {
      this.getColor(value);
    });
  }
  
  yourfeeds(): void{
    this.loaderService.show();
    this.is_global = false
    this.isLast = false;
    this.posts = [];
    this.totalCount = -1;
    this.activePage = 1;
    this.initPosts(false);
  }

  globalfeeds() {
    this.is_global = true
    this.isLast = false;
    this.posts = [];
    this.totalCount = -1;
    this.activePage = 1;
    this.initPosts(false);
  }

  showMoreContent(i: number): void {
    this.readMoreIndices.add(i);
  }

  showLessContent(i: number): void {
    this.readMoreIndices.delete(i);
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

  postComment(pid: number, postId: number | undefined, i: number): void {
    let commentDetails: CommentDetails = {
        postUserId: pid,
        commentUserId: this.currentUser?.userId as number,
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
        if(this.is_global) this.initPosts(true);
        else this.yourfeeds();
        this.commentDisplayIndices.add(i);
        setTimeout(() => {
          this.loaderService.hide();
        }, 500);
      }
    );
  }

  showComments(i: number): void {
    this.commentDisplayIndices.add(i);
  }

  hideComments(i: number): void {
    this.commentDisplayIndices.delete(i);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if(this.bottomReached()) {
      this.activePage++;
      this.initPosts(false);
    }
    return;
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  initPosts(isPostComment: boolean): void {
    if(this.posts.length == this.totalCount) {
      this.isLast = true;
      return;
    }if(isPostComment) this.posts = [];
    this.loaderService.show();
    let pageInfo: Page = {
        userId: this.currentUser?.userId, 
        take: this.perPage,
        page: this.activePage,
    };
    if(this.is_global) {
      this.userContentService.getUserGlobalContent(pageInfo).subscribe(
        (response: any) => {
          this.totalCount = response.count;
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
          this.totalCount = response.count;
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
    setTimeout(() => {
      this.loaderService.hide();
    }, 500);
  }

  public customizeOnClick(value: string): void {
    this.selectedCustomizeButton = value;
  }

  public getClassForFeeds(){
    if (this.selectedCustomizeButton === 'small'){
      return 'small-feeds'
    }
    else if (this.selectedCustomizeButton === 'medium'){
      return 'medium-feeds'
    }
    else if (this.selectedCustomizeButton === 'large'){
      return 'large-feeds'
    }
    return 'medium-feeds'
  }

  private getColor(value: any){
    console.log('hey', value)
    if (value === 'red'){
      this.backgroundColor = 'rgb(162 10 10)';
      this.fontColor = 'white';
    }
    else if (value === 'green'){
      this.backgroundColor = '#4CAF50';
      this.fontColor = 'white';
    }
    else if (value === 'yellow'){
      this.backgroundColor = '#bcbc15';
      this.fontColor = 'white';
    }
    else if (value === 'black'){
      console.log(this.buttonBGColor, this.buttonColor)
      this.backgroundColor = 'black';
      this.fontColor = 'white';
      // this.buttonBGColor = '#FFFFFF';
      // this.buttonColor = '#000000';
    }
  }

  public getStyle(){
    // this.getColor()
    return {
      'background-color': this.backgroundColor,
      'color': this.fontColor
    }
  }
  async translate_text(post: PostDetailsDTO){

      let translate_content: TranslateInterface = {
        title: post.title,
        body: post.body,
        lang: 'ta'
      }
      this.translateService.translateText(translate_content).subscribe((res) => {
        post.title = res.title? res.title: post.title,
        post.body = res.body? res.body: post.body
      });
    }
}

