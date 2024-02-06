import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  getId: any;
  updateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudApi: CrudService,
    private toastr: ToastrService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.crudApi.getBook(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        author: res['author']
      });
    });
  }

  ngOnInit(): void {}

  onUpdate(): void {
    if (this.updateForm.valid) {
      this.crudApi.updateBook(this.getId, this.updateForm.value).subscribe(
        res => {
          console.log('updated');
          this.toastr.success('Data updated successfully!', 'Success', {
            positionClass: 'toast-bottom-right',
            closeButton: true,
            timeOut: 5000
          });

          this.ngZone.run(() => {
            this.router.navigateByUrl('/books-list');
          });
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.showAlert();
    }
  }

  showAlert(): void {
    this.toastr.error('Please fill in all the required fields.', 'Error', {
      positionClass: 'toast-bottom-right',
      closeButton: true,
      timeOut: 5000
    });
  }
}
