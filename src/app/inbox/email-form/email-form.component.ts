import { Component, Input } from '@angular/core';
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

  ngOnInit() {
    const { subject, from, to, text } = this.email
    console.log(from)
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

}
