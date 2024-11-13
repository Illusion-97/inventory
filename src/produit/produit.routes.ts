import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./views/all/all.component')
      .then(m => m.AllComponent)
  },
  {
    path: ":id",
    loadComponent: () => import('./views/editor/editor.component')
      .then(m => m.EditorComponent)
  }
]
