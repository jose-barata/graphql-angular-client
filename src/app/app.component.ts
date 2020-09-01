import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Subscription } from 'rxjs';
import { AllDataQuery, AllDataQueryResponse } from './graphql/queries/all-data.query';
import { Customer, Product } from './graphql/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  products: Product[];
  customers: Customer[];
  loading = true;

  private querySubcription: Subscription;

  constructor(private allDataQuery: AllDataQuery) {}

  ngOnInit() {
    this.querySubcription = this.allDataQuery
      .watch({
        errorPolicy: 'all',
        fetchPolicy: 'no-cache'
      })
      .valueChanges.subscribe(
        (result: ApolloQueryResult<AllDataQueryResponse>) => {
          this.products = result.data && result.data.products;
          this.customers = result.data && result.data.customers;
          this.loading = result.loading;
          if (result.errors) {
            console.log('Graphql errors', result.errors);
          }
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
