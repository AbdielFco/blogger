import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //////////LOCAL DATA////////////////

  //////////URLS API////////////////
  // private apiUrl = 'http://localhost:4000/api/users';   
  private apiUrl = `${environment.backendUrl}/users`;  // Usamos la URL definida en el entorno  //
  
  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  // Obtener un usuario
  getUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`,userData);
  }
  // Obtener un usuario
  getUserById(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/id`,userData);
  }
  // Registrar Usuario
  postUser(userData: { id: number, name: string, password: string, email: string, avatar: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`,userData);
  }
}
