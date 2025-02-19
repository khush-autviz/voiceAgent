import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RetellWebClient, StartCallConfig } from 'retell-client-js-sdk';
import { IndustryService, Industry } from '../industry.service';

const sdk = new RetellWebClient();

@Component({
  selector: 'app-app-profile',
  standalone: false,
  templateUrl: './app-profile.component.html',
  styleUrls: ['./app-profile.component.scss']
})
export class AppProfileComponent implements OnInit {

  isVoiceDemo: boolean = false;
  isLoading: boolean = false;
  bottomIcons: string[] = [
    'assets/img/icons/call.png',
    'assets/img/icons/mute.png',
    'assets/img/icons/end-call.png'
  ];
  isMuted: boolean = false;
  transcript: { role: string, content: string }[] = [];
  otherAgents = [
    { name: 'Marissa Johnson', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    // { name: 'Olivia Smith', img: 'https://randomuser.me/api/portraits/women/54.jpg' },
    // { name: 'Liam Brown', img: 'https://randomuser.me/api/portraits/men/13.jpg' },
    // { name: 'Noah Wilson', img: 'https://randomuser.me/api/portraits/men/33.jpg' }
  ];

  selectedAgent = this.otherAgents[0];
  selectedIndustry: Industry = { name: 'Hotel', id: 'agent_721a7d8ecd6e74a524653eaac7', icon: 'fa-hotel' }; // Default industry

  constructor(private http: HttpClient, private industryService: IndustryService) { }

  ngOnInit(): void {
    this.industryService.selectedIndustry$.subscribe((industry: Industry) => {
      this.selectedIndustry = industry;
    });
  }

  handleVoiceDemoClick(): void {
    this.isVoiceDemo = !this.isVoiceDemo;
    console.log('Voice demo status:', this.isVoiceDemo);
  }

  changeAgent(agent: { name: string; img: string }): void {
    this.selectedAgent = agent;
    console.log('Agent changed to:', agent.name);
  }

  

  // handleCall(): void {
  //   const apiUrl = 'http://localhost:8000/call';

  //   this.http.get<{ accessToken: string }>(apiUrl).subscribe(
  //     (response) => {
  //       const accessToken = response.accessToken;

  //       const demoStartCallConfig: StartCallConfig = {
  //         accessToken: accessToken,
  //         sampleRate: 48000,
  //         captureDeviceId: 'default-capture-device-id',
  //         playbackDeviceId: 'default-playback-device-id',
  //         emitRawAudioSamples: true
  //       };

  //       sdk.startCall(demoStartCallConfig).then(() => {
  //         console.log('Call started successfully');
  //         sdk.on("update", (update) => {
  //           this.transcript = update.transcript.map((item: any) => `${item.role}: ${item.content}`).join('\n');
  //           console.log("Live Transcript:", this.transcript);
  //         });
  //       }).catch(error => {
  //         console.error('Error starting call:', error);
  //       });
  //     },
  //     (error) => {
  //       console.error('Error fetching access token:', error);
  //     }
  //   );
  // }


  handleCall(): void {
    const apiUrl = 'http://localhost:8000/call';
    const agentId = this.selectedIndustry.id; // Ensure this is the correct agent ID

    // Send agent_id as the key in the request data
    const requestData = {
      agent_id: agentId // Update the key to `agent_id`
    };

    this.isLoading = true

    this.http.post<{ accessToken: string }>(apiUrl, requestData).subscribe(
      (response) => {
        const accessToken = response.accessToken;

        const demoStartCallConfig: StartCallConfig = {
          accessToken: accessToken,
          sampleRate: 48000,
          captureDeviceId: 'default-capture-device-id',
          playbackDeviceId: 'default-playback-device-id',
          emitRawAudioSamples: true
        };


        sdk.startCall(demoStartCallConfig).then(() => {
          this.isLoading = false
          console.log('Call started successfully');
          sdk.on("update", (update) => {
            this.transcript = update.transcript.map((item: any) => ({
              role: item.role,
              content: item.content
            }));
            console.log("Live Transcript:", this.transcript);
          });
        }).catch(error => {
          console.error('Error starting call:', error);
        });
      },
      (error) => {
        console.error('Error fetching access token:', error);
      }
    );
  }


  handleCallEnd(): void {
    console.log("Call ended");
    sdk.stopCall();
  }

  handleMute(): void {
    if (this.isMuted) {
      sdk.unmute();
    } else {
      sdk.mute();
    }
    this.isMuted = !this.isMuted;
    console.log('Microphone Muted:', this.isMuted);
  }

}
