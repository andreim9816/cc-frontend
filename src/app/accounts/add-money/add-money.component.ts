import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankAccountService} from "../../services/BankAccountService";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BankAccountDto} from "../../model/BankAccountDto";

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent {
  addMoneyForm: FormGroup;

  constructor(private fb: FormBuilder,
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
    console.log(this.addMoneyForm)
    if (this.addMoneyForm.valid) {
      const iban = this.data.iban
      const body = {
        amount: this.addMoneyForm.value.amount
      }
      this.bankAccountService.updateAccountAmount(iban, body).subscribe(() => {
        window.location.reload();
      });
      console.log(body);
    }
  }
}
