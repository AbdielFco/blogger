import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ArticlesComponent } from '../articles/articles.component';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements AfterViewInit {

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
