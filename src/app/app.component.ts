import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { User } from '../app/models/user.model';
import { Card } from '../app/models/card.model'; // Importa la interfaz

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: SafeHtml; // Cambia el tipo a SafeHtml

  constructor(private sanitizer: DomSanitizer) {
    this.title = this.sanitizer.bypassSecurityTrustHtml(`
      Bienvenido a
      <span style="color: red;">fuego</span>, 
      <span style="color: blue;">agua</span>, 
      <span style="color: green;">planta!</span>
    `);
  }
}