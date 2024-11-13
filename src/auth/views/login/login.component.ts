import {Component, inject} from '@angular/core';
import {AuthService, Credentials} from '../../auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly service : AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  credentials: Credentials = {email: '', password: ''}

  login() {
    this.service.login(this.credentials).subscribe(() => this.router.navigate(['/home']))
  }
}
