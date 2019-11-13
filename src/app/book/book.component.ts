import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../service/book.service';
import { Book } from '../model/book.model'

@Component({
    selector: 'book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})


export class BookComponent implements OnInit {

    @Input() id: number;

    count: number;

    name: string;

    book: Book;

    books : Book[];

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

    getBookInfo(id) {
        this.bookService.getBookInfo(id)
            .subscribe((data: Book) => {
                this.book = data;
            });
    }

    getBookNotBorrowed() {
        this.bookService.getBookNotBorrowed()
            .subscribe((data: Book[]) => {
                this.books = data;
            });
    }

    onKey(event: any) {
        this.id = event.target.value;
        this.getBookInfo(this.id);
    }

    ngOnInit() {
        this.getBooksCount();
        this.getBookNotBorrowed();
    }
}
