import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthServiceService){}
    
    ngOnInit(): void {
      console.log('logout');
      this.authService.logout().subscribe(res => {
        this.authService.clearLocalStorage();
        this.router.navigate(['/']);
      }, err => {
        this.authService.clearLocalStorage();
        this.router.navigate(['/']);
      });
  
    }
  
  }
  