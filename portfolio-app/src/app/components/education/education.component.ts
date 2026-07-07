import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EducationItem } from '../../core/models/portfolio.models';
import { RevealDirective } from '../../core/directives/reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  @Input({ required: true }) items!: EducationItem[];
}
