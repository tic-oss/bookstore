import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  Books: any = [];
  searchQuery: string = '';

  constructor(private crudApi: CrudService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.crudApi.getBooks().subscribe(res => {
      console.log('response', res);
      this.Books = res;
    });
  }

  filteredBooks(): any[] {
    return this.Books.filter(
      (book: { name: string; author: string }) =>
        book.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Are you sure you want to delete this data')) {
      this.crudApi.deleteBook(id).subscribe(() => {
        this.Books.splice(i, 1);
        this.toastr.success('Data deleted successfully!', 'Success', {
          positionClass: 'toast-bottom-right',
          closeButton: true,
          timeOut: 5000
        });
      });
    }
  }
}
