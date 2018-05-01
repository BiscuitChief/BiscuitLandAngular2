import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';

import { LoginCredential } from '../shared/login-credential.type';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  loginInfo: LoginCredential = new LoginCredential();
  loginForm: FormGroup;
  errMsg: string;
  results: string;
  disableButton: boolean = false;

  formErrors = {
    'userName': '',
    'password': ''
  };

  validationMessages = {
    'userName': {
      'required': 'User Name is required.',
      'maxlength': 'User Name cannot be more than 25 characters long.',
      'minlength': 'User Name must be at least 5 characters.'
    },
    'password': {
      'required': 'Password is required.',
      'maxlength': 'Password cannot be more than 25 characters long.',
      'minlength': 'Password must be at least 5 characters.'
    }
  };

  constructor(private fb: FormBuilder,
    private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(5)]]
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
    if (this.loginForm.valid) {
      this.errMsg = null;
      this.results = null;
      this.disableButton = true;
      this.loginInfo = this.loginForm.value;

      this.loginService.addNewUser(this.loginInfo)
        .subscribe(msg => this.results = msg,
        errMsg => this.errMsg = <any>errMsg,
        () => this.disableButton = false);

      this.loginForm.reset();
    }
  }
}
