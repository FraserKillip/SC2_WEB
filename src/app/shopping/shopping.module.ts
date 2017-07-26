import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ShoppingRoutingModule
  ],
  declarations: [ShoppingComponent]
})
export class ShoppingModule { }
