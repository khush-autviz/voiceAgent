import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Define an interface for the industry object
export interface Industry {
  name: string;
  id: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  // BehaviorSubject to track the selected industry
  private selectedIndustrySource = new BehaviorSubject<Industry>({ name: 'Hotel', id: 'agent_721a7d8ecd6e74a524653eaac7', icon: 'fa-hotel' });
  selectedIndustry$ = this.selectedIndustrySource.asObservable();

  // Method to change the selected industry
  changeIndustry(industry: Industry): void {
    this.selectedIndustrySource.next(industry);
  }
}
