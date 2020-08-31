import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { CREATE_PRODUCT_MUTATION } from '../queries';
import { MutationResponse, Product, ProductMutationResponse } from '../types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input()
  products: Product[];

  productsTableColumns: string[] = ['id', 'name', 'cost', 'stock'];
  productsForm: FormGroup;

  private createProductMutationSubcscription: Subscription;

  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      cost: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(1),
          Validators.maxLength(3),
        ],
      ],
      stock: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(1),
          Validators.maxLength(3),
        ],
      ],
    });
  }

  addProduct(): void {
    this.createProductMutationSubcscription = this.apollo
      .mutate({
        mutation: CREATE_PRODUCT_MUTATION,
        variables: {
          name: this.productsForm.get('name').value,
          cost: this.productsForm.get('cost').value,
          stock: this.productsForm.get('stock').value,
        },
      })
      .subscribe(
        (result: MutationResponse) => {
          const product: ProductMutationResponse = result.data.createProduct;
          this.products = [
            ...this.products,
            {
              id: product.id,
              name: product.name,
              cost: product.cost,
              stock: product.stock,
            },
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
