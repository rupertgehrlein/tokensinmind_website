import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/services/supabase.service';
import * as sha256 from 'crypto-js/sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-home.component.html',
  styleUrl: './login-home.component.scss'
})
export class LoginHomeComponent {
  supabase: SupabaseClient

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

  async signUp() {
    try {
      const username = this.signInForm.value.username + '@fake.com';
      const password = this.signInForm.value.password;

      const { data, error } = await this.supabase.auth.signUp({
        email: `${username}`,
        password: `${password}`
      });

      await this.supabaseService.registerNewUser(username, password);

      if (error) throw error;

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();

    }
  }

  async login() {
    const username = this.signInForm.value.username + '@fake.com';
    const password = this.signInForm.value.password;
    const hashedPassword = sha256(password).toString();

    console.log('Username: ', username, ' Passwordhash: ', hashedPassword);

    await this.supabaseService.passwordSignIn(username, hashedPassword);


    this.signInForm.reset();
    this.router.navigate[''];
  }

}
