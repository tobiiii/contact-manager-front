import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompanyServiceService } from 'src/app/service/company-service.service';
import { ContactServiceService } from 'src/app/service/contact-service.service';
import { UtilsService } from 'src/app/service/util.service';


@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.css']
})
export class AddEditCompanyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditCompanyComponent>,
    private router: Router,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyServiceService,
    private contactService: ContactServiceService) { }

  companyForm!: FormGroup;
  contactData: any;


  ngOnInit(): void {
    this.contactService.getContacts().subscribe(res => {
      this.contactData = res.data;
    });
    this.companyForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      tva: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contacts: ['', [Validators.required]],
    });
    this.companyForm.patchValue(this.data);

  }

  onFormSubmit() {
    if (this.companyForm.invalid) {
      return;
    }
    if (this.data) {
      const companyCode = this.f['code'].value;
      const companyTva= this.f['tva'].value;
      const companyAddress = this.f['address'].value;
      const contactsList = this.f['contacts'].value;
      let params = { code: companyCode, tva: companyTva, address: companyAddress, contacts: contactsList }

      console.log("params : ");
      console.log(params);

      this.companyService
        .updateCompany(this.data.id, params)
        .subscribe({
          next: (val: any) => {
            this.utilService.openSnackBar(' company updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this.utilService.openSnackBar(err.error.errorCode);
          },
        });
    } else {
      const companyCode = this.f['code'].value;
      const companyTva= this.f['tva'].value;
      const companyAddress = this.f['address'].value;
      const contactsList = this.f['contacts'].value;
      let params = { code: companyCode, tva: companyTva, address: companyAddress, contacts: contactsList }
      this.companyService.addCompany(params).subscribe(response => {

        if (response.status === "SUCCESS") {
          this._dialogRef.close(true);
          this.utilService.openSnackBar(' company added successfully');
          this.router.navigate(['/company']);

        }
      }, err => {
        if (err) {
          this.utilService.openSnackBar(err.error.errorCode);
        }
      });
    }
  }

  get f() {
    return this.companyForm.controls;
  }
}
