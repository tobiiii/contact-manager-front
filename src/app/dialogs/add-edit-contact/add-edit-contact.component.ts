import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompanyServiceService } from 'src/app/service/company-service.service';
import { ContactServiceService } from 'src/app/service/contact-service.service';
import { UtilsService } from 'src/app/service/util.service';



@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css']
})
export class AddEditContactComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditContactComponent>,
    private router: Router,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyServiceService,
    private contactService: ContactServiceService) { }

  contactForm!: FormGroup;
  companiesData: any;


  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(res => {
      this.companiesData = res.data;
    });
    this.contactForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\\s]+')]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\\s]+')]],
      tva: ['', [Validators.required]],
      address: ['', [Validators.required]],
      type: ['', [Validators.required]],
      companies: ['', [Validators.required]],
    });
    this.contactForm.patchValue(this.data);

  }

  onFormSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    if (this.data) {
      const contactCode = this.f['code'].value;
      const contactFirstName = this.f['firstName'].value;
      const contactLastName = this.f['lastName'].value;
      const contactTva = this.f['tva'].value;
      const contactAddress = this.f['address'].value;
      const contactType = this.f['type'].value;
      const companiesList = this.f['companies'].value;
      let params = { code: contactCode, firstName: contactFirstName, lastName: contactLastName, tva: contactTva, address: contactAddress, type: contactType, companies: companiesList }

      this.contactService
        .updateContact(this.data.id, params)
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
      const contactCode = this.f['code'].value;
      const contactFirstName = this.f['firstName'].value;
      const contactLastName = this.f['lastName'].value;
      const contactTva = this.f['tva'].value;
      const contactAddress = this.f['address'].value;
      const contactType = this.f['type'].value;
      const companiesList = this.f['companies'].value;
      let params = { code: contactCode, firstName: contactFirstName, lastName: contactLastName, tva: contactTva, address: contactAddress, type: contactType, companies: companiesList }
      this.contactService.addContact(params).subscribe(response => {

        if (response.status === "SUCCESS") {
          this._dialogRef.close(true);
          this.utilService.openSnackBar(' company added successfully');
          this.router.navigate(['/contact']);

        }
      }, err => {
        if (err) {
          this.utilService.openSnackBar(err.error.errorCode);
        }
      });
    }
  }

  get f() {
    return this.contactForm.controls;
  }
}
