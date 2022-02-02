import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFormService {
  constructor() {}

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let monthsArray: number[] = [];

    // Build Array to send Frontend:
    for (let month = startMonth; month <= 12; month++) {
      monthsArray.push(month);
    }
    return of(monthsArray);
  }

  getCreditCardYears(): Observable<number[]> {
    let yearsArray: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    // Build Array to send Frontend:
    for (let year = startYear; year <= endYear; year++) {
      yearsArray.push(year);
    }
    return of(yearsArray);
  }
}
