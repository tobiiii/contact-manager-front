import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileServiceService } from 'src/app/service/profile-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { UtilsService } from 'src/app/service/util.service';

const emailFormatErr = "EMAIL FORMAT ERROR";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileServiceService,
    private _dialogRef: MatDialogRef<AddEditUserComponent>,
    private router: Router,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserServiceService) { }
  userForm!: FormGroup;
  rolesData: any;



  ngOnInit() {
    this.profileService.getProfiles().subscribe(res => {
      this.rolesData = res.data;
    });

    this.userForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\\s]+')]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\\s]+')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      profile: ['', [Validators.required]],
    });
    this.f['profile'].setValue(null, { onlySelf: true });
    this.userForm.patchValue(this.data);

  }

  onFormSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    if (this.data) {
      const emailUser = this.f['emailAddress'].value;
      const firstNameUser = this.f['firstName'].value;
      const lastNameUser = this.f['lastName'].value;
      let params = { emailAddress: emailUser, firstName: firstNameUser, lastName: lastNameUser, profile: this.data.profile.id }

      this.userService
        .editUser(params,this.data.id)
        .subscribe({
          next: (val: any) => {
            this.utilService.openSnackBar(' user updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this.utilService.openSnackBar(err.error.errorCode);
          },
        });
    } else {
      const emailUser = this.f['emailAddress'].value;
      const firstNameUser = this.f['firstName'].value;
      const lastNameUser = this.f['lastName'].value;
      const profilUser = this.f['profile'].value;

      let params = { emailAddress: emailUser, firstName: firstNameUser, lastName: lastNameUser, profile: profilUser }
      this.userService.addUser(params).subscribe(response => {

        if (response.status === "SUCCESS") {
          this._dialogRef.close(true);
          this.utilService.openSnackBar(' user added successfully');
          alert("your default password is: " + response.data.defaultPass)
          this.router.navigate(['/user']);
        }
      }, err => {
        if (err) {
          if (err.error.status === "FAILED") {
            this.utilService.openSnackBar(err.error.errorCode);
          } else {
            this.utilService.openSnackBar(emailFormatErr);
          }
        }
      });
    }
  }
  get f() {
    return this.userForm.controls;
  }




}

