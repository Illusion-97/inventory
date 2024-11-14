import { Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.css'
})
export class StepComponent {
  index : number = 1
  currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  get left() {
    return (this.index - this.currentIndex.value) * 100
  }
}
