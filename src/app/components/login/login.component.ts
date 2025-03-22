import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  sesion = {
    email: '',
    password: ''
  };
  images = {
    bgLogin: 'images/fondos/bg.jpg',
    angularIcon: 'icons/favicon.ico',
    googleIcon: 'icons/google_icon.ico'
  };
  datos: User[] = [];

  // Inyecta Router en el constructor
  constructor(private storageService: StorageService, private router: Router, private http: HttpClient, private appComponent: AppComponent, private userService: UserService) {}

  // AL INICIAR LA APP
  ngOnInit(): void { 
    this.checkSession();
   }

  ///////////////////////////SUBSCRIBING API/////////////////////////////////
  //

  // Función que se llama cuando el login es exitoso
  onLoginSuccess() {
    this.router.navigate(['/home'], { replaceUrl: true }); // Redirige al home
  }
  onCreateAccount() {
    this.router.navigate(['/register'], { replaceUrl: true }); // Redirige al home
  }

  //
  isLoading = false; // Estado de carga
  // Verificar si el usuario está autenticado
  checkSession(): void {
    if (this.storageService.isAuthenticated()) {
      console.log('Usuario autenticado');
      this.onLoginSuccess();
    } else {
      console.log('No autenticado');
    }
  }


  login() {
    this.isLoading = true; // Activar carga
  
    this.userService.getUser({ email: this.sesion.email, password: this.sesion.password }).subscribe(
      (data) => {
        this.datos = data;
        this.isLoading = false; // Desactivar carga
  
        const usuarioEncontrado = this.datos.find(user => 
          user.email === this.sesion.email && user.password === this.sesion.password
        );
  
        if (usuarioEncontrado) {
          this.storageService.setUserData(data[0].email, data[0].id, Date.now().toString());
          this.onLoginSuccess();
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        this.isLoading = false; // Desactivar carga en caso de error
        alert('Credenciales incorrectos')
        console.error('Error al obtener usuarios', error);
      }
    );
  }
  
}
