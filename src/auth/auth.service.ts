import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CanMatchFn, Router, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentResponse: BehaviorSubject<AuthResponse | undefined> = new BehaviorSubject<AuthResponse | undefined>(undefined)
  private readonly AUTH_KEY: string = "AUTH_RESPONSE"
  get isLogged() {
    return !!this.currentResponse.value
  }
  get currentUser() {
    return this.currentResponse.value?.user
  }
  get token() {
    return this.currentResponse.value?.accessToken
  }

  constructor(private http : HttpClient, router: Router) {
    const authResponse = sessionStorage.getItem(this.AUTH_KEY)
    if(authResponse) this.currentResponse.next(JSON.parse(authResponse))
    this.currentResponse.subscribe(authResponse => {
      if(authResponse) {
        sessionStorage.setItem(this.AUTH_KEY,JSON.stringify(authResponse))
      } else {
        sessionStorage.clear()
        router.navigate(['/'])
      }
    })
  }

  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/login', credentials)
      .pipe(tap(response => this.currentResponse.next(response)))
  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/register', user)
  }

  logout() {
    this.currentResponse.next(undefined)
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
  accessToken: string,
  user: User
}

export const authGuard: CanMatchFn = () => {
  return inject(AuthService).isLogged || inject(Router).createUrlTree(['/login']) /*new UrlTree() --> redirige vers '/'*/
}
