import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JsonPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  apiError: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  hasError(property: string, flag: string): boolean {
    let control = this.loginForm.get(property);
    return control ? control.hasError(flag) : false;
  }

  onSubmit(logForm: FormGroup) {
    this.isLoading = true;
    if (logForm.valid) {
      this._authService.login(logForm.value).subscribe({
        next: (response) => {
          if (response.token != null) {
            localStorage.setItem('userToken', response.token);

            this._authService.decodeTokenThenGenerateUserData();

            this._router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.apiError = err?.error?.message;
        },
        complete: () => (this.isLoading = false),
      });
    }
  }
}
