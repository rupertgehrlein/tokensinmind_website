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

  //klappt alles hier noch nicht so recht
  listenForNewUser() {
    return this.client.auth.onAuthStateChange(async (event, session) => {
       if (event === 'SIGNED_IN' && session) {
         const { user } = session;
         if (user) {
           // Extract the username from the user's email
           const username = user.email;

           // Check if the user already exists in the 'users' table
           const { data: existingUser, error } = await this.client
             .from('users')
             .select('username')
             .eq('username', username)
             .maybeSingle();

           if (error) {
             console.error('Error checking for existing user:', error);
           } else if (!existingUser) {
             // If the user does not exist, insert them into the 'users' table
             const { data, error: insertError } = await this.client
               .from('users')
               .insert([
                 { username: username }
               ]);

               console.log(data);

             if (insertError) {
               console.error('Error inserting new user:', insertError);
             } else {
               console.log('New user inserted:', data);
             }
           }
         }
       }
    });
  }
}
