import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SysRule, SysRules } from 'src/app/models/rule.model';
import { RulesService } from 'src/app/services/rules.service';

@Component({
  selector: 'app-rule-selector',
  templateUrl: './rule-selector.component.html',
  styleUrls: ['./rule-selector.component.css']
})
export class RuleSelectorComponent implements OnInit {

  rules!: SysRules[]

  constructor(
    private router: Router,
    private logger: NGXLogger,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private rulesService: RulesService,
  ) {
    this.rules = this.rulesService.findAll()
  }

  ngOnInit(): void {
  }

  onFileDropped(event: any): void {
    let filename = event[0].name
    this.logger.info("Load file", filename)

    let id = event[0].name
    this.messageService.add({
      key: 'bc', severity: 'info', summary: 'Drop', detail: `Filename ${event[0].name}`
    });

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
      // Load this rules
      this.rulesService.load(filename, JSON.parse(reader.result + ""))
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
        this.rules = this.rulesService.delete(rule.id)
      },
      reject: () => {
      }
    });
  }

}
