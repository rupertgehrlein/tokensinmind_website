import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase.service';
import * as sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-uebungen-kryptographie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uebungen-kryptographie.component.html',
  styleUrl: './uebungen-kryptographie.component.scss'
})
export class UebungenKryptographieComponent {
  startTime: number;
  initialTime: number;
  elapsedTime: number;
  userId;
  timer: any;
  isVisible: boolean = true;

  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit() {
    this.userId = await this.supabaseService.getUserId();
    this.initialTime = await this.supabaseService.getTime('uebung', 'kryptographie', this.userId) || 0;
    this.startTime = Date.now() - this.initialTime;
    this.startTimer();

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.isVisible) {
        this.updateTimeAndSaveToDatabase();
      }
    }, 1000);
  }

  updateTimeAndSaveToDatabase() {
    this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    this.supabaseService.setTime('uebung', 'kryptographie', this.initialTime + this.elapsedTime, this.userId);
  }

  handleVisibilityChange = () => {
    this.isVisible = !document.hidden;
    if (!this.isVisible) {
      clearInterval(this.timer);
    } else {
      this.startTime = Date.now() - this.elapsedTime * 1000;
      this.startTimer();
    }
  };

  //Übung Caesar

  alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  textEncode = '';
  textDecode = '';
  selectEncode;
  selectDecode;
  encoded;
  decoded;

  encode() {

    let string = this.textEncode.toUpperCase();
    let shift = parseInt(this.selectEncode);

    if (isNaN(shift)) {
      shift = 0;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let encodedText: string = '';

    let i: number = 0;

    while (i < string.length) {

      if (alphabet.indexOf(string[i]) !== -1) {

        let alphabetIndex = alphabet.indexOf(string[i]);
        alphabetIndex += shift;

        if (alphabetIndex > 25) {
          alphabetIndex = alphabetIndex % 26;
        }

        encodedText += alphabet[alphabetIndex]
      }
      else {
        encodedText += string[i];
      }

      i++;
    }
    this.encoded = encodedText;
  }

  decode() {

    let string = this.textDecode.toUpperCase();
    let shift = parseInt(this.selectDecode);

    if (isNaN(shift)) {
      shift = 0;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let decodedText: string = '';

    let i: number = 0;

    while (i < string.length) {

      if (alphabet.indexOf(string[i]) !== -1) {

        let alphabetIndex = alphabet.indexOf(string[i]);
        alphabetIndex -= shift;

        if (alphabetIndex < 0) {
          alphabetIndex = 26 + alphabetIndex;
        }

        decodedText += alphabet[alphabetIndex]
      }
      else {
        decodedText += string[i];
      }

      i++;
    }
    this.decoded = decodedText;
  }

  getSelectEncode(event) {
    this.selectEncode = event.target.value;
  }

  getTextEncode(event) {
    this.textEncode = event.target.value;
  }

  getSelectDecode(event) {
    this.selectDecode = event.target.value;
  }

  getTextDecode(event) {
    this.textDecode = event.target.value;
  }

  //Übung RSA -- läuft noch nicht sonderlich rund
  publicKey: string;
  privateKey: string;
  plainText: string;
  encryptedMessage: string;
  decryptedMessage: string;
  keysGenerated: boolean = false;
  encryptionDone: boolean = false;

  generateKeys() {
    const getRandomPrime = () => {
      const primes = [43, 47, 53, 59, 61, 67, 71, 73, 79];
      return primes[Math.floor(Math.random() * primes.length)];
    };

    const p = getRandomPrime();
    const q = getRandomPrime();
    const n = p * q;
    const phi = (p - 1) * (q - 1);

    let e = 3;
    while (e < phi && this.gcd(e, phi) !== 1) {
      e += 2;
    }

    let d = 2;
    while ((d * e) % phi !== 1) {
      d += 1;
    }

    this.publicKey = `(${e}, ${n})`;
    this.privateKey = `(${d}, ${n})`;
    this.keysGenerated = true;
    this.encryptionDone = false;
    this.encryptedMessage = null;
    this.decryptedMessage = null;
  }

  gcd(a, b) {
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  getPlainText(event) {
    this.plainText = event.target.value;
  }

  encrypt() {
    const [e, n] = this.parseKey(this.publicKey);
    this.encryptedMessage = Array.from(this.plainText)
      .map(char => this.modExp(char.charCodeAt(0), e, n))
      .join(' ');
    this.encryptionDone = true;
  }

  decrypt() {
    const [d, n] = this.parseKey(this.privateKey);
    this.decryptedMessage = this.encryptedMessage
      .split(' ')
      .map(code => String.fromCharCode(this.modExp(parseInt(code, 10), d, n)))
      .join('');
  }

  modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  }

  parseKey(key) {
    const match = key.match(/\((\d+), (\d+)\)/);
    return match ? [parseInt(match[1], 10), parseInt(match[2], 10)] : [0, 0];
  }

  //Übung Hashing

  data1 = '';
  hash1 = '';

  computeHash(event) {
    this.data1 = event;
    const combinedData = `${this.data1}`;
    this.hash1 = sha256(combinedData).toString();
  }

}
