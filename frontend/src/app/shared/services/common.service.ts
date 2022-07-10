import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  toasterOptions = {
    positionClass: 'toast-top-center',
  };
  constructor(private http: HttpClient,  private toastr: ToastrService) {
  }
  
  getToken() {
    return localStorage.getItem('authToken');
  }

  isUserLogin() {
    return localStorage.getItem('authToken') ? true : false;
  }

  showSuccessToast(heading: any, content: any) {
    this.toastr.success(heading, content);
  }

  showWarningToast(heading: any, content: any) {
    this.toastr.warning(heading, content);
  }
  showErrorToast(heading: any, content: any) {    
    this.toastr.error(heading, content);
  }
}
