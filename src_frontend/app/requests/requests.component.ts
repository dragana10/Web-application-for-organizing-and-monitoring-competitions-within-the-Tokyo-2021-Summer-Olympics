import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from '../model/country';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  non_accepted_delegates:User[];
  non_accepted_leaders:User[];
  accepted_delegates:User[];
  accepted_leaders:User[];


  constructor(private router:Router,
    private user_service:UserService,
    private country_service:CountryService) { }

  ngOnInit(): void {
    this.user_service.find_non_acc_deleg().subscribe((data:User[])=>{
      this.non_accepted_delegates=data;
    });
    this.user_service.find_non_acc_lead().subscribe((data:User[])=>{
      this.non_accepted_leaders=data;
    });
    this.user_service.find_acc_deleg().subscribe((data:User[])=>{
      this.accepted_delegates=data;
    });
    this.user_service.find_acc_lead().subscribe((data:User[])=>{
      this.accepted_leaders=data;
    });
  }
  accept(username){
    this.user_service.accept(username).subscribe(res=>{
      if(res['message']=='ok'){
        this.user_service.find_non_acc_deleg().subscribe((data:User[])=>{
          this.non_accepted_delegates=data;
        });      
      }
    })
  }
  is_there_a_leader(nationality,user){
    this.user_service.is_there_a_leader(nationality).subscribe(res=>{
      if(res['message']=='yes'){
        user.msg='Yes.';
      }
      else if(res['message']=='no'){
        user.msg='No.';
      }
    })
  }
  accept_leader(username,nationality,user){
    this.user_service.accept_leader(username,nationality).subscribe(res=>{
      if(res['message']=='ok'){
        this.user_service.find_non_acc_lead().subscribe((data:User[])=>{
          this.non_accepted_leaders=data;
        });      
      }
      else if(res['message']=='unsuccessfully'){
        user.msg='There are leaders for this country.';
        this.user_service.find_non_acc_lead().subscribe((data:User[])=>{
          this.non_accepted_leaders=data;
        });      
      }
    })
  }
  remove_req(username){
    this.user_service.remove_req(username).subscribe(res=>{
      if(res['message']=='ok'){
        this.user_service.find_non_acc_lead().subscribe((data:User[])=>{
          this.non_accepted_leaders=data;
        });      
      }
    })
  }

}
