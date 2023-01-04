import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankAccountService} from "../../services/BankAccountService";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {BankAccountDto} from "../../model/BankAccountDto";
import {ErrorMessage} from "../../model/ErrorMessage";
import {ErrorDialogComponent} from "../../util/error-dialog/error-dialog.component";

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent {
  addMoneyForm: FormGroup;

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private bankAccountService: BankAccountService,
              @Inject(MAT_DIALOG_DATA) public data: BankAccountDto) {
    this.createForm(data);
  }

  createForm(data: BankAccountDto): void {
    this.addMoneyForm = this.fb.group({
      iban: [{value: data.iban, disabled: true}, Validators.required],
      amount: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addMoneyForm.valid) {
      const iban = this.data.iban
      const body = {
        amount: this.addMoneyForm.value.amount
      }
      this.bankAccountService.updateAccountAmount(iban, body).subscribe(() => {
        window.location.reload();
      }, err => this.openDialogError(err));
    }
  }

  openDialogError(error: ErrorMessage): void {
    const dialog = this.dialog.open(ErrorDialogComponent, {data: error.error.message});
    setTimeout(() => dialog.close(), 5000);
  }
}
