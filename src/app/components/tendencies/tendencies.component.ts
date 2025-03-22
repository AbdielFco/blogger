import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../../models/card.model'; // Importa la interfaz
import { Like } from '../../models/like.model';
import { View } from '../../models/view.model';
import { ArticleService } from '../../services/article.service';
import { Observable, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tendencies',
  standalone: false,
  templateUrl: './tendencies.component.html',
  styleUrl: './tendencies.component.css'
})

export class TendenciesComponent implements OnInit {
  actualEmail: string = "yeremy@gmail.com";
  actualID: number = 1740410350;
  datos: any[] = []; //any
  datosCard: Card[] = []; //any
  datosLikes: Like[] = []; //any
  datosViews: View[] = []; //any
  // Variable para almacenar el estado del like
  // likesStatus$: Observable<boolean> = of(false); // Inicialización para evitar el error
  likesStatusMap: Map<number, Observable<boolean>> = new Map();
  viewsStatusMap: Map<number, Observable<boolean>> = new Map();
  commentsStatusMap: Map<number, Observable<boolean>> = new Map();



  constructor(private http: HttpClient, private articleService: ArticleService, private router: Router) {}

  // AL INICIAR LA APP
  ngOnInit(): void {
    // OBTENER JSON DE POSTS
    // this.http.get<any[]>('/assets/datos.json').subscribe(data => {
    //   this.datos = data.map(card => ({
    //     ...card,
    //     likes: card.likes || [] // Inicializa likes como un arreglo vacío si es undefined
    //   }));
    // });

    //
    this.getAllArticles();
  }

///////////////////////////////////////////  
  viewPost(postId: number) {
    this.router.navigate(['/post', postId]);  // Navega a post.component con el ID
  }
///////////////////////////////////////////
  getAllArticles(): void {
    this.articleService.getArticles().subscribe(
      (data) => {
        this.datosCard = data;
        console.log(this.datosCard)
        this.datosCard.forEach((card) => {
          this.likesStatusMap.set(card.post_id, this.hadLike(card));
          console.log(`Post ID: ${card.post_id}, Like: ${this.hadLike(card)}`);
        });
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
  onButtonClick(card: any): void {
    this.hadLike(card).subscribe((exists) => {
      console.log(`El like entre este post ${card.post_id} y el usuario ${this.actualEmail} es? ${exists}, subscribe`)
      if (exists) {
        // Si el libro 'Libro1' existe, realiza otra acción
        console.log('El like existe, continuando con el proceso...');
        // this.procesarOtroProceso();  // Llamar a otro proceso
      } else {
        console.log('El like no existe');
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

        this.articleService.addLike({ id: Date.now(), post_id: card.post_id, author_id: this.actualID, date: Date.now()}).subscribe(
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
  
  // MODEL - DEVOLVER ID DE LA CARD - ASIGNAR SU ID DEL JSON
  trackByFn(index: number, card: Card): number {
    return card.post_id; // Usa el ID único de cada card
  }
  
}  


  // Función para verificar si existe un libro con nombre 'Libro1'
  // checkBookExists(): Observable<boolean> {
  //   return this.getAndProcessBooks().pipe(
  //     map((books) => {
  //       // Busca si el libro con el nombre 'Libro1' está en la lista
  //       const exists = books.some((book: any) => book.name === 'Libro1');
  //       return exists; // Retorna true si existe, false si no
  //     })
  //   );
  // }
  //
  // Comprobar like
  // getLikes(card: any): boolean {
  //   this.articleService.getLike({ post_id: card, author_id: this.actualID }).subscribe(
  //     (data) => {
  //       this.datosLikes = data;
  //       console.log(this.datos)

  //       const resultado = card.likes.some((like: Like) => like.author.email === this.actualEmail);
  //       console.log(`checkLikes para card ${card.id}:`, resultado); // Depuración
  //       return resultado;
  //     },
  //     (error) => {
  //       console.error('Error al obtener artículos', error);
  //     }
  //   );
  // }
  
  // getLikeId(card: any): any {
  //   let like_id = -1;
  //    return this.articleService.getLikeId({ post_id: card.post_id, author_id: this.actualID }).subscribe(
  //     (data) => {
  //       if (data.length > 0) {
  //         console.log('Si devolvio ID')
  //         like_id = data[0].id;    
  //         console.log(like_id)  
  //         console.log(`La ID de ese Like es: ${like_id}`);
  //       } else {
  //         console.log('No devolvio ID')
  //       }

  //     },
  //     (error) => {
  //       console.error('Error al obtener Id del Like - El usuario no ha dado Like a este Post', error);
  //     }
  //   );
  //   console.log(`Este es el id del like que se esta retornando ${like_id}`)
  //   // return like_id
  // }

  // hadLike(card: any): boolean { //has_like: 0
  //   let resultado: Boolean = false;
  //   // let resultado: Boolean = false;
  //   return this.articleService.getLike({ post_id: card.post_id, author_id: this.actualID }).subscribe(
  //     (data) => {
  //         if (data[0].has_like == 0) {
  //           resultado = false;
  //           // console.log(resultado)
  //         } else {
  //           resultado = true;
  //           // console.log(resultado)
  //         }
  //     },
  //     (error) => {
  //       console.error('Error al obtener el Like', error);
  //     }
  //   );
  //   // console.log(`Este es el valor real que se esta retornando ${resultado}`)
  // return resultado
  // }

  // hadLike(card: any): Observable<boolean> {
  //   return this.articleService.getLike({ post_id: card.post_id, author_id: this.actualID }).pipe(
  //     map(data => data[0]?.has_like !== 0), // Convierte la respuesta en un booleano
  //     catchError(error => {
  //       console.error('Error al obtener el Like', error);
  //       return of(false); // En caso de error, devuelve `false`
  //     })
  //   );
  // }
  

  // checkLikes2(card: any): boolean {
  //   const resultado = card.likes.some((like: Like) => like.author.email === this.actualEmail);
  //   console.log(`checkLikes para card ${card.id}:`, resultado); // Depuración
  //   return resultado;
  // }

  // // // Agregar like
  // addLike(card: any): void {
  //   const nuevoLike = {
  //     id: Date.now(),
  //     author: {
  //       id: 2, // ID del email actual
  //       email: this.actualEmail
  //     },
  //     date: new Date().toISOString()
  //   };

  //   if (this.checkLikes(card)) {
  //     // Si ya dio like, quítalo
  //     card.likes = card.likes.filter((like: Like) => like.author.email !== this.actualEmail);
  //   } else {
  //     // Si no dio like, agrégalo
  //     card.likes.push(nuevoLike);
  //   }
  // }

  //  Eliminar like

///////////////////////////////////////////


  // AGREGAR LIKES
  // addLike(card: any): void {
  //   const nuevoLike = {
  //     id: Date.now(),
  //     author: {
  //       id: 2, // ID del email actual
  //       email: this.actualEmail
  //     },
  //     date: new Date().toISOString()
  //   };

  //   if (this.checkLikes(card)) {
  //     // Si ya dio like, quítalo
  //     card.likes = card.likes.filter((like: Like) => like.author.email !== this.actualEmail);
  //   } else {
  //     // Si no dio like, agrégalo
  //     card.likes.push(nuevoLike);
  //   }
  // }

  // VERIFICAR SI EL email ACTUAL YA DIO LIKE
  // checkLikes(card: any): boolean {
  //   const resultado = card.likes.some((like: Like) => like.author.email === this.actualEmail);
  //   console.log(`checkLikes para card ${card.id}:`, resultado); // Depuración
  //   return resultado;
  // }


  // AGREGAR VISTAS
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
  //     // card.views = card.views.filter((view: View) => view.author.email !== this.emailActual);
  //   } else {
  //     // Si no dio like, agrégalo
  //     card.views.push(nuevoView);
  //   }
  // }

  // VERIFICAR SI EL email ACTUAL YA DIO LIKE
  // checkView(card: any): boolean {
  //   const resultado = card.views.some((like: Like) => like.author.email === this.actualEmail);
  //   console.log(`checkLikes para card ${card.id}:`, resultado); // Depuración
  //   return resultado;
  // }









