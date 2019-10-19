import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  booksCountUrl = 'http://localhost:8080/muruo/count';

  bookUrl = 'http:/localhost:8080muruo/find?id=';

  getBooksCount() {
    return this.http.get(this.booksCountUrl);
  }

}