import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.myForm = fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.value);
    this.authService.login(form.value).subscribe(res => {
      this.router.navigateByUrl('dashboard');
    });
  }

}
