import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilsService } from '../service/util.service';
import { ContactServiceService } from '../service/contact-service.service';
import { AddEditContactComponent } from '../dialogs/add-edit-contact/add-edit-contact.component';
import { ShowCompaniesComponent } from '../dialogs/show-companies/show-companies.component';
import { AddContactToCompanyComponent } from '../dialogs/add-contact-to-company/add-contact-to-company.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'code',
    'firstName',
    'lastName',
    'address',
    'tva',
    'type',
    'contacts',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  isAdmin = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    private _dialog: MatDialog, 
    private contactService: ContactServiceService, 
    private utilService: UtilsService) {

      if (this.utilService.getUserInfo().user.profile.code != "ADMIN") {
        this.isAdmin = false;
        this.router.navigate(['/contact']);
      }
  
     }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe({

      next: (res) => {
        console.log(res.data);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },      
      error: console.log,
    });
  }

  openAddEditContactForm() {
    const dialogRef = this._dialog.open(AddEditContactComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContacts();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditContactComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContacts();
        }
      },
    });
  }


  
  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe({
      next: (res) => {
        this.utilService.openSnackBar('Contact deleted!', 'done');
        this.getContacts();
      },
      error: (err: any)=>{
        this.utilService.openSnackBar(err.error.errorMsg, 'done');
      }
    });
  }

  openCompaniesForm(data: any) {
    console.log(data);
    this._dialog.open(ShowCompaniesComponent, {
      data,
    });
  }

  openAddToCompanyForm(data: any) {
    console.log(data);
    
    this._dialog.open(AddContactToCompanyComponent, {
      data,
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
