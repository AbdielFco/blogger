import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  images = {
    bgLogin: 'images/fondos/bg.jpg',
    angularIcon: 'icons/favicon.ico',
    googleIcon: 'icons/google_icon.ico'
  };
}
