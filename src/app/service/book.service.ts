import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book.model';
import 'core-js/es/reflect';
@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  booksCountUrl = 'http://localhost:8080/muruo/count';

  bookNameUrl = 'http://localhost:8080/muruo/find/name?id=1';

  bookInfourl = 'http://localhost:8080/muruo/find?id=';

  bookNotBorrowed = 'http://localhost:8080/muruo/notborrowed';



  getBooksCount() {
    return this.http.get(this.booksCountUrl);
  }

  getBookName() {
    return this.http.get(this.bookNameUrl, { responseType:  'text'});
  }

  getBookInfo(id) {
    return this.http.get<Book>(this.bookInfourl + id);
  }

  // return a list of book not borrowed
  getBookNotBorrowed(){
    return this.http.get<[Book]>(this.bookNotBorrowed);
  }

}