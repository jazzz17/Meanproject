import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import  { Router } from '@angular/router';
import { UserService} from './../services/app.loginservice';
import { User } from './../models/app.login.model.component';
import { Response} from '@angular/http';

@Component({
 selector:'app-root',
 templateUrl : './app.userview.html'

})


export class UserComponent implements OnInit{
ngOnInit(): void { }

constructor(private serv: UserService, private router: Router) {}

onAddInfo(){
    let user={UserId:sessionStorage.getItem("userId")}
    console.log(user);
    this.serv.SearchUserInfo(user).subscribe((resp)=>
   {   
    console.log(resp.json());
    console.log(resp.json().status);
    if(resp.json().status===403){
        this.router.navigate(['addPersonInfo']); }
    else{
        this.router.navigate(['UpdateInfo']);
    }   


})
error=>console.log(error);



}
}
