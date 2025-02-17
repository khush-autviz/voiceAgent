import { Component } from '@angular/core';

@Component({
  selector: 'app-app-profile',
  standalone: false,
  templateUrl: './app-profile.component.html',
  styleUrl: './app-profile.component.scss'
})
export class AppProfileComponent {

  isVoiceDemo: boolean = false;
  bottomIcons: string[] = ['/assets/img/icons/call.png', '/assets/img/icons/mute.png', '/assets/img/icons/end-call.png'];
  otherAgents: string[] = [
    'https://randomuser.me/api/portraits/women/45.jpg',
    'https://randomuser.me/api/portraits/women/54.jpg',
    'https://randomuser.me/api/portraits/men/13.jpg',
    'https://randomuser.me/api/portraits/men/33.jpg',
  ];

  // Method to handle voice demo click
  handleVoiceDemoClick(): void {
    this.isVoiceDemo = !this.isVoiceDemo;
    console.log('Voice demo status:', this.isVoiceDemo);
  }

  // Method for bottom icon click (placeholder)
  handleIconClick(icon: string): void {
    console.log('Icon clicked:', icon);
  }
}

