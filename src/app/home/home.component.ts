import {Component, inject} from '@angular/core';
import {StepperComponent} from '../../common/components/stepper/stepper.component';
import {StepComponent} from '../../common/components/stepper/step/step.component';
import {DetailComponent} from '../../produit/views/detail/detail.component';
import {map, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Produit} from '../../produit/views/all/all.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    StepperComponent,
    StepComponent,
    DetailComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  produits : Observable<Produit[]> = inject(ActivatedRoute).data.pipe(map(({produits}) => produits))

  constructor() {
   /* const obj = {
      attr: "un attribut",
      other: "un autre",
      meth: (value: any) => `result meth : ${value}`,
      otherMeth: (value: any) => `result otherMeth : ${value}`,
    }

    const condition = false
    if(condition) {
      console.log(obj.meth('hello'))
    } else {
      console.log(obj.otherMeth('hello'))
    }
    // Tout ceci peut être simplifié en accédant aux méthodes de l'objet en considérant ce dernier comme une Map clé/valeur
    // et en demandant la clé par son nom
    // Ce qui donne ce résultat
    console.log(obj[condition ? 'meth' :'otherMeth']('hello'))
    */
  }
}
