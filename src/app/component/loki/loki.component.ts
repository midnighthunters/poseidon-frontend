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
  largeImage: string = 'assets/001.jpeg';
  smallImages: string[] = [
    'assets/001.jpeg',
    'assets/002.jpeg',
    'assets/003.jpeg',
    'assets/004.jpeg',
  ];

  // Change large image on click
  changeLargeImage(image: string) {
    this.largeImage = image.replace('small', 'large'); // assuming large images follow this naming pattern
  }
}
