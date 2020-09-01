import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { Customer, Product } from '../types';

export type AllDataQueryResponse = {
  products: Product[];
  customers: Customer[];
};

@Injectable()
export class AllDataQuery extends Query<AllDataQueryResponse> {
  document: DocumentNode = gql`
    query {
      customers {
        id
        firstName
        lastName
        taxId
      }
      products {
        id
        name
        cost
        stock
      }
    }
  `;
}
