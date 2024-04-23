import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private client: SupabaseClient;

  constructor() { this.client = createClient(environment.supabaseUrl, environment.supabaseKey)}

  getClient(): SupabaseClient {
    return this.client;
  }
}
