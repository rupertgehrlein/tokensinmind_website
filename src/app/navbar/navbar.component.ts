import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  supabase: SupabaseClient;
  isLoggedIn = false;

  constructor(private router: Router, private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) { this.supabase = supabaseService.getClient()}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hier wird das Bootstrap-Menü geschlossen
        this.closeNavbar();
      }
    });

    const { data } = this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {

        //hier wird geschaut ob der Nutzer auch angemeldet ist
        const user = this.supabase.auth.getUser().then(async user => {
          if (user && user.data && user.data.user) {
            this.isLoggedIn = true;
            this.cdr.detectChanges();
          }
        });
        //this.router.navigate(['/dashboard']);
      } else if (event === 'SIGNED_OUT') {

        //Reset der Werte wenn User sich ausloggt
        this.isLoggedIn = false;
        this.cdr.detectChanges();
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }

      //data.subscription.unsubscribe();
    })
  }

  //Funktion für den logout
  logout() {
    this.supabase.auth.signOut().then(() => {
      this.isLoggedIn = false;
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


}
