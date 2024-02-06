import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';

const bookRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'books-list',
    component: BooksListComponent
  },
  {
    path: 'add-book',
    component: AddBookComponent
  },
  {
    path: 'edit-book/:id',
    component: BookDetailComponent
  }
];

const eventRoutes: Routes = [
  {
    path: '',
    redirectTo: 'add-event',
    pathMatch: 'full'
  },
  {
    path: 'event-list',
    component: EventListComponent
  },
  {
    path: 'add-event',
    component: AddEventComponent
  },
  {
    path: 'edit-event/:id',
    component: EventDetailComponent
  }
];

const routes: Routes = [...bookRoutes, ...eventRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
