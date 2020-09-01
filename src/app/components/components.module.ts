import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { GraphQLModule } from '../graphql/graphql.module';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [CustomersComponent, ProductsComponent],
  exports: [CustomersComponent, ProductsComponent],
  imports: [
    CommonModule,
    GraphQLModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ComponentsModule {}
