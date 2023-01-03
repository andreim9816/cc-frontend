import {Component, forwardRef, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateAccountDialogComponent} from "./create-account-dialog/create-account-dialog.component";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {BankAccountService} from "../services/BankAccountService";
import {MatTableDataSource} from "@angular/material/table";
import {BankAccountDto} from "../model/BankAccountDto";
import {CreatePaymentComponent} from "../payment/create-payment/create-payment.component";
import {AddMoneyComponent} from "./add-money/add-money.component";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateAccountDialogComponent),
      multi: true
    }
  ]
})
export class AccountsComponent implements OnInit {

  accountsDataSource: MatTableDataSource<BankAccountDto> = new MatTableDataSource<BankAccountDto>();
  readonly displayedColumns = ['id', 'iban', 'amount', 'addPayment', 'addMoney'];

  constructor(private accountService: BankAccountService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.accountService.getUserBankAccounts().subscribe(bankAccounts => {
      this.accountsDataSource.data = bankAccounts;
    });
  }

  openDialogNewAccount(): void {
    this.dialog.open(CreateAccountDialogComponent)
  }

  openDialogNewPayment(account: BankAccountDto): void {
    this.dialog.open(CreatePaymentComponent, {
      data: account
    });
  }

  openDialogAddAmount(account: BankAccountDto): void {
    this.dialog.open(AddMoneyComponent, {
      data: account
    })
  }

  shouldDisplay(): boolean {
    return true; //TODO only for admins
  }

}
