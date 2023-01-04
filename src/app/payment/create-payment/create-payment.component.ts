import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BankAccountDto} from "../../model/BankAccountDto";

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: BankAccountDto) {
    this.createForm(data);
  }

  ngOnInit(): void {
  }

  createForm(data: BankAccountDto): void {
    this.paymentForm = this.fb.group({
      ibanFromCtrl: [{value: data.iban, disabled: true}, Validators.required],
      ibanToCtrl: [null, Validators.required],
      amountCtrl: [{value: null, disabled: false}, [Validators.required, this.numberValidator]],
      currencyCtrl: [{value: data.currency, disabled: true}, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const body = {
        ibanTo: this.paymentForm.value.ibanToCtrl,
        ibanFrom: this.paymentForm.value.ibanFromCtrl,
        amount: this.paymentForm.value.amount,
        currency: this.paymentForm.value.currency,
      }
      console.log(body);
    }
  }

  numberValidator(control: FormControl) {
    if (isNaN(control?.value)) {
      return {
        number: true
      }
    }
    return null;
  }

}
