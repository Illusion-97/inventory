import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  produits : Observable<any[]> = inject(ActivatedRoute).data.pipe(map(({produits}) => produits ))
}
