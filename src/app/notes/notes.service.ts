import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class NotesService {
  constructor(private http: HttpClient) {}
  loadNotes(): Observable<any> {
    return this.http.get('../../assets/notes/notes.json').pipe(delay(1000));
  }
}
