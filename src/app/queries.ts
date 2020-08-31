import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const QUERY_CUSTOMERS_AND_PRODUCTS: DocumentNode = gql`
  {
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

export const CREATE_CUSTOMER_MUTATION: DocumentNode = gql`
  mutation createCustomer(
    $firstName: String!
    $lastName: String!
    $taxId: Int!
  ) {
    createCustomer(firstName: $firstName, lastName: $lastName, taxId: $taxId) {
      id
      firstName
      lastName
      taxId
    }
  }
`;

export const CREATE_PRODUCT_MUTATION: DocumentNode = gql`
  mutation createProduct($name: String!, $cost: Int!, $stock: Int!) {
    createProduct(name: $name, cost: $cost, stock: $stock) {
      id
      name
      cost
      stock
    }
  }
`;
