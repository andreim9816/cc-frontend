import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/AuthService";
import {StorageService} from "../services/StorageService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../model/UserDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private storageService: StorageService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log('LOGIN');
    // if (this.storageService.getToken()) {
    //   console.log("IS LOGGED IN");
    //   this.isLoggedIn = true;
    //   this.roles = this.storageService.getUser().roles;
    // }
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const body = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.authService.loginUser(body).subscribe(
        (userDto: UserDto) => {
          console.log(userDto);
          this.storageService.saveUser(userDto);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.router.navigate(['/accounts']);
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
