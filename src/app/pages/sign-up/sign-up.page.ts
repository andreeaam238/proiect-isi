import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {}

  ngOnInit() {}

  getFormControl(formControlName: string) {
    return this.signupForm.get(formControlName) as FormControl;
  }

  isValid() {
    return this.signupForm.valid;
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
