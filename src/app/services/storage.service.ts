import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private cookieService: CookieService) {}

  // Guardar en cookies (genérico)
  setCookie(key: string, value: any): void {
    this.cookieService.set(key, JSON.stringify(value));
  }

  // Obtener de cookies (genérico)
  getCookie(key: string): any {
    const value = this.cookieService.get(key);
    return value ? JSON.parse(value) : null;
  }

  // Eliminar de cookies
  removeCookie(key: string): void {
    this.cookieService.delete(key);
  }

  // Guardar usuario y token en cookies
  private userKey = 'userData';
  private tokenKey = 'authToken';

  setUserData(email: string, id: string, token: string): void {
    const userData = { email, id, token };
    this.cookieService.set(this.userKey, JSON.stringify(userData));
  }

  getUserData(): { email: string, id: string, token: string } | null {
    const userData = this.cookieService.get(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  removeUserData(): void {
    this.cookieService.delete(this.userKey);
  }

  getToken(): string | null {
    const userData = this.getUserData();
    return userData ? userData.token : null;
  }

  removeToken(): void {
    this.removeUserData();
  }

  getActualEmail(): string | null {
    const userData = this.getUserData();
    // console.log('userData in getActualEmail:', userData);
    return userData ? userData.email : null;
  }  

  getActualID(): string | null {
    const userData = this.getUserData();
    return userData ? userData.id : null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
