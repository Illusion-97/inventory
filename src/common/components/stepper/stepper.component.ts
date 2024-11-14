import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {StepComponent} from './step/step.component';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements AfterContentInit {

  @ContentChildren(StepComponent)
  steps!: QueryList<StepComponent>
  currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  ngAfterContentInit() {
    this.steps.forEach((step, index) => {
      step.index = index
      step.currentIndex = this.currentIndex
      step.cd.detectChanges() // utile uniquement en dev
    })
  }
}
