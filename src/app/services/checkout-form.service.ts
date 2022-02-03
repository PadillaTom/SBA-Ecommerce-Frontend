import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Country } from 'app/common/country';
import { State } from 'app/common/state';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFormService {
  private countriesUrl = 'https://sba-ecommerce.herokuapp.com/api/countries';
  private statesUrl = 'https://sba-ecommerce.herokuapp.com/api/states';

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((response) => response._embedded.countries));
  }

  getStates(countryCode: string): Observable<State[]> {
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient
      .get<GetResponseStates>(searchStatesUrl)
      .pipe(map((response) => response._embedded.states));
  }

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

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}
interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
