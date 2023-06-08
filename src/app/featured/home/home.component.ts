import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // public user_detail: ;
  public borderBottom = "border-bottom"
  public is_global = true
  public is_not_global = false
  // constructor(u: UserService){
  //   user_detail = this.user
  // }
  public user = {
    username: 'keerthu',
    email: 'keerthuofficial2001@gmail.com',
    password: 'keerthu2001',
    created_at: '2022-01-09',
    updated_at: '2022-01-09',
  }
  public posts = [{
    id: 23,
    title: 'title',
    body: 'The Journal of Living Together is a peer-reviewed academic journal that publishes a collection of articles that reflect various aspects of peace and conflict studies. The contributions from across the disciplines and grounded by relevant philosophical traditions and theoretical and methodological approaches systematically broach topics dealing with tribal, ethnic, racial, cultural, religious and sectarian conflicts, as well as alternative dispute resolution and peacebuilding processes. Through this journal it is our intention to inform, inspire, reveal and explore the intricate and complex nature of human interaction in the context of ethno-religious identity and the roles it plays in war and peace. By sharing theories, methods, practices, observations and valuable experiences we mean to open a broader, more inclusive dialogue between policymakers, academics, researchers, religious leaders, representatives of ethnic groups and indigenous peoples, as well as field practitioners around the world.',
    user_id: 23,
    is_global: true,
    tag: ['heello', 'hi'],
    created_at: '2022-01-09',
    updated_at: '2022-01-09'
  },
  {
    id: 23,
    title: 'title',
    body: 'bThe Journal of Living Together is a peer-reviewed academic journal that publishes a collection of articles that reflect various aspects of peace and conflict studies. The contributions from across the disciplines and grounded by relevant philosophical traditions and theoretical and methodological approaches systematically broach topics dealing with tribal, ethnic, racial, cultural, religious and sectarian conflicts, as well as alternative dispute resolution and peacebuilding processes. Through this journal it is our intention to inform, inspire, reveal and explore the intricate and complex nature of human interaction in the context of ethno-religious identity and the roles it plays in war and peace. By sharing theories, methods, practices, observations and valuable experiences we mean to open a broader, more inclusive dialogue between policymakers, academics, researchers, religious leaders, representatives of ethnic groups and indigenous peoples, as well as field practitioners around the world.ody',
    user_id: 23,
    is_global: true,
    tag: ['heello', 'hi'],
    created_at: '2022-01-09',
    updated_at: '2022-01-09'
  },
  {
    id: 23,
    title: 'title',
    body: 'The Journal of Living Together is a peer-reviewed academic journal that publishes a collection of articles that reflect various aspects of peace and conflict studies. The contributions from across the disciplines and grounded by relevant philosophical traditions and theoretical and methodological approaches systematically broach topics dealing with tribal, ethnic, racial, cultural, religious and sectarian conflicts, as well as alternative dispute resolution and peacebuilding processes. Through this journal it is our intention to inform, inspire, reveal and explore the intricate and complex nature of human interaction in the context of ethno-religious identity and the roles it plays in war and peace. By sharing theories, methods, practices, observations and valuable experiences we mean to open a broader, more inclusive dialogue between policymakers, academics, researchers, religious leaders, representatives of ethnic groups and indigenous peoples, as well as field practitioners around the world.',
    user_id: 23,
    is_global: false,
    tag: ['heello', 'hi'],
    created_at: '2022-01-09',
    updated_at: '2022-01-09'
  }]

  public tags = ['welcome', 'hi', 'hello', 'jion', 'sdfjl']

  yourfeeds(){
    this.is_not_global = true
    this.is_global = false
  }
  globalfeeds(){
    this.is_global = true
    this.is_not_global = false
  }
}
