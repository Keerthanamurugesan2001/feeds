import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newfeed',
  templateUrl: './newfeed.component.html',
  styleUrls: ['./newfeed.component.scss']
})
export class NewfeedComponent {

  constructor(private fb: FormBuilder) {}



  form = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    content: this.fb.control('', [Validators.required]),
    tags: this.fb.control(''),
  });

  chips: string[] = [];



  get title() {
    return this.form.get('title');
  }

  get content() {
    return this.form.get('content');
  }

  get tags() {
    return this.form.get('tags');
  }

  addChip(): void {
    let s: string | undefined | null = this.form.value.tags;
    if(s != null || typeof s != 'undefined') {
      let str = s as string;
      if(str.length != 0) {
        this.chips.push(str);
        this.form.get('tags')?.setValue('');
      }
    }
  }

  display(): void {
    console.warn(this.form);
    console.log(this.title);
  }

}
