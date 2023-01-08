import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PaymentDto} from "../../model/PaymentDto";
import {BankAccountService} from "../../services/BankAccountService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-get-payments',
  templateUrl: './get-payments.component.html',
  styleUrls: ['./get-payments.component.css']
})
export class GetPaymentsComponent implements OnInit {
  iban: String

  paymentsDataSource: MatTableDataSource<PaymentDto> = new MatTableDataSource<PaymentDto>();
  readonly displayedColumns = ['date', 'ibanFrom', 'ibanTo', 'amount', 'currency'];

  constructor(
    private accountService: BankAccountService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("ON NG INIT")
    this.route.params.subscribe(params => {
      console.log(" ibaaaaan")
      this.iban = params['iban']
      console.log(this.iban)
      this.accountService.getPaymentsForAccount(this.iban).subscribe(payments => {
        this.paymentsDataSource.data = payments;
        console.log(this.paymentsDataSource.data)
      });
    })
  }
}
