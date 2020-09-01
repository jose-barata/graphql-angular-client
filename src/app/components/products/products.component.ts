import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchResult } from '@apollo/client/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CreateProductMutation, ProductMutationResponse } from '../../graphql/mutations/create-product.mutation';
import { Product } from '../../graphql/types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input()
  products: Product[];

  productsTableColumns: string[] = ['id', 'name', 'cost', 'stock'];
  productsForm: FormGroup;

  private createProductMutationSubcscription: Subscription;

  constructor(private createProductMutation: CreateProductMutation, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      cost: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(3)]
      ],
      stock: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(3)]
      ]
    });
  }

  addProduct(): void {
    this.createProductMutationSubcscription = this.createProductMutation
      .mutate({
        name: this.productsForm.get('name').value,
        cost: this.productsForm.get('cost').value,
        stock: this.productsForm.get('stock').value
      })
      .subscribe(
        (result: FetchResult<ProductMutationResponse>) => {
          const product: Product = result.data.createProduct;
          this.products = [
            ...this.products,
            {
              id: product.id,
              name: product.name,
              cost: product.cost,
              stock: product.stock
            }
          ];
        },
        (error: HttpErrorResponse) => {
          console.log('there was an error sending the mutation', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.createProductMutationSubcscription.unsubscribe();
  }
}
