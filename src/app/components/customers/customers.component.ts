import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchResult } from '@apollo/client/core';
import { Subscription } from 'rxjs/internal/Subscription';
import {
  CreateCustomerMutation,
  CreateCustomerMutationResponse
} from '../../graphql/mutations/create-customer.mutation';
import {
  DeleteCustomerMutation,
  DeleteCustomerMutationResponse
} from '../../graphql/mutations/delete-customer.mutation';
import { Customer } from '../../graphql/types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  @Input()
  customers: Customer[];

  customersTableColumns: string[] = ['id', 'firstName', 'lastName', 'taxId', 'delete'];
  customersForm: FormGroup;

  private createCustomerMutationSubcscription: Subscription;
  private deleteCustomerMutationSubcscription: Subscription;

  constructor(
    private createCustomerMutation: CreateCustomerMutation,
    private deleteCustomerMutation: DeleteCustomerMutation,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.customersForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      taxId: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(3)]
      ]
    });
  }

  ngOnDestroy(): void {
    this.createCustomerMutationSubcscription.unsubscribe();
    this.deleteCustomerMutationSubcscription.unsubscribe();
  }

  onAddCustomer(): void {
    this.createCustomerMutationSubcscription = this.createCustomerMutation
      .mutate({
        firstName: this.customersForm.get('firstName').value,
        lastName: this.customersForm.get('lastName').value,
        taxId: this.customersForm.get('taxId').value
      })
      .subscribe(
        (result: FetchResult<CreateCustomerMutationResponse>) => {
          const customer: Customer = result.data.createCustomer;
          this.customers = [
            ...this.customers,
            {
              id: customer.id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              taxId: customer.taxId
            }
          ];
        },
        (error: HttpErrorResponse) => {
          console.log('there was an error sending the mutation', error);
        }
      );
  }

  onDeleteCustomer(customerToDelete: Customer): void {
    this.deleteCustomerMutationSubcscription = this.deleteCustomerMutation
      .mutate({
        id: customerToDelete.id
      })
      .subscribe(
        (result: FetchResult<DeleteCustomerMutationResponse>) => {
          const deleted: boolean = result.data.deleteCustomer;
          if (deleted) {
            this.customers = this.customers.filter((customer: Customer) => customer.id !== customerToDelete.id);
          }
        },
        (error: HttpErrorResponse) => {
          console.log('there was an error sending the mutation', error);
        }
      );
  }
}
