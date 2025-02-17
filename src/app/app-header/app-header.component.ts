import { Component } from '@angular/core';

@Component({
  selector: 'app-app-header',
  standalone: false,
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  selectedItem: string = 'Hotel';

  // Method to handle click event
  onItemClick(item: string) {
    this.selectedItem = item;
  }
}
