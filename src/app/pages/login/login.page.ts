import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
  });

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {}

  getFormControl(formControlName: string) {
    return this.loginForm.get(formControlName) as FormControl;
  }

  isValid() {
    return this.loginForm.valid;
  }

  onSubmit() {
    console.log(this.loginForm);
  }

  signIn() {
    this.authService.SignIn(
      this.getFormControl('email').value,
      this.getFormControl('password').value
    );
  }
}
