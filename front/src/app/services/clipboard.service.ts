import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor(
    private logger: NGXLogger,
  ) { }

  fallbackCopyTextToClipboard(text: string) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      this.logger.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      this.logger.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      this.logger.log('Async: Copying to clipboard was successful!');
    }, (err) => {
      this.logger.error('Async: Could not copy text: ', err);
    });
  }
}
