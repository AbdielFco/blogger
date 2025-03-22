import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogComponent } from './components/blog/blog.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TendenciesComponent } from './components/tendencies/tendencies.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { RegisterComponent } from './components/register/register.component';
import { BubbleComponent } from './components/bubble/bubble.component';
import { PostComponent } from './components/post/post.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BubbleBackComponent } from './components/bubble-back/bubble-back.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    BlogComponent,
    WelcomeComponent,
    TendenciesComponent,
    ArticlesComponent,
    RegisterComponent,
    BubbleComponent,
    PostComponent,
    SpinnerComponent,
    BubbleBackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
