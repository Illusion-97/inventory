import {Component, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../common/components/abstract-form-component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AbstractFormComponent {
  private readonly service : AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  confirmPassword: FormControl = new FormControl("")

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl("", Validators.required),
    email: new FormControl("", {validators: Validators.email}),
    password: new FormControl("", {validators:[Validators.required, Validators.minLength(6)]}) // suggéré
  })

  onSubmit$() {
    this.service.register(this.form.value).subscribe(() => this.router.navigate(['/login']))
  }

}
