import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import  { Router } from '@angular/router';
import { UserService} from './../services/app.loginservice';
import { User } from './../models/app.login.model.component';
import { Response} from '@angular/http';

@Component({
 selector:'app-root',
 templateUrl : './app.adminview.html'

})


export class AdminComponent implements OnInit{
 person = {
 UserId:'',
 UserName:"",
 Email:"",
 Password:"",
 RoleId:'',

 }
 personArr:string[];

constructor(private serv:UserService,private router:Router) {
 }

ngOnInit(): void {
this.serv
  .getData().subscribe((resp)=>
  {
  localStorage.getItem('token');
  console.log(resp.json());
  this.personArr=(resp.json().data);
  });

}

navigateToRequest():void{
  this.router.navigate(['newRequest']);

}

navigateToInfoRequest():void{
  this.router.navigate(['newInfoRequest'])
}
onSearchClicked(e){
  var search=document.getElementById("search");
    let userid={
      PID:search
      
    };
    console.log(userid);
   this.serv.SearchUser(userid).subscribe((resp)=>{
   console.log(resp.json());
   console.log(resp.json().status);
error=>{
  console.log(`Error occured${error.status}`);
};
 
  })

     

}

}

