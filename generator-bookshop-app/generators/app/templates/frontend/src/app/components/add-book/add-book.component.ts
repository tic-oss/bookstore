import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private toastr: ToastrService
  ) {
    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
    if (this.bookForm.valid) {
      this.crudService.AddBook(this.bookForm.value).subscribe(
        () => {
          console.log('Data added successfully');
          this.toastr.success('Data added successfully!', 'Success', {
            positionClass: 'toast-bottom-right',
            closeButton: true,
            timeOut: 10000
          });

          this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.toastr.error('Please fill in all the required fields.', 'Error', {
        positionClass: 'toast-bottom-right',
        closeButton: true,
        timeOut: 5000
      });
    }
  }
}
