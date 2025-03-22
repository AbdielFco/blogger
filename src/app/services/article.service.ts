import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Timestamp } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // private apiUrl = 'http://localhost:4000/api/articles'; //
  private apiUrl = `${environment.backendUrl}/articles`;  // Usamos la URL definida en el entorno  //

  constructor(private http: HttpClient) {}

  // Obtener todos los artículos
  getArticles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Obtener un artículo por ID
  getArticle(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/get`, { id });
  }

  // Crear un nuevo artículo
  createArticle(article: { id: number, title: string, date: string, description: string, content: string, image: string, author_id: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/new`, article);
  }

  // Eliminar un artículo por ID
  deleteArticle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  // Agregar un "Like"
  addLike(like: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/like/new`, like);
  }

  // Eliminar un "Like" por ID
  removeLike(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/like/delete/${id}`);
  }

  // Verificar si un usuario ha dado like a un post
  getLike(likeData: { post_id: number, author_id: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/like`, likeData);
  }  

  // Verificar si un usuario ha dado like a un post
  getLikeId(likeData: { post_id: number, author_id: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/like/id`, likeData);
  } 

  // Obtener todos los comentarios
  getComments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comment`);
  }

  // Obtener todos los comentarios
  getCommentsById(post_id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comment/id`, { post_id });
  }

  // Crear un nuevo comentario
  createComment(commentData: { id: number, post_id: number, author_id: number, date: string, content: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comment/new`, commentData);
  }
}
