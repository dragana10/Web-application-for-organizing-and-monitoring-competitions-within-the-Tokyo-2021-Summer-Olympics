import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username : string;
  password : string;
  new_password:string;
  error:string;
  name:string;
  user:User;

  low=new RegExp("[a-z]{3,}");
  up=new RegExp("[A-Z]{1,}");
  dig=new RegExp("[0-9]{2,}");
  spec=new RegExp(/[\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\{\}\;\:\\\|\,\.\<\>\?]{2,}/);
  fr=new RegExp("^[a-zA-Z]");
  glob=new RegExp('([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:\\|,.<>\?])\\1\\1\\1+')

  constructor(private router:Router,
    private user_service:UserService) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.password==this.new_password){
      this.error="The new password is the same as the old one."
      alert("The new password have to be different from the old one.")
    }
    else{
      if (this.new_password.length < 8 || this.new_password.length > 12) {
        this.error="The new password have to have: 8-12 characters, 1 upper letter, 3 lower letters, 2 digits and 2 special characters at least. Also, first charcter have to be a letter and the maximum number of consecutive characters is 3.";
        alert("The new password have to have: 8-12 characters, 1 upper letter, 3 lower letters, 2 digits and 2 special characters at least. Also, first charcter have to be a letter and the maximum number of consecutive characters is 3.");
      }
      else if ( 
                this.low.test(this.new_password) && 
                this.up.test(this.new_password) && 
                this.dig.test(this.new_password) && 
                this.spec.test(this.new_password) && 
                this.fr.test(this.new_password) && 
                !this.glob.test(this.new_password)){

            this.user_service.change_pass(this.username,this.password,this.new_password).subscribe((res)=>{
              if(res['message']=='ok'){
                this.error="Password is changed."
                alert("Password is changed.")
              }
              else if(res['message']=='no user'){
                this.error="Wrong username or password."
                alert("Wrong username or password.")
              }
            })
      }
      else {
        this.error="The new password have to have: 8-12 characters, 1 upper letter, 3 lower letters, 2 digits and 2 special characters at least. Also, first charcter have to be a letter and the maximum number of consecutive characters is 3.";
        alert("The new password have to have: 8-12 characters, 1 upper letter, 3 lower letters, 2 digits and 2 special characters at least. Also, first charcter have to be a letter and the maximum number of consecutive characters is 3.");
      }
    }
  }
}
