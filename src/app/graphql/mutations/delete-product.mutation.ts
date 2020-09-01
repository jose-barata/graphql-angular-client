import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export type DeleteProductMutationResponse = {
  deleteProduct: boolean;
};

@Injectable()
export class DeleteProductMutation extends Mutation<DeleteProductMutationResponse> {
  document: DocumentNode = gql`
    mutation deleteProduct($id: Int!) {
      deleteProduct(id: $id)
    }
  `;
}
