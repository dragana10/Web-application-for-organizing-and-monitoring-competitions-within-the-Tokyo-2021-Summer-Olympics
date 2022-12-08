import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  constructor(private router:Router,
    private user_service:UserService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("organizer_username");
    this.router.navigate([''])
  }
}
