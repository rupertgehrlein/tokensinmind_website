// navbar.component.ts
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { IsLoggedInService } from '../shared/is-logged-in.service';
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
  userid: string;
  private coinsSubscription: Subscription;

  constructor(private router: Router, private supabaseService: SupabaseService, private cdr: ChangeDetectorRef, private authService: IsLoggedInService) {
    this.supabase = supabaseService.getClient();
  }

  async ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Close the Bootstrap menu
        this.closeNavbar();
      }
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.supabase.auth.getUser().then(user => {
          if (user && user.data && user.data.user) {
            this.isLoggedIn = true;
            this.authService.setLoggedIn(true);
            this.cdr.detectChanges();
          }
        });
      } else if (event === 'SIGNED_OUT') {
        this.isLoggedIn = false;
        this.authService.setLoggedIn(false);
        this.cdr.detectChanges();
      }
    });

    this.userid = await this.supabaseService.getUserId();

    this.coinsSubscription = this.supabaseService.coins$.subscribe(coins => {
      this.currentCoins = coins;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.supabase.auth.signOut().then(() => {
      this.isLoggedIn = false;
      this.authService.setLoggedIn(false);
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
    if (this.coinsSubscription) {
      this.coinsSubscription.unsubscribe();
    }
  }
}
