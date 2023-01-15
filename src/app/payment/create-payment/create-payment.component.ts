import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {BankAccountDto} from "../../model/BankAccountDto";
import {PaymentService} from "../../services/PaymentService";
import {ErrorMessage} from "../../model/ErrorMessage";
import {ErrorDialogComponent} from "../../util/error-dialog/error-dialog.component";

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,
              private paymentService: PaymentService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: BankAccountDto) {
    this.createForm(data);
  }

  ngOnInit(): void {
  }

  createForm(data: BankAccountDto): void {
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
      }, err => this.openDialogError(err));
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

  openDialogError(messageError: ErrorMessage): void {
    const dialog = this.dialog.open(ErrorDialogComponent, {data: messageError.error});
    setTimeout(() => dialog.close(), 5000);
  }

}
