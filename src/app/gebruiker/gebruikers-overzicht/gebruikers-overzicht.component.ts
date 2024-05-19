import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gebruikers-overzicht',
  standalone: true,
  imports: [],
  templateUrl: './gebruikers-overzicht.component.html',
  styleUrl: './gebruikers-overzicht.component.scss',
})
export class GebruikersOverzichtComponent implements OnInit {
  tokenString: string | null = '';

  ngOnInit(): void {
    this.tokenString = localStorage.getItem('token');
  }
}
