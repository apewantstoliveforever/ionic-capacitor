import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Howl, Howler } from "howler";
import { IonRange, IonContent } from "@ionic/angular";


export interface Track {
  id: number | null;
  name: string;
  path: string;
  audioArray?: any;
}

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.page.html',
  styleUrls: ['./music-player.page.scss'],
})
export class MusicPlayerPage implements OnInit {
  constructor() { }
  @ViewChild(IonContent, { read: IonContent })
  myContent!: IonContent;

  @ViewChild('scrollableList') scrollableList: any;


  ngOnInit() {

  }

  playlist: Track[] = [
    {
      id: 1,
      name: "concatenated",
      path: "./assets/sounds/concatenated.mp3",
      audioArray: './assets/sounds/concatenated.json'
    },
    {
      id: 2,
      name: "The Curious Caterpillar",
      path: "./assets/sounds/The Curious Caterpillar.mp3",
      audioArray: './assets/sounds/The Curious Caterpillar.json'
    }
  ];

  activeParagraphIndex: number | null = null;
  activeParagraphText: string | undefined;
  activeTrack: Track = { id: null,  name: "", path: "", audioArray: "" };
  player: Howl | undefined;
  isPlaying = false;
  hiddenContent = false;
  selectedSpeechRate: number = 1;
  progress = 0;
  public currentTime = "0:00"; // Current playback time
  public totalDuration = "0:00"; // Total duration of the track

  lyrics: any;

  @ViewChild("range", { static: false }) range!: IonRange;


  start(track: Track) {
    const json = track.audioArray;
    if (json) {
      fetch(json)
        .then((response) => response.json())
        .then((data) => {
          this.lyrics = data.audioArray;
          // this.updateActiveParagraph(seekTime);
        });
    }
    if (this.player) {
      this.player.stop();
    }
    this.activeTrack = track;
    console.log("start", this.activeTrack);
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        console.log("onplay");
        this.isPlaying = true;
        this.updateProgress();
      },
      onend: () => {
        console.log("onend");
        this.isPlaying = false;
        this.currentTime = "0:00"; // Reset current time when playback ends
      },
    });
    this.player.play();
    this.hiddenContent = !this.hiddenContent;
  }

  restart() {
    if (this.player) {
      this.player.stop();
      this.player.play();
    }
  }

  trackBackward() {
    const seek = this.player ? this.player.seek() : 0;
    const newSeek = Math.max(seek - 2, 0); // Ensure seek time does not go below 0
    this.player?.seek(newSeek);
    this.updateProgress();
  }
  trackMoveUpard() {
    const seek = this.player ? this.player.seek() : 0;
    const newSeek = Math.max(seek + 2, 0); // Ensure seek time does not go below 0
    this.player?.seek(newSeek);
    this.updateProgress();
  }

  // tracking back 2s

  togglePlayer(pause: boolean) {
    if (!this.player) return;
    this.isPlaying = !pause;
    pause ? this.player.pause() : this.player.play();
  }

  next() {
    const index = this.playlist.findIndex(track => track === this.activeTrack);
    const nextIndex = (index + 1) % this.playlist.length;
    this.start(this.playlist[nextIndex]);
  }

  prev() {
    const index = this.playlist.findIndex(track => track === this.activeTrack);
    const prevIndex = (index - 1 + this.playlist.length) % this.playlist.length;
    this.start(this.playlist[prevIndex]);
  }

  seek() {
    const newValue = +this.range.value;
    const duration = this.player ? this.player.duration() : 0;
    if (!duration) return;
    const seekTime = (duration * newValue) / 100;
    this.player?.seek(seekTime);
    //scroll to paragraph
    //open the json file

    if (this.lyrics) {
      for (let i = 0; i < this.lyrics.length; i++) {
        const audio = this.lyrics[i];
        if (seekTime >= audio.start && seekTime <= audio.end) {
          if (this.activeParagraphIndex === i) {
            break;
          }
          this.activeParagraphIndex = i;

          this.scrolltoParagraph(i); // Call scrollToParagraph when active paragraph changes
          break;
        }
      }
    }
  }

  updateProgress() {
    if (!this.player) return;
    const seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    this.currentTime = this.formatTime(Math.round(seek)); // Format current time
    this.totalDuration = this.formatTime(Math.round(this.player?.duration() || 0)); // Format total duration
    // console.log("updateProgress", this.progress, this.currentTime, this.totalDuration);
    if (this.lyrics) {
      for (let i = 0; i < this.lyrics.length; i++) {
        const audio = this.lyrics[i];
        if (seek >= audio.start && seek <= audio.end) {
          if (this.activeParagraphIndex === i) {
            break;
          }
          this.activeParagraphIndex = i;
          this.scrolltoParagraph(i); // Call scrollToParagraph when active paragraph changes
          break;
        }
      }
    }

    if (this.isPlaying) {
      requestAnimationFrame(() => this.updateProgress());
    }
  }
  formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const displaySeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;
    return `${minutes}:${displaySeconds}`;
  }

  forwardToFirst() {
    //select the first track
    this.start(this.playlist[0]);
  }

  forwardToLast() {
    //select the last track
    this.start(this.playlist[this.playlist.length - 1]);
  }
  OpenContentMenu() {
    this.hiddenContent = !this.hiddenContent;
  }
  speechUp() {
    if (!this.player) {
      return
    }
    console.log(this.selectedSpeechRate);
    this.player.rate(this.selectedSpeechRate)
  }

  // scrolltoParagraph(index: number) {
  //   this.activeParagraphIndex = index;
  //   if (this.activeTrack) {
  //     const paragraphArray = this.activeTrack.audioArray
  //     if (paragraphArray) {
  //       const paragraph = paragraphArray[index];
  //       console.log(paragraph.text);
  //     }
  //   }

  //   console.log("scrolltoParagraph", this.scrollableList);
  //   console.log("scrolltoParagraph", this.scrollableList.el);
  //   const container = this.scrollableList.el;
  //   //query
  //   const activeItem = container.querySelector('.active-paragraph');
  //   console.log("scrolltoParagraph", activeItem);
  //   //scroll to activeItem
  //   if (activeItem) {
  //     activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //   }
  //   // const element = this.scrollList.nativeElement.children[index];
  //   // this.content.scrollToPoint(0, element.offsetTop, 500);
  // }

  scrolltoParagraph(index: number) {
    this.activeParagraphIndex = index;
    if (this.lyrics) {
      const paragraphArray = this.lyrics;
      if (paragraphArray) {
        const paragraph = paragraphArray[index];
        console.log(paragraph.text);
        this.activeParagraphText = paragraph.text;
      }
    }
  }
}
