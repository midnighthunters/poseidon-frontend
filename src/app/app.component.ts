import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { HeaderComponent } from './component/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,HomeComponent,CheckoutComponent,RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'koli_frontend';
}
