import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileServiceService } from 'src/app/service/profile-service.service';
import { UtilsService } from 'src/app/service/util.service';

@Component({
  selector: 'app-add-edit-profile',
  templateUrl: './add-edit-profile.component.html',
  styleUrls: ['./add-edit-profile.component.css']
})
export class AddEditProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditProfileComponent>,
    private router: Router,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileServiceService) { }

  profileForm!: FormGroup;
  privilegeData: any;


  ngOnInit(): void {
    this.profileService.getPrivileges().subscribe(res => {
      this.privilegeData = res.data;
    });
    this.profileForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\\s]+')]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\\s]+')]],
      privileges: ['', [Validators.required]],
    });
    this.profileForm.patchValue(this.data);

  }

  onFormSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
    if (this.data) {
      const profileCode = this.f['code'].value;
      const profileName = this.f['name'].value;
      const privilegesList = this.f['privileges'].value;
      let params = { code: profileCode, name: profileName, privileges: privilegesList }

      console.log("params : ");
      console.log(params);
      
      this.profileService
        .updateRole(this.data.id, params)
        .subscribe({
          next: (val: any) => {
            this.utilService.openSnackBar(' profile updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this.utilService.openSnackBar(err.error.errorCode);
          },
        });
    } else {
      const profileCode = this.f['code'].value;
      const profileName = this.f['name'].value;
      const privilegesList = this.f['privileges'].value;
      let params = { code: profileCode, name: profileName, privileges: privilegesList }
      this.profileService.addRole(params).subscribe(response => {

        if (response.status === "SUCCESS") {
          this._dialogRef.close(true);
          this.utilService.openSnackBar(' profile added successfully');
          this.router.navigate(['/profile']);

        }
      }, err => {
        if (err) {
          this.utilService.openSnackBar(err.error.errorCode);
        }
      });
    }
  }


  get f() {
    return this.profileForm.controls;
  }


}
