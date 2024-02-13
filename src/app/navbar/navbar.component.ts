import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hier wird das Bootstrap-Menü geschlossen
        this.closeNavbar();
      }
    });
  }

  closeNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarNav) {
      navbarToggler.setAttribute('aria-expanded', 'false');
      navbarNav.classList.remove('show');
    }
  }


}
