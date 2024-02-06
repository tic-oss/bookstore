import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { ToastrService } from 'ngx-toastr';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  upcomingEvents: any[] = [];
  recentEvents: any[] = [];
  notificationShownMap: { [key: string]: boolean } = {};

  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.checkUpcomingEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(res => {
      const now = new Date();
      res.sort(
        (a: any, b: any) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );

      this.upcomingEvents = res.filter(
        (event: any) => new Date(event.dateTime) > now
      );

      const newRecentEvents = res.filter(
        (event: any) => new Date(event.dateTime) <= now
      );

      if (newRecentEvents.length > 0) {
        this.recentEvents = [...newRecentEvents, ...this.recentEvents].sort(
          (a: any, b: any) =>
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
        );
      }
    });
  }

  checkUpcomingEvents() {
    interval(1000)
      .pipe(takeWhile(() => !this.allEventsStarted()))
      .subscribe(() => {
        const now = new Date();
        const updatedUpcomingEvents: any[] = [];
        const updatedRecentEvents: any[] = [];

        for (const event of this.upcomingEvents) {
          const eventTime = new Date(event.dateTime);

          if (eventTime <= now) {
            this.showNotification(
              `Event "${event.name}" has been Started`,
              'Event Started'
            );
            updatedRecentEvents.push(event);
          } else {
            updatedUpcomingEvents.push(event);

            const timeDifference =
              (eventTime.getTime() - now.getTime()) / (1000 * 60);

            if (timeDifference <= 10 && !this.notificationShownMap[event._id]) {
              this.showNotification(
                `Event "${event.name}" is starting in 10 minutes!`,
                'Event Reminder'
              );
              this.notificationShownMap[event._id] = true;
            }
          }
        }

        this.upcomingEvents = updatedUpcomingEvents;
        if (updatedRecentEvents.length > 0) {
          this.recentEvents = [
            ...updatedRecentEvents,
            ...this.recentEvents
          ].sort(
            (a: any, b: any) =>
              new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
          );
        }
      });
  }

  private allEventsStarted(): boolean {
    const now = new Date();
    return this.upcomingEvents.every(event => new Date(event.dateTime) <= now);
  }

  showNotification(message: string, title: string) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body: message });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        }
      });
    }
  }

  delete(id: any) {
    if (window.confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        const index = this.upcomingEvents.findIndex(
          (event: any) => event._id === id
        );

        if (index !== -1) {
          this.upcomingEvents.splice(index, 1);
        }

        const indexRecent = this.recentEvents.findIndex(
          (event: any) => event._id === id
        );
        if (indexRecent !== -1) {
          this.recentEvents.splice(indexRecent, 1);
        }

        this.toastr.success('Event deleted successfully!', 'Success', {
          positionClass: 'toast-bottom-right',
          closeButton: true,
          timeOut: 10000
        });
      });
    }
  }
}
