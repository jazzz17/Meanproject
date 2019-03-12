import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import  { Router } from '@angular/router';
import { UserService} from './../services/app.loginservice';
import { User } from './../models/app.login.model.component';
import { Response} from '@angular/http';

@Component({
 selector:'app-root',
 templateUrl : './app.loginview.html'

})

export class LoginComponent implements OnInit {

   user = {
    UserName: "",
    Password: ""
  }
  constructor(private serv:UserService,private router:Router) {

  }

  ngOnInit(): void { }

  login() {

    this.serv.postData(this.user).subscribe((resp)=>
    {
      localStorage.setItem('token', `Bearer ${resp.json().token}`);
      console.log(resp.json());
      console.log(resp.json().role);

      if(resp.json().role === 'admin'){
        this.router.navigate(['adminHome'])
        }
        else if(resp.json().role ==='operator'){
          this.router.navigate(['operatorHome'])

        }
        else if(resp.json().role === 'accessuser'){
          let uId= resp.json().uId;
           sessionStorage.setItem("userId",uId);
          this.router.navigate(['accessUser']) }

        });
    }



  cancel(){
    alert('Click clear')
  }

}

