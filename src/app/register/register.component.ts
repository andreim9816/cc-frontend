import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const body = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        phoneNumber: this.registerForm.value.phoneNumber,
      };

      this.authService.register(body).subscribe(res => {
        console.log(res);
        this.router.navigate(['/login']);
      });
    }
  }
}
