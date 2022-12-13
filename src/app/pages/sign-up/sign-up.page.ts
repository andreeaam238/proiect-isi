import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
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
  ) { }

  ngOnInit() { }

  getFormControl(formControlName: string) {
    return this.signupForm.get(formControlName) as FormControl;
  }

  isValid() {
    return this.signupForm.valid;
  }

  signUp() {
    this.authService
      .RegisterUser(
        this.getFormControl('email').value,
        this.getFormControl('password').value
      );
  }
}
