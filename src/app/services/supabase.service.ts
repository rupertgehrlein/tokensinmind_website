import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private client: SupabaseClient;
  private coinsSubject = new BehaviorSubject<number>(0);
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  coins$ = this.coinsSubject.asObservable();
  loggedIn$ = this.loggedInSubject.asObservable();
  userId: string;

  constructor() {
    this.client = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.initializeUserStatus();
    this.initializeCoins();
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  //alles rund um den User
  private async initializeUserStatus() {
    const userStatus = await this.getCurrentUserStatus();
    this.loggedInSubject.next(userStatus);

    if (userStatus) {
      await this.initializeCoins();
    }

    this.client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.loggedInSubject.next(true);
      } else if (event === 'SIGNED_OUT') {
        this.loggedInSubject.next(false);
      }
    });
  }

  private async getCurrentUserStatus(): Promise<boolean> {
    const { data: user, error } = await this.client.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error);
      return false;
    }

    if (user && user.user) {
      return true;
    } else {
      return false;
    }
  }

  async getUsername() {
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

  //alles rund um Coins als Belohnung
  private async initializeCoins() {
    const coins = await this.getCurrentCoins();
    this.coinsSubject.next(coins);
  }

  async getCurrentCoins(): Promise<number> {
    const userId = await this.getUserId();

    try {
      const { data, error } = await this.client
        .from('usernames')
        .select('current_coins')
        .eq('userid', userId)
        .single();

      if (error) {
        console.error("Fehler beim Abrufen der Coins:", error);
        return 0;
      }
      return data.current_coins;
    } catch (error) {
      console.error("Unbekannter Fehler:", error);
      return 0;
    }
  }

  async setCurrentCoins(coins: number): Promise<void> {
    const userId = await this.getUserId();
    const currentCoins = await this.getCurrentCoins();
    const newCoins = coins + currentCoins;

    try {
      const { error } = await this.client
        .from('usernames')
        .update({ current_coins: newCoins })
        .eq('userid', userId);

      if (error) {
        console.error("Fehler beim Schreiben der Coins:", error);
        return;
      }

      this.coinsSubject.next(newCoins);
    } catch (error) {
      console.error("Unbekannter Fehler:", error);
    }
  }


  //alles rund um gemessene Zeit auf jeweiliger Seite
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

  async getOverallTime() {
    const userId = await this.getUserId();

    if (!userId) {
      throw new Error('User ID could not be retrieved');
    }

    // Abfrage zur Ermittlung der Zeitwerte
    const { data, error } = await this.client
      .from('usernames')
      .select(`
        time_lektion_kryptographie,
        time_lektion_blockchain,
        time_lektion_waehrung,
        time_lektion_nft,
        time_uebung_kryptographie,
        time_uebung_blockchain,
        time_uebung_waehrung,
        time_uebung_nft
      `)
      .eq('userid', userId);

    if (error) {
      console.error('Error fetching time values:', error);
      return null;
    }

    if (data && data.length > 0) {
      const timeData = data[0];
      const totalTime = Object.values(timeData).reduce((sum, time) => sum + (time || 0), 0);
      return totalTime;
    }

    return 0;
  }


  //alles rund um User hat Unterseite bereits besucht
  async getVisited(userid: string) {
    const { data, error: fetchError } = await this.client
      .from('usernames')
      .select('already_visited')
      .eq('userid', userid)
      .single();

    if (fetchError) {
      console.error('Error fetching user data:', fetchError);
      return false;
    }

    return data.already_visited;
  }

  async setVisited(format: string, type: string, topic: string, userid: string) {
    const { data: userData, error: fetchError } = await this.client
      .from('usernames')
      .select('already_visited')
      .eq('userid', userid)
      .single();

    if (fetchError) {
      console.error('Error fetching user data:', fetchError);
      return;
    }
    const updatedVisited = { ...userData.already_visited };
    if (!updatedVisited[format]) updatedVisited[format] = {};
    if (!updatedVisited[format][type]) updatedVisited[format][type] = {};
    if (updatedVisited[format][type][topic] == false) {
      await this.setCurrentCoins(10);
    }
    updatedVisited[format][type][topic] = true;

    const { data, error: updateError } = await this.client
      .from('usernames')
      .update({ already_visited: updatedVisited })
      .eq('userid', userid);

    if (updateError) {
      console.error('Error updating visit status:', updateError);
    } else {
      console.log('Visit status updated successfully:', data);
    }
  }

  //alles rund um Bestzeit bei Mining-Game
  async getBestTime(userid: string) {
    const column = 'best_time';

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

  async setBestTime(userid: string, time) {
    const column = 'best_time';
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

  //alles rund um Quizzes
  async getQuizStatus() {
    const userId = await this.getUserId();

    try {
      const { data, error } = await this.client
        .from('usernames')
        .select('quiz_status')
        .eq('userid', userId);

      if (error) {
        console.error("Fehler beim Abrufen der Quizdaten:", error);
        return null;
      }
      return data[0].quiz_status;
    } catch (error) {
      console.error("Unbekannter Fehler:", error);
      return null;
    }
  }

  async setQuizStatus(quizType){
    const userId = await this.getUserId();

    if (!userId) {
      throw new Error('User ID could not be retrieved');
    }

    // Abfrage zur Ermittlung der aktuellen Quiz-Daten
    const { data, error } = await this.client
      .from('usernames')
      .select('quiz_status')
      .eq('userid', userId)
      .single(); // Erwarte einen einzelnen Datensatz

    if (error) {
      console.error('Error fetching quiz status:', error);
      return null;
    }
    console.log(data);
    if (data) {
      const quizStatus = data.quiz_status;

      if (!quizStatus[quizType]){
        quizStatus[quizType] = {};
      }

      quizStatus[quizType] = true;
      console.log(quizStatus[quizType]);
      // Aktualisiere die Datenbank
      const { error: updateError } = await this.client
        .from('usernames')
        .update({ quiz_status: quizStatus })
        .eq('userid', userId);

      if (updateError) {
        console.error('Error updating quiz status:', updateError);
        return null;
      }

      return quizStatus;
    }

    return null;
  }

  async getQuizData() {
    const userId = await this.getUserId();

    try {
      const { data, error } = await this.client
        .from('usernames')
        .select('quiz_results')
        .eq('userid', userId);

      if (error) {
        console.error("Fehler beim Abrufen der Quizdaten:", error);
        return null;
      }
      return data[0].quiz_results;
    } catch (error) {
      console.error("Unbekannter Fehler:", error);
      return null;
    }
  }

  async setQuizData(quizType, scoreboard) {
    const userId = await this.getUserId();

    if (!userId) {
      throw new Error('User ID could not be retrieved');
    }

    // Abfrage zur Ermittlung der aktuellen Quiz-Daten
    const { data, error } = await this.client
      .from('usernames')
      .select('quiz_results')
      .eq('userid', userId)
      .single(); // Erwarte einen einzelnen Datensatz

    if (error) {
      console.error('Error fetching quiz results:', error);
      return null;
    }

    if (data) {
      const quizResults = data.quiz_results;

      // Aktualisiere die Quiz-Daten
      if (!quizResults[quizType]) {
        quizResults[quizType] = {};
      }

      for (let i = 0; i < 10; i++) {
        quizResults[quizType][i + 1] = scoreboard[i];
      }
      quizResults[quizType]['total'] = scoreboard[10];
      quizResults[quizType]['total_time'] = scoreboard[11];

      // Aktualisiere die Datenbank
      const { error: updateError } = await this.client
        .from('usernames')
        .update({ quiz_results: quizResults })
        .eq('userid', userId);

      if (updateError) {
        console.error('Error updating quiz results:', updateError);
        return null;
      }

      return quizResults;
    }

    return null;

  }

}


