import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-home.component.html',
  styleUrl: './login-home.component.scss'
})
export class LoginHomeComponent {
  supabase: SupabaseClient;

  passwordVisible = false;

  signInForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private router: Router, private supabaseService: SupabaseService, private readonly formBuilder: FormBuilder) {
    this.supabase = supabaseService.getClient();
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  /* async signUp() {

    const username = this.signInForm.value.username;
    const email = username + '@fake.com';
    const password = this.signInForm.value.password;

    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.error(error);
      return
    }

    await this.supabase
      .from("usernames")
      .insert([{ username, userid: data.user.id }]);

    this.signInForm.reset();
    this.router.navigate(['/']);
  }

  async login() {
    const username = this.signInForm.value.username + '@fake.com';
    const password = this.signInForm.value.password;

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: username,
      password: password
    })

    this.signInForm.reset();
    this.router.navigate(['/']);
  } */

  async signUpOrLogin() {
    const username = this.signInForm.value.username;
    const email = username + '@fake.com';
    const password = this.signInForm.value.password;

    try {
      // Versuche, den Benutzer zu registrieren
      const { data: signUpData, error: signUpError } = await this.supabase.auth.signUp({
        email,
        password
      });

      console.log('signUpErrorMessage: ', signUpError.message);

      if (signUpError && signUpError.message.includes('already registered')) {
        // Wenn der Benutzer bereits existiert, versuche ihn anzumelden
        try {
          await this.supabase.auth.signInWithPassword({
            email,
            password
          });
        } catch (loginError) {
          // Wenn die Anmeldung fehlschlägt, zeige einen entsprechenden Alert
          console.error("Fehler bei der Anmeldung:", loginError);
          alert('Benutzername oder Passwort falsch.');
          return;
        }
      } else {
        // Wenn die Registrierung erfolgreich ist, füge den Benutzer in die Tabelle "usernames" ein
        await this.supabase
          .from("usernames")
          .insert([{ username, userid: signUpData.user.id }]);
      }

      // Zurücksetzen des Anmeldeformulars und Weiterleitung zum Startbildschirm
      this.signInForm.reset();
      this.router.navigate(['/']);
    } catch (error) {
      // Zeige einen Alert, wenn ein unbekannter Fehler auftritt
      console.error("Unbekannter Fehler:", error);
      alert('Ein unbekannter Fehler ist aufgetreten.');
    }
  }

}
