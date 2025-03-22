import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa Router
import { User } from '../../models/user.model';
import { Bd } from '../../models/bd.model';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  sesion = {
    id: null,
    name: '',
    password: '',
    email: '',
    avatar: 'images/avatar1.jpg'
  }
  images = {
    bgLogin: 'images/fondos/bg.jpg',
    angularIcon: 'icons/favicon.ico',
    googleIcon: 'icons/google_icon.ico'
  };
  datos: User[] = []; //any
  bds: Bd[] = []; //any

  // Inyecta Router en el constructor
  constructor(private storageService: StorageService, private router: Router, private http: HttpClient, private appComponent: AppComponent, private userService: UserService) {}

  // AL INICIAR LA APP
  ngOnInit(): void {
    this.checkSession();
  }
  
  // Función que se llama cuando el login es exitoso
  onRegisterSuccess() {
    this.router.navigate(['/login'], { replaceUrl: true }); // Redirige al home
  }
  onLoginAccount() {
    this.router.navigate(['/login'], { replaceUrl: true }); // Redirige al home
  }

  //
  isLoading = false; // Estado de carga
  // Verificar si el usuario está autenticado
  checkSession(): void {
    if (this.storageService.isAuthenticated()) {
      console.log('Usuario autenticado');
      this.onRegisterSuccess();
    } else {
      console.log('No autenticado');
    }
  }

  register() {
    this.isLoading = true; // Activar carga
    
    //console.log({ id: Date.now(), name: this.sesion.name, password: this.sesion.password, email: this.sesion.email, avatar: this.sesion.avatar });
    this.userService.postUser({ id: Math.floor(Date.now() / 1000), name: this.sesion.name, password: this.sesion.password, email: this.sesion.email, avatar: this.sesion.avatar }).subscribe(
      (response) => { // cuando se activa 2 veces da error
        // this.datos = response;
        this.isLoading = false; // Desactivar carga

        // this.bds = response;
        // console.log(this.bds);
        // const usuarioCreado = this.bds.find(bd => 
        //   bd.affectedRows == 1
        // );
  
        // if (usuarioCreado) {
        alert('Usuario registrado exitosamente')
        this.onRegisterSuccess();
        // } else {
        //   alert('Usuario registrado incorrectamente');
        // }
      },
      (error) => {
        this.isLoading = false; // Desactivar carga en caso de error
        alert('Error al registrar')
        console.error('Error al registrar usuario', error);
      }
    );
  }
  
}
