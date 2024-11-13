import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        loadComponent: () => import('./home/home.component')
          .then(m => m.HomeComponent)
      },
      {
        path: "register",
        loadComponent: () => import('../auth/views/register/register.component')
          .then(m => m.RegisterComponent)
      },
      {
        path: "login",
        loadComponent: () => import('../auth/views/login/login.component')
          .then(m=> m.LoginComponent)
      }
    ]
  },
  {
    path: "produits",
    loadChildren: () => import('../produit/produit.routes')
      .then(m => m.routes)
  },
  {
    path: "**", // URL wildcards,
    loadComponent: () => import('./not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  }
];
