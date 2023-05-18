import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompanyServiceService } from 'src/app/service/company-service.service';
import { ContactServiceService } from 'src/app/service/contact-service.service';
import { UtilsService } from 'src/app/service/util.service';


@Component({
  selector: 'app-add-contact-to-company',
  templateUrl: './add-contact-to-company.component.html',
  styleUrls: ['./add-contact-to-company.component.css']
})
export class AddContactToCompanyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<AddContactToCompanyComponent>,
    private router: Router,
    private utilService: UtilsService,
    private contactService: ContactServiceService,
    private companyService: CompanyServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  contactForm!: FormGroup;
  companiesData: any;


  ngOnInit() {
    this.companyService.getCompanies().subscribe(res => {
      this.companiesData = res.data;
    });
    this.contactForm = this.formBuilder.group({
      company: ['', [Validators.required]],
    });

  }

  onFormSubmit() {
    if (this.contactForm.valid) {
      const company = this.f['company'].value;
      this.contactService.joinCompany(this.data.id, company).subscribe(response => {

        if (response.status === "SUCCESS") {
          this._dialogRef.close(true);
          this.utilService.openSnackBar(' Contact added to company successfully');
          this.router.navigate(['/contact']);
        }
      }, err => {
        if (err.error.status === "FAILED") {
          this.utilService.openSnackBar(err.error.errorCode);
        }
      });
    }
  }

  get f() {
    return this.contactForm.controls;
  }


}