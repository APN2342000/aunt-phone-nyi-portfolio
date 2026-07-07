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
   * Loads the full portfolio payload from the .NET API.
   * If the API isn't running (e.g. you're only working on the frontend),
   * this falls back to local seed data so the page still renders.
   */
  getPortfolioData(): Observable<PortfolioData> {
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
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/contact`, message).pipe(
      catchError(() => {
        console.warn('[PortfolioService] Contact API unreachable.');
        return of({ success: false });
      })
    );
  }
}
