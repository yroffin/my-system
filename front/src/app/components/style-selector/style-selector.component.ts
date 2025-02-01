import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SysTag, SysTags } from '../../models/style';
import { ClipboardService } from '../../services/clipboard.service';
import { StyleService } from '../../services/style.service';
import { retrievedStyle, retrievedStyleList } from '../../stats/style.actions';
import { selectStyle, selectStyles } from '../../stats/style.selectors';
import { JsonPipe } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-style-selector',
  templateUrl: './style-selector.component.html',
  styleUrls: ['./style-selector.component.css'],
  imports: [JsonPipe, DialogModule, ToastModule, ConfirmPopupModule, TableModule, InputTextModule, ToolbarModule, FormsModule],
})
export class StyleSelectorComponent implements OnInit {

  style?: SysTags = undefined;
  styles: Array<SysTags> = [];
  newStyle?: string

  displayStyle: boolean = false;
  selectedStyle?: SysTags

  style$;
  styles$;

  constructor(
    private router: Router,
    private logger: NGXLogger,
    private styleService: StyleService,
    private clipboardService: ClipboardService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private store: Store) {

    this.style$ = this.store.select(selectStyle);
    this.styles$ = this.store.select(selectStyles);

    this.style$.subscribe(_style => {
      if (!_style) {
        return
      }
      this.style = _style
    })
    this.styles$.subscribe(_styles => {
      if (!_styles) {
        return
      }
      this.styles = _.map(_styles, (style) => {
        return {
          id: style.id,
          tags: style.tags
        }
      });
    })
  }

  ngOnInit(): void {
    let styles = this.styleService.findAll()
    this.store.dispatch(retrievedStyleList({ styles }))
  }

  confirm(event: Event, _style: SysTags) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure that you want to proceed ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteStyle(_style)
      },
      reject: () => {
      }
    });
  }

  selectStyle(_style: SysTags): void {
    this.selectedStyle = this.styleService.findOne(_style.id)
    this.logger.info(this.selectedStyle)
    this.displayStyle = true
  }

  deleteStyle(_style: SysTags): void {
    let styles = this.styleService.delete(_style.id)
    this.store.dispatch(retrievedStyleList({ styles }))
  }

  openNew(name?: string): void {
    if (name) {
      this.styleService.store({
        id: name,
        tags: []
      }, (entity) => {
        entity.tags = []
      })
      let styles = this.styleService.findAll()
      this.logger.info(styles)
      this.store.dispatch(retrievedStyleList({ styles }))
    }
  }

  onFileDropped(event: any): void {
    let filename = event[0].name
    if (filename.endsWith(".json")) {
      this.onFileStyleDropped(event)
      return
    }
  }

  onFileStyleDropped(event: any): void {
    let style = event[0].name
    this.messageService.add({
      key: 'bc', severity: 'info', summary: 'Upload/Style', detail: `Filename ${style}`
    });
    let reader = new FileReader();
    reader.addEventListener("loadend", async () => {
      let tags: Array<SysTag> = JSON.parse(reader.result + "")
      this.styleService.store({
        id: style,
        tags
      }, (entity) => {
        entity.tags = tags
      })
      let styles = this.styleService.findAll()
      this.store.dispatch(retrievedStyleList({ styles: styles }))
    });
    reader.readAsText(event[0])
  }
}