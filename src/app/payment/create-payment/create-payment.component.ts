import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BankAccountDto} from "../../model/BankAccountDto";
import {PaymentService} from "../../services/PaymentService";

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,
              private paymentService: PaymentService,
              @Inject(MAT_DIALOG_DATA) public data: BankAccountDto) {
    this.createForm(data);
  }

  ngOnInit(): void {
  }

  createForm(data: BankAccountDto): void {
    console.log(data);
    this.paymentForm = this.fb.group({
      ibanFromCtrl: [{value: data.iban, disabled: true}, Validators.required],
      ibanToCtrl: [null, Validators.required],
      amountCtrl: [null, [Validators.required, this.numberValidator]],
      currencyCtrl: [{value: data.currency, disabled: true}, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm)
      const body = {
        ibanTo: this.paymentForm.value.ibanToCtrl,
        ibanFrom: this.data.iban,
        currency: this.data.currency,
        amount: this.paymentForm.value.amountCtrl
      }
      console.log(body);

      this.paymentService.createPayment(body).subscribe(() => {
        window.location.reload();
      });
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
