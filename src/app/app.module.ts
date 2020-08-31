import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { GraphQLModule } from './graphql.module';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [AppComponent, CustomersComponent, ProductsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
