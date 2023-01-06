import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from "../util/URL";
import {BankAccountDto} from "../model/BankAccountDto";
import {PaymentDto} from "../model/PaymentDto";

const httpOptions = {
  // headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  constructor(private http: HttpClient) {
  }

  createAccount(body: any): Observable<BankAccountDto> {
    return this.http.post<BankAccountDto>(URL.ACCOUNT_URL, body, httpOptions);
  }

  getUserBankAccounts(): Observable<[BankAccountDto]> {
    return this.http.get<[BankAccountDto]>(URL.ACCOUNT_URL, httpOptions);
  }

  updateAccountAmount(iban: string, body: any): Observable<BankAccountDto> {
    return this.http.post<BankAccountDto>(URL.ACCOUNT_URL + '/' + iban, body, httpOptions);
  }

  getPaymentsForAccount(iban: String): Observable<[PaymentDto]> {
    console.log("sentt to controller")
    return this.http.get<[PaymentDto]>(URL.ACCOUNT_URL + '/' + iban, httpOptions);
  }
}
