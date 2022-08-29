import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleComponent } from './components/module/module.component';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { SplitterModule } from 'primeng/splitter';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';

import { StoreModule } from '@ngrx/store';

import { modulesReducer } from './stats/module.reducer';
import { graphReducer, graphsReducer } from './stats/graph.reducer';
import { GraphComponent } from './components/graph/graph.component';
import { GraphSelectorComponent } from './components/graph-selector/graph-selector.component';
import { GraphCytoscapeComponent } from './components/graph-cytoscape/graph-cytoscape.component';

@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
    GraphComponent,
    GraphSelectorComponent,
    GraphCytoscapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    // PrimeNg
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SplitterModule,
    MenubarModule,
    FormsModule,
    TagModule,
    StoreModule.forRoot({ modules: modulesReducer, graphs: graphsReducer, graph: graphReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
