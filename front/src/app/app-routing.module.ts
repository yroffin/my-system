import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphSelectorComponent } from './components/graph-selector/graph-selector.component';
import { GraphComponent } from './components/graph/graph.component';
import { Graphd3Component } from './components/graphd3/graphd3.component';
import { ModuleComponent } from './components/module/module.component';

const routes: Routes = [
  { path: 'modules', component: ModuleComponent },
  { path: 'browse', component: GraphSelectorComponent },
  { path: 'graph/:label', component: GraphComponent },
  { path: 'graphd3/:label', component: Graphd3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
