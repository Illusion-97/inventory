import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    RouterLink,
    NgTemplateOutlet
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input({required: true}) datas!: any[]
  @Output() delete: EventEmitter<number> = new EventEmitter<number>()
  @ContentChild('head') headRef?: TemplateRef<any>
  @ContentChild('body') bodyRef?: TemplateRef<any>
}
