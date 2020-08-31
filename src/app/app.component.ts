import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { QUERY_CUSTOMERS_AND_PRODUCTS } from './queries';
import { Customer, Product, Query } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  products: Product[];
  customers: Customer[];
  loading = true;

  private querySubcription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubcription = this.apollo
      .watchQuery({
        query: QUERY_CUSTOMERS_AND_PRODUCTS,
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      })
      .valueChanges.subscribe(
        (result: ApolloQueryResult<Query>) => {
          this.products = result.data && result.data.products;
          this.customers = result.data && result.data.customers;
          this.loading = result.loading;
          console.log('Graphql errors', result.errors);
        },
        (error: HttpErrorResponse) => {
          console.log('there was an error sending the query', error.message);
        }
      );
  }

  ngOnDestroy(): void {
    this.querySubcription.unsubscribe();
  }
}
