import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Employee } from '../model/employee.model';
import { Observable, throwError } from 'rxjs';

import { catchError, map, retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiServiceService {

  constructor(private readonly http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getEmployeeData(empId: string): Observable<Employee>{
    let fetchEmployeeUrl = 'http://127.0.0.1:5000/fetchEmployee/' + empId
    console.log("fetch emp url is ", fetchEmployeeUrl);
    return this.http.get<Employee>(fetchEmployeeUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError));
  }

  editEmployeeData(empId: string, newEmployeeData: Employee): Observable<string>{
      const editUrl = 'http://127.0.0.1:5000/edit/' + empId;
      return this.http.post<{msg: string}>(editUrl, newEmployeeData)
      .pipe(
        map((response) => { 
          console.log("returned response is ", response['msg']);
          return response['msg'] }),
        retry(3),
        catchError(this.handleError)
      );
  }


}
