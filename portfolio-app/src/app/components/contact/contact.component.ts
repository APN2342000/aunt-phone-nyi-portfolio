import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile } from '../../core/models/portfolio.models';
import { PortfolioService } from '../../core/services/portfolio.service';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { environment } from '../../../environments/environment';

type SubmitState = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Input({ required: true }) profile!: Profile;

  state: SubmitState = 'idle';
  readonly apiEnabled = environment.apiEnabled;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(private fb: FormBuilder, private portfolioService: PortfolioService) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // No live backend deployed (the default for a zero-server production
    // build) — open the visitor's email client with the message prefilled
    // instead of posting to an API that isn't there.
    if (!this.apiEnabled) {
      this.openMailClient();
      return;
    }

    this.state = 'sending';
    this.portfolioService.sendContactMessage(this.form.getRawValue()).subscribe((res) => {
      this.state = res.success ? 'sent' : 'error';
      if (res.success) {
        this.form.reset();
      }
    });
  }

  private openMailClient(): void {
    const { name, email, message } = this.form.getRawValue();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
    this.state = 'mailto';
  }
}
