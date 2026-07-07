import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LanguageSkill, Strength } from '../../core/models/portfolio.models';
import { RevealDirective } from '../../core/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  @Input({ required: true }) strengths!: Strength[];
  @Input({ required: true }) languages!: LanguageSkill[];
}
