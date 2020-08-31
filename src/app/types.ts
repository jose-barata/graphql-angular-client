export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  taxId: number;
};

export type Product = {
  id: number;
  name: string;
  cost: number;
  stock: number;
};

export type Query = {
  products?: Product[];
  customers?: Customer[];
};

export type Mutation = {
  createCustomer: Product;
  updateCustomer: Product;
  deleteCustomer: boolean;
  createProduct: Customer;
  updateProduct: Customer;
  deleteProduct: boolean;
};

export type CustomerMutationResponse = {
  id?: number;
  firstName?: string;
  lastName?: string;
  taxId?: number;
};

export type ProductMutationResponse = {
  id?: number;
  name?: string;
  cost?: number;
  stock?: number;
};

export type MutationResponse = {
  data: {
    createCustomer?: CustomerMutationResponse;
    updateCustomer?: CustomerMutationResponse;
    deleteCustomer?: boolean;
    createProduct?: ProductMutationResponse;
    deleteProduct?: boolean;
  };
};
