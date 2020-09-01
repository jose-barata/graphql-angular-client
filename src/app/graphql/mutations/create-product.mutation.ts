import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { Product } from '../types';

export type CreateProductMutationResponse = {
  createProduct: Product;
};

@Injectable()
export class CreateProductMutation extends Mutation<CreateProductMutationResponse> {
  document: DocumentNode = gql`
    mutation createProduct($name: String!, $cost: Int!, $stock: Int!) {
      createProduct(name: $name, cost: $cost, stock: $stock) {
        id
        name
        cost
        stock
      }
    }
  `;
}
