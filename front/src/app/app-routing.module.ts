import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CytoscapeComponent } from './components/cytoscape/cytoscape.component';
import { ModuleComponent } from './components/module/module.component';

const routes: Routes = [
  { path: 'modules', component: ModuleComponent },
  { path: 'cytoscape', component: CytoscapeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
