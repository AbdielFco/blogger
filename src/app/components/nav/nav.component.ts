import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  activeRoute: string = '/home'; // Ruta activa por defecto
  menuOpen: boolean = false; // Estado del menú hamburguesa

  // Inyecta Router en el constructor
  constructor(private router: Router) {
    // Escucha los cambios en la URL y actualiza la clase activa
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects; // Guarda la URL actual
      }
    });
  }

  // Función que se llama cuando el login es exitoso
  goHome() {
    this.router.navigate(['/home'], { replaceUrl: true }); // Redirige al home
  }
  goBlog() {
    this.router.navigate(['/blog'], { replaceUrl: true }); // Redirige al home
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna entre abrir y cerrar
  }  
}
