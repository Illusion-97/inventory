import {ActivatedRouteSnapshot, ResolveFn, Routes} from '@angular/router';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {authGuard} from '../auth/auth.service';
import {of} from 'rxjs';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./views/all/all.component')
      .then(m => m.AllComponent),
    resolve: {
      produits: () => inject(HttpClient).get('/products')
    }
  },
  {
    path: ":id",
    loadComponent: () => import('./views/editor/editor.component')
      .then(m => m.EditorComponent),
    resolve: {
      produit: (route: ActivatedRouteSnapshot) => {
        const id = route.paramMap.get('id')
        if(id === "0") return of(undefined)
        return inject(HttpClient).get('/products/' + id)
      }
    }
  }
]
