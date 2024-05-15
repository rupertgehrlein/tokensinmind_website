import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import * as sha256 from 'crypto-js/sha256';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private client: SupabaseClient;

  constructor() { this.client = createClient(environment.supabaseUrl, environment.supabaseKey) }

  getClient(): SupabaseClient {
    return this.client;
  }

  async registerNewUser(username, password) {
    const hashedPassword = sha256(password).toString();

    const { data, error: insertError } = await this.client
      .from('users')
      .insert([{ email: username, password: hashedPassword }])

    if (insertError) {
      console.error('Error inserting new user:', insertError);
    } else {
      console.log('New user inserted:', data);
    }
  }

  async passwordSignIn(username, hashedPassword) {
    const { data, error } = await this.client.auth.signInWithPassword({
      email: `${username}`,
      password: `${hashedPassword}`
    })
  }

}
