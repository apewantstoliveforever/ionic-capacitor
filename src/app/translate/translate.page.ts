import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.page.html',
  styleUrls: ['./translate.page.scss'],
})
export class TranslatePage implements OnInit {
  constructor() {}

  ngOnInit() {}
  name = 'Angular ' + VERSION.major;

  targetPrefix(event: any): void {
    let s = window.getSelection();
    let start = event.target.selectionStart; // save cursor position

    //@ts-ignore
    s.modify('extend', 'backward', 'word');
    let b = s?.toString();

    //@ts-ignore
    s.modify('extend', 'forward', 'word');
    let a = s?.toString();
    if(a&&b) {
      console.log('the clicked word is ==>', b + a);
      
    }
    s?.removeAllRanges(); //clear selection
    document.getElementsByTagName('textarea')[0].selectionStart = start; // restore cursor
  }
  highlightSelectedWord(selectedWord: string): void {
    const textarea = document.getElementsByTagName('textarea')[0];
    const currentContent = textarea.value;
    const highlightedContent = currentContent.replace(selectedWord, `<span class="selected-word">${selectedWord}</span>`);
    textarea.innerHTML = highlightedContent;
  }
}
