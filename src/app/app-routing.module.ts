import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: 'register', component: RegisterComponent }, // Ruta para el login
  { path: 'home', component: HomeComponent }, // Ruta para el home
  { path: 'blog', component: BlogComponent }, // Ruta para el blog
  { path: 'post/:id', component: PostComponent }, // Agregamos el parámetro ":id"
  { path: '**', redirectTo: '/login' } // Ruta comodín (por si no encuentra la ruta)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
