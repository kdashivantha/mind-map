import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MindMapComponent } from './mind-map/mind-map.component';
import { NodeDetailComponent } from './node-detail/node-detail.component';
import { MaterialModule } from './material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    MindMapComponent,
    NodeDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MaterialModule,
    FormsModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
