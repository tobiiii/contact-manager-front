import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProfileServiceService } from '../service/profile-service.service';
import { AddEditProfileComponent } from '../dialogs/add-edit-profile/add-edit-profile.component';
import { ShowPrivilegeComponent } from '../dialogs/show-privilege/show-privilege.component';
import { UtilsService } from '../service/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'code',
    'name',
    'privilages',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private _dialog: MatDialog, private profileService: ProfileServiceService, private utilService: UtilsService) { }

  ngOnInit() {
    this.getProfiles();
  }

  getProfiles() {
    this.profileService.getProfiles().subscribe({

      next: (res) => {
        console.log(res.data);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },      
      error: console.log,
    });
  }

  openAddEditProfileForm() {
    const dialogRef = this._dialog.open(AddEditProfileComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfiles();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditProfileComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfiles();
        }
      },
    });
  }

  openPrivilageForm(data: any) {
    console.log(data);
    
    this._dialog.open(ShowPrivilegeComponent, {
      data,
    });
  }

  deleteProfile(id: number) {
    this.profileService.deleteRole(id).subscribe({
      next: (res) => {
        this.utilService.openSnackBar('Profile deleted!', 'done');
        this.getProfiles();
      },
      error: (err: any)=>{
        this.utilService.openSnackBar(err.error.errorMsg, 'done');
      }
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
