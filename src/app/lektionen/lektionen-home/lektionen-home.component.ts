import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lektionen-home',
  templateUrl: './lektionen-home.component.html',
  styleUrl: './lektionen-home.component.scss'
})
export class LektionenHomeComponent {

  lections = [
    {
      title: "Kryptographie",
      subsections: ["Lektion 1", "Lektion 2", "Lektion 3"],
      link: "/kryptographie"
    },
    {
      title: "Blockchain",
      subsections: ["Lektion 1", "Lektion 2", "Lektion 3"],
      link: "/blockchain"
    },
    {
      title: "Kryptowährungen",
      subsections: ["Lektion 1", "Lektion 2", "Lektion 3"],
      link: "/kryptowährungen"
    },
    {
      title: "Non-Fungible Tokens",
      subsections: ["Lektion 1", "Lektion 2", "Lektion 3"],
      link: "/nfts"
    },
  ]

}
