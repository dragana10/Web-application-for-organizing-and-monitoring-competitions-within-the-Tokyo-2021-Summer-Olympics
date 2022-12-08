import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  low=new RegExp("[a-z]{3,}");
  up=new RegExp("[A-Z]{1,}");
  dig=new RegExp("[0-9]{2,}");
  spec=new RegExp(/[\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\{\}\;\:\\\|\,\.\<\>\?]{2,}/);
  fr=new RegExp("^[a-zA-Z]");
  glob=new RegExp('([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:\\|,.<>\?])\\1\\1\\1+')

  constructor(private registrServis:RegistrationService,
    private router:Router,
    private user_service:UserService) { }

  ngOnInit(): void {
  }

  name : string="";
  lastname : string="";
  username : string="";
  password : string="";
  email : string="";
  nationality : string="";
  // delegate: boolean;
  // leader: boolean;
  type:number=-1;
  error:string="";

  register(){
    let code=0;
    let accepted=false;
    let num_compet=0;

    if(this.name=="" || this.lastname=="" || this.username==""
    || this.password=="" || this.email==""
    || this.nationality=="" || this.type==-1){

      this.error="All fields are required.";
    }
    else if( (this.password.length < 8 || this.password.length > 12) ||
    ( 
      this.low.test(this.password)==false || 
      this.up.test(this.password)==false ||
      this.dig.test(this.password)==false || 
      this.spec.test(this.password)==false ||
      this.fr.test(this.password)==false || 
      this.glob.test(this.password)==true)){

        alert("The password have to have: 8-12 characters, 1 upper letter, 3 lower letters, 2 digits and 2 special characters at least. Also, first charcter have to be a letter and the maximum number of consecutive characters is 3.");
      
    }
    else{
      
      this.user_service.register(this.name,this.lastname,this.username,this.password,this.email,this.nationality,this.type,accepted,num_compet).subscribe(resp=>{
        console.log(resp);
        alert("Your registration request has been sent.");
      })
    }
  }

}
