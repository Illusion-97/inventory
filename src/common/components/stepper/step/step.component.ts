import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.css'
})
export class StepComponent {
  index : number = 0
  currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  cd = inject(ChangeDetectorRef)
  get left() {
    return (this.index - this.currentIndex.value) * 100
  }
}
