import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphSelectorComponent } from './components/graph-selector/graph-selector.component';
import { GraphComponent } from './components/graph/graph.component';
import { GraphCytoscapeComponent } from './components/graph-cytoscape/graph-cytoscape.component';

const routes: Routes = [
  { path: 'graphs', component: GraphSelectorComponent },
  { path: 'graphs/sigma/:label', component: GraphComponent },
  { path: 'graphs/cytoscape/:label', component: GraphCytoscapeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
