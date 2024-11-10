import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { HeaderComponent } from './component/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LokiComponent } from './component/loki/loki.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HomeComponent,
    CheckoutComponent,
    LokiComponent,
    RouterOutlet,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'koli_frontend';

  showHeader: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        this.showHeader = this.shouldShowHeader(event.url);
        console.log(this.showHeader);
      }
    });
  }

  private shouldShowHeader(url: string): boolean {
    return !(url === '/home' || url === '/');
  }
}
