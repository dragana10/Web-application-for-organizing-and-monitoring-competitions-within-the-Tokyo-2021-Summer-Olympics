import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  username : string;
  password : string;
  error:string;
  name:string;
  organizer:User;

  constructor(private router:Router,
    private organizer_service:UserService) { }

  ngOnInit(): void {
  }

  login(){
    this.organizer_service.login(this.username,this.password).subscribe((user:User)=>{
      if(user){
        this.organizer=user;
        if(this.organizer.type==0){
          this.router.navigate(['organization']);
        }
        else alert("Access allowed only to the organizer.");
      }
      else{
        this.error='Error.';
      }
    })
  }
}
