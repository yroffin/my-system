import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleComponent } from './components/module/module.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { ContextMenuModule } from 'primeng/contextmenu';
import { MenubarModule } from 'primeng/menubar';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

import { StoreModule } from '@ngrx/store';

import { modulesReducer } from './stats/module.reducer';
import { graphsReducer } from './stats/graph.reducer';
import { GraphComponent } from './components/graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
    GraphComponent
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
    // PrimeNg
    MenubarModule,
    ContextMenuModule,
    FileUploadModule,
    ButtonModule,
    InputTextareaModule,
    ConfirmDialogModule,
    DialogModule,
    StoreModule.forRoot({ modules: modulesReducer, graphs: graphsReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
