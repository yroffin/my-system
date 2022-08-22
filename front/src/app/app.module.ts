import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleComponent } from './components/module/module.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { StoreModule } from '@ngrx/store';

import { modulesReducer } from './stats/module.reducer';
import { HttpClientModule } from '@angular/common/http';
import { CytoscapeComponent } from './components/cytoscape/cytoscape.component';

import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MenubarModule } from 'primeng/menubar'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { TabViewModule } from 'primeng/tabview'
import { TooltipModule } from 'primeng/tooltip'
import { CheckboxModule } from 'primeng/checkbox'
import { CytoscapeAngularModule } from 'cytoscape-angular'

@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
    CytoscapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    // Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    // Primeng
    ButtonModule,
    InputTextModule,
    MenubarModule,
    OverlayPanelModule,
    TabViewModule,
    TooltipModule,
    CheckboxModule,
    // Cytoscape
    CytoscapeAngularModule,
    StoreModule.forRoot({ modules: modulesReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
