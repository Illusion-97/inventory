import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
