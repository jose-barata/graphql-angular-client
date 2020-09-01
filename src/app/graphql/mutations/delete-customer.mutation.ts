import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export type DeleteCustomerMutationResponse = {
  deleteCustomer: boolean;
};

@Injectable()
export class DeleteCustomerMutation extends Mutation<DeleteCustomerMutationResponse> {
  document: DocumentNode = gql`
    mutation deleteCustomer($id: Int!) {
      deleteCustomer(id: $id)
    }
  `;
}
