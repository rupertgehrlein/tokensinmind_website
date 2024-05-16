import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-home.component.html',
  styleUrl: './login-home.component.scss'
})
export class LoginHomeComponent {
  supabase: SupabaseClient;

  passwordVisible = false;

  signInForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private router: Router, private supabaseService: SupabaseService, private readonly formBuilder: FormBuilder) {
    this.supabase = supabaseService.getClient();
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

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
          const {data: loginData, error: loginError} = await this.supabase.auth.signInWithPassword({
            email,
            password
          });

          console.log('loginError:', loginError);
          if(loginError && loginError.message.includes('Invalid login credentials')){
            alert('Dieser Nutzername ist bereits registriert. Wenn du der Nutzer bist, dann gib bitte das korrekte Passwort ein.');
            return;
          }
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
