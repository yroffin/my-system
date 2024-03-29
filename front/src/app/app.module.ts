import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';

import { StoreModule } from '@ngrx/store';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { graphReducer, graphsReducer } from './stats/graph.reducer';
import { GraphComponent } from './components/graph/graph.component';
import { GraphSelectorComponent } from './components/graph-selector/graph-selector.component';
import { GraphCytoscapeComponent } from './components/graph-cytoscape/graph-cytoscape.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { ListboxModule } from 'primeng/listbox';
import { dropZoneDirective } from './directives/dropzone/dropzone';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DockModule } from 'primeng/dock';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConverterComponent } from './components/converter/converter.component';
import { PreferenceComponent } from './components/preference/preference.component';
import { PreferencesReducer } from './stats/preference.reducer';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { AboutComponent } from './components/about/about.component';
import { ThreejsComponent } from './components/threejs/threejs.component';
import { StyleSelectorComponent } from './components/style-selector/style-selector.component';
import { styleReducer, stylesReducer } from './stats/style.reducer';
import { RuleSelectorComponent } from './components/rule-selector/rule-selector.component';
import { RuleViewerComponent } from './components/rule-viewer/rule-viewer.component';
import { menuReducer, parameterReducer } from './stats/menu.reducer';
import { GraphPaperComponent } from './components/graph-paper/graph-paper.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    GraphSelectorComponent,
    GraphCytoscapeComponent,
    // Directive
    dropZoneDirective,
    ConverterComponent,
    PreferenceComponent,
    AboutComponent,
    ThreejsComponent,
    StyleSelectorComponent,
    RuleSelectorComponent,
    RuleViewerComponent,
    GraphPaperComponent
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG
    }),
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
    InputSwitchModule,
    SplitterModule,
    MenubarModule,
    FormsModule,
    TagModule,
    TabViewModule,
    OverlayPanelModule,
    ConfirmPopupModule,
    TreeModule,
    TreeTableModule,
    ToastModule,
    ListboxModule,
    SidebarModule,
    CardModule,
    AccordionModule,
    DockModule,
    AvatarModule,
    CheckboxModule,
    PanelModule,
    ChartModule,
    TooltipModule,
    ToggleButtonModule,
    FieldsetModule,
    DividerModule,
    BadgeModule,
    StoreModule.forRoot({
      graphs: graphsReducer,
      graph: graphReducer,
      styles: stylesReducer,
      style: styleReducer,
      menu: menuReducer,
      preferences: PreferencesReducer,
      parameter: parameterReducer
    })
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
