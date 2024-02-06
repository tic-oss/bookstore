import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eventId: any;
  updateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private toastr: ToastrService
  ) {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      dateTime: ['', [Validators.required]]
    });

    this.eventService.getEvent(this.eventId).subscribe(res => {
      const dateTimeString = new Date(res['dateTime'])
        .toISOString()
        .slice(0, -1);
      this.updateForm.setValue({
        name: res['name'],
        dateTime: dateTimeString
      });
    });
  }

  ngOnInit(): void {}

  onUpdate(): void {
    if (this.updateForm.valid) {
      const updatedEvent = this.updateForm.value;
      updatedEvent.dateTime = new Date(updatedEvent.dateTime + 'Z');

      this.eventService.updateEvent(this.eventId, updatedEvent).subscribe(
        res => {
          console.log('updated');
          this.toastr.success('Data updated successfully!', 'Success', {
            positionClass: 'toast-bottom-right',
            closeButton: true,
            timeOut: 5000
          });
          this.ngZone.run(() => {
            this.router.navigateByUrl('/event-list');
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
