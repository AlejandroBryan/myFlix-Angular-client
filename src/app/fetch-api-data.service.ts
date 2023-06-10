import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) {


  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public useLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for fetching all movies endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(apiUrl + 'movies',
      {
        header: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Making the api call for the one movies endpoint
  public getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(apiUrl + 'movies/' + title,
      {
        header: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

   // Making the api call for the user registration endpoint
   public getOneDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(apiUrl + 'movies/director' + director,
      {
        header: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

     // Making the api call for the user registration endpoint
     public getOneMovieByGenres(genres: string): Observable<any> {
      const token = localStorage.getItem('token');
  
      return this.http.post(apiUrl + 'movies/genres' + genres,
        {
          header: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return new Error(
      'Something bad happened; please try again later.');
  }
}
