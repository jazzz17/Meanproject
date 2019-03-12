import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import  { Router } from '@angular/router';
import { UserService} from './../services/app.loginservice';
import { User } from './../models/app.login.model.component';
import { Response} from '@angular/http';

@Component({
 selector:'app-root',
 templateUrl : './app.operatorview.html'

})


export class OperatorComponent implements OnInit {

  operator = {
    UserId: "",
    UserName: "", 
    Email:"",
    Password:"",
    RoleId:""

  }
  constructor(private serv:UserService,private router:Router) {

  }

ngOnInit(): void {

 }

 Register(){
  let operator = { UserId:this.operator.UserId, UserName:this.operator.UserName,
  Password:this.operator.Password,
  Email:this.operator.Email,
  RoleId:this.operator.RoleId}
  alert(JSON.stringify(operator))
  this.serv
     .postTempData(operator).subscribe((resp)=>{
      localStorage.getItem('token');
      console.log(resp.json());
     })
     error => console.log(error.status);
}






}
