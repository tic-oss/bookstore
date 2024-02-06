import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private eventService: EventService,
    private toastr: ToastrService
  ) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
    if (this.eventForm.valid) {
      this.eventService.addEvent(this.eventForm.value).subscribe(
        () => {
          console.log('Event added successfully');
          this.toastr.success('Event added successfully!', 'Success', {
            positionClass: 'toast-bottom-right',
            closeButton: true,
            timeOut: 5000
          });
          this.ngZone.run(() => this.router.navigateByUrl('/event-list'));
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.toastr.error('Please fill in all the required fields.', 'Error');
    }
  }
}
