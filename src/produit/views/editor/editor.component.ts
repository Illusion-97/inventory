import {Component, inject} from '@angular/core';
import {AbstractFormComponent} from '../../../common/components/abstract-form-component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent extends AbstractFormComponent {
  private readonly router: Router = inject(Router);
  private readonly http: HttpClient = inject(HttpClient);

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl("", {validators: [Validators.required]}),
    price:  new FormControl(0, {validators: [Validators.required], nonNullable: true}),
    description:  new FormControl("")
  })

  constructor(route: ActivatedRoute) {
    super();
    route.data.subscribe(({produit}) => {
      if(produit) this.form.patchValue(produit)
      else this.form.reset({
        id: 0
      })
    })
  }
  onSubmit$(): void {
    const id = this.form.value.id
    //l'ajout à l'URL entre () est propre à Json-Server
    this.http[id ? 'put' : 'post']('/products' + (id ? '/' + id : ''), this.form.value)
      .subscribe(() => this.router.navigate(['/produits']))
  }
}
