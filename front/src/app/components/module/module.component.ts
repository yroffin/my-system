import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Module } from 'src/app/models/module.model';
import { ModuleService } from 'src/app/services/module.service';
import { retrievedModuleList } from 'src/app/stats/module.actions';
import { selectModules } from 'src/app/stats/module.selectors';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  @Input() modules: ReadonlyArray<Module> = [];
  modules$ = this.store.select(selectModules);

  constructor(private modulesService: ModuleService,
    private store: Store) {
    this.modules$.subscribe(modules => {
      this.modules = modules;
    })
  }

  ngOnInit(): void {
    this.modulesService
      .getModules()
      .subscribe((modules) => {
        this.store.dispatch(retrievedModuleList({ modules }))
      });
  }

}
