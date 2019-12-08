import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { SystemtreeComponent } from './systemtree/systemtree.component';
import { SystemtreeService } from './service/systemtree.service';
import { ClickComponent } from './click/click.component';
import { D3Service } from './service/d3.service';

@NgModule({
  declarations: [
    AppComponent,
    SystemtreeComponent,
    ClickComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SystemtreeService,D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
