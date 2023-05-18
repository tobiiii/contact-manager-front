import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilsService } from '../service/util.service';
import { CompanyServiceService } from '../service/company-service.service';
import { AddEditCompanyComponent } from '../dialogs/add-edit-company/add-edit-company.component';
import { ShowContactsComponent } from '../dialogs/show-contacts/show-contacts.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'code',
    'address',
    'tva',
    'contacts',
    'action',
  ];
  isAdmin = true;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    private _dialog: MatDialog, 
    private companyService: CompanyServiceService, 
    private utilService: UtilsService) {
      
    if (this.utilService.getUserInfo().user.profile.code != "ADMIN") {
      this.isAdmin = false;
      this.router.navigate(['/company']);
    }
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe({

      next: (res) => {
        console.log(res.data);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openAddEditCompanyForm() {
    const dialogRef = this._dialog.open(AddEditCompanyComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCompanies();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditCompanyComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCompanies();
        }
      },
    });
  }



  deleteCompany(id: number) {
    this.companyService.deleteCompany(id).subscribe({
      next: (res) => {
        this.utilService.openSnackBar('Company deleted!', 'done');
        this.getCompanies();
      },
      error: (err: any) => {
        this.utilService.openSnackBar(err.error.errorMsg, 'done');
      }
    });
  }

  openContactListForm(data: any) {
    console.log(data);

    this._dialog.open(ShowContactsComponent, {
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
