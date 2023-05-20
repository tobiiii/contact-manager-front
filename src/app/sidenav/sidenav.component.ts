import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../service/util.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isAdmin = true;
  constructor(private router: Router,
    private utilService : UtilsService) {
    if (this.utilService.getUserInfo().user.profile.code != "ADMIN") {
      this.isAdmin = false;
      this.router.navigate(['/company']);
    }
  }
}
