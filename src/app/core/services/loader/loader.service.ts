import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader: Subject<boolean> = new Subject<boolean>();
  not_loader: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  show() {
    this.loader.next(true);
    this.not_loader.next(false);
  }

  hide() {
    this.loader.next(false);
    this.not_loader.next(true);
  }

}
