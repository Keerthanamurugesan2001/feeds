import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/core/models/UserDetails';
import { UserContentService } from 'src/app/core/services/api/user-content.service';

@Component({
  selector: 'app-newfeed',
  templateUrl: './newfeed.component.html',
  styleUrls: ['./newfeed.component.scss']
})
export class NewfeedComponent {

  constructor(private fb: FormBuilder, private userContentService: UserContentService,
    private router: Router) {}

  form = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    contentType: this.fb.control('', [Validators.required]),
    content: this.fb.control('', [Validators.required]),
    tags: this.fb.control(''),
    feedPriority: this.fb.control('', [Validators.required]),
    commentPriority: this.fb.control('', [Validators.required]),
  });

  chips: string[] = [];

  get title() {
    return this.form.get('title');
  }

  get contentType() {
    return this.form.get('contentType');
  }

  get content() {
    return this.form.get('content');
  }

  get tags() {
    return this.form.get('tags');
  }

  get feedPriority() {
    return this.form.get('feedPriority');
  }

  get commentPriority() {
    return this.form.get('commentPriority');
  }

  addChip(): void {
    let s: string | undefined | null = this.form.value.tags;
    if(s != null || typeof s != 'undefined') {
      let str = s as string;
      if(str.length != 0) {
        this.chips.push(str);
        this.tags?.setValue('');
      }
    }
  }

  deleteChip(i: number): void {
    this.chips.splice(i, 1);
  }

  postUserContent(): void {
    let userDetails: UserDetails = {
      userId: 1,
      body: this.form.value.content as string,
      title: this.form.value.title as string,
      tag: this.chips.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isGlobal: (this.form.value.feedPriority === 'global') ? true : false,
      isComment: (this.form.value.commentPriority === 'yes') ? true : false,
    };
    this.userContentService.postUserContent(userDetails).subscribe(
      (response) => this.router.navigate(['/home'])
    );
  }

}
