import { Component } from '@angular/core';
import { BookService } from './book.service';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

    count: number;

    constructor(private bookService: BookService) { }

    getBooksCount() {
        this.bookService.getBooksCount()
            .subscribe((data: number) => {
                this.count = data;
            });
        }

    ngOnInit() {
        this.getBooksCount();
      }
}
