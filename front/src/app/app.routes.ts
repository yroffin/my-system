import { Routes } from '@angular/router';

import { GraphSelectorComponent } from './components/graph-selector/graph-selector.component';
import { GraphComponent } from './components/graph/graph.component';
import { GraphCytoscapeComponent } from './components/graph-cytoscape/graph-cytoscape.component';
import { ConverterComponent } from './components/converter/converter.component';
import { PreferenceComponent } from './components/preference/preference.component';
import { AboutComponent } from './components/about/about.component';
import { StyleSelectorComponent } from './components/style-selector/style-selector.component';
import { RuleSelectorComponent } from './components/rule-selector/rule-selector.component';

export const routes: Routes = [
    { path: 'graphs', component: GraphSelectorComponent },
    { path: 'graphs/sigma/:label', component: GraphComponent },
    { path: 'graphs/cytoscape/:label', component: GraphCytoscapeComponent },
    { path: 'rules', component: RuleSelectorComponent },
    { path: 'styles', component: StyleSelectorComponent },
    { path: 'converters/images', component: ConverterComponent },
    { path: 'preferences', component: PreferenceComponent },
    { path: 'about', component: AboutComponent }
];
