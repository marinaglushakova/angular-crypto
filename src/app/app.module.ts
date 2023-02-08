import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { AddTickerComponent } from './components/add-ticker/add-ticker.component';
import { GraphComponent } from './components/graph/graph.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoListComponent,
    AddTickerComponent,
    GraphComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
