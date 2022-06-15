import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get(environment.apiURL + `/student/all-student`);
  }

  getClasses() {
    return this.http.get(environment.apiURL + `/student/all-classes`);
  }

  getScore() {
    return this.http.get(environment.apiURL + `/student/score`);
   }
}
