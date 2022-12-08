import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : string;
  password : string;
  error:string;
  name:string;
  user:User;
  register_flag:number=0;

  constructor(private router:Router,
    private user_service:UserService) { }

  ngOnInit(): void {
  }

  login(){
    this.user_service.login(this.username,this.password).subscribe((user:User)=>{
      if(user){
        this.user=user;
        if(user.accepted==false){
          alert("Your request for registration is not allowed. Please, try later.");
         // this.router.navigate(['login']);
        }
        else{
          if(this.user.type==0){
            let username=this.user.username;
            localStorage.setItem("organizer_username", JSON.stringify(username));
            this.router.navigate(['organization']);
          }
          else if(this.user.type==1){
            let username=this.user.username;
            localStorage.setItem("delegate_username", JSON.stringify(username));
            this.router.navigate(['delegate']);
          }
          else if(this.user.type==2){
            let username=this.user.username;
            localStorage.setItem("leader_username", JSON.stringify(username));
            this.router.navigate(['leader']);
          }
          else alert("Username or password is incorrect.");
        }
      }
      else{
        this.error='Error.';
      }
    })
  }
  register(){
    this.register_flag=1;
  }
}
