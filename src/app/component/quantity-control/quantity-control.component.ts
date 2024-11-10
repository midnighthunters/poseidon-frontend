import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-control',
  standalone: true,
  imports: [],
  templateUrl: './quantity-control.component.html',
  styleUrl: './quantity-control.component.css',
})
export class QuantityControlComponent {
  @Input() quantity: number = 0;
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();

  updateQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 0) {
      this.quantity = newQuantity;
      this.quantityChange.emit(this.quantity);
    }
  }
}
