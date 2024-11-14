import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, Subscription, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TableComponent} from '../../../common/components/table/table.component';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    TableComponent
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  private readonly http: HttpClient = inject(HttpClient)
  produits : Observable<Produit[]> = inject(ActivatedRoute).data.pipe(map(({produits}) => produits ))

  delete(id: number) {
    this.produits = this.http.delete("/products/"+id)
      .pipe(switchMap(() => this.http.get<Produit[]>('/products')))
  }
}

export interface Produit {
  id: number
  name: string
  price: number
  description: string
}
