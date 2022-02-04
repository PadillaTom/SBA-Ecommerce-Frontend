import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Country } from 'app/common/country';
import { State } from 'app/common/state';
import { CartService } from 'app/services/cart.service';
import { CheckoutFormService } from 'app/services/checkout-form.service';
import { CustomValidators } from 'app/validators/custom-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  // Form:
  checkoutFormGroup: FormGroup;
  isChecked: boolean = true;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private checkoutFormService: CheckoutFormService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Forming the FORM:
    this.checkoutFormGroup = this.formBuilder.group({
      // Customer
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$'),
          CustomValidators.notOnlyWhitespace,
        ]),
      }),
      // Shipping
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
      }),
      // Billing
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
      }),
      // Credit Card
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        cardHolder: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3,4}$'),
        ]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // Populate Credit Card MONTHS & YEARS
    const startMonth: number = new Date().getMonth() + 1;

    this.checkoutFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        this.creditCardMonths = data;
      });

    this.checkoutFormService.getCreditCardYears().subscribe((data) => {
      this.creditCardYears = data;
    });

    // Populate Countries
    this.checkoutFormService.getCountries().subscribe((data) => {
      this.countries = data;
    });

    // Get Latest Cart Totals:
    this.reviewCartDetails();
  }

  // *** Getters ***
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }
  get shipStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shipCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shipState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shipZip() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shipCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get billStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billZip() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get ccType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get ccHolder() {
    return this.checkoutFormGroup.get('creditCard.cardHolder');
  }
  get ccNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get ccCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  // ==================
  //  Methods
  // ==================

  // *** Submit ***
  onSubmit() {
    // Logs:
    console.log('Submitting DATA');
    console.log(this.checkoutFormGroup.get('customer')?.value);
    // Functionality:
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  // *** Shipping === Billing ***
  useSameShippingAsBilling(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  // *** Populating Months & Years ***
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );
    let startMonth: number;
    if (currentYear === selectedYear) {
      // Current Year: Start Same Month
      startMonth = new Date().getMonth() + 1;
    } else {
      // Future Year: Start 1.
      startMonth = 1;
    }
    this.checkoutFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        this.creditCardMonths = data;
      });
  }

  // *** Populating States ***
  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.checkoutFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }
      // First State as Default:
      formGroup?.get('state')?.setValue(data[0]);
    });
  }

  // *** Get Latest Cart Details ***
  reviewCartDetails() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
}
