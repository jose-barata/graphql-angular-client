import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { CreateCustomerMutation } from './mutations/create-customer.mutation';
import { CreateProductMutation } from './mutations/create-product.mutation';
import { DeleteCustomerMutation } from './mutations/delete-customer.mutation';
import { DeleteProductMutation } from './mutations/delete-product.mutation';
import { AllDataQuery } from './queries/all-data.query';

const uri: string = 'http://localhost:3000/graphql'; // GraphQL server running here

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache()
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    },
    AllDataQuery,
    CreateCustomerMutation,
    CreateProductMutation,
    DeleteProductMutation,
    DeleteCustomerMutation
  ]
})
export class GraphQLModule {}
