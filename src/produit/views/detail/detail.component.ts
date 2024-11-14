import {Component, Input} from '@angular/core';
import {Produit} from '../all/all.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  @Input({required: true}) produit!: Produit
}
