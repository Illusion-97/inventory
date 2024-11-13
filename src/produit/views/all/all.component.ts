import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  produits : Observable<Produit[]> = inject(ActivatedRoute).data.pipe(map(({produits}) => produits ))
}

export interface Produit {
  id: number
  name: string
  price: number
  description: string
}
