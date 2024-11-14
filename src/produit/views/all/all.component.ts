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

    /*this.http.delete("/products/"+id)
      .subscribe(() => this.produits =  this.http.get<Produit[]>('/products'))
    // Cette syntaxe implique 2 'subscribe' un pour le delete et l'autre pour produit (dans l'html via | async)
    // Pour éviter d'avoir 2 souscriptions pour effectuer un delete, on va affecter à l'observable 'produits' une valeur obtenue
    // apres le retour de l'observable généré par http.delete.
    // Il ne s'agit pas de transformer la réponse obtenue par le delete, mais passer à un autre observable
    // qui lui est obtenu par http.get*/


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
