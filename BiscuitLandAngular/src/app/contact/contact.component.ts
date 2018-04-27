import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactService } from '../services/contact.service';

import { ContactMessage } from '../shared/contact-message.type';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactMsg: ContactMessage = new ContactMessage();
  contactForm: FormGroup;
  errMsg: string;
  results: string;

  formErrors = {
    'fullName': '',
    'email': '',
    'subject': '',
    'message': ''
  };

  validationMessages = {
    'fullName': {
      'required': 'Please enter your name.',
      'maxlength': 'Name cannot be more than 100 characters.'
    },
    'email': {
      'required': 'Please enter your email address.',
      'maxlength': 'Email cannot be more than 100 characters.',
      'pattern': 'Please enter a valid email address.'
    },
    'subject': {
      'required': 'Please enter a subject.',
      'maxlength': 'Subject cannot be more than 200 characters.'
    },
    'message': {
      'required': 'Please enter a message.',
      'maxlength': 'Message cannot be more than 4000 characters.'
    }
  };


  constructor(private fb: FormBuilder,
    private contactService: ContactService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/)]],
      subject: ['', [Validators.required, Validators.maxLength(200)]],
      message: ['', [Validators.required, Validators.maxLength(4000)]]
    });

    this.contactForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.contactForm) { return; }
    const form = this.contactForm;
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
    this.results = null;
    this.contactMsg = this.contactForm.value;

    this.contactService.SendMessage(this.contactMsg)
      .subscribe(msg => this.results = msg,
      errMsg => this.errMsg = <any>errMsg);

    this.contactForm.reset();
  }
}
