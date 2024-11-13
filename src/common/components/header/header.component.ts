import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {WaiterComponent} from './waiter/waiter.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    WaiterComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   auth: AuthService = inject(AuthService)
}
