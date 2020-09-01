import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { Customer } from '../types';

export type CustomerMutationResponse = {
  createCustomer: Customer;
};

@Injectable()
export class CreateCustomerMutation extends Mutation<CustomerMutationResponse> {
  document: DocumentNode = gql`
    mutation createCustomer($firstName: String!, $lastName: String!, $taxId: Int!) {
      createCustomer(firstName: $firstName, lastName: $lastName, taxId: $taxId) {
        id
        firstName
        lastName
        taxId
      }
    }
  `;
}
