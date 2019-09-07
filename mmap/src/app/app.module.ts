import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MindMapComponent } from './mind-map/mind-map.component';
import { NodeDetailComponent } from './node-detail/node-detail.component';
import { MaterialModule } from './material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxMdModule } from 'ngx-md';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MindMapComponent,
    NodeDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxMdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
