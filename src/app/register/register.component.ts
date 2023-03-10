import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/AuthService";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../util/error-dialog/error-dialog.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              public dialog: MatDialog,
              private router: Router) {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const body = {
        username: this.registerForm.value.userName,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        phoneNumber: this.registerForm.value.phoneNumber,
      };

      this.authService.register(body).subscribe(res => {
        this.router.navigate(['/login']);
      }, err => this.openDialogError(err));
    }
  }

  openDialogError(error: any): void {
    const dialog = this.dialog.open(ErrorDialogComponent, {data: error.error.errorMessage});
    setTimeout(() => dialog.close(), 5000);
  }
}
