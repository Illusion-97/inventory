import {AbstractControl, FormGroup} from '@angular/forms';

export abstract class AbstractFormComponent {
  abstract form: FormGroup
  //Récupérer un FormControl soit à partir d'un nom, soit en utilisant directement un control
  getControl(control: string | AbstractControl): AbstractControl {
    if (typeof control === "string") {
      const c = this.form.get(control);
      if(!c) throw new Error(`Le Control '${control}' est introuvable.`)
      control = c;
    }
    return control;
  }

  // Vérifier s'il y a eu interaction avec un control
  hasInteraction(control: string | AbstractControl): boolean {
    control = this.getControl(control)
    return !control.untouched || control.dirty
  }

  // Vérifier si un control est invalide
  isInvalid(control: string | AbstractControl): boolean {
    control = this.getControl(control)
    return this.hasInteraction(control) && control.invalid
  }

  // idem si il y a une erreur (a chercher par code)
  hasError(control: string | AbstractControl, errorCode: string, path?: (string | number)[] | string): boolean {
    control = this.getControl(control)
    return this.hasInteraction(control) && control.hasError(errorCode, path)
  }

  // une façon d'éviter de réécrire toute une logique de validation AVANT de submit
  onSubmit() {
    this.form.markAllAsTouched()
    if(this.form.valid) this.onSubmit$()
  }

  abstract onSubmit$(): void

  VALIDATORS_TIPS : Map<string, (value: any) => string> = new Map<string,  (value: any) => string>([
    ['required', () => 'Le champ est requis'],
    ['minlength', value => `Too short, required : ${value.requiredLength}; actual : ${value.actualLength}`]
  ])

  errorMessages(control: string | AbstractControl) {
    control = this.getControl(control)
    return control.errors
      ? Object.entries(control.errors).map(error => this.VALIDATORS_TIPS.get(error[0])?.(error[1]))
        .filter(s => !!s)
      : []
  }

}
