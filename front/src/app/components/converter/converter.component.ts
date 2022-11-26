import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { MessageService } from 'primeng/api';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  @ViewChild('myImg') myImg?: ElementRef;

  viewer: string = "data:image/png;base64,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"

  constructor(
    private logger: NGXLogger,
    private messageService: MessageService,
    private clipboardService: ClipboardService,
    private converterService: ConverterService
  ) { }

  ngOnInit(): void {
  }

  onFileDropped(event: any): void {
    // Convert to base64
    this.converterService.uploadHandler(event[0]).then((loaded) => {
      this.logger.info(loaded)

      if (loaded.startsWith("PHN2Z")) {
        this.messageService.add({
          severity: 'info', summary: 'Copied to clipboard/SVG', detail: `Filename ${event[0].name}`
        });
        this.viewer = "data:image/svg+xml;base64," + loaded
        this.clipboardService.copyTextToClipboard("data:image/svg+xml;base64," + loaded)
      }

      if (loaded.startsWith("iVBOR")) {
        this.messageService.add({
          severity: 'info', summary: 'Copied to clipboard/PNG', detail: `Filename ${event[0].name}`
        });
        this.viewer = "data:image/png;base64," + loaded
        this.clipboardService.copyTextToClipboard("data:image/png;base64," + loaded)
      }

      if (loaded.startsWith("UklGR")) {
        this.messageService.add({
          severity: 'info', summary: 'Copied to clipboard/WEBP', detail: `Filename ${event[0].name}`
        });
        this.viewer = "data:image/webp;base64," + loaded
        this.clipboardService.copyTextToClipboard("data:image/webp;base64," + loaded)
      }
    })
  }
}
