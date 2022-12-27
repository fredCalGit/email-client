import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  emailForm: FormGroup

  @Input() email: Email
  @Output() emailSubmit = new EventEmitter()

  ngOnInit() {
    const { subject, from, to, text } = this.email

    this.emailForm = new FormGroup<any>({
      to: new FormControl(to, [
        Validators.required,
        Validators.email
      ]),
      subject: new FormControl(subject, [
        Validators.required,
      ]),
      from: new FormControl({ value: from, disabled: true }),
      text: new FormControl(text, [
        Validators.required,
      ])
    })
  }

  onSubmit() {
    if (this.emailForm.invalid) return

    this.emailSubmit.emit(this.emailForm.value)
  }
}
