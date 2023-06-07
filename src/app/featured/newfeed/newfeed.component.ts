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
    tit: this.fb.control('', [Validators.required]),
    content: this.fb.control('', [Validators.required]),
  });

  get title() {
    return this.form.get('tit');
  }

  get cont() {
    return this.form.get('content');
  }

  display(): void {
    console.warn(this.form);
    console.log(this.title);
  }

}
