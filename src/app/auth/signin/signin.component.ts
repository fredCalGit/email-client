import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  })

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (this.authForm.invalid) return
    const credentials = {
      username: this.authForm.value['username'],
      password: this.authForm.value['password']
    }
    this.authService.signin(credentials).subscribe({
      next: () => { },
      error: ({ error }) => {
        if (!error.status) {
          this.authForm.setErrors({
            noConnection: true
          })
        }
        if (error.username || error.password) {
          this.authForm.setErrors({ credentials: true })
        }
      }
    })
  }
}
