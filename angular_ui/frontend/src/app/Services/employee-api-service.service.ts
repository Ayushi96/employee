import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Employee } from '../model/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiServiceService {

  constructor(private readonly http: HttpClient) { }

  getEmployeeData(empId: string): Observable<any>{
    let myurl = 'http://127.0.0.1:5000/fetchEmployee/' + empId
    console.log("fetch emp url is ", myurl);
    return this.http.get(myurl);
  }
}
