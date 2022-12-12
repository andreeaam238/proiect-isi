import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
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

  constructor() {}

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
}
