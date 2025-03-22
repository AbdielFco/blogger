import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';
import { Observable, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router'; // Importa Router
import { ArticleService } from '../../services/article.service';
import { ArticlesComponent } from '../articles/articles.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-bubble',
  standalone: false,
  templateUrl: './bubble.component.html',
  styleUrl: './bubble.component.css'
})
export class BubbleComponent {
  @Output() refreshArticles = new EventEmitter<void>(); // crear emisor al padre
  //
  get actualEmail(): string {
    return this.storageService.getActualEmail() || 'default@gmail.com';
  }
  get actualID(): number {
    const storedID = this.storageService.getActualID();
    return storedID && !isNaN(Number(storedID)) ? Number(storedID) : 1742601492;
  }
  //
  isModalVisible: boolean = false; // Controla la visibilidad del modal
  isModalAccountVisible: boolean = false; // Controla la visibilidad del modal
  newPost = {
    title: '',
    description: '',
    content: '',
    image: 'images/portadas/default.jpg'
  };
  myProfile = {
    id: '',
    name: '',
    email: '',
    avatar: ''
  }

  // Inyectamos AppComponent para acceder a los datos globales
  constructor(private storageService: StorageService, private router: Router, private appComponent: AppComponent, private userService: UserService, private articleService: ArticleService) {}

  openModal() {
    this.isModalVisible = true; // Muestra el modal
  }

  closeModal() {
    this.isModalVisible = false; // Cierra el modal
  }

  openModal2() {
    this.isModalAccountVisible = true; // Muestra el modal
  }

  closeModal2() {
    this.isModalAccountVisible = false; // Cierra el modal
  }

  onLogOut() {
    this.storageService.removeUserData();  // Elimina usuario y token
    this.router.navigate(['/login'], { replaceUrl: true }); // Redirige al home
  }


  getUser(): Observable<any> {
    return this.userService.getUserById({ id: this.actualID }).pipe(
      map((data) => {
        if (data.length > 0) {
          console.log('Data encontrada');
          return data;
        } else {
          console.log('No se encontró la Data');
          return -1; // Si no se encontró el like, devuelve un valor negativo
        }
      }),
      catchError((error) => {
        console.error('Error al obtener la Data', error);
        return of(-1); // Manejo de errores: devolvemos -1 si falla la petición
      })
    );
  }
  onButtonClick(): void { // utilizar data y ponerla en los inputs
    this.getUser().subscribe((data) => {
      if (data) {
        console.log('La data existe, continuando con el proceso...');
        this.myProfile.id = data[0].id
        this.myProfile.name = data[0].name
        this.myProfile.email = data[0].email
        this.myProfile.avatar = data[0].avatar
        // this.procesarOtroProceso();  // Llamar a otro proceso
      } else {
        console.log('La data no existe');
      }
    });
  }

  addPost(): void {
    this.articleService.createArticle({ id: Math.floor(Date.now() / 1000), title: this.newPost.title, date: new Date().toISOString().slice(0, 19).replace("T", " "), description: this.newPost.description, content: this.newPost.content, image: this.newPost.image, author_id: this.actualID ?? 0 }).subscribe(
      (response) => {
        console.log('Post creado exitosamente');
        this.onPostAdd();
        this.clearInput();
      },
      (error) => {
        console.error('Error al crear el post', error);
      }
    );
  }
  onPostAdd() { // funcion para emitir la funcion
    this.refreshArticles.emit();
  }

  clearInput(): void {
    this.newPost.title = '';
    this.newPost.description = '';
    this.newPost.content = '';
    this.closeModal();
  }

}
