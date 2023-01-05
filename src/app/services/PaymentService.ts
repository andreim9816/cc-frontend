import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from "../util/URL";
import {PaymentDto} from "../model/PaymentDto";

const httpOptions = {
  // headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {
  }

  createPayment(body: any): Observable<PaymentDto> {
    console.log("In payment service. Sending to controller")
    console.log(body)
    return this.http.post<PaymentDto>(URL.PAYMENT_URL, body, httpOptions);
  }
}
