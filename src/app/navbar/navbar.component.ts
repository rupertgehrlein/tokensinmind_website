// navbar.component.ts
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  supabase: SupabaseClient;
  isLoggedIn: boolean;
  currentCoins: number;
  private coinsSubscription: Subscription;
  private loggedInSubscription: Subscription;

  constructor(private router: Router, private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {
    this.supabase = supabaseService.getClient();
  }

  async ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Close the Bootstrap menu
        this.closeNavbar();
      }
    });

    this.loggedInSubscription = this.supabaseService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.cdr.detectChanges();
    });

    this.coinsSubscription = this.supabaseService.coins$.subscribe(coins => {
      this.currentCoins = coins;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.supabase.auth.signOut().then(() => {
      this.router.navigate(['']);
      this.cdr.detectChanges();
      this.closeNavbar();
      location.reload();
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

  ngOnDestroy() {
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
    if (this.coinsSubscription) {
      this.coinsSubscription.unsubscribe();
    }
  }
}
