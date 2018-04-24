import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../services/login.service';
import { NavitemService } from '../services/navitem.service';

import { LoginCredential } from '../shared/login-credential.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo: LoginCredential;
  loginForm: FormGroup;
  errMsg: string;
  return: string = '';

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

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private navitemService: NavitemService,
    private router: Router,
    private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.loginInfo = new LoginCredential();
    this.route.queryParams
      .subscribe(params => this.return = params['ReturnUrl'] || '/');}

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
    this.errMsg = null;
    this.loginInfo = this.loginForm.value;

    this.loginService.login(this.loginInfo)
      .subscribe(msg => this.processLogin(msg),
      errMsg => this.errMsg = <any>errMsg);

    this.loginForm.reset();
  }

  processLogin(results: string) {
    if (results == null) {
      this.navitemService.refreshTopNavigation();
      this.router.navigateByUrl(this.return);
    }
  }
}
