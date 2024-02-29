import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-audio-learning',
  templateUrl: './audio-learning.page.html',
  styleUrls: ['./audio-learning.page.scss'],
})
export class AudioLearningPage implements OnInit {
  items: any[] = []; 
  audio: HTMLAudioElement;
  constructor(private platform: Platform) {
  this.audio = new Audio();
}
  // path: any;
  id: any;
  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    fetch('/assets/json/data-audio.json') // Đọc tệp JSON từ đường dẫn assets
      .then(response => response.json())
      .then(data => {
        this.items = data;
        // this.path = data.path;
        console.log(this.items);
        console.log(data.id);
      })
      .catch(error => {
        console.error('Error reading JSON file:', error);
      });
  }
  btnAudio(path: string) {
    console.log('Audio Loading');
    if (this.platform.is('cordova')) {
      // For Cordova (mobile) platforms, you might want to use a Cordova plugin like Native Audio
      // Refer to the Native Audio documentation for more details: https://ionicframework.com/docs/native/native-audio
    } else {
      // For non-Cordova platforms (browser), play audio using HTML5 Audio
      this.audio.src = path
      this.audio.load();
      this.audio.play();
    }
  }
}
