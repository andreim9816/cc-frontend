import {Component} from '@angular/core';
import {BankAccountService} from "../../services/BankAccountService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Currency} from "../../model/Currency";

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent {
  accountForm: FormGroup;
  availableOptions = [Currency.EUR, Currency.USD, Currency.RON];
  selected = Currency.EUR;

  constructor(private fb: FormBuilder,
              private bankAccountService: BankAccountService) {
    this.createForm();
  }

  createForm(): void {
    this.accountForm = this.fb.group({
      currency: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const body = {
        currency: this.accountForm.value.currency
      }
      this.bankAccountService.createAccount(body).subscribe(() => {
        window.location.reload();
      });
    }
  }
}

