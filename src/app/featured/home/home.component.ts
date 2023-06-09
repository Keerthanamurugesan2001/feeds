import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { UserDetails } from 'src/app/core/models/UserDetails';
import { UserDetailsDTO } from 'src/app/core/models/UserDetailsDTO';
import { UserContentService } from 'src/app/core/services/api/user-content.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public borderBottom = "border-bottom"
  public is_global = true
  public is_not_global = false
  // public contents: UserDetails[] = [];
  public enableReadMore: boolean = false;
  toogleVal: string = 'Read More';
  readMoreIndex: number = -1;


  constructor(private userContentService: UserContentService) {}


  ngOnInit(): void {
    this.userContentService.getUserContent().subscribe(
      (response: any) => {
       response.forEach((ud : any) => {
        
         //console.log(JSON.parse("[" + ud.tag + "]"));
         console.log(ud.tag.split(','));
         
         
         console.log(ud);
         let userDetails: UserDetailsDTO = {
           id: ud.Id,
           title: ud.title,
           body: ud.body,
           userId: ud.userId,
           isGlobal: ud.isGlobal,
           tag: ud.tag.split(','),
           createdAt: ud.createdAt,
           updatedAt: ud.updatedAt,
         };
         // userDetails.id = response[i].id;
         // userDetails.title = response[i].title;
         this.posts.push(userDetails);
       }
     
   );
       });
  }

  public user = {
    username: 'keerthu',
    email: 'keerthuofficial2001@gmail.com',
    password: 'keerthu2001',
    created_at: '2022-01-09',
    updated_at: '2022-01-09',
  }
   public posts: UserDetailsDTO[] = [];//{
  //   id: 23,
  //   title: 'title',
  //   body: 'The Journal of Living Together is a peer-reviewed academic journal that publishes a collection of articles that reflect various aspects of peace and conflict studies. The contributions from across the disciplines and grounded by relevant philosophical traditions and theoretical and methodological approaches systematically broach topics dealing with tribal, ethnic, racial, cultural, religious and sectarian conflicts, as well as alternative dispute resolution and peacebuilding processes. Through this journal it is our intention to inform, inspire, reveal and explore the intricate and complex nature of human interaction in the context of ethno-religious identity and the roles it plays in war and peace. By sharing theories, methods, practices, observations and valuable experiences we mean to open a broader, more inclusive dialogue between policymakers, academics, researchers, religious leaders, representatives of ethnic groups and indigenous peoples, as well as field practitioners around the world.',
  //   user_id: 23,
  //   is_global: true,
  //   tag: ['heello', 'hi'],
  //   created_at: '2022-01-09',
  //   updated_at: '2022-01-09'
  // },
  // {
  //   id: 23,
  //   title: 'title',
  //   body: 'bThe Journal of Living Together is a peer-reviewed academic journal that publishes a collection of articles that reflect various aspects of peace and conflict studies. The contributions from across the disciplines and grounded by relevant philosophical traditions and theoretical and methodological approaches systematically broach topics dealing with tribal, ethnic, racial, cultural, religious and sectarian conflicts, as well as alternative dispute resolution and peacebuilding processes. Through this journal it is our intention to inform, inspire, reveal and explore the intricate and complex nature of human interaction in the context of ethno-religious identity and the roles it plays in war and peace. By sharing theories, methods, practices, observations and valuable experiences we mean to open a broader, more inclusive dialogue between policymakers, academics, researchers, religious leaders, representatives of ethnic groups and indigenous peoples, as well as field practitioners around the world.ody',
  //   user_id: 23,
  //   is_global: true,
  //   tag: ['heello', 'hi'],
  //   created_at: '2022-01-09',
  //   updated_at: '2022-01-09'
  // },
  // {
  //   id: 23,
  //   title: 'title',
  //   body: 'The Journal of Living Together is a peer-reviewed academic journal that publishes a collection of articles that reflect various aspects of peace and conflict studies. The contributions from across the disciplines and grounded by relevant philosophical traditions and theoretical and methodological approaches systematically broach topics dealing with tribal, ethnic, racial, cultural, religious and sectarian conflicts, as well as alternative dispute resolution and peacebuilding processes. Through this journal it is our intention to inform, inspire, reveal and explore the intricate and complex nature of human interaction in the context of ethno-religious identity and the roles it plays in war and peace. By sharing theories, methods, practices, observations and valuable experiences we mean to open a broader, more inclusive dialogue between policymakers, academics, researchers, religious leaders, representatives of ethnic groups and indigenous peoples, as well as field practitioners around the world.',
  //   user_id: 23,
  //   is_global: false,
  //   tag: ['heello', 'hi'],
  //   created_at: '2022-01-09',
  //   updated_at: '2022-01-09'
  // }

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
}
