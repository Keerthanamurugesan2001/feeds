import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateInterface } from '../../models/translator';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(private http: HttpClient) { }

  translateText(data: TranslateInterface): Observable<TranslateInterface>{
    return this.http.post<TranslateInterface>('post/translate', data)
  }
}
