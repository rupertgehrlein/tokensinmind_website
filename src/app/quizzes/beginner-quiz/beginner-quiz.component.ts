import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-beginner-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './beginner-quiz.component.html',
  styleUrls: ['./beginner-quiz.component.scss']
})
export class BeginnerQuizComponent {
  constructor(private supabaseService: SupabaseService) {}

  questions = [
    {
      question: 'Was bedeutet das Wort "Kryptographie"?',
      options: ['Geheimschrift', 'Öffentliche Kommunikation', 'Mathematische Berechnung', 'Offene Datenübertragung'],
      correctAnswer: 0
    },
    {
      question: 'Was ist eine Blockchain?',
      options: ['Ein vernetztes Computersystem', 'Eine Datenbank, die Daten in Blöcken speichert, die miteinander verkettet sind', 'Ein Kryptowährungsmarkt', 'Ein verschlüsseltes Nachrichtenprotokoll'],
      correctAnswer: 1
    },
    {
      question: 'Welcher dieser Begriffe beschreibt eine digitale Währung, die auf Kryptographie basiert?',
      options: ['Fiat-Währung', 'Kryptowährung', 'Aktien', 'Gold'],
      correctAnswer: 1
    },
    {
      question: 'Was verwendet die Caesar-Chiffre zur Verschlüsselung?',
      options: ['Ein mathematisches Modell', 'Verschobene Alphabete', 'Eine öffentliche und eine private Schlüsselkombination', 'Hashfunktionen'],
      correctAnswer: 1
    },
    {
      question: 'Was ist ein Brute-Force-Angriff?',
      options: ['Ein Angriff, der den Schlüssel durch Ausprobieren aller möglichen Kombinationen findet', 'Ein Angriff, der die Nachricht mithilfe von Algorithmen entschlüsselt', 'Ein Angriff, der auf einer Hashfunktion basiert', 'Ein Angriff, der den Originaltext direkt errät'],
      correctAnswer: 0
    },
    {
      question: 'Was ist Hashing in der Kryptographie?',
      options: ['Eine Methode zur Entschlüsselung von Nachrichten', 'Eine Methode zur Verschlüsselung von Nachrichten', 'Eine Methode, um Daten in eine feste Zeichenkette umzuwandeln, die nicht zurückverwandelt werden kann', 'Ein Algorithmus zur Erzeugung von Schlüsseln'],
      correctAnswer: 2
    },
    {
      question: 'Was bedeutet "Proof-of-Work" im Kontext der Blockchain?',
      options: ['Eine Methode zur Validierung von Transaktionen durch komplexe Berechnungen', 'Eine Methode zur Verschlüsselung von Daten', 'Eine Art von Hash-Algorithmus', 'Eine Methode zur Erzeugung von Schlüsseln'],
      correctAnswer: 0
    },
    {
      question: 'Welche der folgenden Aussagen trifft auf Bitcoin zu?',
      options: ['Es ist eine schnelle und kostengünstige Version von Litecoin', 'Es ermöglicht einfache Transaktionen ohne eine Bank', 'Es bietet komplexe Anwendungen wie Smart Contracts', 'Es wurde speziell für internationale Transaktionen entwickelt'],
      correctAnswer: 1
    },
    {
      question: 'Was ist ein Smart Contract?',
      options: ['Ein Vertrag, der direkt im Code festgelegt ist und sich selbst ausführt', 'Ein Vertrag, der von einem Notar genehmigt werden muss', 'Ein digitaler Vertrag, der auf abseits einer Blockchain gespeichert ist', 'Ein Vertrag, der von einer zentralen Behörde verwaltet wird'],
      correctAnswer: 0
    },
    {
      question: 'Welche potenziellen Probleme gibt es bei Kryptowährungen?',
      options: ['Hohe Volatilität, Sicherheitsprobleme, fehlende Regulierungen, technische Herausforderungen und Umweltbelastungen', 'Hohe Transaktionsgebühren und schnelle Transaktionszeiten', 'Zentrale Kontrolle durch Regierungen', 'Zu gute Nutzerfreundlichkeit'],
      correctAnswer: 0
    },
    // Weitere Fragen hier hinzufügen...
  ];

  answers: number[] = Array(this.questions.length).fill(null);
  score: number | null = null;

  onAnswerSelected(questionIndex: number, optionIndex: number) {
    this.answers[questionIndex] = optionIndex;
  }

  async submitQuiz() {
    let score = 0;
    let scoreboard = [];
    let totalTime = await this.supabaseService.getOverallTime();
    this.questions.forEach((question, index) => {
      if (this.answers[index] === question.correctAnswer) {
        scoreboard.push(1)
        score++;
      } else {
        scoreboard.push(0)
      }
    });
    scoreboard.push(score);
    scoreboard.push(totalTime);
    this.score = score;
    this.supabaseService.setQuizData("beginner", scoreboard);
  }
}
