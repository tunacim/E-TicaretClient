import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    OrdersModule,
    ProductsModule,
    CustomersModule,
    DashboardModule
  ],

})
export class ComponentsModule { }
