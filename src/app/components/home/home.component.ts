import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ArticlesComponent } from '../articles/articles.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  //
  imgBgLoginUrl: string = 'images/fondos/bg.jpg'; // Ruta de la imagen
  imgIconAngular: string = 'icons/favicon.ico';
  imgIconGoogle: string = 'icons/google_icon.ico';

  // Usa el operador '!' para indicar a TypeScript que la propiedad será asignada más tarde
  @ViewChild(ArticlesComponent) articlesComponent!: ArticlesComponent;

  ngAfterViewInit(): void {
    // Ahora articlesComponent está disponible después de que la vista se ha inicializado
  }

  onRefreshArticles() {
    if (this.articlesComponent) {
      this.articlesComponent.getAllArticles();
    }
  }
  
}
