import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniqueUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  }, {
    validators: [this.matchPassword.validate]
  })

  constructor(private matchPassword: MatchPassword, private uniqueUsername: UniqueUsername, private authService: AuthService) { }

  onSubmit() {
    if (this.authForm.invalid) return

    const credentials = {
      username: this.authForm.value.username,
      password: this.authForm.value.password,
      passwordConfirmation: this.authForm.value.passwordConfirmation
    }

    this.authService.signup(credentials).subscribe({
      next: response => {

      },
      error: err => {
        if (!err.status) {
          this.authForm.setErrors({
            noConnection: true
          })
        } else {
          this.authForm.setErrors({ unknownError: true })
        }

      }
    })
  }
}
