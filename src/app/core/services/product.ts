import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getDefaultProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError(() => {
        // fallback to local JSON
        return this.getLocalProducts();
      }));
  }

  getLocalProducts(): Observable<any>{
    return this.http.get('/assets/data/products.json');
  }
  getAllMensProducts(): Observable<any[]> {
    const shirts$ = this.http
      .get<any>(`${this.baseUrl}/category/mens-shirts`)
      .pipe(catchError(() => of({ products: [] })));

    const shoes$ = this.http
      .get<any>(`${this.baseUrl}/category/mens-shoes`)
      .pipe(catchError(() => of({ products: [] })));

    const watches$ = this.http
      .get<any>(`${this.baseUrl}/category/mens-watches`)
      .pipe(catchError(() => of({ products: [] })));

    return forkJoin([shirts$, shoes$, watches$]).pipe(
      map(([shirts, shoes, watches]) => [
        ...shirts.products,
        ...shoes.products,
        ...watches.products,
      ]),
    );
  }

  getAllWomensProducts(): Observable<any[]> {
    const dresses$ = this.http
      .get<any>(`${this.baseUrl}/category/womens-dresses`)
      .pipe(catchError(() => of({ products: [] })));

    const shoes$ = this.http
      .get<any>(`${this.baseUrl}/category/womens-shoes`)
      .pipe(catchError(() => of({ products: [] })));

    const watches$ = this.http
      .get<any>(`${this.baseUrl}/category/womens-watches`)
      .pipe(catchError(() => of({ products: [] })));

    // const Bags$ = this.http
    //   .get<any>(`${this.baseUrl}/category/womens-bags`)
    //   .pipe(catchError(() => of({ products: [] })));

    // const Jewelleries$ = this.http
    //   .get<any>(`${this.baseUrl}/category/womens-jewellery`)
    //   .pipe(catchError(() => of({ products: [] })));

    return forkJoin([dresses$, shoes$, watches$]).pipe(
      map(([dresses, shoes, watches]) => [
        ...dresses.products,
        ...shoes.products,
        ...watches.products,
      ]),
    );
  }

  getAllGeneralProducts(): Observable<any[]> {
  const home$ = this.http
    .get<any>(`${this.baseUrl}/category/home-decoration`)
    .pipe(
      catchError((err) => {
        console.error('Error fetching home decoration:', err);
        return of({ products: [] });
      })
    );

  const furniture$ = this.http
    .get<any>(`${this.baseUrl}/category/furniture`)
    .pipe(
      catchError((err) => {
        console.error('Error fetching furniture:', err);
        return of({ products: [] });
      })
    );

  const electronics$ = this.http
    .get<any>(`${this.baseUrl}/category/smartphones`)
    .pipe(
      catchError((err) => {
        console.error('Error fetching electronics:', err);
        return of({ products: [] });
      })
    );

  const skincare$ = this.http
    .get<any>(`${this.baseUrl}/category/skincare`)
    .pipe(
      catchError((err) => {
        console.error('Error fetching skincare:', err);
        return of({ products: [] });
      })
    );

  return forkJoin([home$, furniture$, electronics$, skincare$]).pipe(
    map(([home, furniture, electronics, skincare]) => {
      console.log('General API responses:', home, furniture, electronics, skincare);
      return [
        ...(home.products || []),
        ...(furniture.products || []),
        ...(electronics.products || []),
        ...(skincare.products || []),
      ];
    })
  );
}

}
