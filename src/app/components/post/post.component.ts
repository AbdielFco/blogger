import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../../models/card.model'; // Importa la interfaz
import { Like } from '../../models/like.model';
import { View } from '../../models/view.model';
import { Comment } from '../../models/comment.model';
import { ArticleService } from '../../services/article.service';
import { catchError, map, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-post',
  standalone: false,
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>;
  //
  get actualEmail(): string {
    return this.storageService.getActualEmail() || 'default@gmail.com';
  }
  get actualID(): number {
    const storedID = this.storageService.getActualID();
    return storedID && !isNaN(Number(storedID)) ? Number(storedID) : 1742601492;
  }
  //
  actualPostId!: number;
  datos: any[] = []; //any
  datosCard: Card[] = []; //any
  datosLikes: Like[] = []; //any
  datosViews: View[] = []; //any
  datosComments: Comment[] = []; //any
  // Variable para almacenar el estado del like
  // likesStatus$: Observable<boolean> = of(false); // Inicialización para evitar el error
  likesStatusMap: Map<number, Observable<boolean>> = new Map();
  viewsStatusMap: Map<number, Observable<boolean>> = new Map();
  commentsStatusMap: Map<number, Observable<boolean>> = new Map();

  constructor(private storageService: StorageService, private http: HttpClient, private articleService: ArticleService, private route: ActivatedRoute) {}

  // AL INICIAR LA APP
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.actualPostId = Number(params.get('id')); // Obtiene el ID de la URL
      this.getAllComments(this.actualPostId);
      this.getArticles();
    });
    //
    this.getArticles();
    this.getAllComments(this.actualPostId);
  }

  ///////////////////////////////////////////
  getAllComments(post_id: number): void {
    this.articleService.getCommentsById(post_id).subscribe(
      (data) => {
        this.datosComments = data;
        console.log(this.datosComments)
        if (this.datosComments.length > 0) {
          console.log('hay datos')
        } else {
          console.log('no hay datos')
        }
      },
      (error) => {
        console.error('Error al obtener artículos', error);
      }
    );
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe(
      (data) => {
        for (let x of data) {
          if (x.post_id == this.actualPostId) {
            this.datosCard = [x];
            console.log(this.datosCard);
            this.datosCard.forEach((card) => {
              this.likesStatusMap.set(card.post_id, this.hadLike(card));
              console.log(`Post ID: ${card.post_id}, Like: ${this.hadLike(card)}`);
            });
          }
        }
      },
      (error) => {
        console.error('Error al obtener artículos', error);
      }
    );
  }
  hadLike(card: any): Observable<boolean> {
    return this.articleService.getLike({ post_id: card.post_id, author_id: this.actualID }).pipe(
      map((data) => {
        const exists = data.some((like: any) => like.has_like == 1);
        console.log(`El like entre este post ${card.post_id} y el usuario ${this.actualEmail} es? ${exists}, pipe`)
        return exists;
      }),
      catchError((error) => {
        console.error('Error al obtener el like', error);
        return of(false); // Manejo de errores: devolvemos false si falla la petición
      })
    );
  }
  // Agregar like
  addLike(card: any) {//: void
   
    this.hadLike(card).subscribe((exists) => {
      console.log(`El like entre este post ${card.post_id} y el usuario ${this.actualEmail} es? ${exists}, subscribe`)
      if (exists) {
        // Si el libro 'Libro1' existe, realiza otra acción
        console.log('ya dio like - remover')        
        this.removeLikeIfExists(card);   // SERVICIO DE REMOVER LIKE
        // this.procesarOtroProceso();  // Llamar a otro proceso
      } else {
        console.log('no ha dado like - agregar')
        this.addLikeIfNotExists(card);

      }
    });

  }
  getLikeId(card: any): Observable<number> {
    return this.articleService.getLikeId({ post_id: card.post_id, author_id: this.actualID }).pipe(
      map((data) => {
        if (data.length > 0) {
          console.log('ID del like encontrado:', data[0].id);
          return data[0].id;
        } else {
          console.log('No se encontró ID para el like');
          return -1; // Si no se encontró el like, devuelve un valor negativo
        }
      }),
      catchError((error) => {
        console.error('Error al obtener ID del like', error);
        return of(-1); // Manejo de errores: devolvemos -1 si falla la petición
      })
    );
  }
  removeLikeIfExists(card: any): void {
    this.getLikeId(card).subscribe((like_id) => {
      if (like_id !== -1) {
        // Si el like existe (ID válido), lo eliminamos
        console.log('Remover el like con ID:', like_id);
        this.articleService.removeLike(like_id).subscribe(
          (response) => {
            console.log('Like eliminado exitosamente');
            // Puedes agregar aquí el código para actualizar la UI o hacer algo más
            this.likesStatusMap.set(card.post_id, of(false));  // Establecer el estado a "no like"
            // Actualizar el contador de likes
            card.like_count--;
          },
          (error) => {
            console.error('Error al eliminar el like', error);
          }
        );
      } else {
        console.log('No se encontró like para este post');
        // Aquí puedes agregar lógica si el like no existe, como agregarlo.
      }
    });
  }

  addLikeIfNotExists(card: any): void {
    this.getLikeId(card).subscribe((like_id) => {
      if (like_id == -1) {
        // Si el like existe (ID válido), lo eliminamos
        console.log('agregar el like');

        this.articleService.addLike({ id: Math.floor(Date.now() / 1000), post_id: card.post_id, author_id: this.actualID, date: new Date().toISOString().slice(0, 19).replace("T", " ")}).subscribe(
          (response) => {
            console.log('Like agegado exitosamente');
            // Puedes agregar aquí el código para actualizar la UI o hacer algo más
            this.likesStatusMap.set(card.post_id, of(true));  // Establecer el estado a "no like"
            // Actualizar el contador de likes
            card.like_count++;            
          },
          (error) => {
            console.error('Error al agregar el like', error);
          }
        );
      } else {
        console.log('No se encontró like para este post');
        // Aquí puedes agregar lógica si el like no existe, como agregarlo.
      }
    });
  }

  // AGREGAR COMENTARIOS
  addComment(content: string): void {
    // Agrega el comentario al arreglo
    this.articleService.createComment({ id: Math.floor(Date.now() / 1000), post_id: this.actualPostId, author_id: this.actualID, date: new Date().toISOString().slice(0, 19).replace("T", " "), content: content }).subscribe(
      (response) => {
        console.log('Comentario agegado exitosamente');
        // Actualizar los comentarios
        this.getAllComments(this.actualPostId);      
      },
      (error) => {
        console.error('Error al agregar el comentario', error);
      }
    );
    this.clearInput()
  }


  // MODEL - DEVOLVER ID DE LA CARD - ASIGNAR SU ID DEL JSON
  trackByFn(index: number, card: Card): number {
    return card.post_id; // Usa el ID único de cada card
  }


  // // AGREGAR VISTAS
  // addView(card: any): void {
  //   const nuevoView = {
  //     id: Date.now(),
  //     author: {
  //       id: 2, // ID del email actual
  //       email: this.actualEmail
  //     },
  //     date: new Date().toISOString()
  //   };

  //   if (this.checkView(card)) {
  //     // Si ya dio like, quítalo
  //     // card.views = card.views.filter((view: View) => view.author.email !== this.actualEmail);
  //   } else {
  //     // Si no dio like, agrégalo
  //     card.views.push(nuevoView);
  //   }
  // }

  // OPERACIONES
  clearInput(): void {
    this.commentInputRef.nativeElement.value = ''; // Limpia el valor del input
  }

}

