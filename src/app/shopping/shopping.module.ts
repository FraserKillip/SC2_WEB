import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatInputModule, MatProgressSpinnerModule, MatTooltipModule, MatButtonModule } from '@angular/material';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShoppingRoutingModule,
    MatListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  declarations: [ShoppingComponent]
})
export class ShoppingModule { }
