import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginCredential } from '../shared/login-credential.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo: LoginCredential;
  loginForm: FormGroup;

  formErrors = {
    'userName': '',
    'password': ''
  };

  validationMessages = {
    'userName': {
      'required': 'First Name is required.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'password': {
      'required': 'Last Name is required.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.loginInfo = new LoginCredential();
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.maxLength(25)]]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.loginInfo = this.loginForm.value;
  }

}
