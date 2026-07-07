import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * Adds a "reveal" class the first time the host element scrolls into view,
 * then lets CSS (see .reveal / .reveal--visible in styles.scss) animate it in.
 *
 * Usage:
 *   <div appReveal>...</div>
 *   <div [appReveal]="i * 80">...</div>   // stagger by index, in ms
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appReveal') delayMs: number | string = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal');

    if (this.delayMs) {
      node.style.setProperty('--reveal-delay', `${this.delayMs}ms`);
    }

    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for environments without IntersectionObserver support.
      node.classList.add('reveal--visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('reveal--visible');
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
