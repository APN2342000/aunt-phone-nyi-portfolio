import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ExperienceItem } from '../../core/models/portfolio.models';
import { RevealDirective } from '../../core/directives/reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  @Input({ required: true }) items!: ExperienceItem[];
}
