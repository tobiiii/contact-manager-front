import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { UtilsService } from 'src/app/service/util.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<ChangePassComponent>,
    private router: Router,
    private utilService: UtilsService,
    private userService: UserServiceService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      oldpass: ['', [Validators.required]],
      newpass: ['', [Validators.required]],
    });

  }
  userForm!: FormGroup;

  onFormSubmit() {
    if (this.userForm.valid) {
      const oldUserpass = this.f['oldpass'].value;
      const newUserpass = this.f['newpass'].value;
      let params = { oldPassword: oldUserpass, newPassword: newUserpass }
      this.userService.changePass(params).subscribe(response => {

        if (response.status === "SUCCESS") {
          this._dialogRef.close(true);
          this.utilService.openSnackBar(' password updated successfully');
          this.router.navigate(['/user']);
        }
      }, err => {
        if (err.error.status === "FAILED") {
          this.utilService.openSnackBar(err.error.errorCode);
        }
      });
    }
  }

  get f() {
    return this.userForm.controls;
  }


}
