import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactMessage, PortfolioData } from '../models/portfolio.models';
import { FALLBACK_PORTFOLIO_DATA } from './portfolio.fallback-data';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly apiUrl = environment.apiUrl;
  private data$?: Observable<PortfolioData>;

  constructor(private http: HttpClient) {}

  /**
   * Loads the full portfolio payload.
   *
   * When environment.apiEnabled is false (the production default), this
   * skips the network call entirely and returns the bundled fallback data
   * immediately — no live backend required for the site to work.
   *
   * When apiEnabled is true, it fetches from the .NET API and falls back
   * to local seed data if that request fails for any reason.
   */
  getPortfolioData(): Observable<PortfolioData> {
    if (!environment.apiEnabled) {
      return of(FALLBACK_PORTFOLIO_DATA);
    }

    if (!this.data$) {
      this.data$ = this.http.get<PortfolioData>(`${this.apiUrl}/portfolio`).pipe(
        catchError(() => {
          console.warn(
            '[PortfolioService] Could not reach the .NET API at ' +
              this.apiUrl +
              ' — showing local fallback data. Run the API with `dotnet run` to see live data.'
          );
          return of(FALLBACK_PORTFOLIO_DATA);
        }),
        shareReplay(1)
      );
    }
    return this.data$;
  }

  sendContactMessage(message: ContactMessage): Observable<{ success: boolean }> {
    if (!environment.apiEnabled) {
      return of({ success: false });
    }

    return this.http.post<{ success: boolean }>(`${this.apiUrl}/contact`, message).pipe(
      catchError(() => {
        console.warn('[PortfolioService] Contact API unreachable.');
        return of({ success: false });
      })
    );
  }
}
