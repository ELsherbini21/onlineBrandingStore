import { NgIf } from '@angular/common';
import { ProductComponent } from './../product/product.component';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  isLoading: boolean = false;
  apiError: string = '';

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(35),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/
        ),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/
        ),
      ]),
    },
    { validators: this.checkRePasswordMatch }
  );

  hasError(property: string, flag: string): boolean {
    let control = this.registerForm.get(property);
    return control ? control.hasError(flag) : false;
  }

  onSubmit(regForm: FormGroup) {
    this.isLoading = true;

    if (regForm.valid) {
      this._authService.register(regForm.value).subscribe({
        next: (response) => {
          if (response.token !== null) {
            this.isLoading = false;
            this._router.navigate(['./login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          this.apiError = err.error;
        },
      });
    }
  }

  checkRePasswordMatch(registerform: any) {
    let passwordControl = registerform.get('password');
    let rePasswordControl = registerform.get('rePassword');
    if (passwordControl.value === rePasswordControl.value) return null;
    else {
      rePasswordControl.setErrors({
        passwordMatch: ' rePassword and password not match ',
      });
      return { passwordMatch: ' rePassword and password not match ' };
    }
  }
}
