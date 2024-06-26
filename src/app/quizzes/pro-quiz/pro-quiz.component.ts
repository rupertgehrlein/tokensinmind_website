import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pro-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pro-quiz.component.html',
  styleUrl: './pro-quiz.component.scss'
})
export class ProQuizComponent {
  questions = [
    {
      question: "Wie funktioniert RSA-Verschlüsselung?",
      options: [
        "Sie verwendet zwei Schlüssel: einen öffentlichen und einen privaten.",
        "Sie verwendet eine Caesar-Chiffre.",
        "Sie basiert auf einer einfachen Substitution.",
        "Sie verwendet einen einzigen Schlüssel für die Verschlüsselung und Entschlüsselung."
      ],
      correctAnswer: 0
    },
    {
      question: "Was ist eine Blockchain?",
      options: [
        "Ein Kommunikationsprotokoll.",
        "Eine Art von Verschlüsselungsalgorithmus.",
        "Eine Datenbank, die Daten in Blöcken speichert, die miteinander verkettet sind.",
        "Eine Methode zur Hash-Erzeugung."
      ],
      correctAnswer: 2
    },
    {
      question: "Welche Informationen sind in einem Block enthalten?",
      options: [
        "Nur der Hash des Blocks",
        "Der Hash des vorherigen Blocks, Transaktionen, Zeitstempel, und der Hash des aktuellen Blocks",
        "Nur die Transaktionen",
        "Nur der Zeitstempel und der Hash des Blocks"
      ],
      correctAnswer: 1
    },
    {
      question: "Was ist die NONCE in einem Block?",
      options: [
        "Ein Fingerabdruck des Blocks",
        "Eine Liste aller Transaktionen",
        "Der Hash des vorherigen Blocks",
        "Eine Zahl, die nur einmal verwendet wird, um den Hash des Blocks zu generieren"
      ],
      correctAnswer: 3
    },
    {
      question: "Warum ist die Blockchain-Technologie so sicher?",
      options: [
        "Weil die Blöcke verschlüsselt sind.",
        "Weil jeder Block eine Nonce hat.",
        "Weil sie von einer zentralen Behörde kontrolliert wird.",
        "Weil die Daten in vielen verschiedenen Stellen gespeichert sind und der Hash jedes Blocks verändert wird."
      ],
      correctAnswer: 3
    },
    {
      question: "Wie wird der Wert einer Kryptowährung bestimmt?",
      options: [
        "Durch Angebot und Nachfrage, Nutzung, Marktstimmung, Medien und Nachrichten sowie Regulierungen.",
        "Durch die Anzahl der Miner im Netzwerk.",
        "Durch den Materialwert der Währung.",
        "Durch staatliche Institutionen."
      ],
      correctAnswer: 0
    },
    {
      question: "Welche der folgenden Aussagen trifft auf Litecoin zu?",
      options: [
        "Es bietet höhere Sicherheit als Bitcoin.",
        "Es wurde speziell für internationale Transaktionen entwickelt.",
        "Es ist eine schnellere und kostengünstigere Version von Bitcoin.",
        "Es ermöglicht komplexe Anwendungen wie Smart Contracts."
      ],
      correctAnswer: 2
    },
    {
      question: "Was ist die Hauptfunktion einer Hashfunktion in der Kryptographie?",
      options: [
        "Daten zu entschlüsseln.",
        "Daten zu validieren.",
        "Daten in eine fixe Zeichenkette umzuwandeln.",
        "Daten zu verschlüsseln."
      ],
      correctAnswer: 2
    },
    {
      question: "Welcher dieser Begriffe beschreibt einen Angriff, bei dem ein Hacker alle möglichen Kombinationen ausprobiert, um einen Schlüssel zu finden?",
      options: [
        "Phishing-Angriff",
        "Brute-Force-Angriff",
        "SQL-Injection",
        "Man-in-the-Middle-Angriff"
      ],
      correctAnswer: 1
    },
    {
      question: "Was ist eine Smart Contract-Plattform?",
      options: [
        "Eine Blockchain, die speziell für die Ausführung von Smart Contracts entwickelt wurde.",
        "Eine zentrale Datenbank für Verträge.",
        "Eine Plattform für den Handel mit Kryptowährungen.",
        "Eine Software, die automatische Vertragsausführungen ermöglicht."
      ],
      correctAnswer: 0
    }
  ];


  answers: number[] = Array(this.questions.length).fill(null);
  score: number | null = null;

  onAnswerSelected(questionIndex: number, optionIndex: number) {
    this.answers[questionIndex] = optionIndex;
  }

  submitQuiz() {
    let score = 0;
    this.questions.forEach((question, index) => {
      if (this.answers[index] === question.correctAnswer) {
        score++;
      }
    });
    this.score = score;
  }
}
