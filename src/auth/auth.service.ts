import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credentials: Credentials): Observable<AuthResponse> {
    return of({})
  }

  register(user: User): Observable<AuthResponse> {
    return of({})
  }
}

export interface Credentials {
  email: string;
  password: string;
}

export interface User extends Credentials {
  id: number;
  username: string;
}

export interface AuthResponse {

}
