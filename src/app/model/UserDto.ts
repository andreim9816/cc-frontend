import {BankAccountDto} from "./BankAccountDto";

export interface UserDto {
  id: number;
  username: string;
  phoneNumber: string;
  email: string;
  bankAccounts: [BankAccountDto];
  roles: [string];
}
