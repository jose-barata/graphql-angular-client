import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { CREATE_CUSTOMER_MUTATION } from '../queries';
import { Customer, CustomerMutationResponse, MutationResponse } from '../types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  @Input()
  customers: Customer[];

  customersTableColumns: string[] = ['id', 'firstName', 'lastName', 'taxId'];
  customersForm: FormGroup;

  private createCustomerMutationSubcscription: Subscription;

  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.customersForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      taxId: [
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

  addCustomer(): void {
    this.createCustomerMutationSubcscription = this.apollo
      .mutate({
        mutation: CREATE_CUSTOMER_MUTATION,
        variables: {
          firstName: this.customersForm.get('firstName').value,
          lastName: this.customersForm.get('lastName').value,
          taxId: this.customersForm.get('taxId').value,
        },
      })
      .subscribe(
        (result: MutationResponse) => {
          const customer: CustomerMutationResponse = result.data.createCustomer;
          this.customers = [
            ...this.customers,
            {
              id: customer.id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              taxId: customer.taxId,
            },
          ];
        },
        (error: HttpErrorResponse) => {
          console.log('there was an error sending the mutation', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.createCustomerMutationSubcscription.unsubscribe();
  }
}
