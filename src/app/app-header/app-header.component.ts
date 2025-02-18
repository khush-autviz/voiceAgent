import { Component } from '@angular/core';
import { IndustryService, Industry } from '../industry.service';

@Component({
  selector: 'app-app-header',
  standalone: false,
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  selectedItem: Industry = { name: 'Hotel', icon: 'fa-hotel', id: 'agent_721a7d8ecd6e74a524653eaac7' };

  items: Industry[] = [
    { name: 'Hotel', icon: 'fa-hotel', id: 'agent_721a7d8ecd6e74a524653eaac7' },
    { name: 'E-commerce and Retail', icon: 'fa-shop', id: 'agent_72b2a4d78610e47286b74fea09' },
    { name: 'Financial Services', icon: 'fa-building-columns', id: 'agent_ed8364a16c2648c99443424774a' },
    { name: 'Telecommunications', icon: 'fa-tower-cell', id: 'agent_6f8a351140c036c6f50bb6fce7' },
    { name: 'Insurance', icon: 'fa-building-shield', id: 'agent_1e11cd7ecc9669f807f6b9ed32' },
    { name: 'Healthcare', icon: 'fa-hospital', id: 'agent_6793dada8ceb1b742b7d19265a' }
  ];

  constructor(private industryService: IndustryService) {}

  // Method to handle click event
  onItemClick(item: Industry) {
    this.selectedItem = item;
    this.industryService.changeIndustry(item);
  }
}
