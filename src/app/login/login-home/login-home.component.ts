import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/services/supabase.service';

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

  constructor(private supabaseService: SupabaseService, private readonly formBuilder: FormBuilder) {
    this.supabase = supabaseService.getClient();
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async signUp() {
    try {
      const email = this.signInForm.value.username + '@fake.com';
      const password = this.signInForm.value.password;

      console.log(this.signInForm.value.username)
      console.log(this.signInForm.value.password)

      console.log(email, password);

      const { data, error } = await this.supabase.auth.signUp({
        email: `${email}`,
        password: `${password}`
      })

      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();

    }
  }

}
