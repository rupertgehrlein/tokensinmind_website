import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private client: SupabaseClient;

  constructor() { this.client = createClient(environment.supabaseUrl, environment.supabaseKey) }

  getClient(): SupabaseClient {
    return this.client;
  }

  async getUsername() {
    // Benutzer-Session abrufen
    const { data: user, error: sessionError } = await this.client.auth.getSession();

    if (sessionError) {
      console.error(sessionError);
      return null;
    }

    if (!user) {
      console.error('Benutzer ist nicht eingeloggt');
      return null;
    }

    const email = user.session.user.email;
    const username = email.split('@')[0]; // Teile die E-Mail-Adresse am "@"-Symbol und nimm den ersten Teil
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1); // erster Buchstabe groß

    return capitalizedUsername;

  }

  async getUserId() {
    // Benutzer-Session abrufen
    const { data: user, error: sessionError } = await this.client.auth.getSession();

    if (sessionError) {
      console.error(sessionError);
      return null;
    }

    if (!user) {
      console.error('Benutzer ist nicht eingeloggt');
      return null;
    }

    const userid = user.session.user.id;

    return userid;

  }


  async getTime(type, subject, userid) {
    const column = 'time_' + type + '_' + subject;

    try {
      const { data, error } = await this.client
        .from('usernames')
        .select(column)
        .eq('userid', userid);

      if (error) {
        console.error("Fehler beim Abrufen der Zeitdaten:", error);
        return null;
      }
      const time = data[0][column];
      return time;
    } catch (error) {
      console.error("Unbekannter Fehler:", error);
      return null;
    }
  }

  async setTime(type, subject, time, userid) {
    const column = 'time_' + type + '_' + subject;
    const setTime = time;

    try {
      const { data: time, error } = await this.client
        .from('usernames')
        .update({ [column]: setTime })
        .eq('userid', userid);

      if (error) {
        console.error("Fehler beim Schreiben der Zeitdaten:", error);
        return null;
      }
    } catch (error) {
      console.error("Unbekannter Fehler:", error);
      return null;
    }
  }

}

/* async registerNewUser(username, password) {
  const hashedPassword = sha256(password).toString();

  const { data, error: insertError } = await this.client
    .from('usernames')
    .insert([{ email: username, password: hashedPassword }])

  if (insertError) {
    console.error('Error inserting new user:', insertError);
  } else {
    console.log('New user inserted:', data);
  }
} */

/* async passwordSignIn(username, hashedPassword) {
  const { data, error } = await this.client.auth.signInWithPassword({
    email: `${username}`,
    password: `${hashedPassword}`
  })
} */

