import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { UtilsService } from '../service/util.service';

const emailFormatErr = "EMAIL FORMAT ERROR";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private router: Router,
    private utilService : UtilsService,
    private authService: AuthServiceService) {
    if (this.authService.getToken()) {
      this.router.navigate(['/user']);
    }
  }


  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })

  }


  get f() { return this.formGroup.controls; }


  loginProces() {
    if (this.formGroup.valid) {
      this.authService.login(this.f['email'].value, this.f['password'].value)
        .subscribe(res => {
          if (res.status === "SUCCESS") {
            this.authService.setLoggeedInUser(res.data);
            this.router.navigate(['/user']); return;
          }
        }, err => {
          console.log(err);
          if (err.error.status === "FAILED") {
            this.utilService.openSnackBar(err.error.errorCode);
          } else {
            this.utilService.openSnackBar(emailFormatErr);
          }
        });
    }
  }
}
