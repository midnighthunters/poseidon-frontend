import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loki',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loki.component.html',
  styleUrl: './loki.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LokiComponent {
  // Initialize images
  largeImage: string = 'assets/005.jpg';
  smallImages: string[] = [
    'assets/001.jpg',
    'assets/002.jpg',
    'assets/003.jpg',
    'assets/004.jpg',
  ];

  // Change large image on click
  changeLargeImage(image: string) {
    this.largeImage = image.replace('small', 'large'); // assuming large images follow this naming pattern
  }
}
