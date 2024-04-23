import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uebungen-kryptographie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uebungen-kryptographie.component.html',
  styleUrl: './uebungen-kryptographie.component.scss'
})
export class UebungenKryptographieComponent {
  alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  textEncode = '';
  textDecode = '';
  selectEncode;
  selectDecode;
  encoded;
  decoded;

  encode(){

    let string = this.textEncode.toUpperCase();
    let shift = parseInt(this.selectEncode);

    if (isNaN(shift)) {
      shift = 0;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let encodedText: string = '';

    let i: number = 0;

    while (i < string.length) {

      if (alphabet.indexOf(string[i]) !== -1){

      let alphabetIndex = alphabet.indexOf(string[i]);
      alphabetIndex += shift;

      if (alphabetIndex > 25){
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

  decode(){

    let string = this.textDecode.toUpperCase();
    let shift = parseInt(this.selectDecode);

    if (isNaN(shift)) {
      shift = 0;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let decodedText: string = '';

    let i: number = 0;

    while (i < string.length) {

      if (alphabet.indexOf(string[i]) !== -1){

      let alphabetIndex = alphabet.indexOf(string[i]);
      alphabetIndex -= shift;

      if (alphabetIndex < 0){
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

}
