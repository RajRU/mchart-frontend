import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient, private router: Router, private commonService: CommonService) {
    if (this.commonService.getToken()) {
      this.setUser();
    }
  }

  login(credentials: any) {
    return this.http
      .post(environment.apiURL + '/auth/login', credentials)
      .pipe(
        map((res: any) => {
          const token = res.data.token;
          const refrashToken = res.refresh;
          localStorage.setItem('authToken', token);
          localStorage.setItem('refrashToken', refrashToken);
          this.setUser()
          return res;
        })
      );
  }

  setUser() {
    this.http
      .get(environment.apiURL + `/auth/me`)
      .subscribe((res: any) => {
        this.saveUserDetails(res.data);
      });
  }

  saveUserDetails(userData: any) {
    this.userData.next(userData);
  }

  register(userDetails: any) {
    // const formData = new FormData();
    return this.http.post(
      environment.apiURL + '/auth/register',
      userDetails
    );
  }

  updateProfile(payload: any) {
    return this.http.post(
      environment.apiURL + '/auth/update',
      payload
    );
  }

  logout() {
    localStorage.clear();
    this.userData.next(null);
    this.router.navigateByUrl('login');
  }
}
