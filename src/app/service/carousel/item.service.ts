import { Injectable } from '@angular/core';
import { Item } from '../../models/carousel-item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: Item[] = [
    {
      id: 1,
      title: 'Item 1',
      description: 'Description for Item 1',
      imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais',
    },{
      id: 2,
      title: 'Item 2',
      description: 'Description for Item 1',
      imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais',
    },{
      id: 3,
      title: 'Item 3',
      description: 'Description for Item 1',
      imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais',
    },
    // Add more items here
  ];

  constructor() {}

  getAllItems(): Item[] {
    return this.items;
  }
}
