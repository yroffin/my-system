import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SysRules } from '../../models/rule.model';

import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RuleApiService } from '../../services/data/rule-api.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-rule-selector',
  templateUrl: './rule-selector.component.html',
  styleUrls: ['./rule-selector.component.css'],
  imports: [ConfirmPopupModule, InputTextModule, FormsModule, TextareaModule, TableModule, ToastModule, ToolbarModule, ButtonModule]
})
export class RuleSelectorComponent implements OnInit {

  rules!: SysRules[]

  constructor(
    private router: Router,
    private logger: NGXLogger,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ruleApiService: RuleApiService,
  ) {
    this.ruleApiService.findAllLazy().then((rules) => {
      this.rules = rules;
    })
  }

  ngOnInit(): void {
  }

  selectRuleset(rule: any): void {
    this.router.navigate(['rules', rule.location])
  }

  onFileDropped(event: any): void {
    let filename = event[0].name
    this.logger.info("Load file", filename)

    let ext: string = ""
    if (filename.endsWith(".json")) {
      ext = "json"
    }
    if (filename.endsWith(".csv")) {
      ext = "csv"
    }

    let reader = new FileReader();

    // Data listener
    reader.addEventListener("loadend", async () => {
      this.messageService.add({
        key: 'bc', severity: 'info', summary: 'Drop', detail: `Filename ${filename}`
      });

      // Load this rules
      this.logger.info("UPDATE", filename, JSON.parse(reader.result + ""))
      /* TODO
      this.rulesService.load(filename, JSON.parse(reader.result + ""))
      this.logger.info("REFRESH")
      this.rules = this.rulesService.findAll()
      */
    });

    // Start reading data
    reader.readAsText(event[0])
  }

  select(rule: SysRules) {
    this.router.navigate(['rules', rule.id])
  }

  confirm($event: MouseEvent, rule: SysRules) {
    this.confirmationService.confirm({
      target: $event.target || undefined,
      message: 'Are you sure that you want to proceed ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /**
         * TODO
        this.rules = this.rulesService.delete(rule.id)
         */
      },
      reject: () => {
      }
    });
  }

}
