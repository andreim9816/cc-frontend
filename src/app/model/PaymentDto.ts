export interface PaymentDto {
  ibanTo: string;
  ibanFrom: string;
  currency: string;
  amount: number;
  timestamp: number;
}
