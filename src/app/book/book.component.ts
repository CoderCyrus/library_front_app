import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

    count: number;

    name: string;

    constructor(private bookService: BookService) { }

    getBooksCount() {
        this.bookService.getBooksCount()
            .subscribe((data: number) => {
                this.count = data;
            });
        }

    getBookName() {
        this.bookService.getBookName()
            .subscribe((data: string) => {
                    this.name = data;
            });
        }

    displayName() {
        this.name = null;
    }

    ngOnInit() {
        this.getBooksCount();
      }
}
