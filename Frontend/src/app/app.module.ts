import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
//import forms and http module
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { CartItemComponent } from "./cart-item/cart-item.component";

//need to add forms and http modules inside imports array
@NgModule({
  declarations: [AppComponent, CartItemComponent],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
