import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Microphone, AudioRecording } from '@mozartec/capacitor-microphone';
// import { translate } from '@vitalets/google-translate-api';
// import createHttpProxyAgent from 'http-proxy-agent';
import { ModalController } from '@ionic/angular';
import { OpenModalComponent } from '../open-modal/open-modal.component';


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.page.html',
  styleUrls: ['./create-book.page.scss'],
})
export class CreateBookPage implements OnInit, AfterViewInit {
  @ViewChild('selectableText', { static: true })
  selectableText!: ElementRef;
  @ViewChild('selectableParagraph', { static: true }) selectableParagraph!: ElementRef;
  @ViewChild('clickText', { static: true })
  clickText!: ElementRef;
  timer: any = null;
  selectedRange: any;
  swiperText: string | undefined;
  private apiUrl = 'https://api-free.deepl.com/v2/translate';
  private authKey = 'cc0935cc-04b8-4a00-afe9-fcd5e43f9300:fx';
  recording!: AudioRecording;
  webPaths = [];
  dataUrls = []; // Replace with your actual API key


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.timer = setInterval(this.getSelectedRange, 150);
  }

  ngAfterViewInit() {
  }

  getSelectedRange = () => {
    try {
      if (window.getSelection) {
        this.selectedRange = window.getSelection()?.getRangeAt(0);
        // console.log('selectedRange', this.selectedRange);
      } else {
        this.selectedRange = document.getSelection()?.getRangeAt(0);
        // console.log('selectedRange', this.selectedRange);
      }
    } catch (err) { }
  };
  async showtheText() {
    console.log("swiper");
    //add text true to clickText
    // this.clickText.nativeElement.textContent = this.selectedRange?.toString();
    // this.clickText.nativeElement.style.display = 'block';
    // this.clickText.nativeElement.style.color = 'red';
    // this.clickText.nativeElement.style.backgroundColor = 'yellow';
    if (this.selectedRange) {
      const rect = this.selectedRange?.getBoundingClientRect();
      // Clear previously displayed rectangles
      this.clearSelectionRectangles();
      // Create a div for the rectangle
      const rectangle = document.createElement('div');
      rectangle.classList.add('selection-rectangle');
      rectangle.textContent = this.selectedRange?.toString();
      this.swiperText = this.selectedRange?.toString();
      // Position the rectangle above the selected text within the #selectableText div
      rectangle.style.top = `${rect?.top - this.selectableText.nativeElement.getBoundingClientRect().top}px`;
      rectangle.style.border = '1px solid red';
      rectangle.style.position = 'absolute';
      rectangle.style.width = `${rect?.width}px + 10px`;
      rectangle.style.height = `${rect?.height} + 10px`;
      //left is in the middle of the text
      rectangle.style.left = `${rect?.left - this.selectableText.nativeElement.getBoundingClientRect().left + (rect?.width / 2)}px`;
      rectangle.style.maxWidth = '200px';
      rectangle.style.backgroundColor = 'blue';
      rectangle.style.zIndex = '1000';
      // Append the rectangle to the #selectableText div
      this.selectableText.nativeElement.appendChild(rectangle);
      await this.translateText(this.selectedRange?.toString(), 'DE').then((res) => {
        console.log('res', res);
      });
    }
  }


  async handleSelection(event: MouseEvent) {

    // let selection = null;
    // // console.log('sss', window.getSelection())
    // selection = window.getSelection()?.getRangeAt(0); // Get the selection range
    // // //get the selected text for  android
    // // console.log('selection', selection);
    // if (window.getSelection) {
    //   selection = window.getSelection()?.getRangeAt(0);
    // } else if (typeof document.getSelection != "undefined") {
    //   selection = document.getSelection()?.getRangeAt(0);
    //   console.log('android');
    // }
    // console.log('handleSelection', selection);

    // const selectedText = selection?.toString().trim(); // Get the selected text
    // if (selectedText) {
    //   const rect = selection?.getBoundingClientRect(); // Get the position of the selected text

    //   // Clear previously displayed rectangles
    //   this.clearSelectionRectangles();

    //   // Create a div for the rectangle
    //   const rectangle = document.createElement('div');
    //   rectangle.classList.add('selection-rectangle');
    //   rectangle.textContent = selectedText;

    //   // const textContent = await this.translateText(selectedText);
    //   // console.log('textContent', textContent);

    //   if (rect) {
    //     // Position the rectangle above the selected text within the #selectableText div
    //     rectangle.style.top = `${rect?.top - this.selectableText.nativeElement.getBoundingClientRect().top}px`;
    //     rectangle.style.left = `${rect?.left - this.selectableText.nativeElement.getBoundingClientRect().left}px`;
    //     rectangle.style.border = '1px solid red';
    //     rectangle.style.position = 'absolute';
    //     rectangle.style.width = `${rect?.width}px`;
    //     rectangle.style.height = `${rect?.height}px`;
    //     rectangle.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    //     rectangle.style.zIndex = '1000';
    //     // Append the rectangle to the #selectableText div
    //     this.selectableText.nativeElement.appendChild(rectangle);
    //   }
    // }
  }

  showTextRectangle(textElement: any) {
    console.log('text', textElement.textContent);
    if (textElement) {
      //clear previously displayed rectangles
      this.clearSelectionRectangles();
      //add rect on the top of textElements
      const rect = textElement.getBoundingClientRect();
      const rectangle = document.createElement('div');
      rectangle.classList.add('selection-rectangle');
      rectangle.textContent = textElement.textContent;
      // Position the rectangle above the selected text within the #selectableText div
      rectangle.style.top = `${rect.top - this.selectableText.nativeElement.getBoundingClientRect().top}px`;
      rectangle.style.left = `${rect.left - this.selectableText.nativeElement.getBoundingClientRect().left}px`;
      rectangle.style.border = '1px solid red';
      rectangle.style.position = 'absolute';
      rectangle.style.width = `${rect.width}px`;
      rectangle.style.height = `${rect.height}px`;
      rectangle.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
      rectangle.style.zIndex = '1000';
      // Append the rectangle to the #selectableText div
      this.selectableText.nativeElement.appendChild(rectangle);
    }
    this.openModal();
  }

  // Function to clear previously displayed rectangles
  clearSelectionRectangles() {
    const existingRectangles = this.selectableText.nativeElement.querySelectorAll('.selection-rectangle');
    existingRectangles.forEach((rectangle: { remove: () => any; }) => rectangle.remove());
  }

  translateText(text: string, targetLang: string): Promise<any> {
    const requestBody = {
      text: [text],
      target_lang: targetLang
    };

    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${this.authKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error translating text:', error);
        throw error;
      });
  }

  handleClick(text: string) {
    console.log('text', text);
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: OpenModalComponent,
    });
    await modal.present();
  }
  getAudio() {

  }

}
