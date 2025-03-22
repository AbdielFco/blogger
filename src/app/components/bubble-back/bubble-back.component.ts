import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';
import { Observable, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router'; // Importa Router
import { ArticleService } from '../../services/article.service';
import { ArticlesComponent } from '../articles/articles.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-bubble-back',
  standalone: false,
  
  templateUrl: './bubble-back.component.html',
  styleUrl: './bubble-back.component.css'
})
export class BubbleBackComponent {

  isModalVisible: boolean = false; // Controla la visibilidad del modal
  isModalAccountVisible: boolean = false; // Controla la visibilidad del modal

  constructor(private router: Router, private appComponent: AppComponent) {}

  openModal() {
    this.isModalVisible = true; // Muestra el modal
  }

  closeModal() {
    this.isModalVisible = false; // Cierra el modal
  }

  onButtonClick(): void { // utilizar data y ponerla en los inputs
    this.router.navigate(['/home'], { replaceUrl: true }); // Redirige al home
  }

}
