import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkillGroup } from '../../core/models/portfolio.models';
import { RevealDirective } from '../../core/directives/reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  @Input({ required: true }) groups!: SkillGroup[];
}
