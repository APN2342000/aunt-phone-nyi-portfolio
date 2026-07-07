import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RailNode {
  id: string;
  partNumber: string;
  label: string;
}

@Component({
  selector: 'app-trace-rail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trace-rail.component.html',
  styleUrl: './trace-rail.component.scss'
})
export class TraceRailComponent implements AfterViewInit, OnDestroy {
  readonly nodes: RailNode[] = [
    { id: 'hero', partNumber: 'J1', label: 'Intro' },
    { id: 'about', partNumber: 'U1', label: 'About' },
    { id: 'experience', partNumber: 'U2', label: 'Experience' },
    { id: 'skills', partNumber: 'U3', label: 'Skills' },
    { id: 'projects', partNumber: 'U4', label: 'Projects' },
    { id: 'education', partNumber: 'U5', label: 'Education' },
    { id: 'contact', partNumber: 'J2', label: 'Contact' }
  ];

  activeId = 'hero';
  private observer?: IntersectionObserver;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const sections = this.nodes
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          this.activeId = visible.target.id;
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
