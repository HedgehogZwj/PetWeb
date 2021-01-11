import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private router: Router, private AuthService: AuthService) { }
  userName = '';
  identify = '';
  ngOnInit(): void {
    this.userName = this.AuthService.currentUser;
    this.identify = this.AuthService.identity;
    console.log(this.AuthService.identity);
  }
  logout() {
    this.router.navigate(['/login']);
    this.AuthService.logout();
  }

}
