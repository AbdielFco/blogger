import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router) {}
  
  onHomeClick(): void { // utilizar data y ponerla en los inputs
    this.router.navigate(['/home'], { replaceUrl: true }); // Redirige al home
  }  
  onBlogClick(): void { // utilizar data y ponerla en los inputs
    this.router.navigate(['/blog'], { replaceUrl: true }); // Redirige al home
  }  

}
