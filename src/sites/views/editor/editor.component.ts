import {Component, inject} from '@angular/core';
import {AbstractFormComponent} from '@adya/my-nga'
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {StepperComponent} from '../../../common/components/stepper/stepper.component';
import {StepComponent} from '../../../common/components/stepper/step/step.component';
import {map, Observable} from 'rxjs';
import {Produit} from '../../../produit/views/all/all.component';
import {TableComponent} from '../../../common/components/table/table.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StepperComponent,
    StepComponent,
    TableComponent,
    AsyncPipe
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent extends AbstractFormComponent {
  private readonly router: Router = inject(Router);
  private readonly http: HttpClient = inject(HttpClient);
  produits : Observable<Produit[]> = inject(ActivatedRoute).data.pipe(map(({produits}) => produits ))

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl("", {validators: [Validators.required]}),
    adresse:  new FormControl(""),
    produits: new FormArray([])

  })

  constructor(route: ActivatedRoute) {
    super();
    route.data.pipe(takeUntilDestroyed()).subscribe(({site}) => {
      if(site) {
        this.form.patchValue(site)
        site.produits.forEach((p: Produit) => (this.form.get('produits') as FormArray).push(new FormControl(p)))
      }
      else this.form.reset({
        id: 0
      })
    })
  }
  onSubmit$(): void {
    const id = this.form.value.id
    //l'ajout à l'URL entre () est propre à Json-Server
    this.http[id ? 'put' : 'post']('/sites' + (id ? '/' + id : ''), this.form.value)
      .subscribe(() => this.router.navigate(['/sites']))
  }

  toggle(prod: Produit) {
    const array = this.getControl('produits') as FormArray
    const i = array.value.indexOf(array.value.find((p: Produit) => p?.id === prod.id) || null)
    if (i >= 0) array.removeAt(i)
    else array.push(new FormControl(prod))
  }

  checked(prod: Produit) {
    return this.form.value.produits?.map((p: Produit) => p.id).includes(prod.id)
  }
}
