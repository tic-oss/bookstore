import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from 'src/app/service/environment.local';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isNavbarCollapsed = true;
  isSwaggerDropdownOpen: boolean = false;

  openSwaggerDropdown() {
    this.isSwaggerDropdownOpen = !this.isSwaggerDropdownOpen;
  }

  closeSwaggerDropdown() {
    this.isSwaggerDropdownOpen = false;
  }

  isAuthenticated: boolean = false;
  private isAuthenticatedSubscription!: Subscription;

  constructor(
    private router: Router,
    public oidcSecurityService: OidcSecurityService
  ) {
    this.isAuthenticated = true; // Initialize as false initially
  }

  ngOnInit(): void {
    this.isAuthenticatedSubscription = this.oidcSecurityService.isAuthenticated$.subscribe(
      {
        next: result => {
          this.isAuthenticated = result.isAuthenticated;
        }
      }
    );
    window.addEventListener('scroll', this.onScroll);
  }

  openDocs(): void {
    window.open(environment.bookDetails, '_blank');
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  public activeLink = '';
  public scrolled = false;
  public isSubMenuOpen = false;
  public isloggedIn = false;

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription.unsubscribe();
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    this.scrolled = window.scrollY > 50;
  };

  updateActiveLink(link: string): void {
    this.activeLink = link;
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe(result => console.log(result));
    window.location.href = environment.projectUrl;
  }
}
